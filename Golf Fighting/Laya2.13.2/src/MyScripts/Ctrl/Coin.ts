import Us_sdlyg_er from "../../User/User";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class Coin extends Laya.Script {

    private coin_text:Laya.Text;
    private amount:number;

    constructor() { super(); }
    
    onAwake(){
        this.amount = Us_sdlyg_er.getMoney();
        this.coin_text = this.owner.getChildByName("amount") as Laya.Text;
        this.coin_text.text = this.amount.toString();

        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.Game_OnUserMoneyChange,this,this.updateCoin);
    }

    onDestroy(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.Game_OnUserMoneyChange,this,this.updateCoin);
    }

    updateCoin(){
        let coin = Us_sdlyg_er.getMoney();
        let step = (coin-this.amount)/10;
        for(let i=0; i<10; i++){
            Laya.timer.once(20*i,this,()=>{
                this.amount+=step;
                this.coin_text.text = Math.floor(this.amount).toString();    
            })
        }
    }
}