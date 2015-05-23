class NavbarCtrl {
    constructor($location) {
        'ngInject';
        let vm = this;

        vm.search = function() {
            if (vm.nick) {
                $location.path(`/player/${vm.nick}/`);
            }
        };
    }
}

export default NavbarCtrl;