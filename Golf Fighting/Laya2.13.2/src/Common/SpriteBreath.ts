export default class SpriteBreath extends Laya.Script {
    /** @prop {name:rat, tips:"变化频率", type:Number}*/
    public rat: number;
    /** @prop {name:changeRange, tips:"变化范围", type:Number}*/
    public changeRange: number;
    
    private m_owner:Laya.UIComponent;
    private fix_x:number;
    constructor() { super(); }
    
    onAwake(){
        this.m_owner = this.owner as Laya.UIComponent;
        this.fix_x = this.m_owner.scaleX
        this.rat = this.rat/1000;
    }


    onUpdate(){
        if(this.m_owner.visible){
            if (Math.abs(this.m_owner.scaleX-this.fix_x)>=this.changeRange)this.rat=-this.rat;
            let x = this.m_owner.scaleX+this.rat;
            let y = this.m_owner.scaleY+this.rat;
            this.m_owner.scale(x,y);
        }
    }
}