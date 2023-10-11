import GameConfig from "./GameConfig";
import Us_JJKLBB_er from "./User/User";
import { ui } from "./ui/layaMaxUI";
import LoadingView from "./View/LoadingView/LoadingView";
import AesTools from "./Net/AesTools";
import Http_JJKLBB_Unit from "./Net/HttpUnit";
import NetCo_JJKLBB_nfig from "./Net/NetConfig";
import WXAPI from "./WXAPI";
import AppC_JJKLBB_onfig from "./AppConfig";
import Even_JJKLBB_tMgr from "./Event/EventMgr";
import { Event_JJKLBB_Def } from "./Event/EventDef";
import OPPO_JJKLBB_API from "./OPPOAPI";
import QQMini_JJKLBB_GameAPI from "./QQMiniGameAPI";
import A_JJKLBB_LD from "./ALD";
import NativeCallback from "./NativeCallback";

class Main {

	protected _loadingUI : ui.View.LoadingUI = null;
	protected _loadingView : LoadingView = null;
	//预加载列表
	private readonly _preLoadRes : Array<any> = new Array<any> ();

	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		if(!Laya.Browser.onMiniGame && !Laya.Browser.onQGMiniGame && !Laya.Browser.onQQMiniGame)//如果不是小游戏，资源服务器设置为本地测试地址
		{
			AppC_JJKLBB_onfig.ResSe_JJKLBB_rver = AppC_JJKLBB_onfig.LocalTes_JJKLBB_tReServer;
		}

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		Laya.loader.maxLoader = 50;
		this.initLoadingView()
		//加载重要配置，这些配置必须在游戏启动前加载完成
		var firstConfigs = 
		[
			{ url: AppC_JJKLBB_onfig.ResSe_JJKLBB_rver + "/json/appswitch.json", type: Laya.Loader.JSON }
		]
		var self = this;
		Laya.loader.load(firstConfigs,Laya.Handler.create(this,()=>
		{
			self.loadRes();//加载资源
		}))
		Even_JJKLBB_tMgr.insta_JJKLBB_nce.regO_JJKLBB_nceEvent(Event_JJKLBB_Def.App_CloseF_JJKLBB_irstLoadingView,this,this.closeloadingUI);
	}

	private initLoadingView()
	{
		this._loadingUI = new ui.View.LoadingUI();
		Laya.stage.addChild(this._loadingUI);
		this._loadingUI.width = Laya.stage.width;
		this._loadingUI.height = Laya.stage.height;
		this._loadingView = this._loadingUI.getComponent(LoadingView)
		this._loadingView.setProcess(0);
	}


	private postResToOpenDataContext(onComplate : Function)
	{
		if(Laya.Browser.onMiniGame)
		{
			console.log("开始透传资源数据到开放域");
			Laya.loader.load(
				[
					"openRes/Rank.atlas",
				]
				,Laya.Handler.create(null,function()
			{
				Laya.MiniAdpter.sendAtlasToOpenDataContext("openRes/Rank.atlas");    
				console.log("透传资源数据到开放域  完毕！！！");
				if(onComplate)
				{
					onComplate();
				}
			}));
		}
		else
		{
			if(onComplate)
			{
				onComplate();
			}
		}
	}

	private preLoad()
	{
		//这里添加你需要预加载的资源
		this._preLoadRes.push({ url: AppC_JJKLBB_onfig.ResSe_JJKLBB_rver + "/json/levelConfig.json", type: Laya.Loader.JSON });
		this._preLoadRes.push({ url: AppC_JJKLBB_onfig.ResSe_JJKLBB_rver + "/json/skinConfig.json", type: Laya.Loader.JSON });
		this._preLoadRes.push({ url: AppC_JJKLBB_onfig.ResSe_JJKLBB_rver + "/json/gameConfig.json", type: Laya.Loader.JSON });
	}

	loadRes(): void {
		this.preLoad();
		var resource: Array<any> = this._preLoadRes;
		var self = this;
		if (Laya.Browser.onMiniGame) {
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["wx"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if(resource.length > 0)
					{
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.setProcess(res / 2 + 0.5);
						}));
					}
					else
					{
						self.onLoadResComplate();//预加载完成
					}
				},
				fail: (res) => 
				{
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => 
			{
				self._loadingView.setProcess(res / 2);
			});
		} 
		else if(Laya.Browser.onQGMiniGame) //oppo小游戏
		{
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["qg"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if (resource.length > 0) {
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.setProcess(res / 2 + 0.5);
						}));
					}
					else {
						self.onLoadResComplate();//预加载完成
					}
				},
				fail: (res) => {
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => {
				// 加载进度百分比
				var progress = res["progress"];
				// 下载数据
				var totalBytesWritten = res["totalBytesWritten"];
				// 总长度
				var totalBytesExpectedToWrite = res["totalBytesExpectedToWrite"];
				self._loadingView.setProcess(progress / 2);
			});
		}
		else if (Laya.Browser.onQQMiniGame) {
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["qq"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if(resource.length > 0)
					{
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.setProcess(res / 2 + 0.5);
						}));
					}
					else
					{
						self.onLoadResComplate();//预加载完成
					}
				},
				fail: (res) => 
				{
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => 
			{
				self._loadingView.setProcess(res / 2);
			});
		} 
		else  {
			if (resource.length > 0) {
				Laya.loader.load(resource, Laya.Handler.create(this, () => {
					self.onLoadResComplate();
				}), Laya.Handler.create(this, (res) => {
					self._loadingView.setProcess(res);
				}));
			}
			else {
				self.onLoadResComplate();
			}
		}
	}

	onLoadResComplate() {
		var self = this;
		this._loadingView.setProcess(1);
		if(Laya.Browser.onMiniGame)
		{
			WXAPI.wxLogin(function (code) {
				Us_JJKLBB_er.co_JJKLBB_de = code
				Http_JJKLBB_Unit.log_JJKLBB_in(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						Us_JJKLBB_er.tok_JJKLBB_en = res.data.token;
						Us_JJKLBB_er.open_JJKLBB_Id = res.data.openid;
						A_JJKLBB_LD.aldSendOpenId(Us_JJKLBB_er.open_JJKLBB_Id);
						Http_JJKLBB_Unit.getGam_JJKLBB_eData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								Us_JJKLBB_er.initi_JJKLBB_User(res.data);
							}
							else
							{
								Us_JJKLBB_er.initi_JJKLBB_User(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							Us_JJKLBB_er.tok_JJKLBB_en = null;
						    Us_JJKLBB_er.open_JJKLBB_Id = null;
							Us_JJKLBB_er.initi_JJKLBB_User(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					Us_JJKLBB_er.initi_JJKLBB_User(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else if(Laya.Browser.onQGMiniGame) //oppo小游戏
		{
			OPPO_JJKLBB_API.initAdS_JJKLBB_ervice(()=>{
	
			},()=>
			{

			},()=>
			{
				
			});

			OPPO_JJKLBB_API.Lo_JJKLBB_gin(function (token) {
				Us_JJKLBB_er.co_JJKLBB_de = token;
				Http_JJKLBB_Unit.log_JJKLBB_in(
					(res)=> 
					{
						if(res.code == 1)
						{
							console.log("登陆成功！！！");
							Us_JJKLBB_er.tok_JJKLBB_en = res.data.token;
							Us_JJKLBB_er.open_JJKLBB_Id = res.data.openid;
							Http_JJKLBB_Unit.getGam_JJKLBB_eData((res)=>{
								console.log("获取用户数据成功！！！");
								if(1 == res.code)
								{
									Us_JJKLBB_er.initi_JJKLBB_User(res.data);
									console.log("获取用户数据--------------------Start");
									for(var key in res.data)
									{
										console.log(key, res.data[key]);
									}
									console.log("获取用户数据--------------------End");
								}
								else
								{
									Us_JJKLBB_er.initi_JJKLBB_User(null);
								}
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							},(res)=>{
								console.log("获取用户数据失败！！！");
								Us_JJKLBB_er.initi_JJKLBB_User(null);
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							})
						}
					},
					(res) => 
					{
						console.log("登陆失败！！！",res);
						Us_JJKLBB_er.initi_JJKLBB_User(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

						}));
					})
			}, null)
		}
		else if(Laya.Browser.onQQMiniGame)  //qq小游戏
		{
			QQMini_JJKLBB_GameAPI.Lo_JJKLBB_gin(function (code) {
				Us_JJKLBB_er.co_JJKLBB_de = code
				Http_JJKLBB_Unit.log_JJKLBB_in(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						Us_JJKLBB_er.tok_JJKLBB_en = res.data.token;
						Us_JJKLBB_er.open_JJKLBB_Id = res.data.openid;
						Http_JJKLBB_Unit.getGam_JJKLBB_eData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								Us_JJKLBB_er.initi_JJKLBB_User(res.data);
							}
							else
							{
								Us_JJKLBB_er.initi_JJKLBB_User(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							Us_JJKLBB_er.initi_JJKLBB_User(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					Us_JJKLBB_er.initi_JJKLBB_User(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else
		{
			Us_JJKLBB_er.testIn_JJKLBB_itUser();//测试
			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
				
			}));
		}
	}

	protected closeloadingUI()
	{
		if(this._loadingUI && !this._loadingUI.destroyed)
		{
			this._loadingUI.destroy();
		}
	}
}
//激活启动类
new Main();
if (Laya.Browser.window) {
    Laya.Browser.window.NativeCallback = NativeCallback;
}
