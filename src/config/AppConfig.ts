type AppConfig = {
  env: string;
  logLevel: string;
  X_API_KEY: string;
  keycloakEnabled: boolean;
  applicationConfig: {
    appTimeZone: string,
    paginationConfig: {
      pageSizeOptions: Array<number>,
      defaultSize: number;
    }
  };
  baseUrl: string;
  roles: object,

};

export default AppConfig;
