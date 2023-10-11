import WXAPI from "../../WXAPI";
import Share_sdlyg_Ad from "../ShareAd";
import ALD from "../../ALD";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import LoopAdBox from "../View/LoopAdBox";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";

export default class LoopAdBoxToMoreGame extends LoopAdBox 
{

    protected onSpClick()
    {
        var data = this._data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_sdlyg_Ad.reportUserClick(data.appid);
                    ALD.aldSendReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        let data: any = {
                            onlyShow:true
                        }
                        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGame, data);
                        ALD.aldSendReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPOAPI.navigateToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_sdlyg_Ad.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMiniGameAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_sdlyg_Ad.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}