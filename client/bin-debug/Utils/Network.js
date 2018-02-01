var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author redstoone
 *
 */
var Network = (function () {
    function Network(_host, _port) {
        if (_port === void 0) { _port = 80; }
        this.handler = {};
        this.cbConnect = [];
        this.cbClose = [];
        this.cbError = [];
        this.that = this;
        this.state = 0;
        this.host = _host;
        this.port = _port;
        this.socket = io.connect(_host + ":" + _port);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.on('connect', this.onSocketOpen);
        this.socket.on('news', function (data) {
            console.log(data);
        });
        this.socket.on('disconnect', this.onSocketClose);
    }
    Network.prototype.send = function (c, m, data) {
        var obj = {
            "c": c,
            "m": m,
            "data": data
        };
        console.log("send -->", JSON.stringify(obj));
        this.socket.emit('message', JSON.stringify(obj));
    };
    Network.prototype.onSocketOpen = function () {
        console.log("socket.io connected");
        if (that.cbConnect.length > 0) {
            var obj = that.cbConnect[0];
            var func = that.cbConnect[1];
            func.call(obj);
        }
        that.state = 1;
    };
    Network.prototype.onSocketClose = function () {
        console.log("socket.io closed");
        if (that.cbClose.length > 0) {
            var obj = that.cbClose[0];
            var func = that.cbClose[1];
            func.call(obj);
        }
    };
    return Network;
}());
__reflect(Network.prototype, "Network");
