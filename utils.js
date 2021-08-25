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
  SML: "Смоленск",
  RZN: "Рязань",
  MUR: "Мурманск",
  KSM: "Кострома",
  KRL: "Петрозаводск",
  KLG: "Калуга",
  IVN: "Иваново",
  EXT: "Калининград",
  ARH: "Архангельск",
  SPB: "Санкт_Петербург",
  TUL: "Тула",
  TVR: "Тверь",
  VLD: "Владимир",
  VNG: "Новгород_Великий",
  VOL: "Вологда",
  YRL: "Ярославль",
  PSK: "Псков",
  ABK: "Абакан",
  BAR: "Барнаул",
  BGK: "Благовещенск",
  BIR: "Биробиджан",
  BUR: "Улан_Удэ",
  CHT: "Чита",
  DTI: "Хабаровск",
  GAL: "Горно_Алтайск",
  IRK: "Иркутск",
  KMR: "Кемерово",
  KRS: "Красноярск",
  KSK: "Комсомольск_на_Амуре",
  KZL: "Кызыл",
  MGD: "Магадан",
  NOR: "Норильск",
  NSK: "Новосибирск",
  OMS: "Омск",
  PPK: "Петропавловск_Камчатский",
  SKH: "Южно_Сахалинск",
  TMS: "Томск",
  VLA: "Владивосток",
  YAK: "Якутск",
  ANR: "Анадырь",
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
  Смоленск: "SML",
  Рязань: "RZN",
  Мурманск: "MUR",
  Кострома: "KSM",
  Петрозаводск: "KRL",
  Калуга: "KLG",
  Иваново: "IVN",
  Калининград: "EXT",
  Архангельск: "ARH",
  Санкт_Петербург: "SPB",
  Тула: "TUL",
  Тверь: "TVR",
  Владимир: "VLD",
  Новгород_Великий: "VNG",
  Вологда: "VOL",
  Ярославль: "YRL",
  Псков: "PSK",
  Абакан: "ABK",
  Барнаул: "BAR",
  Благовещенск: "BGK",
  Биробиджан: "BIR",
  Улан_Удэ: "BUR",
  Чита: "CHT",
  Хабаровск: "DTI",
  Горно_Алтайск: "GAL",
  Иркутск: "IRK",
  Кемерово: "KMR",
  Красноярск: "KRS",
  Комсомольск_на_Амуре: "KSK",
  Кызыл: "KZL",
  Магадан: "MGD",
  Норильск: "NOR",
  Новосибирск: "NSK",
  Омск: "OMS",
  Петропавловск_Камчатский: "PPK",
  Южно_Сахалинск: "SKH",
  Томск: "TMS",
  Владивосток: "VLA",
  Якутск: "YAK",
  Анадырь: "ANR",
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
    if (!markedCodes[socObject["Маркет-коды"]]) {
      console.log(`Не найден СОК в маркет кодах ${socObject["Маркет-коды"]}`);
    }
    return {
      SOC: socObject.SOC,
      filial: markedCodes[socObject["Маркет-коды"]],
      markedCode: socObject["Маркет-коды"],
      newPriceWithText: socObject.price.split(". - ")[1],
    };
  });
  return normalized;
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
    let foundedJsonObject = jsonObjects.find((jsonObject) =>
      (
        jsonObject.JSONINFO.open ||
        jsonObject.JSONINFO.nonpublick ||
        jsonObject.JSONINFO.close
      ).includes(tariff)
    );

    tariff.marketCode = reverseMarkedCodes[foundedJsonObject.JSONINFO.Filial];
    if (!tariff.marketCode) {
      console.log(
        "ALERT NO MARKET CODE",
        tariff,
        foundedJsonObject.JSONINFO.Filial
      );
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
    /(АП\s?-|АП|Аб\. пл\.|Абон\.плата|Абон\. плата|абон\.плату|Абонентская плата -|абон\. плата –|АП-|АП–|Абон\.плата -|Аб\. пл\. -|Абон\. плата -|Аб\. пл\. -|Абон.\s?плата-|Аб\. плата:|Абонентская плата\s?[-:]?|Аб\. плата -|Аб.плата\:?|Абон.плата: первые 30 дней -|Абон.плата -)(\s+)?\d+[\,\.\s]?(\d+)?\s?(р|руб)\.?\/?\s?в?\s?(сут(ки)?|мес(яц)?|неделю)|плата в сутки\s?\d+\s?руб/i;
  tariffs.forEach((tariff) => {
    if (!tariff.sms) {
      return;
    }
    let price = tariff.sms.match(reg);
    let toPush = {
      sms: tariff.sms,
      price: price && price[0],
    };
    if (!toPush.price) {
      unchanged.push(tariff);
    } else {
      tariff.AbonPriceText = toPush.price;
      if (changed.includes(tariff)) {
        console.log("Второй раз один и тот-же тариф ", tariff.soc);
      } else {
        changed.push(tariff);
      }
    }
  });

  return {
    unchanged,
    changed,
  };
}
function addMatchedArrayAndDeleteTextFromTariffs(tariffs) {
  let reg =
    /((\d+)[\,\.\s]?(\d+)?)\s?(р|руб)\.?\/?\s?в?\s?(сут(ки)?|мес|неделю)/;
  let secondReg = /[Пп]лата в сутки\s*(\d+)\s*руб/;
  return tariffs.map((tariff) => {
    let matched = tariff.AbonPriceText.match(reg);
    if (!matched) {
      matched = tariff.AbonPriceText.match(secondReg);
      if (matched) {
        matched.push("ERR:TYPE");
      } else {
        console.log("err, when matching price from Abon Price", tariff.soc);
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

    let currentTariffPriceInterval = tariff.matched[tariff.matched.length - 2];
    let intervals = {
      сут: 30,
      сутки: 30,
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
    )
      .toFixed(3)
      .slice(0, -1);

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

    return {
      "Старая смска": tariff.sms,
      "Новая смска": newSms,
      "Старая цена": parseFloat(oldPrice) || oldPrice.trim(),
      "Новая цена": parseFloat(newPriceNormalized),
      СОК: tariff.soc,
      Филиал: markedCodes[tariff.marketCode],
      "Новая ссылка": tariff.ссылка,
    };
  });
}
function changeSMSAndDeleteMatchedField(tariffs, socObjects) {
  tariffs.forEach((tariff) => {
    let OldPriceWithText = tariff.matched[0];
    let oldPrice = tariff.matched[1];

    let currentTariffPriceInterval = tariff.matched[tariff.matched.length - 2];

    let intervals = {
      сут: 30,
      сутки: 30,
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
    )
      .toFixed(3)
      .slice(0, -1);
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
