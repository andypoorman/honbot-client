/* global setTimeout */
class adsense {
    constructor() {

        let directive = {
            restrict: 'E',
            scope: {},
            template: `<div style="padding-bottom:8px;"><ins class='adsbygoogle' style='display:block;min-height:60px;min-width:200px;margin-top:2px;' data-ad-client='ca-pub-7640562161899788' data-ad-slot='7259870550' data-ad-format='auto' data-ad-region='page-{{ ::ctrl.random }}'></ins></div>`,
            controller: AdsenseController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }
}

class AdsenseController {
    constructor() {
        this.random = Math.floor(Math.random() * 100000) + 1;
        setTimeout(function() {
            let adsbygoogle = window.adsbygoogle || [];
            adsbygoogle.push({});
        }, 10);
    }
}

export default adsense;