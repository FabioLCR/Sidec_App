// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  rest_view_inbox: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2",
  //rest_view_inbox: "http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/1",
  /* Esta URL muda quando roda o nrok */
  //rest_view_inbox: "http://bf7ea9ce.ngrok.io/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2",
  esri_request: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/queryDomains",
  //esri_request: "http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/queryDomains",
  //esri_request: "http://bf7ea9ce.ngrok.io/arcgis/rest/services/DESENV/SIDEC/FeatureServer/queryDomains",
  rest_feature_solicitacao: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/0",
  //rest_feature_solicitacao: "http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/0",
  //rest_feature_solicitacao: "http://bf7ea9ce.ngrok.io/arcgis/rest/services/DESENV/SIDEC/FeatureServer/0",
};
