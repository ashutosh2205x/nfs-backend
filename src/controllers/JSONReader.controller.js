const fs = require("fs");

function jsonReader(filePath, cb) {
  return fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
jsonReader("./uploads/data.json", (err, data) => {
  if (err) {
    console.log(err);
    return null;
  }
  return data;
});

module.exports = jsonReader;
