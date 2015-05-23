class MainCtrl {
    constructor($location, largeHero, ApiService) {
        'ngInject';

        this.apiCount = 0;
        this.success = 0;
        this.failure = 0;
        this.$location = $location;

        // set background image
        var image = largeHero[_.random(0, largeHero.length)];
        this.jumbostyle = {
            'background-image': `url(assets/images/largehero/${image}.png)`
        };

        this.activate(ApiService);
    }

    activate(ApiService) {
        ApiService.apiCalls((res) => {
            if (res.success) {
                this.success += 1;
            }
            if (res.failure) {
                this.failure += 1;
            }
            this.apiCount += 1;
        });

        ApiService.updates((update) => {
            this.updates = update;
        });

        ApiService.counts().success((res) => {
            this.count = res;
            this.apiCount += res.api;
            this.success += res.apiSuccess;
            this.failure += res.apiFail;
        });
    }

    search() {
        if (this.nickname) {
            this.$location.path(`/player/${this.nickname}/`);
        }
    }
}

export default MainCtrl;
