class TeamGraph {
    constructor() {

        let directive = {
            restrict: 'A',
            scope: {
                teamtotal: '='
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr) {


            scope.$watch('teamtotal', function() {
                if (!scope.teamtotal) {
                    return;
                }
                let options = {
                    title: attr.title,
                    data: scope.teamtotal,
                    chart_type: 'bar',
                    x_accessor: 'teamname',
                    x_axis: false,
                    y_accessor: attr.id,
                    full_width: true,
                    height: 150,
                    left: 30,
                    bottom: 0,
                    top: 10,
                    right: 0,
                    target: '#' + attr.id,
                    bar_orientation: 'vertical',
                };

                MG.data_graphic(options);
            });

        }
    }
}

export default TeamGraph;