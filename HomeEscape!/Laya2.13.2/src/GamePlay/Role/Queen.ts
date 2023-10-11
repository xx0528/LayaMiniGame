import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_SoundMgr from "../../Mgr/SoundMgr";

//被拯救的女王
export default class Queen extends Unit_JJVW_Base{
    // protected _queenRig : Laya.Rigidbody3D;
    protected ryw__collision : Laya.BoxColliderShape;

    protected ryw__ani : Laya.Animator;

    protected ryw__lastStand : boolean = true;
    // protected _jiujiuwoSpr : Laya.Sprite3D;

    onAwake(){
        //生物链最底层，谁都能攻击我
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bear);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Tiger);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Wolf);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Warrior);

        this.ryw__gracityLenght = -0.5;
    }

    ryw_onLastInit(){

        this.ryw__collision = (this.Sprite3D.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).colliderShape as Laya.BoxColliderShape;
        // this._jiujiuwoSpr = (this.Sprite3D.getChildByName("Queen").getChildByName("jw")) as Laya.Sprite3D;

        // this._jiujiuwoSpr.active = true;
        this._boxHeighy = this.ryw__collision.sizeY/2;

        this.ryw__ani = (this.Sprite3D.getChildByName("Queen") as Laya.Sprite3D).getComponent(Laya.Animator);
        this.ryw__ani.enabled = false;


        // Laya.timer.once(1000, this, ()=>{
        //     this.ryw__ani.play("hi");
        // });

        // Laya.timer.once(3000, this, ()=>{
        //     this._jiujiuwoSpr.active = false;
        // })

        // let firstFrame = true; //第一帧不判断
        // Laya.timer.frameLoop(1, this, function(){
        //     if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
        //         this.ryw__ani.play("lod");
        //     }
        //     firstFrame = false
        // });
        // Laya.timer.frameOnce(1,this,function(){
        //     if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1){
        //         this.ryw__ani.play("lod");
        //     }
        // });
        // Laya.timer.once(100*1,this, this.onOpenUpdate);
        this._isInitEnd = true;
    }

    protected ryw_onOpenUpdate(){
        this._isInitEnd = true;
    }

    onLateUpdate(){
        if (false==this._isInitEnd){return ;}

        this.ryw_onGravityCheck()
        if (this.ryw__lastStand==false && this.ryw_standOnTheGround==true){
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onQueenStand);
        }
        this.ryw__lastStand = this.ryw_standOnTheGround;
    }
    //攻击
    ryw_onAssaulted(unit:ryw_UnitType){
        for (let i = 0; i < this._targetArr.length; i++) {
            let type = this._targetArr[i];
            if (type == unit){
                console.log(this.Type + " 攻击 " + unit);
                // this.state = UNITSTATE.Attack
                this.ryw_state = ryw_UNITSTATE.None
                // let firstFrame = true; //第一帧不判断
                break;
            }
        }
        // let ani:Laya.Animator ;
    }
    //被攻击#
    ryw_onBeAssaulted(unit:ryw_UnitType){
        if (ryw_UNITSTATE.ryw_Death==this.ryw_state){return ;}
        for (let i = 0; i < this._naturalEnemyArr.length; i++) {
            let type = this._naturalEnemyArr[i];
            if (type == unit){
                console.log(this.Type + " 被攻击 " + unit);
                if (ryw_UnitType.ryw_Warrior == unit){
                    //胜利
                    this.ryw__ani.enabled = true;
                    this.ryw__ani.play("open");
                    ryw_SoundMgr.ryw_instance.ryw_playSound("queenWin");
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOverAction,{result:0});
                    let firstFrame = true; //第一帧不判断
                    var fun = function(){
                        if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                            this.ryw__ani.enabled = false;
                            Laya.timer.clear(this, fun);
                            //加延时
                            Laya.timer.once(2000,this,()=>{
                                this.ryw_onWin();
                            });
                            return ;
                        }
                        firstFrame = false;
                    }
                    Laya.timer.frameLoop(1, this, fun);

                    console.log("UnitType.Queen   胜利");


                }
                else{
                    this.ryw_state = ryw_UNITSTATE.ryw_Death
                    this.ryw__ani.enabled = true;
                    this.ryw__ani.play("broken");
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOverAction,{result:1});
                    // Laya.timer.once(1000, this, ()=>{
                    //     this.onDeath();
                    // })
                    let firstFrame = true; //第一帧不判断
                    var fun = function(){
                        if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                            this.ryw__ani.enabled = false;
                            Laya.timer.clear(this, fun);
                            this.ryw_onDeath();
                            return ;
                        }
                        firstFrame = false;
                    }
                    Laya.timer.frameLoop(1, this, fun);
                }
                break;
            }
        }
        // Laya.timer.once(1000*1,this, this.ryw_destroyUnit);
        // ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onGameOver);


    }

    protected ryw_onWin(){

        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOver,{result:1});

    }

    protected ryw_onDeath(){
        ryw_SoundMgr.ryw_instance.ryw_playSound("lost");
        console.log("Queen onDeath");
        // ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onGameLost);

        Laya.timer.once(1200, this, ()=>{
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOver,{result:0});
            this.ryw_state = ryw_UNITSTATE.None
            this.ryw_destroyUnit()
        });


    }
}