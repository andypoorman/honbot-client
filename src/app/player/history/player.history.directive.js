class PlayerHistoryDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/player/history/player.history.html',
            scope: {},
            controller: HistoryCtrl,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class HistoryCtrl {
    constructor($routeParams, ApiService, $location) {
        'ngInject';

        this.$location = $location;
        this.ApiService = ApiService;

        this.nickname = $routeParams.player;
        this.mode = $routeParams.mode || 'rnk';

        this.historyPage = 0;

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
            if (res.length > 0) {
                this.filterMatches(res, this.nickname);
            }
            if (res.length < 25) {
                this.loading = false;
                this.nomore = true;
            }
            this.ApiService.saveMatches(res);
        }).error(function() {
            this.nomore = true;
            this.loading = false;
        });
    }
    filterMatches(matches, nickname) {
        let history = this.history || [];
        _.forEach(matches, (n) => {
            let temp = _.find(n.players, function(n){
                return n.nickname && nickname.toLowerCase() === n.nickname.toLowerCase();
            });
            if(temp){
                temp.date = n.date;
                history.push(temp);
            }
        });
        this.history = history;
        this.loading = false;
    }
}

export default PlayerHistoryDirective;