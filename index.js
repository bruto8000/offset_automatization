const fs = require("fs");
const XLSX = require("./xlsx.full.min.js");
const utils = require("./utils.js");

function main() {
  let jsonObjects = utils.filterJsons(utils.readJsons());
  let socObjects = utils.getOnlySocs(utils.readSocs());
  let tariffs = utils.getTariffs(socObjects, jsonObjects);
  utils.addMarkedCodesToTariffs(tariffs, jsonObjects);
  // utils.updateTariffLink(tariffs);
  // utils.removeMarkedCodesFromTariffs(tariffs);
  let { unchanged, changed } = utils.addAbonPriceTextToTariffs(tariffs);
  let tariffsWithMatchedPrice =
    utils.addMatchedArrayAndDeleteTextFromTariffs(changed);
  let seveble = utils.changePriceInSms(tariffsWithMatchedPrice, socObjects);
  fs.writeFileSync("finally.json", JSON.stringify(seveble, null, 2));

  // fs.writeFileSync("unchanged.json", JSON.stringify(unchanged, null, 2));
  // fs.writeFileSync("changed.json", JSON.stringify(changed, null, 2));
  //   utils.saveJsonFiles(jsonObjects);
}

main();
