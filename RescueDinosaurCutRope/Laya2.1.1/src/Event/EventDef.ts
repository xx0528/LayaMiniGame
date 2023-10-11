export enum Event_JJKLBB_Def 
{
    Non_JJKLBB_e = 0,
    App_CloseF_JJKLBB_irstLoadingView = 500,
    AD_OnShare_JJKLBB_AdFail = 501,

    //当界面打开
    Game_OnVie_JJKLBB_wOpen = 600,//{view : ViewDef}
    //当界面关闭
    Game_OnVie_JJKLBB_wClose = 601,//{view : ViewDef}
    //当玩家金币变动
    Game_OnUser_JJKLBB_MoneyChange = 701,//{curr:number,last:number}
    //当玩家钻石变动
    Game_OnUserCr_JJKLBB_ystalChange = 702,//{curr:number,last:number}
    //当关卡开始
    Game_OnLeve_JJKLBB_lStart = 1000,
    //当关卡结束
    Game_OnLeve_JJKLBB_lComplate = 1001,
    //误点预加载完毕
    AD_Wudia_JJKLBB_nBanner_Load_JJKLBB_Complete = 2217,
    //显示误点Banner
    AD_Wudi_JJKLBB_anBanner_Show = 2218,
    //影藏误点Banner
    AD_Wudi_JJKLBB_anB_JJKLBB_anner_Hide = 2219,
    //预加载Banner
    AD_WudianBa_JJKLBB_nner_PreLoad =2220,    
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    
    //当玩家体力变动
    Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange = 10001,//{curr:number,last:number}
    //当玩家解锁角色皮肤
    Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin = 10002,//{skin:number}
    //当玩家当前角色皮肤发生变化
    Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change = 10003,//{curSkin:number,lastSkin:number}

    //开始游戏
    Game_Start_JJKLBB_Game = 11001,//{levelNum : number,costEnergy : number,crystalReward : number}
    //重新开始游戏
    Game_Restar_JJKLBB_tGame = 11002,
    //退出游戏
    Game_Exit_JJKLBB_Game = 11003,
    //当游戏结束
    Game_onGameC_JJKLBB_omplate = 11004,//{isWin : boolean,levelNum : number,crystalReward : number}
    //播放Bgm
    Game_PlayBgm = 11005,
    //停止Bgm
    Game_StopBgm = 11006,
    AD_OnShareAdFail_UseCancel = 502,

    //设置广告UI遮罩
    AD_MainAdUiMask = 503,//{Visible : boolean}
    AD_SidePopView = 504,//{Visible : boolean}
    AD_SwitchBanner = 505,

    RewardVideoSuccess = 20010,
    RewardVideoFail = 20011,
    InsertVideoEnd =  20012
}