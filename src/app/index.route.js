function routerConfig($routeProvider) {
    'ngInject';
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'ctrl'
        })
        .when('/player/:player/', {
            templateUrl: 'app/player/player.overview.html'
        })
        .when('/player/:player/matches/', {
            templateUrl: 'app/player/player.matches.html',
        })
        .when('/player/:player/heroes/', {
            templateUrl: 'app/player/player.heroes.html',
        })
        .when('/player/:player/items/', {
            templateUrl: 'app/player/player.items.html',
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