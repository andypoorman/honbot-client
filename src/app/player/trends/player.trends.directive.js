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
    activate(ApiService, $alert, $scope, heroData) {
        ApiService.singlePlayer(this.nickname).success(res => {
            this.curmmr = res[this.m + '_amm_team_rating'] || res[this.m + '_pub_skill'];
            this.account_id = res.account_id;

            ApiService.playerCache(this.account_id, this.m).success(res => {
                this.all = res;
                this.setup(heroData);
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
    setup(heroData) {
        let heroes = {};
        let versions = new Set();
        _.forEach(this.all, (obj) => {
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

                // collect all used heroes
                heroes[temp.hero_id] = {
                    value: temp.hero_id,
                    label: heroData[temp.hero_id].disp_name
                };
                versions.add(obj.version);
            }
        });
        this.heroes = _.sortBy(_.values(heroes), 'label');
        this.versions = Array.from(versions);
        this.filter();
    }
    filter() {
        this.filtered = _.filter(this.pulled, (n) => {
            if (this.filterHero(n.hero_id) && this.filterVersion(n.version)) {
                return n;
            }
        });
        this.totals();
    }
    filterVersion(version) {
        if (this.$scope.selectedVersion && this.$scope.selectedVersion.length > 0 && !_.includes(this.$scope.selectedVersion, version)) {
            return false;
        }
        return true;
    }
    filterHero(hero_id) {
        if (this.$scope.selectedHero && this.$scope.selectedHero.length > 0 && !_.includes(this.$scope.selectedHero, hero_id)) {
            return false;
        }
        return true;
    }
    totals() {
        let needed = ['length', 'kills', 'deaths', 'assists', 'cs', 'denies', 'gpm', 'xpm', 'apm', 'wards', 'herodmg', 'bdmg'];
        this.averages = {};
        _.forEach(this.filtered, (n) => {
            _.forEach(needed, (j) => {
                this.averages[j] = (this.averages[j] || 0) + Number(n[j]);
            });
        });
        _.forEach(needed, (j) => {
            this.averages[j] = this.averages[j] / this.filtered.length;
        });
        this.averages.length = moment.duration(this.averages.length, 'seconds').format();
    }
}

export default PlayerTrendsDirective;