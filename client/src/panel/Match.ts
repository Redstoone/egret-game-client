/**
 *
 * @author redstoone
 *
 */

class Match extends BaseComponent {
	private static instance: Match;

	public constructor() {
		super();
		Match.instance = this;
		this.load("component/MatchSkin.exml");

		var inst = Match.instance;
		inst.x = 840;
		inst.y = 78;
		Main.getInstance().addChild(inst);
	}
}