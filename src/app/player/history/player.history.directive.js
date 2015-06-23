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
    goMatch(match) {
        this.$location.path(`/match/${match}`);
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
                let options = {
                    title: '',
                    data: this.mmr_history,
                    x_accessor: 'games_ago',
                    y_accessor: 'mmr',
                    full_width: true,
                    x_axis: false,
                    bottom: 0,
                    top: 15,
                    right: 5,
                    left: 38,
                    height: 200,
                    target: '#mmr',
                    min_y: _.min(this.mmr_history, 'mmr').mmr,
                    max_y: _.max(this.mmr_history, 'mmr').mmr,
                    area: false,
                    yax_format: d3.format('')
                };
                MG.data_graphic(options);
                this.ApiService.saveMatches(res);
            }
            if (res.length < 25) {
                this.loading = false;
                this.nomore = true;
            }
        }).error(() => this.done());
    }
    filterMatches(matches) {
        let vm = this;
        _.forEach(matches, (n) => {
            let temp = _.find(n.players, n => n.player_id === vm.account_id);
            if (temp) {
                temp.date = n.date;
                vm.history.push(temp);
                vm.mmr_history.push({
                    games_ago: vm.count,
                    mmr: vm.curmmr
                });
                vm.curmmr -= temp.mmr_change;
                vm.count--;
            }
        });
        this.loading = false;
    }
}

export default PlayerHistoryDirective;