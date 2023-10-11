import View_XYXZS_Base from "../../../../View/ViewBase";

 

export default class Gold extends View_XYXZS_Base {
    protected _goldText: Laya.Text;

    onAwake() {
        this._goldText=this.owner.getChildByName("GoldText") as Laya.Text;
        this.SetGoldAmount(321);
        (this.owner as Laya.Sprite).visible=false;
    }

    SetGoldAmount(glodAmount:number){
        this._goldText.text=glodAmount.toString();
    }   

}