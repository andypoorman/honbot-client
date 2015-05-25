class BaseUrl {
    constructor($location) {
        'ngInject';
        if ($location.host() === 'localhost') {
            this.host = '//localhost:5000';
        } else {
            this.host = '//api.honbot.com';
        }
    }
}

export default BaseUrl;