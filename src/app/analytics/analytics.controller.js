'use strict';

class AnalyticsCtrl {
    constructor($routeParams, ApiService, ModeService, $location, $alert, BaseUrl, PlayerService) {
        let vm = this;
        vm.m = ModeService.modeNameFromPath;
        vm.s = {};
        vm.BaseUrl = BaseUrl.host;
        vm.nickname = $routeParams.player;
        vm.page = 'analytics';
        vm.PlayerService = PlayerService;

        ApiService.singlePlayer(vm.nickname).success(res => {
            vm.s = res;
            ApiService.playerCache(vm.s.account_id, vm.m).success(res => {
                vm.all = res;
                crunch();
            });
        }).error((res) => {
            $alert({
                title: 'ERROR:',
                content: res.error,
                placement: 'top',
                container: 'alert',
                type: 'danger',
                show: true
            });
        });

        var crunch = function(start_date, end_date) {
            var result = vm.all;
            vm.res = result;
        };

        
    }
}

AnalyticsCtrl.$inject = ['$routeParams', 'ApiService', 'ModeService', '$location', '$alert', 'BaseUrl', 'PlayerService'];

export default AnalyticsCtrl;