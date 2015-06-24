class MatchDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/match/match.html',
            scope: {},
            controller: MatchCtrl,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class MatchCtrl {
    constructor($routeParams, ApiService, heroData, $scope, $alert, itemList) {
        'ngInject';

        this.heroData = {};
        this.t1Win = 0;
        this.t2Win = 0;
        this.ptips = {};
        this.items = itemList;
        this.matchid = $routeParams.match;
        this.$scope = $scope;
        this.heroData = heroData;

        this.modes = {
            1: 'rnk',
            2: 'cs',
            3: 'acc'
        };
        this.options = [
            {value: 'kills', label: 'Kills'},
            {value: 'deaths', label: 'Deaths'},
            {value: 'assists', label: 'Assists'},
            {value: 'cs', label: 'CS'},
            {value: 'denies', label: 'CD'},
            {value: 'gpm', label: 'GPM'},
            {value: 'apm', label: 'APM'},
            {value: 'xpm', label: 'XPM'},
            {value: 'wards', label: 'Wards'},
            {value: 'herodmg', label: 'Hero Damage'},
            {value: 'bdmg', label: 'Building DMG'},
            {value: 'level', label: 'Level'},
        ];
        $scope.selectedGraph = this.options[5];


        this.activate($scope, $alert, ApiService);

    }
    activate($scope, $alert, ApiService) {
        ApiService.match(this.matchid, res => {
            this.match = res;
            this.duration = moment.duration(res.length, 'seconds').format();
            this.m = this.modes[res.mode];

            if (res.players) {
                var pids = _.pluck(res.players, 'player_id').join(',');
                ApiService.bulkPlayers(pids).success(res => {
                    _.forEach(res, (n) => {
                        this.ptips[n.account_id] = n;
                    });
                });
            }

            this.match.players = _.sortBy(this.match.players, 'position');
            this.teamtotals();
            this.regraph();
        }, () => {
            $alert({
                title: 'ERROR:',
                content: 'Match not available. Try again maybe later.',
                placement: 'top',
                container: 'alert',
                type: 'danger',
                show: true
            });
        });

        $scope.$watch('selectedGraph', (newval, oldval) => {
            if (newval !== oldval && this.match) {
                this.regraph();
            }
        });

    }
    regraph() {
        // players graph
        let options = {
            title: '',
            data: this.match.players,
            chart_type: 'bar',
            x_accessor: 'nickname',
            y_accessor: this.$scope.selectedGraph.value,
            full_width: true,
            height: 400,
            left: 30,
            top: 10,
            right: 5,
            target: '#graph',
            bar_orientation: 'vertical',
        };
        MG.data_graphic(options);
    }
    teamtotals() {
        this.teamtotal = [{teamname: 'Legion'}, {teamname: 'Hellborne'}];
        _.forEach(this.match.players, n => {
            _.forEach(this.options, j => {
                this.teamtotal[n.team-1][j.value] = (this.teamtotal[n.team-1][j.value] || 0) + Number(n[j.value]);
            });
            this[`t${n.team}Win`] += n.win;
        });
    }
}

export default MatchDirective;