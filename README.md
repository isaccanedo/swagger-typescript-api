# swagger-typescript-api  

[![NPM badge](https://img.shields.io/npm/v/swagger-typescript-api.svg)](https://www.npmjs.com/package/swagger-typescript-api) 
[![CI](https://github.com/acacode/swagger-typescript-api/actions/workflows/main.yml/badge.svg?branch=next)](https://github.com/acacode/swagger-typescript-api/actions/workflows/main.yml) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-20-orange.svg)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<img src="https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/swagger-typescript-api-logo.png" align="left"
     title="swagger-typescript-api logo by js2me" width="93" height="180">

Generate api via swagger scheme.  
Supports OA 3.0, 2.0, JSON, yaml  
Generated api module use [**Fetch Api**](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or [**Axios**](https://github.com/axios/axios) to make requests.  

<br>
<br>

Any questions you can ask [**here**](https://github.com/acacode/swagger-typescript-api/issues) or in [**our slack**](https://join.slack.com/t/acacode/shared_invite/enQtOTQ5ODgyODQzMzYwLWYxOGI1MzQ3Yzg1ZWI5ZTI5NzNiZjExZTE5OWI1YjQ4NjBiNTk4NWVlNjM5YmU1ZWI2ZDkyMzZkZGIxNjA5NTQ)(**#swagger-typescript-api** channel)
  
<br>  

![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/components-converter-example.jpg)  

## 👀 Examples  

All examples you can find [**here**](https://github.com/acacode/swagger-typescript-api/tree/master/tests)  

## 📄 Usage  

```muse
Usage: sta [options]
Usage: swagger-typescript-api [options]

Options:
  -v, --version                 output the current version
  -p, --path <path>             path/url to swagger scheme
  -o, --output <output>         output path of typescript api file (default: "./")
  -n, --name <name>             name of output typescript api file (default: "Api.ts")
  -t, --templates <path>        path to folder containing templates
  -d, --default-as-success      use "default" response status code as success response too.
                                some swagger schemas use "default" response status code
                                as success response type by default. (default: false)
  -r, --responses               generate additional information about request responses
                                also add typings for bad responses (default: false)
  --union-enums                 generate all "enum" types as union types (T1 | T2 | TN) (default: false)
  --route-types                 generate type definitions for API routes (default: false)
  --no-client                   do not generate an API class
  --enum-names-as-values        use values in 'x-enumNames' as enum values (not only as keys) (default: false)
  --js                          generate js api module with declaration file (default: false)
  --extract-request-params      extract request params to data contract (default: false)
                                Also combine path params and query params into one object
  --extract-request-body        extract request body type to data contract (default: false)                         
  --module-name-index <number>  determines which path index should be used for routes separation (default: 0)
                                (example: GET:/fruites/getFruit -> index:0 -> moduleName -> fruites)
  --module-name-first-tag       splits routes based on the first tag
  --modular                     generate separated files for http client, data contracts, and routes (default: false)
  --disableStrictSSL            disabled strict SSL (default: false)
  --disableProxy                disabled proxy (default: false)
  --clean-output                clean output folder before generate api. WARNING: May cause data loss (default: false)
  --axios                       generate axios http client (default: false)
  --single-http-client          Ability to send HttpClient instance to Api constructor (default: false)
  --silent                      Output only errors to console (default: false)
  --default-response <type>     default type for empty response schema (default: "void")
  --type-prefix <string>        data contract name prefix (default: "")
  --type-suffix <string>        data contract name suffix (default: "")
  -h, --help                    display help for command
```

Also you can use `npx`:  
```
 npx swagger-typescript-api -p ./swagger.json -o ./src -n myApi.ts
```

You can use this package from nodejs:
```js
const { generateApi } = require('swagger-typescript-api');
const path = require("path");
const fs = require("fs");

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  name: "MySuperbApi.ts",
  output: path.resolve(process.cwd(), "./src/__generated__"),
  url: 'http://api.com/swagger.json',
  input: path.resolve(process.cwd(), './foo/swagger.json'),
  spec: {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "Swagger Petstore",
    },
    // ...
  },
  templates: path.resolve(process.cwd(), './api-templates'),
  httpClientType: "axios", // or "fetch"
  defaultResponseAsSuccess: false,
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: false,
  extractRequestBody: false,
  prettier: {
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
  },
  defaultResponseType: "void",
  singleHttpClient: true,
  cleanOutput: false,
  enumNamesAsValues: false,
  moduleNameFirstTag: false,
  generateUnionEnums: false,
  extraTemplates: [],
  hooks: {
    onCreateComponent: (component) => {},
    onCreateRequestParams: (rawType) => {},
    onCreateRoute: (routeData) => {},
    onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
    onFormatRouteName: (routeInfo, templateRouteName) => {},
    onFormatTypeName: (typeName, rawTypeName) => {},
    onInit: (configuration) => {},
    onParseSchema: (originalSchema, parsedSchema) => {},
    onPrepareConfig: (currentConfiguration) => {},
  }
})
  .then(({ files, configuration }) => {
    files.forEach(({ content, name }) => {
      fs.writeFile(path, content);
    });
  })
  .catch(e => console.error(e))

```


## 💎 options   
### **`--templates`**  
This option needed for cases when you don't want to use the default `swagger-typescript-api` output structure  

Templates:  
- `api.eta` - Api class module (locations: [/templates/default](https://github.com/acacode/swagger-typescript-api/tree/next/templates/default/api.eta), [/templates/modular](https://github.com/acacode/swagger-typescript-api/tree/next/templates/modular/api.eta))  
- `data-contracts.eta` - all types (data contracts) from swagger schema (locations: [/templates/base](https://github.com/acacode/swagger-typescript-api/tree/next/templates/base/data-contracts.eta))  
- `http-client.eta` - HttpClient class module (locations: [/templates/base](https://github.com/acacode/swagger-typescript-api/tree/next/templates/base/http-client.eta))  
- `procedure-call.eta` - route in Api class (locations: [/templates/default](https://github.com/acacode/swagger-typescript-api/tree/next/templates/default/procedure-call.eta), [/templates/modular](https://github.com/acacode/swagger-typescript-api/tree/next/templates/modular/procedure-call.eta))  
- `route-docs.eta` - documentation for route in Api class (locations: [/templates/base](https://github.com/acacode/swagger-typescript-api/tree/next/templates/base/route-docs.eta))  
- `route-name.eta` - route name for route in Api class (locations: [/templates/base](https://github.com/acacode/swagger-typescript-api/tree/next/templates/base/route-name.eta))  
- `route-type.eta` - *(`--route-types` option)* (locations: [/templates/base](https://github.com/acacode/swagger-typescript-api/tree/next/templates/base/route-type.eta))  
- `route-types.eta` - *(`--route-types` option)* (locations: [/templates/base](https://github.com/acacode/swagger-typescript-api/tree/next/templates/base/route-types.eta))  

How to use it:  
1. copy `swagger-typescript-api` templates into your place in project
    - from [/templates/default](https://github.com/acacode/swagger-typescript-api/tree/next/templates/default) for single api file  
    - from [/templates/modular](https://github.com/acacode/swagger-typescript-api/tree/next/templates/modular) for multiple api files (with `--modular` option)  
    - from [/templates/base](https://github.com/acacode/swagger-typescript-api/tree/next/templates/base) for base templates (templates using both in default and modular)  
1. add `--templates PATH_TO_YOUR_TEMPLATES` option  
2. modify [ETA](https://eta.js.org/docs/syntax) templates as you like  

NOTE:  
  Eta has special directive to render template in your Eta templates - `includeFile(pathToTemplate, payload)`  
  If you want to use some default templates from this tool you can use path prefixes: `@base`, `@default`, `@modular`.  
    `@base` - [path to base templates](https://github.com/acacode/swagger-typescript-api/tree/next/templates/base)  
    `@default` - [path to single api file templates](https://github.com/acacode/swagger-typescript-api/tree/next/templates/default)  
    `@modular` - [path to multiple api files templates](https://github.com/acacode/swagger-typescript-api/tree/next/templates/modular)  
  Examples:  
    - `includeFile("@base/data-contracts.eta", configuration)`  
    - `includeFile("@default/api.eta", configuration)`  
    - `includeFile("@default/procedure-call.eta", configuration)`  
    - `includeFile("@modular/api.eta", configuration)`  
    - `includeFile("@modular/procedure-call.eta", configuration)`  
    - `includeFile("@base/route-docs.eta", configuration)`  
    - `includeFile("@base/route-name.eta", configuration)`  
    - `includeFile("@base/route-type.eta", configuration)`  
    - `includeFile("@base/route-types.eta", configuration)`  

### **`--module-name-index`**  
This option should be used in cases when you have api with one global prefix like `/api`   
Example:   
`GET:/api/fruits/getFruits`  
`POST:/api/fruits/addFruits`  
`GET:/api/vegetables/addVegetable`  
with `--module-name-index 0` Api class will have one property `api`  
When we change it to `--module-name-index 1` then Api class have two properties `fruits` and `vegetables`  

### **`--module-name-first-tag`**  
This option will group your API operations based on their first tag - mirroring how the Swagger UI groups displayed operations