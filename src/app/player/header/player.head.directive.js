class PlayerHeadDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/player/header/player.head.html',
            scope: {
                page: '='
            },
            controller: PlayerHeadCtrl,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class PlayerHeadCtrl {
    constructor($location, $routeParams, ApiService, BookmarkService) {
        'ngInject';

        this.$location = $location;
        this.nickname = $routeParams.player;
        this.m = $routeParams.mode || 'rnk';
        this.BookmarkService = BookmarkService;

        ApiService.singlePlayer(this.nickname).success(res => {
            this.s = res;
        });
    }
    changePage(page) {
        if(page === 'player'){
            this.$location.path(`/player/${this.nickname}/`);
        } else {
            this.$location.path(`/player/${this.nickname}/${page}/`);
        }
    }
    changeMode(newmode) {
        this.$location.search('mode', newmode);
    }
}

export default PlayerHeadDirective;