export enum Event_sdlyg_Def 
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
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    

    GameStart = 10001,    //游戏开始
    GameOver = 10002,       //游戏结束
    ChooseProp = 10003,     //选择道具
    ChangeBall = 10004,         //改变球的皮肤，  在人管理类里面播放，由所有球监听
    GetNewSkin = 10005,
    LastBall = 10006,        //最后一个球
    ChangePage = 10007,         //监听翻页
    ResetIcon = 10008,      //用于每次重新选择title的时候可以回到第一页
    SubBall = 10009,        //用于游戏界面监听球的减少
    PlayerUpdatePos = 10010,        //刷新游戏界面里面球的数量
    HideGuide = 10011,      //隐藏指引
    ChangeGamingPic = 10012,      //改变游戏界面中头像显示情况
    HideGamingPic = 10013,      //隐藏游戏界面中的头像
    ShowrRewardIcon = 10014,
    ShowWudianBanner = 10015,   //展示误点banner

    MoreGameView = 20001,
    OutMoreGameView = 20002,
    OutSideADView = 20003,

    RewardVideoSuccess = 20004,
    RewardVideoFail = 20005,
}