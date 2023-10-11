export enum Event_wcjtn_Def 
{
    None = 0,
    App_Close_wcjtn_First_wcjtn_Loading_wcjtn_View = 500,
    AD_On_wcjtn_ShareAd_wcjtn_Fail = 501,

    //当界面打开
    Game_On_wcjtn_View_wcjtn_Open = 600,//{view : ViewDef}
    //当界面关闭
    Game_On_wcjtn_View_wcjtn_Close = 601,//{view : ViewDef}
    //当玩家金币变动
    Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change = 701,//{curr:number,last:number}
    //当玩家钻石变动
    Game_On_wcjtn_User_wcjtn_Crystal_wcjtn_Change = 702,//{curr:number,last:number}
    //当玩家商店解锁
    Game_OnUserUnlockedStore = 703,//{unlocked:number}
    //当关卡开始
    Game_On_wcjtn_Level_wcjtn_Start = 1000,
    //当关卡结束
    Game_On_wcjtn_Level_wcjtn_Complate = 1001,
    //误点预加载完毕
    AD_Wu_wcjtn_dianBanner_Load_wcjtn_Complete = 2217,
    //显示误点Banner
    AD_Wu_wcjtn_dian_wcjtn_Banner_Show = 2218,
    //影藏误点Banner
    AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide = 2219,
    //预加载Banner
    AD_Wu_wcjtn_dian_wcjtn_Banner_Pre_wcjtn_Load =2220,    
    //当IP屏蔽状态更新
    App_On_wcjtn_Update_wcjtn_IpBlockState = 2221,//{ipBlockFlag : number}
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    

    OnGameMenu = 10001,
    OnGameStart = 10002,
    OnGameOver = 10003,
    OnGameRelive = 10004,

    ToOverLane = 20001,
    ToSlowLane = 20002,
    RecoverCoin = 20003,    //回收所有道路上的金币
    ShowResults = 20004,
    OverCar = 20005,
    ChangeEnv = 20006,
    ChangeRoadLevel = 20007,    //循环关卡的切换

    
    RewardVideoSuccess = 20010,
    RewardVideoFail = 20011,
    InsertVideoEnd =  20012
}