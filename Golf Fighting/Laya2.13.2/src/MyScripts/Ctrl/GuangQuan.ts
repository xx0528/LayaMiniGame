export default class GuangQuan extends Laya.Script {
    
    private m_owner:Laya.Sprite;

    constructor() { super(); }
    
    onAwake(){
        this.m_owner = this.owner as Laya.Sprite;
    }

    onUpdate(){
        if(this.m_owner.visible){
            this.m_owner.rotation+=0.5;
        }
    }
}