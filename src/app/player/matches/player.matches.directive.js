class PlayerMatchesDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/player/matches/player.matches.html',
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

        this.pulled = [];

        this.activate(ApiService, $alert, $scope, heroData);
    }
    activate(ApiService, $alert, $scope, heroData) {
        ApiService.singlePlayer(this.nickname).success(res => {
            this.account_id = res.account_id;

            ApiService.playerCache(this.account_id, this.m).success(res => {
                this.all = res;
                this.setup(heroData);
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
        for (let obj of this.all) {
            let temp = _.find(obj.players, 'player_id', this.account_id);
            if (temp) {
                temp.date = moment(obj.date).toDate();
                temp.length = obj.length;
                temp.version = obj.version;
                temp.match_id = obj.id;
                this.pulled.push(temp);

                // collect all used heroes
                heroes[temp.hero_id] = {
                    value: temp.hero_id,
                    label: heroData[temp.hero_id].disp_name
                };
                versions.add(obj.version);
            }
        }
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
        for (let n of this.filtered) {
            for (let j of needed) {
               this.averages[j] = (this.averages[j] || 0) + Number(n[j]);
            }
        }
        for (let j of needed) {
           this.averages[j] = this.averages[j] / this.filtered.length;
        }
        this.averages.length = moment.duration(this.averages.length, 'seconds').format();
    }
}

export default PlayerMatchesDirective;