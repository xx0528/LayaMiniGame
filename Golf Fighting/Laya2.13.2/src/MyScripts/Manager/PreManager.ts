import App_sdlyg_Config from "../../AppConfig";

export default class PreManager extends Laya.Script3D {
    
    private static m_pre:Laya.Sprite3D;
    private static m_owner:Laya.Sprite3D;
    private static could_set_skin:boolean = false;


    constructor() { super(); }
    onAwake(){
        PreManager.m_owner = this.owner as Laya.Sprite3D;

        let ball = this.owner.getChildByName("Ball") as Laya.Sprite3D;
        Laya.Sprite3D.load(App_sdlyg_Config.ResServer+"/ball/Conventional/ball.lh", Laya.Handler.create(this, function(sp){
            let aBall = sp.getChildByName("aBall") as Laya.Sprite3D;
            PreManager.m_owner.addChild(aBall);
            PreManager.could_set_skin = true;
            console.log("球资源加载完成");
        }));

        PreManager.m_owner.active = false;
    }

    public static get CouldSetSkin():boolean{
        return PreManager.could_set_skin;
    }

    public static getPre(type:PreType):Laya.Sprite3D{
        return(PreManager.m_owner.getChildByName(type) as Laya.Sprite3D);
    }

    public static createPre(type:PreType,parent:Laya.Sprite3D):Laya.Sprite3D{
        return Laya.Sprite3D.instantiate(PreManager.getPre(type),parent);
    }
}

export enum PreType{
    Ball = "Ball",
    aBall = "aBall",        //完整皮肤的球
    Flag = "Flag",
    OverFlag = "OverFlag",
    Stage1 = "Stage1",
    Stage2 = "Stage2",
    Stage3 = "Stage3",
    Stage4 = "Stage4",
    Stage5 = "Stage5",
    Stage6 = "Stage6",
    StrikeGroundEffect = "StrikeGroundEffect",
    ObstacleBarre = "ObstacleBarre",
    ObstacleCut = "ObstacleCut",
    ObstacleStairs = "ObstacleStairs",
    ObstacleTurnAround = "ObstacleTurnAround",
    ObstacleTurnAround1 = "ObstacleTurnAround1",
    Tuowei = "Tuowei",
}