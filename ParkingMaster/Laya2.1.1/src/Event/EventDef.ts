export enum EventDef 
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
    
    //刷新关卡
    Game_Refresh = 10000,
    //关卡提示
    Game_Guide = 10001,
    //关卡智能提示下一步
    Game_Tip = 10002,
    //关卡点击开始通知
    Game_TouchStart = 10003,
    //使能车点击事件
    Game_EnableCarTouch = 10004,

    //控制显示首页横向banner
    AD_HoriBanner_Enable = 20001,

    
    RewardVideoSuccess = 20010,
    RewardVideoFail = 20011,
    InsertVideoEnd =  20012
}