class IndexSecne extends BaseComponent{
	private static instance: IndexSecne;

	public constructor() {
		super();
		IndexSecne.instance = this;
		this.load("scene/IndexSceneSkin.exml");

		var inst = IndexSecne.instance;
		Main.getInstance().addChild(inst);
	}
	
}