export default class ConstManager {
    public static readonly restitution :number = 0.6;    //弹力   
    public static readonly rollingFriction:number = 0.8;   //滚动摩擦力
    public static readonly friction:number = 0.8;      //摩擦力
    public static readonly ball_Amount:number = 3;           //球的初始数量
    public static readonly stagePre_Amount:number = 6;       //场地预制体总量
    public static readonly cameraMoveTime:number = 800;       //更新场地时摄像机移动的时间
    public static readonly envAmount:number = 2;            //随机环境总量
    public static readonly max_power_timer:number = 800     //蓄到满力所需要时间
    public static readonly max_power_dis:number = 6.68      //满力位移
}