function routerConfig($routeProvider) {
    'ngInject';
    $routeProvider
        .when('/', {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl',
        })
        .when('/player/:player/', {
            templateUrl: 'app/player/player.html'
        })
        .when('/analytics/:player/', {
            templateUrl: 'app/analytics/analytics.html',
            controller: 'AnalyticsCtrl',
            controllerAs: 'ctrl'
        })
        .when('/match/:match/', {
            templateUrl: 'app/match/match.html',
            controller: 'MatchCtrl',
            controllerAs: 'ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}

export default routerConfig;