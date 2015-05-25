// @ngInject
class NavbarDirective {
    constructor() {

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

// @ngInject
class NavbarController {
    constructor(moment, $location) {

        this.$location = $location;
    }
    search() {
        if (this.nick) {
            this.$location.path(`/player/${this.nick}/`);
        }
    }
}

export default NavbarDirective;