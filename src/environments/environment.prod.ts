import { IonicAuthOptions } from '@ionic-enterprise/auth';

const baseConfig = {
  clientID: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  scope:
    'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  audience: 'https://api.myapp.com',
  authConfig: 'azure' as 'azure',
};

export const mobileAzureConfig: IonicAuthOptions = {
  ...baseConfig,
  redirectUri: 'myapp://callback',
  logoutUrl: 'myapp://callback?logout=true',
  platform: 'cordova',
  iosWebView: 'private',
  androidToolbarColor: 'Red',
};

export const webAzureConfig: IonicAuthOptions = {
  ...baseConfig,
  redirectUri: 'http://localhost:8100/login',
  logoutUrl: 'http://localhost:8100/login',
  platform: 'web',
};

export const environment = {
  production: true,
  dataService: 'https://cs-demo-api.herokuapp.com',
};
