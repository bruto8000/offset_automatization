let fs = require("fs");
let XLSX = require("./xlsx.full.min.js");
fs.readdirSync("./XLSX").forEach((fileName, idx) => {
  let xsx = fs.readFileSync("./XLSX/" + fileName, "binary");

  console.log("READED");

  let workbook = XLSX.read(xsx, {
    type: "binary",
  });
  console.log("formated");
  workbook.SheetNames.forEach(function (sheetName, idxsh) {
    let XL_row_objects = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[sheetName],
      {
        raw: false,
      }
    );
    XL_row_objects.forEach((row_object) => {
      row_object.price = row_object.__EMPTY;
      row_object.__EMPTY = undefined;
    });
    let len = XL_row_objects.length;

    let i = 0;

    function spliting() {
      console.log("start split");
      i++;
      if (XL_row_objects.length == 0) {
        console.log(0, "ended");
        return;
      }

      let json_object = JSON.stringify(XL_row_objects.splice(0, 3000));
      fs.writeFileSync(
        "JSONS/" + idx + "2new" + idxsh + i + ".json",
        json_object
      );
      console.log("writed", idx, idxsh);

      spliting();
    }

    spliting();
  });
});
