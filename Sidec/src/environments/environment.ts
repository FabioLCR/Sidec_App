// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  rest_view_inbox: "http://noteimg423.img.local:6080/arcgis/rest/services/DESENV/SIDEC/FeatureServer/2",
  queryDomains: "http://noteimg423.img.local:6080/arcgis/rest/services/DESENV/SIDEC/FeatureServer/queryDomains",
  rest_feature_solicitacao: "http://noteimg423.img.local:6080/arcgis/rest/services/DESENV/SIDEC/FeatureServer/0",
  rest_table_cobrade: "http://noteimg423.img.local:6080/arcgis/rest/services/DESENV/SIDEC/FeatureServer/3",
  geocodeServer:'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer',
  homeLocationSymbol: {
    type: 'picture-marker',
    url: './assets/img/home.png',
    width: 27,
    height: 43
  },
};
