function config($logProvider, $locationProvider, $numeraljsConfigProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    $numeraljsConfigProvider.setDefaultFormat('0.0 $');
    $locationProvider.html5Mode(true).hashPrefix('!');
}

export default config;