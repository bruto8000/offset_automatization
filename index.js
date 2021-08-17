const fs = require("fs");
const XLSX = require("./xlsx.full.min.js");
const utils = require("./utils.js");

function main() {
  let jsonObjects = utils.readJsons(); // Читает JSON файлы тарифов
  let socObjects = utils.getOnlySocs(utils.readSocs()); // Берет только нужные поля:
  // SOC, filial, markedCode, newPriceWithText

  let tariffs = utils.getTariffs(socObjects, jsonObjects);
  // Берет только те тарифы, которым нужно поменять цену/ссылку,
  // филтьтрует с помощью socObjects
  // Так-же записывает ненайденные тарифы в файлик "Ненайденные_тарифы_Которые_есть_в_excel.json"

  utils.addMarkedCodesToTariffs(tariffs, jsonObjects);
  // На основе jsonObject, определяет в каком файлике был тариф,и добавляет к нему поле marketCode

  let oldLinks = utils.getLinks(tariffs);
  fs.writeFileSync("Старые_ссылки.json", JSON.stringify(oldLinks, null, 2));
  //Сохраняет старые ссылки

  utils.updateTariffLink(tariffs);
  //Меняет ссылку на шаблонную, основываясь на сок и маркет-код. Нужна чтобы в тарифе был marketCode

  // utils.removeMarkedCodesFromTariffs(tariffs);
  let { unchanged, changed } = utils.addAbonPriceTextToTariffs(tariffs);
  // добавляет поле AbonPriceText, с помощью регялок
  fs.writeFileSync(
    "Неудачно_Обработанные_тариффы.json",
    JSON.stringify(unchanged, null, 2)
  );
  //Сохраняет неудачные тарифы в отдельный фалийк

  let tariffsWithMatchedPrice =
    utils.addMatchedArrayAndDeleteTextFromTariffs(changed);
  //Добавляет поле matched для тарифа, куда вкладывает нужные данные для изменения смс-ки
  //Так-же удаляет AbonPriceText

  let forTestingResult = utils.getOldAndNewSMS(
    tariffsWithMatchedPrice,
    socObjects
  );
  /// Берет старые и новые данные для сравнения.
  fs.writeFileSync(
    "Старые_и_Новые_данные_для_теста.json",
    JSON.stringify(forTestingResult, null, 2)
  );

  utils.changeSMSAndDeleteMatchedField(tariffsWithMatchedPrice, socObjects);
  // Меняем смс-ки на новые и удаляем поле matched у тарифов
  utils.removeMarkedCodesFromTariffs(tariffsWithMatchedPrice);
  // Удаляем маркет коды
  utils.saveJsonFiles(jsonObjects);
  // Сохраняет результат
}

main();
