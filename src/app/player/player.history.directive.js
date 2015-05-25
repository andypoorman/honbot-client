// @ngInject
class PlayerHistoryDirective {
    constructor() {

        let directive = {
            restrict: 'E',
            templateUrl: 'app/player/player.history.html',
            controller: HistoryCtrl,
            controllerAs: 'hist',
        };

        return directive;
    }
}

// @ngInject
class HistoryCtrl {
    constructor($routeParams, ApiService, ModeService, $location) {
        this.mode = ModeService.modeNameFromPath;
        this.$location = $location;
        this.ApiService = ApiService;

        this.nickname = $routeParams.player;
        this.historyPage = 0;
        this.history = [];

        // trigger first load of player history
        this.more();
    }
    goMatch(match) {
        this.$location.path(`/match/${match}`);
    }
    more() {
        this.loading = true;
        this.historyPage += 1;
        this.ApiService.history(this.nickname, this.mode, this.historyPage).success(res => {
            if (res.matches.length > 0) {
                this.filterMatches(res.matches, res.account_id);
            }
            if (res.matches.length < 25) {
                this.loading = false;
                this.nomore = true;
            }
            this.ApiService.saveMatches(res.matches);
        }).error(function() {
            this.nomore = true;
            this.loading = false;
        });
    }
    filterMatches(matches, account_id) {
        angular.forEach(matches, (n) => {
            var temp = _.find(n.players, 'player_id', account_id);
            temp.date = n.date;
            this.history.push(temp);
        });
        this.loading = false;
    }
}

export default PlayerHistoryDirective;