// plugins/index.js
const { writeFile } = require("cypress-xlsx");

module.exports = (on, config) => {
  on("task", {
    writeExcel({ filePath, data }) {
      writeFile(filePath, data);
      return null;
    },
  });
};
