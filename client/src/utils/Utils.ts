class Utils {
	public constructor() {
	}

	public static rand(a: number, b: number): number {
		var diff: number = b - a - 1;
		var r: number = Math.random() * diff;
		return Math.round(r) + a;
	}

	public static playSound(name: string) {
		var sound: egret.Sound = new egret.Sound();
		sound.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
			sound.play(0, 1);
		}, this);
		sound.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
			console.log("loaded error!");
		}, this);
		sound.load("resource/assets/sound/" + name + ".mp3");
	}

	public static imageProxyUrl(url: string) {
		return (egret.Capabilities.renderMode == "webgl") ?
			window["API_SERVER"] + "api.php?cmd=image_proxy&url=" + encodeURIComponent(url) :
			url;
	}

	/**
	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
	 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
	 */
	private createBitmapByName(name: string): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}