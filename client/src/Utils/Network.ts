/**
 *
 * @author redstoone
 *
 */
var _this = null
class Network {
	private static instance: Network;
	private socket;
	private state: number;
	private host: string;
	private port: number;
	private handler: Object = {};
	private cbConnect: Array<any> = [];
	private cbClose: Array<any> = [];
	private cbError: Array<any> = [];
	private alertView: Alert = null;

	public constructor(_host: string, _port: number = 80) {
		Network.instance = this

		//初始化alert
		this.alertView = new Alert();
		this.alertView.horizontalCenter = 0;
		this.alertView.verticalCenter = 0;

		this.connect(_host, _port)

		//添加链接打开侦听，连接成功会调用此方法
		this.socket.on('connect', this.onSocketConnect);
		this.socket.on('connect_failed', this.onSocketConnectFailed);
		//添加收到数据侦听，收到数据会调用此方法
		this.socket.on('news', (data => {
			this.onSocketData(data)
		}));
		//添加异常侦听，出现异常会调用此方法
		this.socket.on('error', (data => {
			this.onSocketError(data);
		}))
		//添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
		this.socket.on('disconnect', this.onSocketClose)

		this.socket.on('reconnecting', this.onSocketReconnecting);
		this.socket.on('reconnect', this.onSocketReconnect);
		this.socket.on('reconnect_failed', this.onSocketReconnectFailed);
	}

	public setConnectHandler(_func: Function, _obj: Object) {
		this.cbConnect = [_obj, _func];
	}

	public setCloseHandler(_func: Function, _obj: Object) {
		this.cbClose = [_obj, _func];
	}

	public setErrorHandler(_func: Function, _obj: Object) {
		this.cbError = [_obj, _func];
	}

	public connect(_host: string, _port: number) {
		this.state = 0;
		this.host = _host;
		this.port = _port;
		this.socket = io.connect(_host + ":" + _port);
	}

	public isConnected() {
		return this.state == 1;
	}

	public send(c: string, m: string, data: any) {
		var obj: Object = {
			"c": c,
			"m": m,
			"data": data
		};
		console.log("send -->", JSON.stringify(obj))
		this.socket.emit('message', JSON.stringify(obj));
	}

	public bind(name: string, func: Function, obj: Object) {
		this.handler[name] = [obj, func];
	}

	private onSocketConnect(): void {
		console.log("socket.io connected");
		console.log(Alert)
		Alert.show("socket.io connected", false)
		if (Network.instance.cbConnect.length > 0) {
			var obj: Object = Network.instance.cbConnect[0];
			var func: Function = Network.instance.cbConnect[1];
			func.call(obj);
		}
		Network.instance.state = 1;
	}

	private onSocketConnectFailed(): void {
		console.log("socket.io connect failed");
		Alert.show("socket.io connect failed", false)
		Network.instance.state = 0;
	}


	private onSocketClose(): void {
		// console.log("socket.io closed");
		Alert.show("socket.io closed", false)
		if (Network.instance.cbClose.length > 0) {
			var obj: Object = Network.instance.cbClose[0];
			var func: Function = Network.instance.cbClose[1];
			func.call(obj);
		}
	}

	private onSocketReconnecting(): void {
		console.log("socket.io reconnecting");
		Network.instance.state = 0;
	}

	private onSocketReconnect(): void {
		console.log("socket.io reconnected");
		if (Network.instance.cbConnect.length > 0) {
			var obj: Object = Network.instance.cbClose[0];
			var func: Function = Network.instance.cbClose[1];
			func.call(obj);
		}
	}

	private onSocketReconnectFailed(): void {
		console.log("socket.io reconnect failed");
		Network.instance.state = 0;
	}

	private onSocketError(error): void {
		console.log("socket.io error");
		console.log(error)
		if (Network.instance.cbError.length > 0) {
			var obj: Object = Network.instance.cbError[0];
			var func: Function = Network.instance.cbError[1];
			func.call(obj);
		}
	}

	private onSocketData(data): void {
		console.log(data)
		console.log("recv -->", data);
		var packet: Object = JSON.parse(data);
		this.dispatch(packet);
	}

	private dispatch(msg: Object) {
		//data handler
		var error: number = msg["err"];
		var name: string = error ? "Error" : msg["c"] + "." + msg["m"];
		var cb: Array<any> = this.handler[name];
		if (cb) {
			var obj: Object = cb[0];
			var func: Function = cb[1];
			func.call(obj, msg["data"]);
		} else {
			console.log("not found handler --> " + name)
		}
	}

}