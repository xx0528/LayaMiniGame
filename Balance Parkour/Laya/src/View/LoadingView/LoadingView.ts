import View_tippy_Base from "../ViewBase";

export default class Loading_tippy_View extends View_tippy_Base {

    protected _processBar: Laya.Clip;
    protected _bg: Laya.Clip;
    protected lab: Laya.FontClip;
    protected blackbox: Laya.Box
    onAwake() {
        this._bg = this.owner.getChildByName("Bg") as Laya.Clip;
        this._processBar = this._bg.getChildAt(0).getChildByName("processBar") as Laya.Clip;
        this.lab = this._processBar.getChildAt(1) as Laya.FontClip
        this.blackbox = this.owner.getChildByName("blackbox") as Laya.Box;
        // var height = Laya.stage.height;
        // this._processBar.bottom = height / 1080 * 100;
    }

    onEnable() {
        super.onEnable();
    }

    addEvent() {
        super.addEvent();

    }

    removeEvent() {
        super.removeEvent();
    }

    onUpdate() {
        // this._bg.width = Laya.stage.width;
        // this._bg.height = Laya.stage.height;
        // var height = Laya.stage.height;
        // this._processBar.bottom = height / 1080 * 100;
    }

    public setProcess(process: number) {
        console.log("设置了么", process);

        if (process < 0)
            process = 0;
        if (process > 1)
            process = 1;
        var width = 609 * process;
        if (width < 1)
            width = 1;

        this._processBar.width = width;
        this.lab.value = (process * 100).toFixed(0);
        if (process == 1) {
            this.boxmove()
        }
    }
    public moved = false

    boxmove() {
        if (this.moved) {
            return;
        }
        this.moved = true
        this.blackbox.y = -1700
        // Laya.Tween.to(this.blackbox, { y: 0 }, 300, Laya.Ease.circIn, Laya.Handler.create(this, () => {
        //     console.log("加载ok");

        // }))
    }

}