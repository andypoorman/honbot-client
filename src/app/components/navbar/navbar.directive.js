class NavbarDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {},
            controller: NavbarController,
            controllerAs: 'nav',
            bindToController: true
        };

        return directive;
    }
}

class NavbarController {
    constructor(moment, $location) {
        'ngInject';

        this.$location = $location;
    }
    search() {
        if (this.nick) {
            this.$location.path(`/player/${this.nick}/`);
        }
    }
}

export default NavbarDirective;