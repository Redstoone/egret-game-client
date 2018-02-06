/**
 *
 * @author redstoone
 *
 */

class Ranking extends BaseComponent {
	private static instance: Ranking;
	private tabActive: eui.Image;
	private viewStack: eui.ViewStack;
	private radioBtn: eui.RadioButton;
	public currIndex: number = 0

	public constructor() {
		super();
		Ranking.instance = this;
		this.load("component/RankingSkin.exml");

		var inst = Ranking.instance;
		inst.x = 38;
		inst.y = 118;
		Main.getInstance().addChild(inst);
	}

	protected initComponent() {
		this.radioBtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChange ,this);
	}

	private onChange(e:eui.UIEvent){
    let radioGroup:eui.RadioButtonGroup = e.target;
		this.currIndex = radioGroup.selectedValue

		var tw = egret.Tween.get(this.tabActive);
		tw.to({ x: this.currIndex * 170.5 + 13 }, 200);

		this.viewStack.selectedIndex = this.currIndex;
	}
}