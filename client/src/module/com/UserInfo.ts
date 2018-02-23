/**
 *
 * @author redstoone
 *
 */

class UserInfo extends BaseComponent {
	private static instance: UserInfo;
	private userAvatar: eui.Image;
	private userName: eui.Label;
	private userId: eui.Label;
	private goldNum: eui.Label;
	private goldAddBtn: eui.Button;

	public constructor() {
		super();

		UserInfo.instance = this;
		// this.load("component/UserInfoSkin.exml");
		this.skinName = "UserInfoSkin";

		var inst = UserInfo.instance;
		inst.x = 0;
		inst.y = 0;
		// Main.getInstance().addChild(inst);
	}

	protected initComponent() {
		this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAddBtnTouch, this)
	}

	private onGoldAddBtnTouch(ev: egret.TouchEvent): void {
		console.log('gold add:', ev, this)
	}
}