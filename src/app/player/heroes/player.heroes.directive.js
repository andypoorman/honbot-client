class PlayerHeroesDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/player/heroes/player.heroes.html',
            scope: {},
            controller: PlayerHeroesCtrl,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class PlayerHeroesCtrl {
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
                this.filter();
                this.filtersetup();
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
    filtersetup(){
        let tempversions = [];
        _.forEach(this.all, function(obj) {
            tempversions.push(obj.version);
        });
        this.versions = _.uniq(tempversions);
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
        this.filtered = temp;
        this.setup();
    }
    calculate(){
        
    }
    setup() {
        let tempHeroes = [];
        let pid = this.player.account_id;

        // totals
        _.forEach(this.filtered, function(obj) {
            let temp = _.find(obj.players, 'player_id', pid);
            let s = (tempHeroes[temp.hero_id])? tempHeroes[temp.hero_id] : tempHeroes[temp.hero_id] = {};
            s.games = s.games + 1 || 1;
            s.hero_id = temp.hero_id;
            s.win = s.win + Number(temp.win) || Number(temp.win);
            s.kills = s.kills + temp.kills || temp.kills;
            s.deaths = s.deaths + temp.deaths || temp.deaths;
            s.assists = s.assists + temp.assists || temp.assists;
            s.gpm = s.gpm + Number(temp.gpm) || Number(temp.gpm);
            s.apm = s.apm + Number(temp.apm) || Number(temp.apm);
            s.xpm = s.xpm + Number(temp.xpm) || Number(temp.xpm);
        });
        tempHeroes = _.compact(tempHeroes);

        // averages
        _.forEach(tempHeroes, function(obj){
            obj.avgDeaths = obj.deaths / obj.games;
            obj.avgKills = obj.kills / obj.games;
            obj.avgAssists = obj.assists / obj.games;
            obj.avgGPM = obj.gpm / obj.games;
            obj.avgAPM = obj.apm / obj.games;
            obj.avgXPM = obj.xpm / obj.games;
            obj.kdr = obj.kills / obj.deaths;
            obj.kda = (obj.kills + obj.assists) / obj.deaths;
        });
        this.heroes = _.compact(tempHeroes);
    }
    goMatch(match) {
        this.$location.path(`/match/${match}`);
    }
}

export default PlayerHeroesDirective;