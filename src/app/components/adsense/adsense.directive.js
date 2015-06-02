class adsense {
    constructor() {

        let directive = {
            restrict: 'E',
            scope: {},
            template: '',
            link: linkFunc,
            controller: AdsenseController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, vm) {
            vm.$timeout(function() {
                let html = `<ins class='adsbygoogle' style='display:block' data-ad-client='ca-pub-7640562161899788' data-ad-slot='7259870550' data-ad-format='auto' data-ad-region='page-${vm.random}'></ins><br>`;
                el.append(html);
                let adsbygoogle = window.adsbygoogle || [];
                adsbygoogle.push({});
            }, 250, false);
        }
    }
}

class AdsenseController {
    constructor($timeout) {
        'ngInject';

        this.$timeout = $timeout;
        this.random = Math.random();
    }
}

export default adsense;