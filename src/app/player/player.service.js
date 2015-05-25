// @ngInject
class PlayerService {
    constructor($location, ModeService, $cookies) {
        this.$location = $location;
        this.m = ModeService.modeNameFromPath;
        this.$cookies = $cookies;
        this.bookmarkedPlayers = $cookies.getObject('bookmarkedPlayers') || [];
    }
    changePage(page, nickname) {
        if (this.m === 'rnk') {
            this.$location.path(`/${page}/${nickname}/`);
        } else if (this.m === 'cs') {
            this.$location.path(`/c/${page}/${nickname}/`);
        } else if (this.m === 'acc') {
            this.$location.path(`/p/${page}/${nickname}/`);
        }
    }
    changeMode(page, newmode, nickname) {
        this.$location.path(`${newmode}${page}/${nickname}/`);
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
        this.saveBookmark();
    }
    saveBookmark() {
        this.$cookies.putObject('bookmarkedPlayers', this.bookmarkedPlayers);
    }
    checkPlayerExists(nickname) {
        return _.includes(this.bookmarkedPlayers, nickname);
    }

}

export default PlayerService;