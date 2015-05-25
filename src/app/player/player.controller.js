class PlayerCtrl {
    constructor($routeParams, ApiService, ModeService, $alert, BaseUrl, PlayerService) {
        'ngInject';
        this.m = ModeService.modeNameFromPath;
        this.s = {};
        this.BaseUrl = BaseUrl.host;
        this.nickname = $routeParams.player;
        this.page = 'player';
        this.PlayerService = PlayerService;


        ApiService.singlePlayer(this.nickname).success(res => {
            this.s = res;
            if (this.s.fallback) {
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
    bookmark() {

    }
}

export default PlayerCtrl;