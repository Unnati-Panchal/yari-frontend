// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_BASE_URL: 'http://65.1.182.179:8000', // dev
  // API_BASE_URL: 'http://65.1.152.244:8000', // qa
  API_BASE_URL: 'http://localhost:4200',
  thirdPartyVerifyEmail: 'https://verifyemail.invoid.co',
  thirdPartyPanAndGstVerification: 'https://gc.invoid.co',
  invoidAuthKey: '894f3c58-895c-45b5-ab29-9ae00b304d53'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
