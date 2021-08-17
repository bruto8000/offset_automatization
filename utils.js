const fs = require("fs");
const chalk = require("chalk");
let markedCodes = {
  VLG: "Волгоград",
  VRN: "Воронеж",
  VLK: "Владикавказ",
  TMB: "Тамбов",
  STV: "Ставрополь",
  SCH: "Сочи",
  AST: "Астрахань",
  BLG: "Белгород",
  BRN: "Брянск",
  EST: "Элиста",
  GRZ: "Грозный",
  KCH: "Черкесск",
  KRD: "Краснодар",
  KUR: "Курск",
  LPK: "Липецк",
  MAH: "Махачкала",
  NAL: "Нальчик",
  NZR: "Назрань",
  ORL: "Орел",
  RND: "Ростов_на_Дону",
  CHB: "Чебоксары",
  YAM: "Ноябрьск_Салехард",
  TUM: "Тюмень",
  CHL: "Челябинск",
  EKT: "Екатеринбург",
  HMS: "Сургут",
  IGK: "Ижевск",
  IKO: "Йошкар_Ола",
  KIR: "Киров",
  KRG: "Курган",
  KZN: "Казань",
  NNG: "Нижний_Новгород",
  ULN: "Ульяновск",
  UFA: "Уфа",
  ORB: "Оренбург",
  PNZ: "Пенза",
  TOL: "Тольятти",
  PRM: "Пермь",
  SAM: "Самара",
  SRT: "Саратов",
  SRN: "Саранск",
  STK: "Сыктывкар",
};
let reverseMarkedCodes = {
  Волгоград: "VLG",
  Воронеж: "VRN",
  Владикавказ: "VLK",
  Тамбов: "TMB",
  Ставрополь: "STV",
  Сочи: "SCH",
  Астрахань: "AST",
  Белгород: "BLG",
  Брянск: "BRN",
  Элиста: "EST",
  Грозный: "GRZ",
  Черкесск: "KCH",
  Краснодар: "KRD",
  Курск: "KUR",
  Липецк: "LPK",
  Махачкала: "MAH",
  Нальчик: "NAL",
  Назрань: "NZR",
  Орел: "ORL",
  Ростов_на_Дону: "RND",
  Чебоксары: "CHB",
  Ноябрьск_Салехард: "YAM",
  Тюмень: "TUM",
  Челябинск: "CHL",
  Екатеринбург: "EKT",
  Сургут: "HMS",
  Ижевск: "IGK",
  Йошкар_Ола: "IKO",
  Киров: "KIR",
  Курган: "KRG",
  Казань: "KZN",
  Нижний_Новгород: "NNG",
  Ульяновск: "ULN",
  Уфа: "UFA",
  Оренбург: "ORB",
  Пенза: "PNZ",
  Тольятти: "TOL",
  Пермь: "PRM",
  Самара: "SAM",
  Саратов: "SRT",
  Саранск: "SRN",
  Сыктывкар: "STK",
};

