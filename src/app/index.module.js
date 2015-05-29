import config from './index.config';

import routerConfig from './index.route';

// runblock not currently used but could be useful
// import runBlock from './index.run';

import HomeCtrl from './home/home.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';
import adsense from '../app/components/adsense/adsense.directive';
import socket from '../app/components/socket/socket.factory';

import PlayerHistoryDirective from './player/history/player.history.directive';
import PlayerHeadDirective from './player/header/player.head.directive';
import PlayerStatsDirective from './player/stats/player.stats.directive';
import MatchCtrl from './match/match.controller';

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
    // runblock not currently used but could be useful
    // .run(runBlock)

    .controller('HomeCtrl', HomeCtrl)
    .controller('MatchCtrl', MatchCtrl)
    .factory('socket', socket)
    .service('BaseUrl', BaseUrl)
    .service('ApiService', ApiService)
    .service('BookmarkService', BookmarkService)
    .directive('adsense', () => new adsense())
    .directive('hbPlayerHistory', () => new PlayerHistoryDirective())
    .directive('hbPlayerHead', () => new PlayerHeadDirective())
    .directive('hbPlayerStats', () => new PlayerStatsDirective())
    .directive('hbNavbar', () => new NavbarDirective());