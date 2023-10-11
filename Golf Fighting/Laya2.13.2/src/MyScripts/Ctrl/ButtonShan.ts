export default class ButtonShan extends Laya.Script {

    /** @prop {name:left_x, tips:"最左边", type:Number, default:1000}*/
    public left_x: number;

    /** @prop {name:right_x, tips:"最右边", type:Number, default:1000}*/
    public right_x: number;

    private m_owner :Laya.Sprite;
    private m_shan:Laya.Sprite;
    
    constructor() { super(); }
    
    onAwake(){
        this.m_owner = this.owner as Laya.Sprite;
        this.m_shan = this.owner.getChildByName("shan") as Laya.Sprite;
        this.m_shan.pos(this.right_x,this.m_shan.y);
        let mask = new Laya.Sprite();
        //画一个圆形的遮罩区域
        mask.graphics.drawRect(this.m_owner.x,this.m_owner.y,this.m_owner.width,this.m_owner.height,"#ff0000");
        //实现img显示对象的遮罩效果
        mask.pos(-this.m_owner.x,-this.m_owner.y)
        this.m_owner.mask = mask;
        this.shanShow();
    }

    shanShow(){
        Laya.Tween.to(this.m_shan,{x:this.left_x},400,null,Laya.Handler.create(this,()=>{
            this.m_shan.pos(this.right_x,this.m_shan.y);
            Laya.timer.once(1000,this,()=>{
                this.shanShow();

            })
        }))
    }
}