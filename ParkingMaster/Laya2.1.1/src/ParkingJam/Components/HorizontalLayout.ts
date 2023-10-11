export default class HorizontalLayout extends Laya.Script {
    /** @prop {name:space,tips:"内部子控件间距",type:number}*/
    private space: number = 0;

    private font: Laya.FontClip;

    private label: Laya.Text;

    private lastWidth: number = 0;

    private compo: Laya.UIComponent;

    constructor() { super(); }

    onAwake(): void {
        this.compo = this.owner as Laya.UIComponent;

        //FontClip和Label有且只能有一个
        this.font = this.owner.getChildByName("FontClip") as Laya.FontClip;

        this.label = this.owner.getChildByName("Text") as Laya.Text;
    }

    onUpdate() {
        var fontWidth = 0;
        if (this.font)
            fontWidth = this.font.width;
        if (this.label)
            fontWidth = this.label.width;
        if (this.lastWidth != fontWidth) {
            var total = 0;
            for (var v of this.compo._children) {
                var t = v as Laya.UIComponent;
                total += t.width;
            }
            total += (this.compo.numChildren - 1) * this.space;
            var x = (this.compo.width - total) * 0.5;
            for (var i = 0; i < this.compo.numChildren; i++) {
                var t = this.compo._children[i] as Laya.UIComponent;
                t.x = x;
                x += t.width + this.space;
            }
            this.lastWidth = fontWidth;
        }
    }
    
    setNum(num: number) {
        if (this.font)
            this.font.value = String(num);

        if (this.label)
            this.label.text = String(num);
    }

}