import AppSwitchConfig from "../Config/AppSwitchConfig";
import CachedWXBannerAd from "../CachedWXBannerAd";
import Event_sdlyg_Mgr from "../Event/EventMgr";
import { Event_sdlyg_Def } from "../Event/EventDef";
import WudianMgr from "../Mgr/WudianMgr";

export default class WudianSprite extends Laya.Script {


    private m_owner:Laya.Sprite;

    /** @prop {name:tar_button, tips:"目标按钮", type:Node}*/
    public tar_button: Laya.Button;

    /** @prop {name:move_dis, tips:"按钮移动距离", type:Number, default:0}*/
    public move_dis: number = 0;
    
    constructor() { super(); }
    
    onAwake(){
        this.m_owner = this.owner as Laya.Sprite;
        this.m_owner.width = this.tar_button.width;
        this.m_owner.height = this.tar_button.height;
        this.m_owner.pos(this.tar_button.x,this.tar_button.y);

        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ShowWudianBanner,this,this.wudianShow);
    }

    onDestroy(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ShowWudianBanner,this,this.wudianShow);
        
    }

    onStart(){
        this.m_owner.visible = this.tar_button.visible;
        if(WudianMgr.WudianFlag && this.m_owner.visible){
            this.inWudianStart();
            this.m_owner.on(Laya.Event.CLICK,this,()=>{
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ShowWudianBanner);
            })
            this.m_owner.mouseThrough = false;
        }
    }   

    inWudianStart(){
        let x = this.m_owner.x;
        let y = this.m_owner.y+this.move_dis;
        this.m_owner.pos(x,y);
        this.tar_button.pos(x,y);
    }

    wudianShow(){
        Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer*1000,this,()=>{
            CachedWXBannerAd.show();
        })
        Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer*1000,this,()=>{
            let x = this.tar_button.x;
            let y = this.tar_button.y-this.move_dis;
            this.tar_button.pos(x,y);
            this.m_owner.destroy();
        })

    }
}