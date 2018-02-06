var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author redstoone
 *
 */
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super.call(this) || this;
        _this.main = Main.getInstance();
        _this.load("game/LoginSkin.exml");
        return _this;
    }
    Login.prototype.initComponent = function () {
        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLoginTouch, this);
    };
    Login.prototype.onLoginTouch = function () {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(window["API_SERVER"] + "api.php?cmd=login&r=" + Math.random());
        request.addEventListener(egret.Event.COMPLETE, function (e) {
            var s = JSON.parse(request.response);
            if (s.auth) {
                this.main.username = s.username;
                this.main.token = s.token;
                // Main.getInstance().loadRes("game");
            }
            else {
                location.href = s.url;
            }
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
            Alert.show("登录认证出错", false);
        }, this);
        request.send();
    };
    return Login;
}(BaseComponent));
__reflect(Login.prototype, "Login");
