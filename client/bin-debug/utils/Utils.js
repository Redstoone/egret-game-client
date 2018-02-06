var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.rand = function (a, b) {
        var diff = b - a - 1;
        var r = Math.random() * diff;
        return Math.round(r) + a;
    };
    Utils.playSound = function (name) {
        var sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, function (event) {
            sound.play(0, 1);
        }, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
            console.log("loaded error!");
        }, this);
        sound.load("resource/assets/sound/" + name + ".mp3");
    };
    Utils.imageProxyUrl = function (url) {
        return (egret.Capabilities.renderMode == "webgl") ?
            window["API_SERVER"] + "api.php?cmd=image_proxy&url=" + encodeURIComponent(url) :
            url;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Utils.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
