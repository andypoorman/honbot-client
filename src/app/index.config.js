function config($logProvider, $locationProvider, $numeraljsConfigProvider, $cookiesProvider, $sceProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);

    $numeraljsConfigProvider.setDefaultFormat('0.0 $');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $cookiesProvider.defaults.expires = moment().add(99, 'years').toISOString();

    $sceProvider.enabled(false);
}


export default config;