//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
	public net: Network;

	private static instance: Main;
	private loadingView: LoadingUI;
	private alertView: Alert = null;
	private rankingView: game.Ranking = null;
	private indexView: IndexSecne = null;
	private matchView: Match = null;
	private menuView: Menu = null;
	private notifyView: Notify = null;
	private userInfoView: UserInfo = null;

	public static getInstance() {
		return Main.instance;
	}

	public constructor() {
		super();
		Main.instance = this;
	}

	protected createChildren(): void {
		super.createChildren();

		egret.lifecycle.addLifecycleListener((context) => {
			// custom lifecycle plugin
		})

		egret.lifecycle.onPause = () => {
			egret.ticker.pause();
		}

		egret.lifecycle.onResume = () => {
			egret.ticker.resume();
		}

		//Config loading process interface
		//设置加载进度界面
		// this.loadingView = new LoadingUI();
		// this.addChild(this.loadingView);

		//inject the custom material parser
		//注入自定义的素材解析器
		let assetAdapter = new AssetAdapter();
		egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
		egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


		this.runGame().catch(e => {
			console.log(e);
		})
	}

	private async runGame() {
		await this.loadResource()
		// this.createGameScene();
		await platform.login();
		const userInfo = await platform.getUserInfo();
		console.log(userInfo);

	}

	private async loadResource() {
		try {
			const loadingView = new LoadingUI();
			this.stage.addChild(loadingView);
			await RES.loadConfig("resource/default.res.json", "resource/");
			await this.loadTheme();
			await RES.loadGroup("preload", 0, loadingView);
			this.stage.removeChild(loadingView);
		}
		catch (e) {
			console.error(e);
		}
	}

	private loadTheme() {
		return new Promise((resolve, reject) => {
			// load skin theme configuration file, you can manually modify the file. And replace the default skin.
			//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
			let theme = new eui.Theme("resource/default.thm.json", this.stage);
			theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
		})
	}

	/**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
	private onThemeLoadComplete(): void {
		//初始化alert
		this.alertView = new Alert();
		this.alertView.horizontalCenter = 0;
		this.alertView.verticalCenter = 0;


		// Alert.show("正在加载资源", false)

		//加载资源
		// this.loadingView.setLoadingText("正在加载资源");
		// this.loadRes("preload");
		this.initGame()
	}

	private textfield: egret.TextField;
	/**
	 * 创建场景界面
	 * Create scene interface
	 */
	protected initGame(): void {
		console.log('init secne')
		this.indexView = new IndexSecne();
		this.notifyView = new Notify(384, 24, 653, 45, 5, 0, 3000);
		this.userInfoView = new UserInfo();
		this.menuView = new Menu();
		this.matchView = new Match();
		this.rankingView = new game.Ranking();

		this.notifyView.addText("哈哈哈哈哈哈");
		
		//init network
		// this.net = new Network('http://192.168.31.160:9092/msg_1');
		// this.net = new Network('http://192.168.31.110:3101/msg1', 'token=1234b&fot=111');
		// this.net.send('Room', '30215', { msg: "hello egret" })

		// this.net.setConnectHandler(this.onServerConnected, this);
		// this.net.setCloseHandler(this.onServerClosed, this);
	}

	private onServerConnected() {
		this.net.bind("Index.login", this.onLogin, this);
		this.net.bind("Error", this.onError, this);

		//发送登录
		// this.loadingView.setLoadingText("正在登录");
	}

	private onServerClosed() {
		console.log(this.net.isConnected())
		if (this.net.isConnected()) {
			Alert.show("与服务器断开连接", false, () => {
				// window.location.reload();
			}, this);
		} else {
			Alert.show("无法连接服务器", false);
		}
	}

	private onError(errstr: any) {
		Alert.show(errstr);
	}

	private onLogin(data: any) {

		// this.createGame();
	}

}
