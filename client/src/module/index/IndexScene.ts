class IndexScene extends BaseComponent{
	private static instance: IndexScene;

	public constructor() {
		super();
		IndexScene.instance = this;
		// this.load("scene/IndexSceneSkin.exml");
		this.skinName = "IndexSceneSkin";

		// var inst = IndexScene.instance;
		// Main.getInstance().addChild(inst);
	}
	
}