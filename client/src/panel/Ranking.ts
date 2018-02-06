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
	}

	protected initComponent() {
		this.radioBtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChange ,this);
	}

	private onChange(e:eui.UIEvent){
    let radioGroup:eui.RadioButtonGroup = e.target;
		this.currIndex = radioGroup.selectedValue
		console.log('onchange')

		var tw = egret.Tween.get(this.tabActive);
		tw.to({ x: this.currIndex * 170.5 + 13 }, 300);

		this.viewStack.selectedIndex = this.currIndex;
	}

	public static show() {
		var inst = Ranking.instance;
		Main.getInstance().addChild(inst);
	}
}