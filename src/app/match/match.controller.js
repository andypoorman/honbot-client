'use strict';

class MatchCtrl {
    constructor($routeParams, ApiService, heroData, BaseUrl, $scope, $alert, itemList) {
        let vm = this;

        vm.BaseUrl = BaseUrl.host;
        vm.heroData = {};
        vm.team1 = {};
        vm.team2 = {};
        vm.ptips = {};
        vm.items = itemList;

        var modes = {
            1: 'rnk',
            2: 'cs',
            3: 'acc'
        };

        vm.options = [
            {value: 'kills', label: 'Kills'},
            {value: 'deaths', label: 'Deaths'},
            {value: 'assists', label: 'Assists'},
            {value: 'kdr', label: 'KDR'},
            {value: 'cs', label: 'CS'},
            {value: 'gpm', label: 'GPM'},
            {value: 'apm', label: 'APM'},
            {value: 'xpm', label: 'XPM'},
            {value: 'wards', label: 'Wards'},
            {value: 'herodmg', label: 'Hero Damage'},
            {value: 'bdmg', label: 'Kills'},
        ];
        $scope.selectedGraph = vm.options[5];

        _.forEach(heroData, function(n) {
            vm.heroData[_.keys(n)[0]] = n[_.keys(n)[0]];
        });

        var regraph = function(){
            MG.data_graphic({
                title: $scope.selectedGraph.label,
                data: vm.match.players,
                chart_type: 'bar',
                x_accessor: 'nickname',
                y_accessor: $scope.selectedGraph.value,
                full_width: true,
                height: 350,
                left: 30,
                top: 10,
                right: 0,
                target: '#graph',
                bar_orientation: 'vertical',
            });
        };

        var teamtotals = function(){
            // Loops over every property of every player and creates team totals
            _.forEach(vm.match.players, function(n) {
                _.forEach(n, function(j, key) {
                    if (!vm[`team${n.team}`][key]) {
                        vm[`team${n.team}`][key] = Number(j);
                    } else {
                        vm[`team${n.team}`][key] += Number(j);
                    }
                });
            });
        };

        ApiService.match($routeParams.match, function(res){
            vm.match = res;
            vm.duration = moment.duration(res.length, 'seconds').format();
            vm.m = modes[res.mode];

            if(res.players){
                var pids = _.pluck(res.players, 'player_id').join(',');
                ApiService.bulkPlayers(pids).success(res => {
                    _.forEach(res, (n) => {
                        vm.ptips[n.account_id] = n;
                    });
                });
            }
            
            vm.match.players = _.sortBy(vm.match.players, 'position');
            regraph();
            teamtotals();
        }, function(){
            $alert({
                title: 'ERROR:',
                content: 'Match not available. Try again maybe later.',
                placement: 'top',
                container: 'alert',
                type: 'danger',
                show: true
            });
        });

        $scope.$watch('selectedGraph', function(newval, oldval){
            if(newval !== oldval && vm.match){
                regraph();
            }
        });

    }
}

MatchCtrl.$inject = ['$routeParams', 'ApiService', 'heroData', 'BaseUrl', '$scope', '$alert', 'itemList'];

export default MatchCtrl;