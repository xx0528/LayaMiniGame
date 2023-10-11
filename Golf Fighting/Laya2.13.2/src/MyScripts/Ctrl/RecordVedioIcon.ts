import WudianMgr from "../../Mgr/WudianMgr";

export default class RecordVedioIcon extends Laya.Script {

    
    private mIcon:Laya.Sprite;
    constructor() { super(); }

    onAwake(){
        this.mIcon = this.owner as Laya.Sprite;
    }

    onStart(){
        if(WudianMgr.WudianFlag){
            this.mIcon.alpha = 0;
        }
    }
}