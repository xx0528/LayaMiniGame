export enum Event_ppxhc_Def 
{
    None = 0,
    App_CloseFirstLoadingView = 500,
    AD_OnShareAdFail = 501,

    //当界面打开
    Game_OnViewOpen = 600,//{view : ViewDef}
    //当界面关闭
    Game_OnViewClose = 601,//{view : ViewDef}
    //当玩家金币变动
    Game_OnUserMoneyChange = 701,//{curr:number,last:number}
    //当玩家钻石变动
    Game_OnUserCrystalChange = 702,//{curr:number,last:number}
    //当玩家商店解锁
    Game_OnUserUnlockedStore = 703,//{unlocked:number}
    //当关卡开始
    Game_OnLevelStart = 1000,
    //当关卡结束
    Game_OnLevelComplate = 1001,
    //误点预加载完毕
    AD_WudianBanner_LoadComplete = 2217,
    //显示误点Banner
    AD_WudianBanner_Show = 2218,
    //影藏误点Banner
    AD_WudianBanner_Hide = 2219,
    //预加载Banner
    AD_WudianBanner_PreLoad =2220,    
    //当IP屏蔽状态更新
    App_OnUpdateIpBlockState = 2221,//{ipBlockFlag : number}
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    

    //小车移动
    Car_Moving = 10001,
    //游戏场景准备完成
    Game_ReadyCompleted = 10002, 
    //游戏结算
    Game_Settle = 10003, 
    //小车皮肤
    Car_Skin = 10004,//{index:number,islock:bool}
    //小车死亡事件
    Car_Dead = 10005,//{isrelive:bool}
    //小车跳关事件
    Car_LevelUp = 10006,
    //小车死亡
    Car_Death = 10007,
    //货物转载
    Car_LoadUp = 10008, //{progress: number}
    //卸货
    Car_Unload = 10009, //{progress: number}
    //抢钱触发
    Game_RobmoneyStart = 10010,
    //抢钱结算
    Game_RobmoneyEnd = 10011,
    //游戏开始
    Game_GameStarted = 10012,
    //换车了
    Car_Change = 10013,
    //提示换车开始
    Car_ChangeTipStart = 10014,
    //提示换车结束
    Car_ChangeTipEnd = 10015,

    
    RewardVideoSuccess = 20010,
    RewardVideoFail = 20011,
    InsertVideoEnd =  20012
}