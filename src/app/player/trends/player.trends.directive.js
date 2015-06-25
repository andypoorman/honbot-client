class PlayerTrendsDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/player/trends/player.trends.html',
            scope: {},
            controller: PlayerMatchesCtrl,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class PlayerMatchesCtrl {
    constructor($routeParams, ApiService, $alert, heroData, $scope, MatchService) {
        'ngInject';

        this.MatchService = MatchService;
        this.$scope = $scope;

        this.m = $routeParams.mode || 'rnk';
        this.nickname = $routeParams.player;

        this.count = 0;
        this.pulled = [];
        this.mmr_history = [];

        this.activate(ApiService, $alert, $scope, heroData);
    }
    activate(ApiService, $alert, $scope) {
        ApiService.singlePlayer(this.nickname).success(res => {
            this.curmmr = res[this.m + '_amm_team_rating'] || res[this.m + '_pub_skill'];
            this.account_id = res.account_id;

            ApiService.playerCache(this.account_id, this.m).success(res => {
                this.all = res;
                this.setup();
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
                    height: 300,
                    target: '#mmr',
                    min_y: _.min(this.mmr_history, 'mmr').mmr,
                    max_y: _.max(this.mmr_history, 'mmr').mmr,
                    yax_count: 10,
                    area: false,
                    yax_format: d3.format('')
                };
                MG.data_graphic(options);
                this.issetup = true;
            });
        });

        $scope.$watchGroup(['selectedHero', 'selectedVersion'], () => {
            if (this.issetup) {
                this.filter();
            }
        });
    }
    setup() {
        for (let obj of this.all) {
            let temp = _.find(obj.players, 'player_id', this.account_id);
            if (temp) {
                temp.date = moment(obj.date).toDate();
                temp.length = obj.length;
                temp.version = obj.version;
                temp.match_id = obj.id;
                this.pulled.push(temp);

                // setup graph of mmr history
                this.mmr_history.push({
                    games_ago: this.count,
                    mmr: this.curmmr
                });
                this.curmmr -= temp.mmr_change;
                this.count--;
            }
        }
    }
}

export default PlayerTrendsDirective;