class SceneMgr {
	public static gotoLogoin() {
		let loading = new ResLoading();
		Director.getInstance().pushScene(loading);
		let call = new CallBackFunc().handler(SceneMgr.onLogo, this, []);
		loading.load(["com"], call);
	}

	private static onLogo() {
		let layer = new Login();
		Director.getInstance().repleaceScene(layer);
	}

	private static onIndex() {
		let index = new IndexScene();
		Director.getInstance().repleaceScene(index);
	}
}