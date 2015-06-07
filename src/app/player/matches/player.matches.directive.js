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
        this.heroData = heroData;

        this.activate(ApiService, $alert, $scope);
    }
    activate(ApiService, $alert, $scope) {
        ApiService.singlePlayer(this.nickname).success(player => {
            this.player = player;
            ApiService.playerCache(player.account_id, this.m).success(res => {
                this.all = res;
                this.setup();
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
    setup() {
        var that = this;
        this.pulled = [];
        let tempheroes = [];
        let tempversions = [];
        _.forEach(this.all, function(obj) {
            let temp = _.find(obj.players, 'player_id', that.player.account_id);
            temp.date = moment(obj.date);
            temp.length = obj.length;
            temp.version = obj.version;
            temp.match_id = obj.id;
            that.pulled.push(temp);
            tempheroes.push({
                value: temp.hero_id,
                label: that.heroData[temp.hero_id].disp_name
            });
            tempversions.push(obj.version);
        });
        this.filter();
        this.heroes = _.chain(tempheroes).uniq('value').sortBy('label').value();
        this.versions = _.chain(tempversions).uniq().value();
    }
    filter() {
        let temp = this.pulled;
        if (this.$scope.selectedHero && this.$scope.selectedHero.length !== 0) {
            let selectedHero = this.$scope.selectedHero;
            temp = _.filter(temp, function(n) {
                if (_.includes(selectedHero, n.hero_id)) {
                    return n;
                }
            });
        }
        if (this.$scope.selectedVersion && this.$scope.selectedVersion.length !== 0) {
            let selectedVersion = this.$scope.selectedVersion;
            temp = _.filter(temp, function(n) {
                if (_.includes(selectedVersion, n.version)) {
                    return n;
                }
            });
        }
        this.filtered = temp;
        this.totals();
    }
    totals() {
        let totals = {};
        _.forEach(this.filtered, function(n) {
            _.forIn(n, function(j, key) {
                if (!totals[key]) {
                    totals[key] = Number(j);
                } else {
                    totals[key] += Number(j);
                }
            });
        });
        let averages = {};
        let matches = this.filtered.length;
        _.forIn(totals, function(val, key) {
            if (angular.isNumber(val)) {
                averages[key] = val / matches;
            }
        });
        this.averages = averages;
        this.averages.length = moment.duration((totals.length / matches), 'seconds').format();
    }
    goMatch(match) {
        this.$location.path(`/match/${match}`);
    }
}

export default PlayerMatchesDirective;