/* global setTimeout */
class adsense {
    constructor() {

        let directive = {
            restrict: 'E',
            scope: {},
            template: '',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el) {
            let random = _.random(0, 1000000);
            let html = `<ins class='adsbygoogle' style='display:block;min-height:60px;margin-top:2px;' data-ad-client='ca-pub-7640562161899788' data-ad-slot='7259870550' data-ad-format='auto' data-ad-region='page-${random}'></ins><br>`;
            el.append(html);
            setTimeout(function() {
                let adsbygoogle = window.adsbygoogle || [];
                adsbygoogle.push({});
            }, 0);
        }
    }
}

export default adsense;