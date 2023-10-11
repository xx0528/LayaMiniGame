import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import { ryw_UnitType } from "../UnitType";
import EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import SoundMgr from "../../Mgr/SoundMgr";
import ryw_EventMgr from "../../Event/EventMgr";
import ryw_SoundMgr from "../../Mgr/SoundMgr";

//去救女王的勇士
export default class Warrior extends Unit_JJVW_Base{

    // protected _warriorRig : Laya.Rigidbody3D;
    protected ryw__collision : Laya.BoxColliderShape;
    protected ryw__speedX: number = 40;
    public ryw_directionX = 1;

    protected ryw__ani : Laya.Animator;
    protected ryw__queenVec : Laya.Vector3;

    protected ryw__lastStand : boolean = true;
    protected ryw__lastState = ryw_UNITSTATE.None;

    onAwake(){
        this._targetArr.push(ryw_UnitType.ryw_Queen);

        //生物链最二底层，谁都能攻击我，除了女王
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bear);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Tiger);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Wolf);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
        this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);

        // this._gracityLenght = -0.5;
        
    }

    ryw_onLastInit(){

        this.ryw__collision = (this.Sprite3D.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider).colliderShape as Laya.BoxColliderShape;
        // this._boxHeighy = 6;
        this._boxHeighy = this.ryw__collision.sizeY/2;
        
        // this._boxHeighy = this._collision.length/2 - 0.3;
        console.log("Warrior  this._boxHeighy = " + this._boxHeighy);

        this.ryw__ani = (this.Sprite3D.getChildByName("hm_xb") as Laya.Sprite3D).getComponent(Laya.Animator);
        //this._ani = (this.Sprite3D.getChildByName("hm_xb").getChildByName("Warrior") as Laya.Sprite3D).getComponent(Laya.Animator);
        this.ryw__ani.play("daiji");

        this._isInitEnd = true;
        // Laya.timer.once(100*1,this, this.onOpenUpdate);
    }

    // onEnable(){
    //     EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onWarriorMove, this, this.onWarriorMove)
    // }
    // onDisable(){
    //     EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onWarriorMove, this, this.onWarriorMove)
    // }

    ryw_onWarriorMove(queenPos:Laya.Vector3){
        this.ryw__queenVec = queenPos;
        var warroirPos = this.transform.localPosition;
        if (warroirPos.x > queenPos.x){
            this.ryw_directionX = -1;
        }
        else{
            this.ryw_directionX = 1;
        }
        this.ryw_state = ryw_UNITSTATE.ryw_Run;
        // if (UNITSTATE.None == this.state){
        //     this.state = UNITSTATE.Run;
        //     this.ryw__ani.play("walk");
        // }

    }

    ryw_onRun(){
        if (this.ryw_state == ryw_UNITSTATE.ryw_Death){return ;}
        
        var time = this._defaultTimerDelta/1000;
        if(this.ryw__lastStand!=this.ryw_standOnTheGround || this.ryw_state!=this.ryw__lastState){
            if (null!= this.ryw__queenVec){
                this.ryw_onWarriorMove(this.ryw__queenVec);
            }
        }


        //下坠的时候不左右移动
        if (this.ryw_standOnTheGround){
            this.transform.localRotationEulerY = 90 * this.ryw_directionX;
            this.transform.localPositionX += this.ryw__speedX*time * this.ryw_directionX;
        }
    }

    protected ryw_onOpenUpdate(){
        this._isInitEnd = true;
    }

    onLateUpdate(){
        if (false==this._isInitEnd){return ;}


        this.ryw_onGravityCheck()
        if (this.ryw_onAssaultedArea()){
            if (ryw_UNITSTATE.ryw_Run==this.ryw_state){
                this.ryw_state = ryw_UNITSTATE.None;
            }
        }
        if (ryw_UNITSTATE.ryw_Run == this.ryw_state){
            this.ryw_onRun(); 
        }

        if (this.ryw__lastStand==true && this.ryw_standOnTheGround==false){
            this.transform.localRotationEulerY = 180 - 45 * this.ryw_directionX;
            this.ryw__ani.play("diaoluo02");
        }
        else if (this.ryw__lastStand==false && this.ryw_standOnTheGround==true){
            if (ryw_UNITSTATE.None == this.ryw_state){
                this.transform.localRotationEulerY = 180;
                this.ryw__ani.play("daiji");
            }
            else if (ryw_UNITSTATE.ryw_Run == this.ryw_state){
                this.ryw__ani.play("pao01");
            }
        }
        else if (this.ryw__lastStand==true && this.ryw_standOnTheGround==true ){
            if (ryw_UNITSTATE.None==this.ryw__lastState && ryw_UNITSTATE.ryw_Run==this.ryw_state){
                this.ryw__ani.play("pao01");
            }
            else if (ryw_UNITSTATE.ryw_Run==this.ryw__lastState && ryw_UNITSTATE.None==this.ryw_state){
                this.ryw__ani.play("daiji");
            }
        }

        if (this.transform.localPositionY < -100) {
            ryw_SoundMgr.ryw_instance.ryw_playSound("queenWin");
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOverAction,{result:0});
            var fun = function(){
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOver,{result:1});
            }
            Laya.timer.frameLoop(30, this, fun);
        }
        this.ryw__lastStand = this.ryw_standOnTheGround;
        this.ryw__lastState = this.ryw_state;
    }
    //攻击
    ryw_onAssaulted(unit:ryw_UnitType){
        for (let i = 0; i < this._targetArr.length; i++) {
            let type = this._targetArr[i];
            if (type == unit){
                console.log(this.Type + " 攻击 " + unit);
                this.ryw_state = ryw_UNITSTATE.ryw_Attack;
                // this.state = UNITSTATE.None
                this.ryw__ani.play("qingzhu04");
                let firstFrame = true; //第一帧不判断
                // Laya.timer.once(300, this, ()=>{
                //     this.onWin();
                // })
                // console.log("===================>  ",this.Sprite3D.transform.localRotationEulerY);
                let eY = 0;
                if(this.Sprite3D.transform.localRotationEulerY < 0 )
                {
                    eY = -90
                }else{
                    eY = 90
                }
                Laya.Tween.to(this.Sprite3D.transform,{localRotationEulerY:this.Sprite3D.transform.localRotationEulerY + eY},500);
                var fun = function(){
                    if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                        Laya.timer.clear(this, fun);
                        this.ryw_onWin();
                        return ;
                    }
                    firstFrame = false;
                }
                Laya.timer.frameLoop(1, this, fun);

                break;
            }
        }
    }
    //被攻击
    ryw_onBeAssaulted(unit:ryw_UnitType){
        for (let i = 0; i < this._naturalEnemyArr.length; i++) {
            let type = this._naturalEnemyArr[i];
            if (type == unit){
                console.log(this.Type + " 被攻击 " + unit);
                this.ryw_state = ryw_UNITSTATE.ryw_Death
                this.ryw__ani.play("shibai03");
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOverAction,{result:2});
                SoundMgr.ryw_instance.ryw_playSound("warriorWin");
                let firstFrame = true; //第一帧不判断
                // Laya.timer.once(300, this, ()=>{
                //     this.onDeath();
                // })
                var fun = function(){
                    if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false==firstFrame){
                        Laya.timer.clear(this, fun);
                        this.ryw__ani.play("ku03");
                        this.ryw_onDeath()
                        return ;
                    }
                    firstFrame = false;
                }
                Laya.timer.frameLoop(1, this, fun);

                // Laya.timer.frameOnce(1,this,function(){
                //     if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1){
                //         this.onDeath()
                //     }
                // });

                break;
            }
        }
        // Laya.timer.once(1000*1,this, this.ryw_destroyUnit);
        // ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onGameOver);
    }

    //胜利
    public ryw_onWin(){
        SoundMgr.ryw_instance.ryw_playSound("win");
    }

    //死亡
    public ryw_onDeath(){
        SoundMgr.ryw_instance.ryw_playSound("lost");
        console.log("Warrior onDeath");
        // ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onGameLost);

        Laya.timer.once(1200, this, ()=>{
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOver,{result:0});
            this.ryw_state = ryw_UNITSTATE.None
            this.ryw_destroyUnit()
        });
    }

    //移动
}