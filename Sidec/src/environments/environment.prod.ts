export const environment = {
  production: true,
  //rest_view_inbox: "http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/1",
  //rest_view_inbox: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2",
  /* Esta URL muda quando roda o nrok */
  rest_view_inbox: "http://4d5f0027.ngrok.io" + "/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2",
  //esri_request: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/queryDomains",
  //esri_request: "http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/queryDomains",
  esri_request: "http://4d5f0027.ngrok.io" + "/arcgis/rest/services/DESENV/SIDEC/FeatureServer/queryDomains",
  //rest_feature_solicitacao: "http://noteimg423.img.local/arcgis/rest/services/DESENV/SIDEC/FeatureServer/0",
  //rest_feature_solicitacao: "http://p110civitas.img.com.br/arcgis/rest/services/SIDEC/SIDEC/FeatureServer/0",
  rest_feature_solicitacao: "http://4d5f0027.ngrok.io" + "/arcgis/rest/services/DESENV/SIDEC/FeatureServer/0",
};
