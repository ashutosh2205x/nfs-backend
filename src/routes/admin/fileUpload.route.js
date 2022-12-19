const express = require("express");
const convertExcelFileToJsonUsingXlsx = require("../../controllers/fileReader.controller");
const upload = require("../../controllers/fileUpload.controller");
const router = express.Router();

router.post("/upload", function (req, res) {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.log("error", err);
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      let parsed = await convertExcelFileToJsonUsingXlsx();
      res.json({ status: "success", data: parsed });
    });
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
