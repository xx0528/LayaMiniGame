
import SceneManager from "../../../../Script/GameCore/SceneManager";
import BadTooth from "./BadTooth";
import { ToothStepType } from "../../../../Script/Enum";
import Vibr_XYXZS_ateMgr from "../../../../Mgr/VibrateMgr";
import Sou_XYXZS_ndMgr from "../../../../Mgr/SoundMgr";


export default class ToothShow extends Laya.Script {
    protected _badTooth1: Laya.Sprite;
    protected _badTooth2: Laya.Sprite;
    protected _badTooth3: Laya.Sprite;
    protected _badTooth4: Laya.Sprite;

    protected _numberBg: Laya.Sprite;

    protected _toothShow1: BadTooth;
    protected _toothShow2: BadTooth;
    protected _toothShow3: BadTooth;
    protected _toothShow4: BadTooth;

    protected _progress_Bar: Laya.Image;

    protected _totalProgress: number = 0;
    protected _currentProgress: number = 0;
    protected _Smile: Laya.Sprite;

    protected _badStepNumber: number;
    protected badTypeArray: ToothStepType[] = new Array();

    protected _guider: Laya.UIComponent;
    onAwake() {
        this._progress_Bar = this.owner.getChildByName("Progress").getChildByName("Progress_Bar") as Laya.Image;
        this._badTooth1 = this.owner.getChildByName("BadTooth1") as Laya.Sprite;
        this._badTooth2 = this.owner.getChildByName("BadTooth2") as Laya.Sprite;
        this._badTooth3 = this.owner.getChildByName("BadTooth3") as Laya.Sprite;
        this._badTooth4 = this.owner.getChildByName("BadTooth4") as Laya.Sprite;

        this._Smile = this.owner.getChildByName("Smile") as Laya.Sprite;

        this._toothShow1 = this._badTooth1.getComponent(BadTooth);
        this._toothShow2 = this._badTooth2.getComponent(BadTooth);
        this._toothShow3 = this._badTooth3.getComponent(BadTooth);
        this._toothShow4 = this._badTooth4.getComponent(BadTooth);

        this._guider = this.owner.getChildByName("Guider") as Laya.UIComponent;
        let skeleton = new Laya.Skeleton();
        skeleton.load("subRes/guider/NewProject.sk", Laya.Handler.create(this, (res) => {
            this._guider.addChild(res);
            res.x = 250;
            res.y = 100;
            res.play(0, true);
        }));
        this._guider.on(Laya.Event.MOUSE_OVER, this, () => {
            this._guider.visible = false;
        })
        // this.initBadTooth(4);
    }
    onStart() {
        for (var i = 0; i < SceneManager.Instance.ToothStepList.length; i++) {
            this.badTypeArray.push(SceneManager.Instance.ToothStepList[i].ToothStepType);
            this._totalProgress += SceneManager.Instance.ToothStepList[i].ToothCount;
        }
        this.initBadTooth(this.badTypeArray);
        this._toothShow1.SetToothNumber((SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount));
        this._badStepNumber = (SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount);
        this.ShowBadTooth(1);
        this._toothShow1.SetToothNumber(this._badStepNumber);
        this._progress_Bar.width = 0;
        //  this.initBadTooth();
        /*
          this._toothShow1.SetToothImage(BadToothTypr.CongYa);
          Laya.timer.once(2000, this, () => {
              this.ShowBadTooth(1);
              this._toothShow1.SetToothNumber(10);
              this.ShowBadTooth(2);
              this._toothShow2.SetToothNumber(10);
          });
         
         var Ar:BadToothTypr[]=new Array(4);
Ar[0]=BadToothTypr.BaYa;
Ar[1]=BadToothTypr.CongYa;
Ar[2]=BadToothTypr.GoldTooth;
Ar[3]=BadToothTypr.GuYa;
console.log(Ar);
this.initBadTooth(Ar);
this._toothShow1.SetToothNumber(5);
this.ShowBadTooth(1);

Laya.timer.once(1000,this,()=>{this._toothShow1.SetToothNumber(4);
});
Laya.timer.once(2000,this,()=>{this._toothShow1.SetToothNumber(3);
});
Laya.timer.once(3000,this,()=>{this._toothShow1.SetToothNumber(2);
});
Laya.timer.once(4000,this,()=>{this._toothShow1.SetToothNumber(1);
});
Laya.timer.once(5000,this,()=>{this._toothShow1.SetToothNumber(0);
}); */
    }
    onUpdate() {

        if (this._badStepNumber != (SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount)) {
            this._badStepNumber = (SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount);
            //console.log(SceneManager.Instance.CurrentToothStep.ToothList.length-SceneManager.Instance.CurrentToothStep.CleandToothCount);
            if (SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount == 0) {
                Vibr_XYXZS_ateMgr.ibra_XYXZS_teLong();
                switch (SceneManager.Instance.CurrentToothStepIndex) {
                    case 1: this._toothShow1.SetToothNumber(this._badStepNumber); this.ShowBadTooth(2); break;
                    case 2: this._toothShow2.SetToothNumber(this._badStepNumber); this.ShowBadTooth(3); break;
                    case 3: this._toothShow3.SetToothNumber(this._badStepNumber); this.ShowBadTooth(4); break;
                    case 4: this._toothShow4.SetToothNumber(this._badStepNumber); break;
                    default: break;
                }
                if (!SceneManager.Instance.IsGameOver) {
                    this._guider.visible = true;
                }
                else {
                    this._currentProgress = this._totalProgress;
                }
                this.showSmile();
            }
            else {
                Vibr_XYXZS_ateMgr.vibr_XYXZS_ateShort();
                switch (SceneManager.Instance.CurrentToothStepIndex) {
                    case 0: this._toothShow1.SetToothNumber(this._badStepNumber); break;
                    case 1: this._toothShow2.SetToothNumber(this._badStepNumber); break;
                    case 2: this._toothShow3.SetToothNumber(this._badStepNumber); break;
                    case 3: this._toothShow4.SetToothNumber(this._badStepNumber); break;
                    default: break;
                }
                Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("单个完成");
                this._currentProgress++;
            }
        }
        this._progress_Bar.width = (this._currentProgress / this._totalProgress) * 490;
    }
    showSmile() {
        this._Smile.x = Math.min(Math.max(130, (750 * Math.random())), 500);
        this._Smile.y = Math.min(Math.max(430, (750 * Math.random())), 850);
        Laya.Tween.to(this._Smile, { alpha: 1 }, 500);
        Laya.timer.once(1000, this, () => { Laya.Tween.to(this._Smile, { alpha: 0 }, 500); });
    }

