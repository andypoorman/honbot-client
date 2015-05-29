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
    constructor($location, $cookies, $routeParams, ApiService, $alert) {
        'ngInject';

        this.m = $routeParams.mode || 'rnk';
        this.nickname = $routeParams.player;

        this.activate(ApiService, $alert);
    }
    activate(ApiService, $alert) {
        ApiService.singlePlayer(this.nickname).success(player => {
            this.player = player;
            ApiService.playerCache(player.account_id, this.m).success(res => {
                this.all = res;
                this.setup();
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
    }
    setup() {
        var that = this;
        that.pulled = [];
        angular.forEach(this.all, function(obj) {
            let temp = _.find(obj.players, 'player_id', that.player.account_id);
            temp.date = moment(obj.date);
            temp.length = obj.length;
            temp.version = obj.version;
            that.pulled.push(temp);
        });
        that.filter();
    }
    filter() {
        this.filtered = this.pulled;
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
}

export default PlayerMatchesDirective;