import config from './index.config';

import routerConfig from './index.route';

// runblock not currently used but could be useful
// import runBlock from './index.run';

import HomeCtrl from './home/home.controller';
import ItemCtrl from './item/item.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';
import adsense from '../app/components/adsense/adsense.directive';
import socket from '../app/components/socket/socket.factory';

import PlayerHeadDirective from './player/header/player.head.directive';
import PlayerHistoryDirective from './player/history/player.history.directive';
import PlayerStatsDirective from './player/stats/player.stats.directive';
import PlayerHeroesDirective from './player/heroes/player.heroes.directive';
import PlayerMatchesDirective from './player/matches/player.matches.directive';
import PlayerItemsDirective from './player/items/player.items.directive';
import MatchDirective from './match/match.directive';

import BaseUrl from './services/baseurl';
import ApiService from './services/api.service';
import BookmarkService from './services/bookmark.service';
import largeHero from './largeHero';
import itemList from './itemList';
import heroData from './heroData';

angular.module('client', [
        // requirements
        'ngRoute',
        'ngCookies',
        'mgcrea.ngStrap',
        'angularMoment',
        'btford.socket-io',
        'ngNumeraljs',
        'angulartics',
        'angulartics.google.analytics'
    ])
    .constant('largeHero', largeHero)
    .constant('itemList', itemList)
    .constant('heroData', heroData)

    .config(config)
    .config(routerConfig)
    // .run(runBlock)

    .controller('HomeCtrl', HomeCtrl)
    .controller('ItemCtrl', ItemCtrl)
    .factory('socket', socket)
    .service('BaseUrl', BaseUrl)
    .service('ApiService', ApiService)
    .service('BookmarkService', BookmarkService)
    .directive('adsense', () => new adsense())
    .directive('hbPlayerHistory', () => new PlayerHistoryDirective())
    .directive('hbPlayerHead', () => new PlayerHeadDirective())
    .directive('hbPlayerStats', () => new PlayerStatsDirective())
    .directive('hbPlayerMatches', () => new PlayerMatchesDirective())
    .directive('hbPlayerHeroes', () => new PlayerHeroesDirective())
    .directive('hbPlayerItems', () => new PlayerItemsDirective())
    .directive('hbMatch', () => new MatchDirective())
    .directive('hbNavbar', () => new NavbarDirective());