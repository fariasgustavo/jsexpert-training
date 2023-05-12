const { error } = require("./src/constants");
const File = require("./src/file");

const { rejects, deepStrictEqual } = require("assert");
(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/invalid-header.csv";
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);

    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Gustavo Farias",
        id: 123,
        profession: "Software Developer",
        birthDay: 1998,
      },
      {
        name: "Someone Else",
        id: 323,
        profession: "Fireman",
        birthDay: 1992,
      },
      {
        name: "Alex One",
        id: 345,
        profession: "Doctor",
        birthDay: 1996,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
