var express = require("express");
var fs = require("fs");
// const x =require("../")
const xlsx = require("xlsx");

function convertExcelFileToJsonUsingXlsx() {
  // Read the file using pathname , since file is constant
  const file = xlsx.readFile("./tmp/file.xlsx");
  // Grab the sheet info from the file
  const sheetNames = file.SheetNames;
  const totalSheets = sheetNames.length;
  let parsedData = [];
  // Loop through sheets
  for (let i = 0; i < totalSheets; i++) {
    // Convert to json using xlsx
    const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
    // Skip header row which is the colum names
    tempData.shift();
    // Add the sheet's json to our data array
    parsedData.push(...tempData);
  }
  // call a function to save the data in a json file
  generateJSONFile(parsedData);
}

function generateJSONFile(data) {
  try {
    fs.writeFileSync("./uploads/data.json", JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

module.exports = convertExcelFileToJsonUsingXlsx;
