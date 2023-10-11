import ViewBase from "../../View/ViewBase";
import SkinTitle from "../Ctrl/SkinTitle";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import PlayerManager from "../Manager/PlayerManager";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import PropManager, { PropType } from "../Manager/PropManager";
import Us_sdlyg_er from "../../User/User";

export default class BagView extends ViewBase {
    
    private title_list:SkinTitle[] = new Array();
    private titie_name_list:string[]=["people","club","ball"];

    private btn_home:Laya.Button;
    private btn_getSkin:Laya.Button;    
    private txt_getSkinNum:Laya.Text;

    constructor() { super(); }

    onAwake(){
        this.btn_home = this.owner.getChildByName("btn_home") as Laya.Button;
        this.btn_getSkin = this.owner.getChildByName("btn_getSkin") as Laya.Button;        
        this.txt_getSkinNum = this.btn_getSkin.getChildByName("num") as Laya.Text;

        for(let i = 0; i<this.titie_name_list.length;i++){
            let title = this.owner.getChildByName("title_"+this.titie_name_list[i]).getComponent(SkinTitle);
            this.title_list.push(title);
        }
    }
    
    onStart(){
        let self = this;
        //进入指定的皮肤展示 
        if(this._data){
            this.chooseTitle(this._data.type,this._data.id);
            Laya.timer.once(100,self,()=>{
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GetNewSkin,(self._data.type+self._data.id));
            })
        }else{
            this.chooseTitle();
        }
        this.setGetSkinBtn();        
    }   

    addEvent(){
        this.btn_home.on(Laya.Event.CLICK,this,this.clickBack);
        this.btn_getSkin.on(Laya.Event.CLICK,this,this.clickGetSkin);
    }

    clickBack(){
        PlayerManager.Instance().savePlayerSet();
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);        
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.BagView);        
    }

    clickGetSkin(){
        Us_sdlyg_er.subMoney(Us_sdlyg_er.getNeedCoin());
        Us_sdlyg_er.setNeedCoin();
        let prop_type:string = "";
        let prop_id:number = 0;
        do {
            let id = Math.floor(Math.random()*PropManager.getInstance().getPropTypeNum());     
            let amount = PropManager.getInstance().getPropBase(id).amount;
            prop_type = PropManager.getInstance().getPropBase(id).type;
            prop_id = Math.floor(Math.random()*amount);
        } while (Us_sdlyg_er.ownerProp(prop_type+prop_id));
        Us_sdlyg_er.unlockProp(prop_type+prop_id);
        this.chooseTitle(prop_type,prop_id);
        Laya.timer.once(100,this,()=>{
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GetNewSkin,(prop_type+prop_id));
        })
        this.setGetSkinBtn();
    }

    setGetSkinBtn(){
        this.btn_getSkin.disabled = (!(Us_sdlyg_er.getNeedCoin()<=Us_sdlyg_er.getMoney())) || Us_sdlyg_er.ownerPropAll();
        this.txt_getSkinNum.text = Us_sdlyg_er.getNeedCoin().toString();
    }

    chooseTitle(name:string = "people",id:number=0){
        console.log(name);
        this.title_list.forEach(title => {
            if(title.getName()==name){
                title.onChoose(id);
            }else{
                title.onNotChoose();
            }
        });
    }
    
}