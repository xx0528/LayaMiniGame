export enum ryw_EventDef 
{
    ryw_None = 0,
    ryw_App_CloseFirstLoadingView = 500,
    ryw_AD_OnShareAdFail = 501,

    //当界面打开
    ryw_Game_OnViewOpen = 600,//{view : ViewDef}
    //当界面关闭
    ryw_Game_OnViewClose = 601,//{view : ViewDef}
    //当玩家金币变动
    ryw_Game_OnUserMoneyChange = 701,//{curr:number,last:number}
    //当玩家钻石变动
    ryw_Game_OnUserCrystalChange = 702,//{curr:number,last:number}
    //当玩家商店解锁
    Game_OnUserUnlockedStore = 703,//{unlocked:number}
    //当关卡开始
    ryw_Game_OnLevelStart = 1000,
    //当关卡结束
    ryw_Game_OnLevelComplate = 1001,
    //误点预加载完毕
    ryw_AD_WudianBanner_LoadComplete = 2217,
    //显示误点Banner
    ryw_AD_WudianBanner_Show = 2218,
    //影藏误点Banner
    ryw_AD_WudianBanner_Hide = 2219,
    //预加载Banner
    ryw_AD_WudianBanner_PreLoad =2220,    
    //当IP屏蔽状态更新
    ryw_App_OnUpdateIpBlockState = 2221,//{ipBlockFlag : number}
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。

    Game_OnMovePike = 10000, //移动钎子
    // Game_onGameLost = 10001, //
    Game_onOver = 10001,    //显示结束页
    Game_onOverAction = 10002, //结束动作，特写镜头
    Game_onNextGame = 10003, // 继续游戏
    Game_onWarriorMove = 11000,//猪脚移动
    Game_onQueenStand = 11001,//女主站立
    Game_onAllowTouch = 12000, //禁止移动钎子
    Game_onShowShade = 13000, //显示摄像头遮罩{x:pos.x, y:pos.y}
    Game_onMoveShade = 13001,//移动摄像头遮罩
    Game_onShowGuide = 14000, //第一关显示引导手势
    Game_onHideGuide = 14001, //第一关关闭引导手势
    // Game_LevelInitEnd = 11000, //关卡初始化结束
    // AD_OnBannerAdTouch = 15000, //点击banner广告 
    // AD_OnBannerAdSucceed = 15001, //点击banner广告跳转成功
    // AD_OnBannerAdFaild = 15002, //点击banner广告跳转失败
    // AD_OnBannerAdLoadResult = 15003 //banner 加载失败

    
    RewardVideoSuccess = 20010,
    RewardVideoFail = 20011,
    InsertVideoEnd =  20012
    
}