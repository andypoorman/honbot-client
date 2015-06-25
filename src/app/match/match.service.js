class MatchService {
    constructor($window, $location) {
        'ngInject';

        this.$window = $window;
        this.$location = $location;

    }
    goMatch(matchId, event) {
        // handle open in new tab
        if ((event.which === 1 && (event.metaKey || event.ctrlKey)) || event.which === 2) {
            this.$window.open(`/match/${matchId}/`, '_blank');
        } else {
            this.$location.path(`/match/${matchId}/`);
        }
    }
}

export default MatchService;