function readJsons() {
  let jsonNames = fs.readdirSync("./json_new");
  let resultsArr = [];
  jsonNames.forEach((fileName) => {
    try {
      let readed = fs.readFileSync(`./json_new/${fileName}`);
      let parsed = JSON.parse(readed);
      resultsArr.push({
        fileName,
        JSONINFO: parsed,
      });
    } catch (err) {
      console.log(`Не удалось прочитать ${fileName}`);
      console.log(err);
    }
  });
  return resultsArr;
}
function readSocs() {
  let jsonNames = fs.readdirSync("./JSONS");
  let resultsArr = [];
  jsonNames.forEach((fileName) => {
    try {
      let readed = fs.readFileSync(`./JSONS/${fileName}`);
      let parsed = JSON.parse(readed);
      resultsArr.push(parsed);
    } catch (err) {
      console.log(`Не удалось прочитать ${fileName}`);
      console.log(err);
    }
  });
  return resultsArr.flat(1);
}
function getOnlySocs(socObjects) {
  let normalized = socObjects.map((socObject) => {
    return {
      SOC: socObject.SOC,
      filial: markedCodes[socObject["Маркет-коды"]],
      markedCode: socObject["Маркет-коды"],
      newPriceWithText: socObject.price.split(". - ")[1],
    };
  });
  return normalized;
}
function filterJsons(jsonObjects) {
  let markedCodes = [
    "Волгоград",
    "Воронеж",
    "Владикавказ",
    "Тамбов",
    "Ставрополь",
    "Сочи",
    "Астрахань",
    "Белгород",
    "Брянск",
    "Элиста",
    "Грозный",
    "Черкесск",
    "Краснодар",
    "Курск",
    "Липецк",
    "Махачкала",
    "Нальчик",
    "Назрань",
    "Орел",
    "Ростов_на_Дону",
  ];
  let filtred = jsonObjects.filter(
    (jsonObject) => !!markedCodes.includes(jsonObject.JSONINFO.Filial)
  );
  return filtred;
}
function getTariffs(socObjects, jsonObjects) {
  let unfounded = [];
  let tariffs = [];

  try {
    socObjects.forEach((socObject) => {
      let founded = jsonObjects.find((jsonObject) => {
        let founded = (
          jsonObject.JSONINFO.open ||
          jsonObject.JSONINFO.nonpublick ||
          jsonObject.JSONINFO.close
        ).find((tariff) => {
          return (
            tariff.soc == socObject.SOC &&
            jsonObject.JSONINFO.Filial == socObject.filial
          );
        });
        if (founded) {
          tariffs.push(founded);
          return true;
        }
      });

      if (!founded) {
        unfounded.push(socObject);
      }
    });
    fs.writeFileSync(
      "./Ненайденные_тарифы_Которые_есть_в_excel.json",
      JSON.stringify(Array.from(unfounded))
    );

    return tariffs;
  } catch (err) {
    console.log(err);
  }
}
function addMarkedCodesToTariffs(tariffs, jsonObjects) {
  tariffs.forEach((tariff) => {
    tariff.marketCode =
      reverseMarkedCodes[
        jsonObjects.find((jsonObject) =>
          (
            jsonObject.JSONINFO.open ||
            jsonObject.JSONINFO.nonpublick ||
            jsonObject.JSONINFO.close
          ).includes(tariff)
        ).JSONINFO.Filial
      ];
    if (!tariff.marketCode) {
      console.log("ALERT NO MARKET CODE", tariff);
    }
  });
}
function removeMarkedCodesFromTariffs(tariffs) {
  tariffs.forEach((tariff) => {
    tariff.marketCode = undefined;
  });
}
function getLinks(tariffs) {
  return tariffs.map((tariff) => tariff.ссылка);
}

