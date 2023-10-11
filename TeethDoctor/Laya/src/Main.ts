import GameConfig from "./GameConfig";
import Us_XYXZS_er from "./User/User";
import { ui } from "./ui/layaMaxUI";
import Load_XYXZS_ingView from "./View/LoadingView/LoadingView";
import Aes_XYXZS_Tools from "./Net/AesTools";
import Http_XYXZS_Unit from "./Net/HttpUnit";
import NetC_XYXZS_onfig from "./Net/NetConfig";
import W_XYXZS_XAPI from "./WXAPI";
import App_XYXZS_Config from "./AppConfig";
import Even_XYXZS_tMgr from "./Event/EventMgr";
import { Even_XYXZS_tDef } from "./Event/EventDef";
import OPP_XYXZS_OAPI from "./OPPOAPI";
import QQMini_XYXZS_GameAPI from "./QQMiniGameAPI";
import TT_XYXZS_API from "./TTAPI";
import A_XYXZS_LD from "./ALD";
import NativeCallback from "./NativeCallback";
class Main {
	protected _loadingUI : ui.View.LoadingUI = null;
	protected _loadingView : Load_XYXZS_ingView = null;
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
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError(true);

		if(true == App_XYXZS_Config.onTTMi_XYXZS_niGame)
		{
			Laya.Browser.onMiniGame = false;
		}

