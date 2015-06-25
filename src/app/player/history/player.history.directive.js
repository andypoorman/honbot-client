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
    constructor($routeParams, ApiService, MatchService) {
        'ngInject';

        this.ApiService = ApiService;
        this.MatchService = MatchService;

        this.nickname = $routeParams.player;
        this.mode = $routeParams.mode || 'rnk';

        this.historyPage = 0;
        this.count = 0;
        this.history = [];
        this.mmr_history = [];

        ApiService.singlePlayer(this.nickname).success(res => {
            this.curmmr = res[this.mode + '_amm_team_rating'] || res[this.mode + '_pub_skill'];
            this.account_id = res.account_id;

            // trigger first load of player history
            this.more();
        }).error(() => this.done());
    }
    done() {
        this.nomore = true;
        this.loading = false;
    }
    more() {
        this.loading = true;
        this.historyPage += 1;
        this.ApiService.history(this.nickname, this.mode, this.historyPage).success(res => {
            if (res.length > 0) {
                this.filterMatches(res);
                this.ApiService.saveMatches(res);
            }
            if (res.length < 25) {
                this.loading = false;
                this.nomore = true;
            }
        }).error(() => this.done());
    }
    filterMatches(matches) {
        for (let n of matches) {
            let temp = _.find(n.players, 'player_id', this.account_id);
            if (temp) {
                temp.date = n.date;
                this.history.push(temp);
            }
        }
        this.loading = false;
    }
}

export default PlayerHistoryDirective;