function updateTariffLink(tariiffs) {
  tariiffs.forEach((tariff) => {
    tariff.ссылка = `prices/${tariff.soc}_${tariff.marketCode}.html`;
  });
}
function saveJsonFiles(jsonObjects) {
  jsonObjects.forEach((jsonObject) => {
    fs.writeFileSync(
      `./json_very_new/${jsonObject.fileName}`,
      JSON.stringify(jsonObject.JSONINFO, null, 2)
    );
  });
}
function addAbonPriceTextToTariffs(tariffs) {
  let unchanged = [];
  let changed = [];
  let reg =
    /(АП\s?-|АП|Аб\. пл\.|Абон\.плата|Абон\. плата|Абонентская плата -|абон\. плата –|АП-|АП–|Абон\.плата -|Аб\. пл\. -|Абон\. плата -|Аб\. пл\. -|Абон.\s?плата-|Аб\. плата:|Абонентская плата\s?[-:]?|Аб\. плата -|Аб.плата|Абон.плата: первые 30 дней -|Абон.плата -)(\s+)?\d+[\,\.\s]?(\d+)?\s?(р|руб)\.?\/(сут|мес|неделю)|плата в сутки\s?\d+\s?руб/i;
  tariffs.forEach((tariff) => {
    if (!tariff.sms) {
      return;
    }
    let price = tariff.sms.match(reg);
    let toPush = {
      sms: tariff.sms,
      price: price && price[0],
    };
    if (!price) {
      unchanged.push(tariff);
    } else {
      tariff.AbonPriceText = toPush.price;
      changed.push(tariff);
    }
  });

  return {
    unchanged,
    changed,
  };
}
function addMatchedArrayAndDeleteTextFromTariffs(tariffs) {
  let reg = /((\d+)[\,\.\s]?(\d+)?)\s?(р|руб)\.?\/(сут|мес|неделю)/;
  let secondReg = /[Пп]лата в сутки\s*(\d+)\s*руб/;
  return tariffs.map((tariff) => {
    let matched = tariff.AbonPriceText.match(reg);
    if (!matched) {
      matched = tariff.AbonPriceText.match(secondReg);
      if (matched) {
        matched.push("ERR:TYPE");
      } else {
        console.log("err, when matching price from Abon Price".tariff.soc);
      }
    }
    tariff.matched = matched;
    tariff.AbonPriceText = undefined;
    return tariff;
  });
}
function getOldAndNewSMS(tariffs, socObjects) {
  return tariffs.map((tariff) => {
    let OldPriceWithText = tariff.matched[0];
    let oldPrice = tariff.matched[1];

    let currentTariffPriceInterval = tariff.matched.pop();

    let intervals = {
      сут: 30,
      мес: 1,
      неделю: 1,
    };
    let currentSocObject = socObjects.find(
      (soc) => soc.SOC == tariff.soc && tariff.marketCode == soc.markedCode
    );

    let newPriceWithSomeText = currentSocObject.newPriceWithText;

    let newPrice = newPriceWithSomeText.match(/(\d+)/)[0];
    let newPriceNormalized = (
      newPrice / (intervals[currentTariffPriceInterval] || 30)
    ).toFixed(2);
    let newPriceWithOldText =
      OldPriceWithText.split(oldPrice)[0].trim() +
      " " +
      parseFloat(newPriceNormalized) +
      " " +
      OldPriceWithText.split(oldPrice)[1].trim();

    tariff.newSms =
      tariff.sms.split(OldPriceWithText.trim())[0].trim() +
      " " +
      newPriceWithOldText.trim() +
      " " +
      tariff.sms.split(OldPriceWithText.trim())[1].trim();

    return {
      "Старая смска": tariff.sms,
      "Новая смска": tariff.newSms,
      "Старая цена": parseFloat(oldPrice) || oldPrice.trim(),
      "Новая цена": parseFloat(newPriceNormalized),
    };
  });
}
function changeSMSAndDeleteMatchedField(tariffs, socObjects) {
  tariffs.forEach((tariff) => {
    let OldPriceWithText = tariff.matched[0];
    let oldPrice = tariff.matched[1];

    let currentTariffPriceInterval = tariff.matched.pop();

    let intervals = {
      сут: 30,
      мес: 1,
      неделю: 1,
    };
    let currentSocObject = socObjects.find(
      (soc) => soc.SOC == tariff.soc && tariff.marketCode == soc.markedCode
    );

    let newPriceWithSomeText = currentSocObject.newPriceWithText;

    let newPrice = newPriceWithSomeText.match(/(\d+)/)[0];
    let newPriceNormalized = (
      newPrice / (intervals[currentTariffPriceInterval] || 30)
    ).toFixed(2);
    let newPriceWithOldText =
      OldPriceWithText.split(oldPrice)[0].trim() +
      " " +
      parseFloat(newPriceNormalized) +
      " " +
      OldPriceWithText.split(oldPrice)[1].trim();

    let newSms =
      tariff.sms.split(OldPriceWithText.trim())[0].trim() +
      " " +
      newPriceWithOldText.trim() +
      " " +
      tariff.sms.split(OldPriceWithText.trim())[1].trim();
    tariff.sms = newSms;
    tariff.matched = undefined;
  });
}
module.exports = {
  readJsons,
  readSocs,
  getOnlySocs,
  filterJsons,
  getTariffs,
  getLinks,
  addMarkedCodesToTariffs,
  removeMarkedCodesFromTariffs,
  updateTariffLink,
  saveJsonFiles,
  addAbonPriceTextToTariffs,
  getOldAndNewSMS,
  addMatchedArrayAndDeleteTextFromTariffs,
  changeSMSAndDeleteMatchedField,
};
