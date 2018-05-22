const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const doc = new GoogleSpreadsheet(process.env.TWITTER_GOOGLE_SPREADSHEET_ID);
let sheet;

exports.saveOnGoogle = function (result) {
  async.series([
    function setAuth(step) {
      var creds = require('./google.json');
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {

      let rows = [];
      const now = new Date();

      doc.addWorksheet({
        title: now.toLocaleString("en-US")
      }, function(err, sheet) {
        sheet.setHeaderRow(Object.keys(result[0]), function() {

          console.info(`Number of rows: ${result.length}`);

          addRowsRecursively(sheet, result, step);
        });
      });
    }

  ], function(err){
      if ( err ) {
        console.info('Error: '+err);
      }
  });
}


function addRowsRecursively(sheet, rows, cb) {
  let errorsCount = 0;
  if (rows.length > 0) {
    let row = rows.shift();

    sheet.addRow(row, function(err, new_row) {
      if (err && err != "") {
        errorsCount++;
      }

      addRowsRecursively(sheet, rows, cb);
    });
  } else {
    console.info("Errors adding rows: " + errorsCount);
    cb();
  }
}

