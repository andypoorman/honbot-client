function routerConfig($routeProvider) {
    'ngInject';
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'ctrl'
        })
        .when('/player/:player/', {
            templateUrl: 'app/player/views/player.overview.html'
        })
        .when('/player/:player/matches/', {
            templateUrl: 'app/player/views/player.matches.html',
        })
        .when('/player/:player/heroes/', {
            templateUrl: 'app/player/views/player.heroes.html',
        })
        .when('/player/:player/items/', {
            templateUrl: 'app/player/views/player.items.html',
        })
        .when('/player/:player/trends/', {
            templateUrl: 'app/player/views/player.trends.html',
        })
        .when('/match/:match/', {
            templateUrl: 'app/match/match.view.html',
        })
        .when('/item/:item/', {
            templateUrl: 'app/item/item.html',
            controller: 'ItemCtrl',
            controllerAs: 'ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}

export default routerConfig;