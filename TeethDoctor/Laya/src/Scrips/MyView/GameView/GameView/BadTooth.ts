import { ToothStepType } from "../../../../Script/Enum";



export default class BadTooth extends Laya.Script {
    
/** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:5000}*/
public TwinkleSpeed: number = 4000;
/** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
public TwinkleMinSize: number = 1.45;
/** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
public TwinkleMaxSize: number = 1.55;

protected _displaySp: Laya.Sprite;
protected _aniForward: boolean = false;
protected _originSize = 1.45;

   // protected _i: number = 1;
    protected _numberBg: Laya.Sprite;
    protected _numberText: Laya.Text;

    protected _over: Laya.Sprite;

    protected _badToothArray: Laya.Sprite[] = new Array(6);
    onAwake() {

        this._displaySp = this.owner as Laya.Sprite;
        this._originSize = this._displaySp.scaleX;

        this._badToothArray[ToothStepType.PaintTooth] = this.owner.getChildByName("GoldTooth") as Laya.Sprite;
        this._badToothArray[ToothStepType.CalculusTooth] = this.owner.getChildByName("YaGou") as Laya.Sprite;
        this._badToothArray[ToothStepType.PullTooth] = this.owner.getChildByName("BaYa") as Laya.Sprite;
        this._badToothArray[ToothStepType.BraceTooth] = this.owner.getChildByName("GuYa") as Laya.Sprite;
        this._badToothArray[ToothStepType.FillingTooth] = this.owner.getChildByName("CongYa") as Laya.Sprite;
        this._badToothArray[ToothStepType.CutTooth] = this.owner.getChildByName("ZhuangYa") as Laya.Sprite;

        this._numberBg = this.owner.getChildByName("Number") as Laya.Sprite;
        this._numberText = this._numberBg.getChildByName("Text") as Laya.Text;

        this._over = this.owner.getChildByName("Over") as Laya.Sprite;
        this._numberBg.visible = false;
        
       // console.log(this._badToothArray[BadToothTypr.GoldTooth]);

       // this.SetToothImage(BadToothTypr.BaYa);
       this._displaySp.scale(this._originSize, this._originSize);

    }
    onUpdate() {
        if(this._numberBg.visible)
        {
            this.displayAni();

        }
    }

    protected displayAni() {
        if (!this._aniForward) {
            var scale = this._displaySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX <= this.TwinkleMinSize * this._originSize) {
                this._aniForward = true;
            }
        }
        else {
            var scale = this._displaySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX >= this.TwinkleMaxSize * this._originSize) {
                this._aniForward = false;
            }
        }
    }
//显示图标
    public ShowNumber()  {
        this._numberBg.visible = true;

    }
//更新设置步骤剩余数 
    public SetToothNumber(count: number) {
        if (count > 0) {

            this._numberBg.visible=true;
            var countstr: string = "X" + count;
            this._numberText.text = countstr;
            
            Laya.Tween.to(this._numberText, { scaleX: 1.3, scaleY: 1.3 }, 100);
            
            Laya.timer.once(150, this, () => {
                Laya.Tween.to(this._numberText, { scaleX: 1, scaleY: 1 }, 100);
            });

        }
        else {
            this._numberBg.visible = false;
            for (var i = 1; i < this._badToothArray.length; i++) {
                this._badToothArray[i].visible = false;
            }
            this._over.visible = true;
            Laya.Tween.to(this.owner, { scaleX: 0.6, scaleY: 0.6 }, 500);
        }

    }
    //设置图标图片
    public SetToothImage(toothType: ToothStepType) {

        this._over.visible = false;

        for (var i = 1; i <this._badToothArray.length; ++i) {

            if (toothType == i)  {

                this._badToothArray[i].visible = true;
            }
            else  {

                this._badToothArray[i].visible = false;
            }
        }
    }
}