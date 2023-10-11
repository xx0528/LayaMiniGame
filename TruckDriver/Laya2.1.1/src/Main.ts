import GameConfig from "./GameConfig";
import User from "./User/User";
import { ui } from "./ui/layaMaxUI";
import LoadingView from "./View/LoadingView/LoadingView";
import AesTools_ldpk from "./Net/AesTools";
import HttpUnit from "./Net/HttpUnit";
import NetConfig_ldpk from "./Net/NetConfig";
import WXAPI_ldpk from "./WXAPI";
import AppConfig_ldpk from "./AppConfig";
import EventMgr_ldpk from "./Event/EventMgr";
import { Event_ppxhc_Def } from "./Event/EventDef";
import OPPOAPI from "./OPPOAPI";
import QQMiniGameAPI from "./QQMiniGameAPI";
import TTAPI from "./TTAPI";
import ALD_ldpk from "./ALD";
import VIVOAPI from "./VIVOAPI";
import NativeCallback from "./NativeCallback";

class Main {

	protected _loadingUI : ui.View.LoadingUI = null;
	protected _loadingView : LoadingView = null;
	//预加载列表
	private readonly _preLoadRes : Array<any> = new Array<any> ();
	//分包加载列表
	private readonly _subResPackages: Array<any> = new Array<any>();

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

		if(true == AppConfig_ldpk.onTTMiniGame_ppxhc_)
		{
			Laya.Browser.onMiniGame = false;
		}

		if(!Laya.Browser.onMiniGame 
			&& !Laya.Browser.onQGMiniGame 
			&& !Laya.Browser.onQQMiniGame
			&& !AppConfig_ldpk.onTTMiniGame_ppxhc_)//如果不是小游戏，资源服务器设置为本地测试地址
		{
			AppConfig_ldpk.Res_ppxhc_Server = AppConfig_ldpk.Local_ppxhc_TestReServer;
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
			{ url: AppConfig_ldpk.Res_ppxhc_Server + "/json/appswitch.json", type: Laya.Loader.JSON }
		]
		var self = this;
		Laya.loader.load(firstConfigs,Laya.Handler.create(this,()=>
		{
			self.loadRes();//加载资源
		}))
		EventMgr_ldpk.instance.regOnceEvent_(Event_ppxhc_Def.App_CloseFirstLoadingView,this,this.closeloadingUI);
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
		//this._preLoadRes.push({ url: AppConfig.ResServer + "/json/example.json", type: Laya.Loader.JSON });

		this._preLoadRes.push({ url: AppConfig_ldpk.Res_ppxhc_Server + "/json/storeconfig.json", type: Laya.Loader.JSON });//商店配置表

