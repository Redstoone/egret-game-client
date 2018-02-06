/**
 *
 * @author redstoone
 *
 */
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
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        var _this = _super.call(this) || this;
        Alert.instance = _this;
        _this.load("component/AlertSkin.exml");
        return _this;
    }
    Alert.prototype.initComponent = function () {
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonTouchBegin, this);
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_END, this.onButtonTouchEnd, this);
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonTouchBegin, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_END, this.onButtonTouchEnd, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCancel, this);
    };
    Alert.prototype.onButtonTouchBegin = function (ev) {
        ev.target.scaleX = 0.9;
        ev.target.scaleY = 0.9;
    };
    Alert.prototype.onButtonTouchEnd = function (ev) {
        ev.target.scaleX = 1;
        ev.target.scaleY = 1;
    };
    Alert.prototype.onTouch = function (ev) {
        this.parent.removeChild(this);
        if (this.func) {
            this.func.call(this.obj);
        }
    };
    Alert.prototype.onTouchCancel = function (ev) {
        this.parent.removeChild(this);
        if (this.cfunc) {
            this.cfunc.call(this.obj);
        }
    };
    Alert.show = function (text, trans, func, obj, cancel, cancelFunc) {
        if (trans === void 0) { trans = true; }
        if (func === void 0) { func = null; }
        if (obj === void 0) { obj = null; }
        if (cancel === void 0) { cancel = false; }
        if (cancelFunc === void 0) { cancelFunc = null; }
        if (trans) {
            text = Alert.texts[text];
        }
        var inst = Alert.instance;
        inst.labText.text = text;
        inst.func = func;
        inst.cfunc = cancelFunc;
        inst.obj = obj;
        if (cancel) {
            inst.btnOk.x = 95;
            inst.btnCancel.x = 226;
            inst.btnCancel.visible = true;
        }
        else {
            inst.btnOk.x = inst.width / 2;
            inst.btnCancel.visible = false;
        }
        Main.getInstance().addChild(inst);
    };
    Alert.prototype.removeAll = function () {
        this.parent.removeChild(this);
    };
    Alert.texts = {
        "InvalidToken": "登录验证失败",
        "GoldLess": "钻石少于5个不能进入房间",
        "InRoom": "你已经有房间了，点击进入即可",
        "CreateFailed": "创建房间出现了异常",
        "InvalidRoomId": "房间不存在",
        "RoomNotFound": "房间不存在",
        "Already": "已经准备了",
        "PlayerStateError": "还有玩家没有准备",
        "PlayerLess": "一个人怎么玩?还不赶快邀请你的基友互相伤害!",
        "RaiseFailed": "跟注错误",
        "FollowFailed": "加注错误",
        "LookFailed": "看牌错误",
        "GiveupFailed": "放弃错误",
        "PkFailed": "比牌错误",
        "UserNotExists": "用户不存在"
    };
    return Alert;
}(BaseComponent));
__reflect(Alert.prototype, "Alert");
//# sourceMappingURL=Alert.js.map