/**
 *
 * @author redstoone
 *
 */
class Login extends eui.Component {
	private btnLogin: eui.Button;
	private main: Main;

	public constructor() {
		super();
		this.skinName = "LoginSkin";
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
	}

	private addStage() {
		
	}
}
