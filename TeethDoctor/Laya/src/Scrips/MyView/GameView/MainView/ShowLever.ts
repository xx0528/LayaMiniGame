import Even_XYXZS_tMgr from "../../../../Event/EventMgr";
import Gam_XYXZS_eMgr from "../../../../Mgr/GameMgr";

export default class ShowLever extends Laya.Script {
    protected _leverIndexOne: Laya.Clip;
    protected _leverIndexTwo: Laya.Clip;
protected _x:number=1;

    onAwake() {

        this._leverIndexOne = this.owner.getChildByName("leverIndexOne") as Laya.Clip;
        this._leverIndexTwo = this.owner.getChildByName("leverIndexTwo") as Laya.Clip

        this._leverIndexOne.clipX = 10;
        this._leverIndexTwo.clipX = 10;
        //this.SetClipLever(1);
      this.SetClipLever(Gam_XYXZS_eMgr.getIns_XYXZS_tance().Curr_XYXZS_entLevel);
    }

    SetClipLever(leverindex: number) {
        if (leverindex < 10)  {
            //    this._leverIndexTwo.visible=false;
            this._leverIndexOne.index = leverindex;
        }
        else if (leverindex < 100)  {
            //  this._leverIndexTwo.visible=true;
            this._leverIndexOne.index = leverindex % 10;
            this._leverIndexTwo.index = (leverindex - leverindex % 10) / 10;
        }
        else  {
            //超过99关
            this._leverIndexOne.index = 9;
            this._leverIndexTwo.index = 9;
        }
    }


}