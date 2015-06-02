class MatchCtrl {
    constructor($routeParams, ApiService, heroData, $scope, $alert, itemList) {
        'ngInject';

        let vm = this;

        this.heroData = {};
        this.team1 = {};
        this.team2 = {};
        this.ptips = {};
        this.items = itemList;
        this.matchid = $routeParams.match;
        this.$scope = $scope;

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
            {value: 'gpm', label: 'GPM'},
            {value: 'apm', label: 'APM'},
            {value: 'xpm', label: 'XPM'},
            {value: 'wards', label: 'Wards'},
            {value: 'herodmg', label: 'Hero Damage'},
            {value: 'bdmg', label: 'Kills'},
        ];
        $scope.selectedGraph = vm.options[4];

        _.forEach(heroData, function(n) {
            vm.heroData[_.keys(n)[0]] = n[_.keys(n)[0]];
        });


        this.activate($scope, $alert, ApiService);

    }
    activate($scope, $alert, ApiService) {
        let vm = this;

        ApiService.match(this.matchid, function(res) {
            vm.match = res;
            vm.duration = moment.duration(res.length, 'seconds').format();
            vm.m = vm.modes[res.mode];

            if (res.players) {
                var pids = _.pluck(res.players, 'player_id').join(',');
                ApiService.bulkPlayers(pids).success(res => {
                    _.forEach(res, (n) => {
                        vm.ptips[n.account_id] = n;
                    });
                });
            }

            vm.match.players = _.sortBy(vm.match.players, 'position');
            vm.regraph();
            vm.teamtotals();
        }, function() {
            $alert({
                title: 'ERROR:',
                content: 'Match not available. Try again maybe later.',
                placement: 'top',
                container: 'alert',
                type: 'danger',
                show: true
            });
        });

        $scope.$watch('selectedGraph', function(newval, oldval) {
            if (newval !== oldval && vm.match) {
                vm.regraph();
            }
        });

    }
    regraph() {
        let options = {
            title: this.$scope.selectedGraph.label,
            data: this.match.players,
            chart_type: 'bar',
            x_accessor: 'nickname',
            y_accessor: this.$scope.selectedGraph.value,
            full_width: true,
            height: 350,
            left: 30,
            top: 10,
            right: 0,
            target: '#graph',
            bar_orientation: 'vertical',
        };
        MG.data_graphic(options);
    }
    teamtotals() {
        let vm = this;
        _.forEach(vm.match.players, function(n) {
            _.forEach(n, function(j, key) {
                if (!vm[`team${n.team}`][key]) {
                    vm[`team${n.team}`][key] = Number(j);
                } else {
                    vm[`team${n.team}`][key] += Number(j);
                }
            });
        });
    }
}

export default MatchCtrl;