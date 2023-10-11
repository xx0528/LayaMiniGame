import BandBehavior from "./BandBehavior";

export default class ParamCube extends BandBehavior {

    public startScaleY: number = 0;
    public maxScaleY:number = 7;

    public get gameObject(): Laya.Sprite3D {
        return this.owner as Laya.Sprite3D;
    }

    protected onBandChange(curTime, nextTime, num): void {
        Laya.Tween.clearAll(this);
        
        let scale = this.gameObject.transform.localScale;
        let newScaleY = num * this.maxScaleY + this.startScaleY;
        let changeTime = (nextTime - curTime) * 1000;
        //console.log("scaleY:" + newScaleY + "Time:" + changeTime + "num:" + num);
        Laya.Tween.to(this.gameObject.transform, {localScaleY: newScaleY}, changeTime);
    }
    
    protected onBandEnd(): void {
        Laya.Tween.clearAll(this);
        Laya.Tween.to(this.gameObject.transform, {localScaleY: this.startScaleY}, 1 * 1000);
    }
}