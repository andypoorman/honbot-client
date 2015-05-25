var socket = function(socketFactory, BaseUrl) {
    'ngInject';
    return socketFactory({
        ioSocket: io.connect(BaseUrl.host)
    });
};

export default socket;