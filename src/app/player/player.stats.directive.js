class PlayerStatsDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/player/player.stats.html',
            scope: {},
            controller: PlayerStatsCtrl,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class PlayerStatsCtrl {
    constructor($routeParams, ApiService, $alert, BaseUrl) {
        'ngInject';
        this.BaseUrl = BaseUrl.host;
        
        this.m = $routeParams.mode || 'rnk';
        this.nickname = $routeParams.player;


        ApiService.singlePlayer(this.nickname).success(res => {
            this.s = res;
            if (res.fallback) {
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

export default PlayerStatsDirective;