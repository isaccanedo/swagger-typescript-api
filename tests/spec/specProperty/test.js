const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "specProperty test",
    silent: true,
    name: apiFileName,
    spec: require(absolutePath),
    output: resolve(__dirname, "./"),
    generateRouteTypes: true,
    generateClient: false,
  }).then(() => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
  });
});
