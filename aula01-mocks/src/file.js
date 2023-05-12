const { readFile } = require("fs/promises");
const { join } = require("path");

const User = require("./user");
const constants = require("./constants");

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const isContentValid = File.isValid(content);

    if (!isContentValid.valid) throw new Error(isContentValid.error);

    const lines = content.split("\n");
    const firstLine = lines.shift();
    const header = firstLine.split(",");

    const users = lines.map((line) => {
      const items = line.split(",");
      let user = {};

      for (let index = 0; index < items.length; index++) {
        user[header[index]] = items[index];
      }

      return new User(user);
    });

    return users;
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileContent] = csvString.split("\n");
    const isHeaderValid = header === options.fields.join(",");

    if (!isHeaderValid) {
      return {
        error: constants.error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    if (fileContent.length < 1 || fileContent.length > options.maxLines) {
      return {
        error: constants.error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return {
      error: "",
      valid: true,
    };
  }
}

module.exports = File;
