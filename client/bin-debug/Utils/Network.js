var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author redstoone
 *
 */
var _this = null;
var Network = (function () {
    function Network(_path, _queryStr) {
        var _this = this;
        this.handler = {};
        this.cbConnect = [];
        this.cbClose = [];
        this.cbError = [];
        this.alertView = null;
        Network.instance = this;
        //初始化alert
        this.alertView = new Alert();
        this.alertView.horizontalCenter = 0;
        this.alertView.verticalCenter = 0;
        this.connect(_path, _queryStr);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.on('connect', this.onSocketConnect);
        this.socket.on('connect_failed', this.onSocketConnectFailed);
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.on('news', (function (data) {
            _this.onSocketData(data);
        }));
        //添加异常侦听，出现异常会调用此方法
        this.socket.on('error', (function (data) {
            _this.onSocketError(data);
        }));
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.on('disconnect', this.onSocketClose);
        this.socket.on('reconnecting', this.onSocketReconnecting);
        this.socket.on('reconnect', this.onSocketReconnect);
        this.socket.on('reconnect_failed', this.onSocketReconnectFailed);
    }
    Network.prototype.setConnectHandler = function (_func, _obj) {
        this.cbConnect = [_obj, _func];
    };
    Network.prototype.setCloseHandler = function (_func, _obj) {
        this.cbClose = [_obj, _func];
    };
    Network.prototype.setErrorHandler = function (_func, _obj) {
        this.cbError = [_obj, _func];
    };
    Network.prototype.connect = function (_path, _queryStr) {
        this.state = 0;
        this.path = _path;
        this.queryStr = _queryStr;
        if (_queryStr) {
            this.socket = io.connect(_path, { query: _queryStr });
        }
        else {
            this.socket = io.connect(_path);
        }
        // console.log(_host + ":" + _port + '', {query: 'token=1234b'})
        // this.socket = io.connect('http://192.168.31.160:9090/msg1/?token=1234b');
    };
    Network.prototype.isConnected = function () {
        return this.state == 1;
    };
    Network.prototype.send = function (c, m, data) {
        var obj = {
            "c": c,
            "m": m,
            "data": data
        };
        console.log("send -->", JSON.stringify(obj));
        this.socket.emit('message', JSON.stringify(obj));
    };
    Network.prototype.bind = function (name, func, obj) {
        this.handler[name] = [obj, func];
    };
    Network.prototype.onSocketConnect = function () {
        if (Network.instance.cbConnect.length > 0) {
            var obj = Network.instance.cbConnect[0];
            var func = Network.instance.cbConnect[1];
            func.call(obj);
        }
        Network.instance.state = 1;
    };
    Network.prototype.onSocketConnectFailed = function () {
        console.log("socket.io connect failed");
        Alert.show("socket.io connect failed", false);
        Network.instance.state = 0;
    };
    Network.prototype.onSocketClose = function () {
        // console.log("socket.io closed");
        Alert.show("socket.io closed", false);
        if (Network.instance.cbClose.length > 0) {
            var obj = Network.instance.cbClose[0];
            var func = Network.instance.cbClose[1];
            func.call(obj);
        }
    };
    Network.prototype.onSocketReconnecting = function () {
        console.log("socket.io reconnecting");
        Network.instance.state = 0;
    };
    Network.prototype.onSocketReconnect = function () {
        console.log("socket.io reconnected");
        if (Network.instance.cbConnect.length > 0) {
            var obj = Network.instance.cbClose[0];
            var func = Network.instance.cbClose[1];
            func.call(obj);
        }
    };
    Network.prototype.onSocketReconnectFailed = function () {
        console.log("socket.io reconnect failed");
        Network.instance.state = 0;
    };
    Network.prototype.onSocketError = function (error) {
        console.log("socket.io error");
        console.log(error);
        if (Network.instance.cbError.length > 0) {
            var obj = Network.instance.cbError[0];
            var func = Network.instance.cbError[1];
            func.call(obj);
        }
    };
    Network.prototype.onSocketData = function (data) {
        console.log(data);
        console.log("recv -->", data);
        var packet = JSON.parse(data);
        this.dispatch(packet);
    };
    Network.prototype.dispatch = function (msg) {
        //data handler
        var error = msg["err"];
        var name = error ? "Error" : msg["c"] + "." + msg["m"];
        var cb = this.handler[name];
        if (cb) {
            var obj = cb[0];
            var func = cb[1];
            func.call(obj, msg["data"]);
        }
        else {
            console.log("not found handler --> " + name);
        }
    };
    return Network;
}());
__reflect(Network.prototype, "Network");
//# sourceMappingURL=Network.js.map