class NavbarDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {},
            controller: NavbarController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class NavbarController {
    constructor($location, BookmarkService) {
        'ngInject';

        this.$location = $location;

        let that = this;
        BookmarkService.setupDropdown(function(dropdown){
            that.dropdown = dropdown;
        });
    }
    search() {
        if (this.nick) {
            this.$location.path(`/player/${this.nick}/`);
        }
    }
}

export default NavbarDirective;