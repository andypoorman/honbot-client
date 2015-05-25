// @ngInject
function config($logProvider, $locationProvider, $numeraljsConfigProvider, $cookiesProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    $numeraljsConfigProvider.setDefaultFormat('0.0 $');
    $locationProvider.html5Mode(true).hashPrefix('!');

    $cookiesProvider.defaults.expires = moment().add(99, 'years').toISOString();
}

export default config;