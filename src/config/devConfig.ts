import AppConfig from './AppConfig';

const w = window as any;

const devConfig: AppConfig = {
  env: 'DEVELOPMENT',
  logLevel: (w._env_ && w._env_.REACT_APP_LOG_LEVEL) || 'verbose',
  X_API_KEY: (w._env_ && w._env_.REACT_APP_X_API_KEY) || '',
  keycloakEnabled: (w._env_ && w._env_.REACT_APP_KEYCLOAK_ENABLE !== 'false') ? true : false,
  applicationConfig: {
    appTimeZone: (w._env_ && w._env_.REACT_APP_TIME_ZONE_NAME) ?? 'Asia/Manila',
    paginationConfig: {
      pageSizeOptions: [10, 15, 20],
      defaultSize: 20
    },
  },
  baseUrl: (w._env_ && w._env_.REACT_APP_BASE_URL) || 'http://localhost:8081/citytaxi/v1',
  roles: {
    system_admin: 'System Admin',
    admin: 'Admin',
    manager: 'Manager',
    officer: 'Officer',
  },
};

export default devConfig;
