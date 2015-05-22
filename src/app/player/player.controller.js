'use strict';

class PlayerCtrl {
    constructor($routeParams, ApiService, ModeService, $location, $alert, BaseUrl, PlayerService) {
        let vm = this;
        vm.m = ModeService.modeNameFromPath;
        vm.s = {};
        vm.BaseUrl = BaseUrl.host;
        vm.nickname = $routeParams.player;
        vm.page = 'player';
        vm.PlayerService = PlayerService;

        ApiService.singlePlayer(vm.nickname).success(res => {
            vm.s = res;
            if (vm.s.fallback) {
                $alert({
                    title: 'Warning:',
                    content: 'Stats failed to update. This could be because the HoN api is currently busy or down.',
                    placement: 'top',
                    container: 'alert',
                    type: 'warning',
                    show: true
                });
            }
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
    }
}

PlayerCtrl.$inject = ['$routeParams', 'ApiService', 'ModeService', '$location', '$alert', 'BaseUrl', 'PlayerService'];

export default PlayerCtrl;