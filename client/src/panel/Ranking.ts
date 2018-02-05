/**
 *
 * @author redstoone
 *
 */

class Ranking extends BaseComponent {
	private static instance: Ranking;
	public currIndex: number = 0

	public constructor() {
		super();
		Ranking.instance = this;
		this.load("component/RankingSkin.exml");
		console.log(this)
	}

	protected initComponent() {
		this.btnTab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab1Touch, this);
		this.btnTab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab2Touch, this);
	}

	private onTab1Touch(ev: egret.TouchEvent) {
		console.log('111')
		this.currIndex = 0
		this.selectTab()
	}

	private onTab2Touch(ev: egret.TouchEvent) {
		this.currIndex = 1
		this.selectTab()
	}

	public selectTab() {
		console.log('abac')
		var tw = egret.Tween.get(this.tabActive);
		tw.to({ x: this.currIndex * 170.5 + 13 }, 500);

		if (!this.currIndex) {
			this.tabDou.visible = false
			this.tabPing.visible = true
		} else {

			console.log(this)
			this.tabDou.visible = true
			this.tabPing.visible = false
		}
	}

	public static show() {
		var inst = Ranking.instance;
		Main.getInstance().addChild(inst);
	}
}