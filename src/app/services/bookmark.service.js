class BookmarkService {

    constructor($location, $cookies) {
        'ngInject';
        this.$location = $location;
        this.$cookies = $cookies;
        this.bookmarkedPlayers = $cookies.getObject('bookmarkedPlayers') || [];

        this.dropdown = this.setupDropdown();
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
        this.setupDropdown(this.dropdownCallback);
    }
    saveBookmark() {
        this.$cookies.putObject('bookmarkedPlayers', this.bookmarkedPlayers);
    }
    checkPlayerExists(nickname) {
        return _.includes(this.bookmarkedPlayers, nickname);
    }
    setupDropdown(callback) {
        let dropdown = _.map(this.bookmarkedPlayers, function(n) {
            return {
                text: n,
                href: `/player/${n}/`
            };
        });
        this.dropdownCallback = callback || angular.noop;
        this.dropdownCallback(dropdown);
    }

}

export default BookmarkService;