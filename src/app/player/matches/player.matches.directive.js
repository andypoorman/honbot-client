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
    constructor($location, $routeParams, ApiService, $alert, heroData, $scope) {
        'ngInject';

        this.m = $routeParams.mode || 'rnk';
        this.nickname = $routeParams.player;
        this.$location = $location;
        this.$scope = $scope;

        this.activate(ApiService, $alert, $scope, heroData);
    }
    activate(ApiService, $alert, $scope, heroData) {
        ApiService.singlePlayer(this.nickname).success(player => {
            this.player = player;
            ApiService.playerCache(player.account_id, this.m).success(res => {
                this.all = res;
                this.setup(heroData);
                this.issetup = true;
            });
        });

        let that = this;
        $scope.$watchGroup(['selectedHero', 'selectedVersion'], function() {
            if (that.issetup) {
                that.filter();
            }
        });
    }
    setup(heroData) {
        let that = this;
        let pulled = [];
        let heroes = {};
        let versions = {};
        let allItems = {};
        _.forEach(this.all, function(obj) {
            let temp = _.find(obj.players, 'player_id', that.player.account_id);
            if (temp) {
                temp.date = moment(obj.date).toDate();
                temp.length = obj.length;
                temp.version = obj.version;
                temp.match_id = obj.id;
                pulled.push(temp);

                // collect all used heroes
                heroes[temp.hero_id] = {
                    value: temp.hero_id,
                    label: heroData[temp.hero_id].disp_name
                };
                versions[obj.version] = true;
            }
        });
        this.pulled = pulled;
        this.filter();
        this.heroes = _.sortBy(_.values(heroes), 'label');
        this.versions = _.values(versions);
        this.allItems = _.values(allItems);
    }
    filter() {
        let that = this;
        this.filtered = _.filter(this.pulled, function(n) {
            if (that.filterHero(n.hero_id) && that.filterVersion(n.version)) {
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
        let that = this;
        that.averages = {};
        _.forEach(needed, function(j) {
            that.averages[j] = 0;
        });
        _.forEach(this.filtered, function(n) {
            _.forEach(needed, function(j) {
                that.averages[j] += n[j];
            });
        });
        _.forEach(needed, function(j) {
            that.averages[j] = that.averages[j] / that.filtered.length;
        });
        this.averages.length = moment.duration(this.averages.length, 'seconds').format();
    }
    goMatch(match) {
        this.$location.path(`/match/${match}`);
    }
}

export default PlayerMatchesDirective;