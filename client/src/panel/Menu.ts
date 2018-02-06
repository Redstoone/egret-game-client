/**
 *
 * @author redstoone
 *
 */

class Menu extends BaseComponent {
	private static instance: Menu;

	public constructor() {
		super();
		Menu.instance = this;
		this.load("component/RankingSkin.exml");
	}
}