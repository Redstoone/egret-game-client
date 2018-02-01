/**
 *
 * @author redstoone
 *
 */
class Network {
	private socket;
	private state: number;
	private host: string;
	private port: number;
	private handler: Object = {};
	private cbConnect: Array<any> = [];
	private cbClose: Array<any> = [];
	private cbError: Array<any> = [];
	private that = this

	public constructor(_host: string, _port: number = 80) {
		this.state = 0;
		this.host = _host;
		this.port = _port;
		this.socket = io.connect(_host + ":" + _port);

		//添加链接打开侦听，连接成功会调用此方法
		this.socket.on('connect', this.onSocketOpen);

		this.socket.on('news', function (data) {
			console.log(data);
		});

		this.socket.on('disconnect', this.onSocketClose)
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

	private onSocketOpen(): void {
		console.log("socket.io connected");
		if (that.cbConnect.length > 0) {
			var obj: Object = that.cbConnect[0];
			var func: Function = that.cbConnect[1];
			func.call(obj);
		}
		that.state = 1;
	}

	private onSocketClose(): void {
		console.log("socket.io closed");
		if (that.cbClose.length > 0) {
			var obj: Object = that.cbClose[0];
			var func: Function = that.cbClose[1];
			func.call(obj);
		}
	}

}