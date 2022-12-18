const express = require("express");
const convertExcelFileToJsonUsingXlsx = require("../../controllers/fileReader.controller");
const upload = require("../../controllers/fileUploader.controller");
const router = express.Router();

router.post("/upload", function (req, res) {
  try {
    upload(req, res, function (err) {
      if (err) {
        console.log("error", err);
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      // convertExcelFileToJsonUsingXlsx();
      res.json({ error_code: 0, err_desc: null });
    });
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
