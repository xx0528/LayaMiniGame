import LotteryView from "../View/LotteryView";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class TreasureBox extends Laya.Script {
    
    private m_treasure:Laya.Sprite;
    private m_award:Laya.Sprite;
    private m_coin:Laya.Sprite;
    private m_num:Laya.Text;
    private m_prop:Laya.Image;
    private m_view:LotteryView;
    private m_owner:Laya.Box;
    private could_click:boolean = true;
    private m_rewardIcon:Laya.Sprite;

    private treasure_tween:Laya.Tween;


    constructor() { super(); }
    
    onAwake(){
        this.m_owner = this.owner as Laya.Box;
        this.m_treasure = this.m_owner.getChildByName("treasure") as Laya.Sprite;
        this.m_award = this.m_owner.getChildByName("award") as Laya.Sprite;
        this.m_coin = this.m_award.getChildByName("coin") as Laya.Sprite;
		this.m_num = this.m_coin.getChildByName("num") as Laya.Text;
        this.m_prop = this.m_award.getChildByName("prop") as Laya.Image; 
        this.m_rewardIcon = this.m_owner.getChildByName("m_rewardIcon") as Laya.Sprite;    
        this.m_award.visible = false;
        this.m_coin.visible = false;
        this.m_num.visible = false;
        this.m_prop.visible = false;
        this.m_rewardIcon.visible = false;
        
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ShowrRewardIcon,this,this.showrRewardIcon);
    }

    onDestroy(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ShowrRewardIcon,this,this.showrRewardIcon);
        
    }

    onUpdate(){
        if(this.m_treasure.visible && !this.treasure_tween && Math.random()<0.0025)this.treasureShow();
    }

//宝箱初始化
    Init(coin:number,url?:string,complete?:Laya.Handler){
        if(url){
            //该宝盒是道具
            this.m_prop.loadImage(url,Laya.Handler.create(this,()=>{
                complete.method();
                this.m_prop.visible = true;
            }));
        }else{
            //该宝盒是金币
            this.m_coin.visible = true;
            this.m_num.text = coin.toString();
            this.m_num.visible = true;
        }
    }
/**
 * 宝箱动画
 */
    treasureShow(){
        let self = this;
        this.treasure_tween = Laya.Tween.to(self.m_treasure,{rotation:15},150,Laya.Ease.quadOut,Laya.Handler.create(self,()=>{
            Laya.Tween.to(self.m_treasure,{rotation:-15},300,Laya.Ease.quadOut,Laya.Handler.create(self,()=>{
                Laya.Tween.to(self.m_treasure,{rotation:0},150,Laya.Ease.quadOut,Laya.Handler.create(self,()=>{
                    this.treasure_tween = null;
                }))
            }))
        }))
    }

    ClickBox(){
        this.m_view.clickAward(this);
    }

    setView(view:LotteryView){
        this.m_view = view;
    }
/**
 * 展示宝箱内容
 */
    showBox(){
        if(this.treasure_tween)this.treasure_tween.clear();
        this.m_treasure.visible = false;
        this.m_award.visible = true;
        if(this.could_click)this.could_click = false;
        this.m_rewardIcon.visible = false;
    }

    onMouseDown(){
        if(this.could_click)this.ClickBox();
        this.m_owner.scale(0.92,0.92);
    }

    onMouseUp(){
        this.m_owner.scale(1,1);
    }

    showrRewardIcon(){
        if(!this.m_award.visible)this.m_rewardIcon.visible = true;
    }
	
}