		//这里是加载分包
		this._subResPackages.push({name: "subRes"}, {name: "subRes2"});
	}

	loadRes(): void {
		this.preLoad();
		var resource: Array<any> = this._preLoadRes;
		let subResPackages: any[] = [].concat(this._subResPackages);

		var self = this;
		function LoadPreLoadRes(): void {
			if (resource.length > 0) {
				Laya.loader.load(resource, Laya.Handler.create(this, () => {
					self.onLoadResComplate();//预加载完成
				}), Laya.Handler.create(this, (res) => {
					self._loadingView.setProcess(res / 2 + 0.5);
				}));
			}
			else {
				self.onLoadResComplate();//预加载完成
			}
		}
		if (!Laya.Browser.onMiniGame && !Laya.Browser.onQGMiniGame && !Laya.Browser.onQQMiniGame) {
			LoadPreLoadRes();
			return;
		}
		let loadFailSubPackages: any[] = [];
		let loadSuccessSubPackageCount: number = 0;
		function LoadSubpackageWork(subData: any, success: Function, fail: Function): any {
			let data: any = {};
			data.name = subData.name;
			data.success = () => {success(); (subData.success && subData.success())};
			data.fail = () => {fail(); (subData.fail && subData.fail())};
			if (Laya.Browser.onMiniGame) {
				return Laya.Browser.window["wx"].loadSubpackage(data);
			} else if (Laya.Browser.onQGMiniGame) {
				return Laya.Browser.window["qg"].loadSubpackage(data);
			} else if (Laya.Browser.onQQMiniGame) {
				return Laya.Browser.window["qq"].loadSubpackage(data);
			}
		}
		let currentProgress = 0;
		let totaolProgress = subResPackages.length;
		function LoadSubpackages(): void {
			if (subResPackages.length == 0) {
				LoadPreLoadRes();
				return;
			}
			let subData = subResPackages.shift();
			let subTask = LoadSubpackageWork(subData, () => {
				console.log("分包加载成功：", subData.name);
				currentProgress++;
				LoadSubpackages();
			}, () => {
				console.log("分包加载失败重新加载：", subData.name);
				subResPackages.unshift(subData);
				LoadSubpackages();
			});
			subTask.onProgressUpdate(function (res) {
				let progress = Number(res["progress"]) / 100 + currentProgress;
				self._loadingView.setProcess((progress / totaolProgress) / 2);
			});
		}
		LoadSubpackages();
	}

	onLoadResComplate() {
		var self = this;
		this._loadingView.setProcess(1);
		if(Laya.Browser.onMiniGame)
		{
			WXAPI_ldpk.wxLogin_(function (code) {
				User.code = code
				HttpUnit.login(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						User.token = res.data.token;
						User.openId = res.data.openid;
						ALD_ldpk.aldSendOpenId(User.openId);
						HttpUnit.getGameData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								User.initiUser(res.data);
							}
							else
							{
								User.initiUser(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							User.token = "";
							User.openId = "";
							User.initiUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						User.initiUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					User.initiUser(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else if(Laya.Browser.onQGMiniGame) //oppo小游戏
		{
			OPPOAPI.initAdService(()=>{
	
			},()=>
			{

			},()=>
			{
				
			});

			OPPOAPI.Login(function (token) {
				User.code = token;
				HttpUnit.login(
					(res)=> 
					{
						if(res.code == 1)
						{
							console.log("登陆成功！！！");
							User.token = res.data.token;
							User.openId = res.data.openid;
							HttpUnit.getGameData((res)=>{
								console.log("获取用户数据成功！！！");
								if(1 == res.code)
								{
									User.initiUser(res.data);
									console.log("获取用户数据--------------------Start");
									for(var key in res.data)
									{
										console.log(key, res.data[key]);
									}
									console.log("获取用户数据--------------------End");
								}
								else
								{
									User.initiUser(null);
								}
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							},(res)=>{
								console.log("获取用户数据失败！！！");
								User.token = "";
								User.openId = "";
								User.initiUser(null);
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							})
						}
						else
						{
							console.log("登陆失败！！！",res);
							User.initiUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
	
							}));
						}
					},
					(res) => 
					{
						console.log("登陆失败！！！",res);
						User.initiUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

						}));
					})
			}, null)
		}
		else if(Laya.Browser.onQQMiniGame)  //qq小游戏
		{
			QQMiniGameAPI.Login(function (code) {
				User.code = code
				HttpUnit.login(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						User.token = res.data.token;
						User.openId = res.data.openid;
						ALD_ldpk.aldSendOpenId(User.openId);
						HttpUnit.getGameData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								User.initiUser(res.data);
							}
							else
							{
								User.initiUser(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							User.token = "";
							User.openId = "";
							User.initiUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						User.initiUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					User.initiUser(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}
		else if(AppConfig_ldpk.onTTMiniGame_ppxhc_)//头条，字节跳动
		{
			TTAPI.ttLogin(function (code) {
				User.code = code
				HttpUnit.login(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						User.token = res.data.token;
						User.openId = res.data.openid;
						HttpUnit.getGameData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								User.initiUser(res.data);
							}
							else
							{
								User.initiUser(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							User.token = "";
							User.openId = "";
							User.initiUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						User.initiUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					User.initiUser(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, () => {
				User.initiUser(null);
				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
					
				}));
			})
		}
		else if(Laya.Browser.onVVMiniGame) //VIVO 小游戏
		{
			let login = ()=>
			{
				VIVOAPI.Login(function(token,type)
				{
					success(token);
				},function(){
					fail();
				});
			}

			let success = (code)=>
			{
				User.code = code;
				HttpUnit.login(
					(res)=> 
					{
						if(res.code == 1)
						{
							console.log("登陆成功！！！");
							User.token = res.data.token;
							User.openId = res.data.openid;
							HttpUnit.getGameData((res)=>{
								console.log("获取用户数据成功！！！");
								if(1 == res.code)
								{
									User.initiUser(res.data);
									console.log("获取用户数据--------------------Start");
									for(var key in res.data)
									{
										console.log(key, res.data[key]);
									}
									console.log("获取用户数据--------------------End");
								}
								else
								{
									User.initiUser(null);
								}
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							},(res)=>{
								console.log("获取用户数据失败！！！");
								User.token = "";
								User.openId = "";
								User.initiUser(null);
								GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

								}));
							})
						}
						else
						{
							console.log("登陆失败！！！",res);
							User.initiUser(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
	
							}));
						}
					},
					(res) => 
					{
						console.log("登陆失败！！！",res);
						User.initiUser(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

						}));
					})
			}
			
			let failCounter = 0;
			let fail = ()=>
			{
				if(failCounter >= 1)
				{
					console.log("vivo 登陆失败！！！重试次数已达上限");
					User.initiUser(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

					}));
					return;
				}
				VIVOAPI.showDialog("提示", "登录失败，点击确定按钮重试", [
					{
						text: '确定',
						color: '#33dd44'
					}
				], () =>  {
						login();
						++failCounter;
					},
					() =>  {
						
					},
					() =>  {

					});
			}

			login();
		}
		else
		{
			User.testInitUser();//测试
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
