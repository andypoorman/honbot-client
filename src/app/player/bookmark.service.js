class BookmarkService {

    constructor($location, $cookies) {
        'ngInject';
        this.$location = $location;
        this.$cookies = $cookies;
        this.bookmarkedPlayers = $cookies.getObject('bookmarkedPlayers') || [];
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

export default BookmarkService;