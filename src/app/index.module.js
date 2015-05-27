import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';

import MainCtrl from './main/main.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';
import PlayerHistoryDirective from './player/player.history.directive';
import BookmarkService from './player/bookmark.service';
import PlayerHeadDirective from './player/player.head.directive';
import PlayerStatsDirective from './player/player.stats.directive';
import AnalyticsCtrl from './analytics/analytics.controller';
import MatchCtrl from './match/match.controller';
import BaseUrl from './services/baseurl';
import ApiService from './services/api.service';
import adsense from '../app/components/adsense/adsense.directive';
import socket from '../app/components/socket/socket.factory';
import largeHero from './largeHero';
import itemList from './itemList';
import heroData from './heroData';

angular.module('client', ['ngRoute', 'ngCookies', 'mgcrea.ngStrap', 'angularMoment', 'btford.socket-io', 'ngNumeraljs', 'angulartics', 'angulartics.google.analytics'])
    .constant('largeHero', largeHero)
    .constant('itemList', itemList)
    .constant('heroData', heroData)

    .config(config)
    .config(routerConfig)
    .run(runBlock)

    .controller('MainCtrl', MainCtrl)
    .controller('AnalyticsCtrl', AnalyticsCtrl)
    .controller('MatchCtrl', MatchCtrl)
    .factory('socket', socket)
    .service('BaseUrl', BaseUrl)
    .service('ApiService', ApiService)
    .service('BookmarkService', BookmarkService)
    .directive('adsense', () => new adsense())
    .directive('playerHistory', () => new PlayerHistoryDirective())
    .directive('playerHead', () => new PlayerHeadDirective())
    .directive('playerStats', () => new PlayerStatsDirective())
    .directive('navbar', () => new NavbarDirective());