    //初始关卡中提示图标个数
    initBadTooth(badTypeArray: ToothStepType[]) {
        var TypeCount: number = badTypeArray.length;
        var _posX: number = Laya.stage.width / 2;
        if (TypeCount == 1) {
            this._badTooth1.x = _posX;
            this._badTooth2.visible = false;
            this._badTooth3.visible = false;
            this._badTooth4.visible = false;
            this._toothShow1.SetToothImage(badTypeArray[0]);
        }
        else if (TypeCount == 2) {
            this._badTooth1.x = _posX - 75;
            this._badTooth2.x = _posX + 75;
            this._badTooth3.visible = false;
            this._badTooth4.visible = false;
            this._toothShow1.SetToothImage(badTypeArray[0]);
            this._toothShow2.SetToothImage(badTypeArray[1]);
        }
        else if (TypeCount == 3) {

            this._badTooth1.x = _posX - 150;
            this._badTooth2.x = _posX;
            this._badTooth3.x = _posX + 150;
            this._badTooth4.visible = false;
            this._toothShow1.SetToothImage(badTypeArray[0]);
            this._toothShow2.SetToothImage(badTypeArray[1]);
            this._toothShow3.SetToothImage(badTypeArray[2]);

        }
        else if (TypeCount == 4) {

            this._badTooth1.x = _posX - 225;
            this._badTooth2.x = _posX - 75;
            this._badTooth3.x = _posX + 75;
            this._badTooth4.x = _posX + 225;
            this._toothShow1.SetToothImage(badTypeArray[0]);
            this._toothShow2.SetToothImage(badTypeArray[1]);
            this._toothShow3.SetToothImage(badTypeArray[2]);
            this._toothShow4.SetToothImage(badTypeArray[3]);

        }

    }


    //放大显示当前正在进行的步骤的图标
    ShowBadTooth(index: number) {
        switch (index) {
            case 1: Laya.Tween.to(this._badTooth1, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
                this._toothShow1.ShowNumber();
            }), null, true); break;
            case 2: Laya.Tween.to(this._badTooth2, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
                this._toothShow2.ShowNumber();
            }), null, true); this._toothShow2.ShowNumber(); break;
            case 3: Laya.Tween.to(this._badTooth3, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
                this._toothShow3.ShowNumber();
            }), null, true); this._toothShow3.ShowNumber(); break;
            case 4: Laya.Tween.to(this._badTooth4, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
                this._toothShow4.ShowNumber();
            }), null, true); this._toothShow4.ShowNumber(); break;
            default: break;
        }
    }

}