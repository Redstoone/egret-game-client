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

	public constructor() {
		super();

		UserInfo.instance = this;
		this.load("component/UserInfoSkin.exml");

		var inst = UserInfo.instance;
		inst.x = 32;
		inst.y = 10;
		Main.getInstance().addChild(inst);
	}
}