		if(!Laya.Browser.onMiniGame 
			&& !Laya.Browser.onQGMiniGame 
			&& !Laya.Browser.onQQMiniGame
			&& !App_XYXZS_Config.onTTMi_XYXZS_niGame)//如果不是小游戏，资源服务器设置为本地测试地址
		{
			// App_XYXZS_Config.ResSe_XYXZS_rver = App_XYXZS_Config.LocalTest_XYXZS_ReServer;
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
			{ url: App_XYXZS_Config.ResSe_XYXZS_rver + "/json/appswitch.json", type: Laya.Loader.JSON }
		]
		var self = this;
		Laya.loader.load(firstConfigs,Laya.Handler.create(this,()=>
		{
			self.loadRes();//加载资源
		}))
		Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_OnceEvent(Even_XYXZS_tDef.App_Close_XYXZS_FirstLoadingView,this,this.closeloadingUI);
	}
	private initLoadingView()
	{
		this._loadingUI = new ui.View.LoadingUI();
		Laya.stage.addChild(this._loadingUI);
		this._loadingUI.width = Laya.stage.width;
		this._loadingUI.height = Laya.stage.height;
		this._loadingView = this._loadingUI.getComponent(Load_XYXZS_ingView)
		this._loadingView.setP_XYXZS_rocess(0);
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
		//this._preLoadRes.push({ url: AppConfig.ResServer + "/json/example.json", type: Laya.Loader.JSON });
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
							self._loadingView.setP_XYXZS_rocess(res / 2 + 0.5);
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
				self._loadingView.setP_XYXZS_rocess(res / 2);
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
							self._loadingView.setP_XYXZS_rocess(res / 2 + 0.5);
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
				self._loadingView.setP_XYXZS_rocess(progress / 2);
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
							self._loadingView.setP_XYXZS_rocess(res / 2 + 0.5);
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
				self._loadingView.setP_XYXZS_rocess(res / 2);
			});
		} 
		else  {//字节跳动没有分包
			if (resource.length > 0) {
				Laya.loader.load(resource, Laya.Handler.create(this, () => {
					self.onLoadResComplate();
				}), Laya.Handler.create(this, (res) => {
					self._loadingView.setP_XYXZS_rocess(res);
				}));
			}
			else {
				self.onLoadResComplate();
			}
		}
	}

	onLoadResComplate() {
		var self = this;
		this._loadingView.setP_XYXZS_rocess(1);
		if(Laya.Browser.onMiniGame)
		{
			W_XYXZS_XAPI.wxL_XYXZS_ogin(function (code) {
				Us_XYXZS_er.c_XYXZS_ode = code
				Http_XYXZS_Unit.log_XYXZS_in(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						Us_XYXZS_er.to_XYXZS_ken = res.data.token;
						Us_XYXZS_er.o_XYXZS_penId = res.data.openid;
						A_XYXZS_LD.aldSe_XYXZS_ndOpenId(Us_XYXZS_er.o_XYXZS_penId);
						Http_XYXZS_Unit.getGa_XYXZS_meData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								Us_XYXZS_er.init_XYXZS_iUser(res.data);
							}
							else
							{
								Us_XYXZS_er.init_XYXZS_iUser(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							Us_XYXZS_er.to_XYXZS_ken = "";
							Us_XYXZS_er.o_XYXZS_penId = "";
							Us_XYXZS_er.init_XYXZS_iUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						Us_XYXZS_er.init_XYXZS_iUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					Us_XYXZS_er.init_XYXZS_iUser(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else if(Laya.Browser.onQGMiniGame) //oppo小游戏
		{
			OPP_XYXZS_OAPI.initA_XYXZS_dService(()=>{
	
			},()=>
			{

			},()=>
			{
				
			});

			OPP_XYXZS_OAPI.Lo_XYXZS_gin(function (token) {
				Us_XYXZS_er.c_XYXZS_ode = token;
				Http_XYXZS_Unit.log_XYXZS_in(
					(res)=> 
					{
						if(res.code == 1)
						{
							console.log("登陆成功！！！");
							Us_XYXZS_er.to_XYXZS_ken = res.data.token;
							Us_XYXZS_er.o_XYXZS_penId = res.data.openid;
							Http_XYXZS_Unit.getGa_XYXZS_meData((res)=>{
								console.log("获取用户数据成功！！！");
								if(1 == res.code)
								{
									Us_XYXZS_er.init_XYXZS_iUser(res.data);
									console.log("获取用户数据--------------------Start");
									for(var key in res.data)
									{
										console.log(key, res.data[key]);
									}
									console.log("获取用户数据--------------------End");
								}
								else
								{
									Us_XYXZS_er.init_XYXZS_iUser(null);
								}
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							},(res)=>{
								console.log("获取用户数据失败！！！");
								Us_XYXZS_er.to_XYXZS_ken = "";
								Us_XYXZS_er.o_XYXZS_penId = "";
								Us_XYXZS_er.init_XYXZS_iUser(null);
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							})
						}
						else
						{
							console.log("登陆失败！！！",res);
							Us_XYXZS_er.init_XYXZS_iUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
	
							}));
						}
					},
					(res) => 
					{
						console.log("登陆失败！！！",res);
						Us_XYXZS_er.init_XYXZS_iUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

						}));
					})
			}, null)
		}
		else if(Laya.Browser.onQQMiniGame)  //qq小游戏
		{
			QQMini_XYXZS_GameAPI.Lo_XYXZS_gin(function (code) {
				Us_XYXZS_er.c_XYXZS_ode = code
				Http_XYXZS_Unit.log_XYXZS_in(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						Us_XYXZS_er.to_XYXZS_ken = res.data.token;
						Us_XYXZS_er.o_XYXZS_penId = res.data.openid;
						A_XYXZS_LD.aldSe_XYXZS_ndOpenId(Us_XYXZS_er.o_XYXZS_penId);
						Http_XYXZS_Unit.getGa_XYXZS_meData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								Us_XYXZS_er.init_XYXZS_iUser(res.data);
							}
							else
							{
								Us_XYXZS_er.init_XYXZS_iUser(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							Us_XYXZS_er.to_XYXZS_ken = "";
							Us_XYXZS_er.o_XYXZS_penId = "";
							Us_XYXZS_er.init_XYXZS_iUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						Us_XYXZS_er.init_XYXZS_iUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					Us_XYXZS_er.init_XYXZS_iUser(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else if(App_XYXZS_Config.onTTMi_XYXZS_niGame)//头条，字节跳动
		{
			TT_XYXZS_API.tt_XYXZS_Login(function (code) {
				Us_XYXZS_er.c_XYXZS_ode = code
				Http_XYXZS_Unit.log_XYXZS_in(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						Us_XYXZS_er.to_XYXZS_ken = res.data.token;
						Us_XYXZS_er.o_XYXZS_penId = res.data.openid;
						Http_XYXZS_Unit.getGa_XYXZS_meData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								Us_XYXZS_er.init_XYXZS_iUser(res.data);
							}
							else
							{
								Us_XYXZS_er.init_XYXZS_iUser(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							Us_XYXZS_er.to_XYXZS_ken = "";
							Us_XYXZS_er.o_XYXZS_penId = "";
							Us_XYXZS_er.init_XYXZS_iUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						Us_XYXZS_er.init_XYXZS_iUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					Us_XYXZS_er.init_XYXZS_iUser(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else
		{
			Us_XYXZS_er.testIn_XYXZS_itUser();//测试
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