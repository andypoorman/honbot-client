class PlayerItemsDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/player/items/player.items.html',
            scope: {},
            controller: PlayerItemsCtrl,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class PlayerItemsCtrl {
    constructor($location, $routeParams, ApiService, $alert, heroData, $scope) {
        'ngInject';

        this.m = $routeParams.mode || 'rnk';
        this.nickname = $routeParams.player;
        this.$location = $location;
        this.$scope = $scope;
        this.heroData = heroData;

        this.durations = [{value: 0, label: 'Any'},{value: 600, label: '> 10 min'}, {value: 900, label: '> 15 min'},  {value: 1800, label: '> 30 min'},  {value: 2400, label: '> 40 min'}];

        this.activate(ApiService, $alert, $scope);
    }
    activate(ApiService, $alert, $scope) {
        ApiService.singlePlayer(this.nickname).success(player => {
            this.player = player;
            ApiService.playerCache(player.account_id, this.m).success(res => {
                this.all = res;
                this.filter();
                this.filtersetup();
                this.issetup = true;
            });
        });

        let that = this;
        $scope.$watchGroup(['selectedDuration', 'selectedVersion'], function() {
            if (that.issetup) {
                that.filter();
            }
        });
    }
    filtersetup(){
        let tempversions = new Set();
        for (let obj of this.all) {
            tempversions.add(obj.version);
        }
        this.versions = Array.from(tempversions);
    }
    filter() {
        let temp = this.all;
        if (this.$scope.selectedVersion && this.$scope.selectedVersion.length !== 0) {
            let selectedVersion = this.$scope.selectedVersion;
            temp = _.filter(temp, function(n) {
                if (_.includes(selectedVersion, n.version)) {
                    return n;
                }
            });
        }
        if (this.$scope.selectedDuration && this.$scope.selectedDuration.length !== 0) {
            let selectedDuration = this.$scope.selectedDuration;
            temp = _.filter(temp, function(n) {
                if (selectedDuration.value < n.length) {
                    return n;
                }
            });
        }
        this.filtered = temp;
        this.setup();
    }
    setup() {
        let tempItems = [];
        let pid = this.player.account_id;

        // totals
        for (let obj of this.filtered) {
            let temp = _.find(obj.players, 'player_id', pid);
            for (let item of _.uniq(temp.items)) {
                let s = (tempItems[item])? tempItems[item] : tempItems[item] = {};
                s.item_id = item;
                s.games = s.games + 1 || 1;
                s.win = s.win + Number(temp.win) || Number(temp.win);
                s.kills = s.kills + temp.kills || temp.kills;
                s.deaths = s.deaths + temp.deaths || temp.deaths;
                s.assists = s.assists + temp.assists || temp.assists;
                s.gpm = s.gpm + Number(temp.gpm) || Number(temp.gpm);
                s.apm = s.apm + Number(temp.apm) || Number(temp.apm);
                s.xpm = s.xpm + Number(temp.xpm) || Number(temp.xpm);
            }
        }
        tempItems = _.compact(tempItems);

        // averages
        for (let obj of tempItems) {
            obj.avgDeaths = obj.deaths / obj.games;
            obj.avgKills = obj.kills / obj.games;
            obj.avgAssists = obj.assists / obj.games;
            obj.avgGPM = obj.gpm / obj.games;
            obj.avgAPM = obj.apm / obj.games;
            obj.avgXPM = obj.xpm / obj.games;
            obj.kdr = obj.kills / obj.deaths;
            obj.kda = (obj.kills + obj.assists) / obj.deaths;
        }
        this.items = tempItems;
    }
    goMatch(match) {
        this.$location.path(`/match/${match}`);
    }
}

export default PlayerItemsDirective;