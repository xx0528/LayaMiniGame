import ViewBase from "../ViewBase";
import Util_JJKLBB_it from "../../Utilit";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import ActorSkinBox from "./ActorSkinBox";
import SkinC_JJKLBB_onfig, { SkinCon_JJKLBB_figData } from "../../Config/SkinConfig";
import Us_JJKLBB_er from "../../User/User";

export default class ActorSkinView extends ViewBase
{
    protected _topZone : Laya.Clip;
    protected _crystalText : Laya.Text;
    protected _energyText : Laya.Text;
    protected _closeBtn : Laya.Sprite;

    protected _centerZone : Laya.Clip;
    protected _skinStateList : Laya.List;

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

        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Clip;
        this._skinStateList = this._centerZone.getChildByName("List") as Laya.List;
        this._skinStateList.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._skinStateList.hScrollBarSkin = "";
    }

    addEvent()
    {
        this._closeBtn.on(Laya.Event.CLICK,this,this.closeView);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin,this,this.refreshActorSkinStateList);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change,this,this.refreshActorSkinStateList);
    }

    removeEvent()
    {
        this._closeBtn.on(Laya.Event.CLICK,this,this.closeView);
        
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange,this,this.onCrystalChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange,this,this.onEnergyChange);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin,this,this.refreshActorSkinStateList);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change,this,this.refreshActorSkinStateList);
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this.refreshActorSkinStateList();

        var currentSkinIndex = Us_JJKLBB_er.getCurA_JJKLBB_ctorSkin();
        for(var i=0;i < this._skinStateList.array.length;++i)
        {
            if(this._skinStateList.array[i].skinIndex == currentSkinIndex)
            {
                this._skinStateList.scrollTo(i);
                break;
            }
        }

        this._crystalText.text = String(Us_JJKLBB_er.getCr_JJKLBB_ystal());
        this._energyText.text = String(Us_JJKLBB_er.getEn_JJKLBB_ergy());
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
        var data = this._skinStateList.array[index] as SkinCon_JJKLBB_figData;
        var box : ActorSkinBox = cell.getComponent(ActorSkinBox) as ActorSkinBox;
        box.setData(data);
    }

    protected refreshActorSkinStateList()
    {
        var skinDatas = SkinC_JJKLBB_onfig.getIns_JJKLBB_tance().getSkin_JJKLBB_ConfigDatas();
        var dataArray = new Array<SkinCon_JJKLBB_figData>();
        for (var i = 0; i < skinDatas.length; ++i)  
        {
            var data = skinDatas[i].clone();
            dataArray.push(data);
        }
        this._skinStateList.array = dataArray;
    }
}