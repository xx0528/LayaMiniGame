import ViewBase from "../ViewBase";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import Us_JJKLBB_er from "../../User/User";
import Util_JJKLBB_it from "../../Utilit";
import LevelStateBox from "./LevelStateBox";
import LevelSta_JJKLBB_teData from "../../Data/LevelStateData";
import LevelC_JJKLBB_onfig, { LevelCo_JJKLBB_nfigData } from "../../Config/LevelConfig";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import WXAPI from "../../WXAPI";

export default class LevelStateView extends ViewBase
{
    protected _topZone : Laya.Clip;
    protected _crystalText : Laya.Text;
    protected _energyText : Laya.Text;
    protected _closeBtn : Laya.Sprite;

    protected _centerZone : Laya.Sprite;
    protected _levelNumText : Laya.Text;
    protected _levelStateList : Laya.List;

    onAwake()
    {
        this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        if(Util_JJKLBB_it.isIp_JJKLBB_honeX())
        {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text") as Laya.Text;
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text") as Laya.Text;
        this._closeBtn = this._topZone.getChildByName("CloseBtn") as Laya.Sprite;

        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this._levelNumText =  this._centerZone.getChildByName("LevelNumText") as Laya.Text;
        this._levelStateList = this._centerZone.getChildByName("List") as Laya.List;
        this._levelStateList.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._levelStateList.vScrollBarSkin = "";
    }

    addEvent()
    {
        this._closeBtn.on(Laya.Event.CLICK,this,()=>{
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MainView);
            this.closeView();
        });
        
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);
    }

    removeEvent()
    {
        this._closeBtn.on(Laya.Event.CLICK,this,this.closeView);
        
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        WXAPI.showInterstitialAd(()=>{},()=>{});
        this._crystalText.text = String(Us_JJKLBB_er.getCr_JJKLBB_ystal());
        this._energyText.text = String(Us_JJKLBB_er.getEn_JJKLBB_ergy());
        this._levelNumText.text = String(Us_JJKLBB_er.getLev_JJKLBB_eNum());
        this.refreshLevelStateList();
        for(var i=0;i < this._levelStateList.array.length;++i)
        {
            var d = this._levelStateList.array[i] as LevelCo_JJKLBB_nfigData;
            if(d.levelNum == Us_JJKLBB_er.getLev_JJKLBB_eNum())
            {
                this._levelStateList.scrollTo(i);
                break;
            }
        }
        LevelStateBox.LockClick = false;
    }

    protected onCrystalChange(para)
    {
        var curr : number = para.curr;
        var last : number = para.last;
        this._crystalText.text = String(curr);
    }

    protected onEnergyChange(para)
    {
        var curr : number = para.curr;
        var last : number = para.last;
        this._energyText.text = String(curr);
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._levelStateList.array[index] as LevelCo_JJKLBB_nfigData;
        var box : LevelStateBox = cell.getComponent(LevelStateBox) as LevelStateBox;
        box.setData(data);
    }

    protected refreshLevelStateList()
    {
        var levelDatas = LevelC_JJKLBB_onfig.getIns_JJKLBB_tance().getLevelC_JJKLBB_onfigDatas();
        var dataArray = new Array<LevelCo_JJKLBB_nfigData>();
        for (var i = 0; i < levelDatas.length; ++i)  
        {
            var data = levelDatas[i].clone();
            dataArray.push(data);
        }
        this._levelStateList.array = dataArray;
    }
}