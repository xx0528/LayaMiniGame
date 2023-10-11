export enum Even_XYXZS_tDef 
{
    N_XYXZS_one = 0,
    App_Close_XYXZS_FirstLoadingView = 500,
    AD_OnShare_XYXZS_AdFail = 501,

    //当界面打开
    Game_OnV_XYXZS_iewOpen = 600,//{view : ViewDef}
    //当界面关闭
    Game_OnVi_XYXZS_ewClose = 601,//{view : ViewDef}
    //当玩家金币变动
    Game_OnUse_XYXZS_rMoneyChange = 701,//{curr:number,last:number}
    //当玩家钻石变动
    Game_OnUs_XYXZS_erCrystalChange = 702,//{curr:number,last:number}
    //当关卡开始
    Game_OnLeve_XYXZS_lStart = 1000,
    //当关卡结束
    Game_OnLeve_XYXZS_lComplate = 1001,
    //误点预加载完毕
    AD_WudianBan_XYXZS_ner_LoadComplete = 2217,
    //显示误点Banner
    AD_WudianBan_XYXZS_ner_Show = 2218,
    //影藏误点Banner
    AD_WudianB_XYXZS_anner_Hide = 2219,
    //预加载Banner
    AD_Wudian_XYXZS_Banner_PreLoad =2220,    
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    AD_Switch_XYXZS_Banner=505,
    APP_Load_XYXZS_Compelete = 503,//[true or false]关闭还是打开Banner;

    
    RewardVideoSuccess = 20010,
    RewardVideoFail = 20011,
    InsertVideoEnd =  20012
}