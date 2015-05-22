'use strict';

class PlayerService {

    constructor($location, ModeService) {
        this.$location = $location;
        this.m = ModeService.modeNameFromPath;
    }
    changePage(page, nickname) {
        if (this.m === 'rnk') {
            this.$location.path(`/${page}/${nickname}/`);
        } else if (this.m === 'cs') {
            this.$location.path(`/c/${page}/${nickname}/`);
        } else if (this.m === 'acc') {
            this.$location.path(`/p/${page}/${nickname}/`);
        }
    }
    changeMode(page, newmode, nickname) {
        this.$location.path(`${newmode}${page}/${nickname}/`);
    }
    
}

PlayerService.$inject = ['$location', 'ModeService'];

export default PlayerService;