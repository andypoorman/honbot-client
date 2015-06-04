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

        let that = this;
        this.heroData = [];
        _.forEach(heroData, function(n) {
            that.heroData[_.keys(n)[0]] = n[_.keys(n)[0]];
        });

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
        }).error((res) => {
            $alert({
                title: 'ERROR:',
                content: res.error,
                placement: 'top',
                container: 'alert',
                type: 'danger',
                show: true
            });
        });

        let that = this;
        $scope.$watch('selectedHero', function() {
            if (that.issetup) {
                that.filter();
            }
        });
    }
    setup() {
        var that = this;
        that.pulled = [];
        that.heroes = [];
        _.forEach(this.all, function(obj) {
            let temp = _.find(obj.players, 'player_id', that.player.account_id);
            temp.date = moment(obj.date);
            temp.length = obj.length;
            temp.version = obj.version;
            temp.match_id = obj.id;
            that.pulled.push(temp);
            that.heroes.push({
                value: temp.hero_id,
                label: that.heroData[temp.hero_id].disp_name
            });
        });
        that.heroes = _.chain(that.heroes).uniq('value').sortBy('label').value();
        that.filter();
    }
    filter() {
        let that = this;
        let temp = this.pulled;
        temp = _.filter(temp, function(n) {
            if(!that.$scope.selectedHero || that.$scope.selectedHero.length == 0){
                return n;
            }
            if (_.includes(that.$scope.selectedHero, n.hero_id)) {
                return n;
            }
        });
        this.filtered = temp;
        console.log(temp);
        this.totals();
    }
    totals() {
        var that = this;
        var totals = {};
        _.forEach(that.filtered, function(n) {
            _.forIn(n, function(j, key) {
                if (!totals[key]) {
                    totals[key] = Number(j);
                } else {
                    totals[key] += Number(j);
                }
            });
        });
        that.averages = {};
        _.forIn(totals, function(val, key) {
            if (angular.isNumber(val)) {
                that.averages[key] = val / that.filtered.length;
            }
        });
        that.averages.length = moment.duration((totals.length / that.filtered.length), 'seconds').format();
    }
    goMatch(match) {
        this.$location.path(`/match/${match}`);
    }
}

export default PlayerMatchesDirective;