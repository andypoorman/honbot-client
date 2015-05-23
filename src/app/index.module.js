import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';

import MainCtrl from './main/main.controller';
import NavbarCtrl from './components/navbar/navbar.controller';
import PlayerCtrl from './player/player.controller';
import PlayerService from './player/player.service';
import AnalyticsCtrl from './analytics/analytics.controller';
import HistoryCtrl from './player/history.controller';
import MatchCtrl from './match/match.controller';
import BaseUrl from './services/baseurl';
import ApiService from './services/api.service';
import ModeService from './services/mode.service';
import adsense from '../app/components/adsense/adsense.directive';
import socket from '../app/components/socket/socket.factory';
import largeHero from './largeHero';
import itemList from './itemList';
import heroData from './heroData';

angular.module('client', ['ngRoute', 'mgcrea.ngStrap', 'angularMoment', 'btford.socket-io', 'ngNumeraljs', 'angulartics', 'angulartics.google.analytics'])
    .constant('largeHero', largeHero)
    .constant('itemList', itemList)
    .constant('heroData', heroData)

    .config(config)
    .config(routerConfig)
    .run(runBlock)

    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl)
    .controller('PlayerCtrl', PlayerCtrl)
    .controller('AnalyticsCtrl', AnalyticsCtrl)
    .controller('MatchCtrl', MatchCtrl)
    .controller('HistoryCtrl', HistoryCtrl)
    .factory('socket', socket)
    .service('BaseUrl', BaseUrl)
    .service('ApiService', ApiService)
    .service('ModeService', ModeService)
    .service('PlayerService', PlayerService)
    .directive('adsense', adsense);
    