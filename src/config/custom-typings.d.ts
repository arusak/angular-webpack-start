// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var WEBAPP_PREFIX: string;
declare var BUILD_PROFILE: string;
declare var HMR: boolean;
declare var API_URL: string;
declare const STATIC_THEME: string;
declare const DYNAMIC_THEMES: string;
declare const USE_ANALYZER: string;

interface GlobalEnvironment {
  WEBAPP_PREFIX;
  BUILD_PROFILE;
  HMR;
  API_URL;
  STATIC_THEME;
  DYNAMIC_THEMES;
  USE_ANALYZER;
}
