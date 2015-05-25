// @ngInject
var socket = function(socketFactory, BaseUrl) {
    return socketFactory({
        ioSocket: io.connect(BaseUrl.host)
    });
};

export default socket;