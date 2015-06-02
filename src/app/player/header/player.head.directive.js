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
    constructor($location, $cookies, $routeParams, ApiService) {
        'ngInject';

        this.$location = $location;
        this.nickname = $routeParams.player;
        this.m = $routeParams.mode || 'rnk';
        this.$cookies = $cookies;
        this.bookmarkedPlayers = $cookies.getObject('bookmarkedPlayers') || [];

        ApiService.singlePlayer($routeParams.player).success(res => {
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
    toggleBookmark(nickname) {
        if (this.checkPlayerExists(nickname)) {
            this.bookmarkedPlayers = _.filter(this.bookmarkedPlayers, function(n) {
                if (n !== nickname) {
                    return n;
                }
            });
        } else {
            this.bookmarkedPlayers.unshift(nickname);
        }
        this.$cookies.putObject('bookmarkedPlayers', this.bookmarkedPlayers);
    }
    checkPlayerExists(nickname) {
        return _.includes(this.bookmarkedPlayers, nickname);
    }
}

export default PlayerHeadDirective;