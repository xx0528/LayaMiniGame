import UnitFactory from "../UnitFactory";
import { ryw_UnitType } from "../UnitType";
import Unit_JJVW_Base, { ryw_UNITSTATE } from "../Unit_JJVW_Base";
import Warrior from "../Role/Warrior";
import Queen from "../Role/Queen";
import { ryw_EventDef } from "../../Event/EventDef";
import Pike from "../Prop/Pike";
import Bomb from "../Prop/Bomb";
import Bear from "../Animal/Bear";
import Cannon from "../Prop/Cannon";
import Cannonball from "../Prop/Cannonball";
import Arrow from "../Prop/Arrow";
import Tiger from "../Animal/Tiger";
import CannonGravity from "../Prop/CannonGravity";
import PikeBody from "../Prop/PikeBody";
import ryw_EventMgr from "../../Event/EventMgr";

export enum ryw_levelState {
    ryw_playing = 0,
    ryw_gameover = 1
}

export default class LevelBase extends Laya.Script3D{

    protected _onPostValue = true;
    constructor(){
        super();
    }
    public get Scene3D()
    {
        return this._ownerScene3D;
    }

    protected  useBgArr = {
        [0]:0,
        [1]:0,
        [2]:0,
        [3]:0,
        [4]:0,
        [5]:0,
        [6]:0,
        [7]:0,
        [8]:0,
        [9]:0,
        [10]:0,
        [11]:0,
        [12]:0,
        [13]:0,
        [14]:0,
        [15]:0,
        [16]:0,
        [17]:0,
        [18]:0,
        [19]:0,
        [20]:0,
        [21]:0,
        [22]:0,
        [23]:0,
        [24]:0,
        [25]:0,
        [26]:0,
        [27]:0,
        [28]:0,
        [29]:0,
        [30]:0,
        [31]:0,
        [32]:0,
        [33]:0,
        [34]:0,
        [35]:0,
        [36]:0,
        [37]:0,
        [38]:0,
        [39]:0,
    }

    //每关 最优解
    protected optimalSolutionPathArr = {
        [0]:[0],//第1关
        [1]:[0,1,2],//第2关
        [2]:[0,2],//第3关
        [3]:[1,0],//第4关
        [4]:[2,1,0],//第5关
        // [5]:[1,0],//第6关
        [5]:[3,1,0,2,4],//第7关
        [6]:[0,2,1],//第8关
        [7]:[0,1,2],//第9关
        [8]:[2,1,0,3],//第10关
        [9]:[1,0],//第11关
        [10]:[2,1,0],//第12关
        [11]:[0,1],//第13关
        [12]:[2,0,1],//第14关
        [13]:[0,3,2,1],//第15关
        [14]:[1],//第16关
        [15]:[4,3,0,1,5,2],//第17关
        [16]:[2,1,0],//第18关
        [17]:[2,5,4,1],//第19关
        [18]:[2,0,1,5],//第20关
        [19]:[2,1,0,3,4],//第21关
        [20]:[4,1,0],//第22关
        [21]:[3,2,0,1],//第23关
        [22]:[0,2,3,1],//第25关
        [23]:[0,1,3,5],//第26关
        [24]:[1,0,3],//第27关
        [25]:[2,0,3,1,4],//第28关
        [26]:[0,2],//第29关
        [27]:[1,3,2,0,4],//第30关
        [28]:[1,2,4,3,5,0], //第31关
        [29]:[1,2,3,0], //第32关
        [30]:[1,2,3,4,0], //第33关
        [31]:[1,2,3,0],//第34关
        [32]:[1,4,3],//第35关
        [33]:[3,2,4],//第37关
        [34]:[1,0,2],//第38关
        [35]:[4,1,0,3,2],//第39关
        [36]:[1,0,3],//第40关

    }

    //每关，救女王  [关卡][所需要拿掉的钎子]
    protected _levelPikePathArr   = {
        [0] : [[0]], // 1关
        [1] : [[1,2]], // 2关
        [2] : [[0,2]], // 3关
        [3] : [[0,1]], // 4关
        [4] : [[0,1]], // 5关
        // [5] : [[0,1]], // 6关
        [5] : [[1,2,4]], // 7关
        [6] : [[1,2]], // 8关
        [7] : [[1,2]], // 9关
        [8] : [[0,1,2,3]], // 10关
        [9] : [[0,1]], // 11关
        [10] : [[0,2]], // 12关
        [11] : [[1]], // 13关
        [12] : [[1]], // 14关
        [13] : [[1,2,3]], // 15关
        [14] : [[1]], // 16关
        [15] : [[2,5]], // 17关
        [16] : [[0,2]], // 18关
        [17] : [[1,2,4]], // 19关
        [18] : [[1,2,5]], // 20关
        [19] : [[0,1,2,3,4]], // 21关
        [20] : [[0,1],[0,2]], // 22关
        [21] : [[1,2,3]], // 23关
        [22] : [[0,1,3]], // 25关
        [23] : [[1,3,5],[1,2,4,5]], // 26关
        [24] : [[0,1,3]], // 27关
        [25] : [[0,1,3,4]], // 28关
        [26] : [[0,2]], // 29关
        [27] : [[0,1,2,4]], // 30关
        [28] : [[0,1,2,5],[0,1,3,4,5]], //31关
        [29] : [[0,1,3]], //32关
        [30] : [[0,1,4]], //33关
        [31] : [[0]], //34关
        [32] : [[1,3]], //35关
        [33] : [[2,3,4],[0,1,3,4]],//37关
        [34] : [[0,2]],//38关
        [35] : [[0,1,2,3,4]],//39关
        [36] : [[0,1,3]],//40关
    };


    protected _ownerScene3D : Laya.Scene3D;
    protected _unitFactory : UnitFactory;

    protected _warrior : Warrior;
    protected _queen : Queen;
    // protected _pikePathArr : Array<Pike> = new Array<Pike>();
    // protected _pikePathArr : Array<Array<Pike>> = new Array<Array<Pike>>();
    protected _pikePathArr : Array<Array<number>> = new Array<Array<number>>();

    protected _pikeAll : Array<Pike> = new Array<Pike>();
    protected _solutionArr : Array<number> = new Array<number>();

    protected _unitArr : Array<Unit_JJVW_Base> = new Array<Unit_JJVW_Base>();
    protected _isForbidTouch :boolean = false;
    protected _camera : Laya.Camera;
    protected _sky : Laya.SkyRenderer;

    protected _levelIndex : number = 1;
    protected _isTipMode : boolean = false;

    protected _ray:Laya.Ray;
    protected point:Laya.Vector2 = new Laya.Vector2();
    protected _outHitResult : Laya.HitResult = new Laya.HitResult();

    public gameState : ryw_levelState = ryw_levelState.ryw_playing;

    onAwake(){
        this._isForbidTouch = true;
        this.gameState = ryw_levelState.ryw_playing;

        this._ownerScene3D = this.owner as Laya.Scene3D;



        this._unitFactory = new UnitFactory(this);
        for (var i = 0; i < this.Scene3D.numChildren; i++) {
            var child = this.Scene3D.getChildAt(i);
            // console.log(child.name);
            if (child.name.indexOf(""+"Pike") != -1){
                //unity 里面 pike 的命名 必须是从上到下
                var pike = child.addComponent(Pike) as Pike;
                this._pikeAll.push(pike);
            }
            else if (child.name.indexOf("" + "Camera") != -1){
                this._camera = child as Laya.Camera;
                let num = Number ((child.name as string).slice(6));
                console.log("Camera  num = ", num);
                this._camera.orthographicVerticalSize = num * 1.9;
            }
            else if (child.name.indexOf(""+ryw_UnitType.ryw_Warrior) != -1){
                this._warrior = this.ryw_addUnit(ryw_UnitType.ryw_Warrior, child.name) as Warrior;
                // this._unitArr.push(
            }
            else if (child.name.indexOf(""+ryw_UnitType.ryw_Queen) != -1){
                this._queen = this.ryw_addUnit(ryw_UnitType.ryw_Queen, child.name) as Queen;
            }
            else if (child.name.indexOf(""+ryw_UnitType.ryw_Bomb) != -1){
                this.ryw_addUnit(ryw_UnitType.ryw_Bomb, child.name) as Bomb;
            }
            else if (child.name.indexOf(""+ryw_UnitType.ryw_Bear) != -1){
                this.ryw_addUnit(ryw_UnitType.ryw_Bear, child.name) as Bear;
            }
            else if (child.name.indexOf(""+ryw_UnitType.ryw_CannonGravity) != -1){
                this.ryw_addUnit(ryw_UnitType.ryw_CannonGravity, child.name) as CannonGravity;
            }
            else if (child.name.indexOf(""+ryw_UnitType.ryw_Cannonball) != -1){
                //  this.addUnit(UnitType.Cannonball, child.name) as Cannonball;
            }
            else if (child.name.indexOf(""+ryw_UnitType.ryw_Cannon) != -1){
                this.ryw_addUnit(ryw_UnitType.ryw_Cannon, child.name) as Cannon;
            }

            else if (child.name.indexOf(""+ryw_UnitType.ryw_Arrow) != -1){
                this.ryw_addUnit(ryw_UnitType.ryw_Arrow, child.name) as Arrow;
            }
            else if (child.name.indexOf(""+ryw_UnitType.ryw_Tiger) != -1){
                this.ryw_addUnit(ryw_UnitType.ryw_Tiger, child.name) as Tiger;
            }
        }
    }

    ryw_onShowGameGuide(pike:Pike){
        var outPos = new Laya.Vector4();
        var endPos = new Laya.Vector4();
        var v = new Laya.Vector3();
        // (pike.owner as Laya.Sprite3D).transform.getRight(v); //钎子的移动方向就是x方向
        
        var pTransfrom = (pike.owner as Laya.Sprite3D).transform as Laya.Transform3D;
        var pScale = (pike.owner.getChildByName("Cylinder") as Laya.Sprite3D).transform.scale as Laya.Vector3;
        pTransfrom.getRight(v); //钎子的移动方向就是x方向
        var p = pTransfrom.position.clone();

        // -1:反方向，pScale.y:缩放值，75/100:杆子百分比位置，4:scale.y=1时的长度,v.x:方向， p.x初始位置
        var p1 = new Laya.Vector3();
        p1.x = -1*pScale.y*75/100 * 4 * v.x + p.x;  
        p1.y = -1*pScale.y*75/100 * 4 * v.y + p.y;
        p1.z = -1*pScale.y*75/100 * 4 * v.z + p.z;

        var p2 = new Laya.Vector3();
        p2.x = -1*pScale.y*25/100 * 4 * v.x + p.x;
        p2.y = -1*pScale.y*25/100 * 4 * v.y + p.y;
        p2.z = -1*pScale.y*25/100 * 4 * v.z + p.z;

        this._camera.viewport.project(p1, this._camera.projectionViewMatrix, outPos)
        this._camera.viewport.project(p2, this._camera.projectionViewMatrix, endPos)

        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onShowGuide,{x:outPos.x / Laya.stage.clientScaleX, y:outPos.y / Laya.stage.clientScaleY, endX:endPos.x / Laya.stage.clientScaleX, endY:endPos.y / Laya.stage.clientScaleY});
    }




    onStart(){
        var pos1 = this._warrior.transform.localPosition;
        var pos2 = this._queen.transform.localPosition;
        if (pos1.x > pos2.x){
            this._warrior.ryw_directionX = -1;
        }
        else{
            this._warrior.ryw_directionX = 1;
        }

        //射线初始化（必须初始化）
        this._ray = new Laya.Ray(new Laya.Vector3(0,0,0), new Laya.Vector3(0,0,0));
        this.point = new Laya.Vector2();
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
    }
    onDestroy() {
        this.gameState = ryw_levelState.ryw_gameover;
        this.Scene3D.offAll(); 
    }

    onMouseDown(){
        this.point.x = Laya.MouseManager.instance.mouseX/Laya.stage.clientScaleX;
        this.point.y = Laya.MouseManager.instance.mouseY/Laya.stage.clientScaleY;
        if (this.gameState == ryw_levelState.ryw_gameover) {return ;}

        //产生射线
        this._camera.viewportPointToRay(this.point, this._ray);
        //拿到射线碰撞到的物体
        this.Scene3D.physicsSimulation.rayCast(this._ray, this._outHitResult);
        
        if (this._outHitResult.succeeded){
            let pikeBodyCom = (this._outHitResult.collider.owner as Laya.Sprite3D).getComponent(PikeBody) as PikeBody;
            if (pikeBodyCom){
                console.log("LevelBase onMouseDown PikeBody");
                pikeBodyCom.ryw_onMyPikeMouseDown();
            }
        }
    }

    public ryw_addUnit(unitType: ryw_UnitType, name?:string) : Unit_JJVW_Base{
        var unit = null;
        unit = this._unitFactory.ryw_create(unitType,name);

        this._unitArr.push(unit);
        return unit;
    }

    onLateUpdate(){
        if (false==this._isForbidTouch){return ;}

        for (let i = 0; i < this._unitArr.length; i++) {
            let unit = this._unitArr[i];
            if (null==unit){continue ;}
            if (unit.ryw_state == ryw_UNITSTATE.ryw_Run || unit.ryw_state == ryw_UNITSTATE.ryw_Attack || false==unit.ryw_standOnTheGround){

                return ;
            }
        }
        this._isForbidTouch = false;
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onAllowTouch);
    }

    onEnable(){
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_OnMovePike,this, this.ryw_onMovePikeCall)
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onOverAction,this, this.ryw_onOverAction)
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onQueenStand, this, this.ryw_onSaveQueen)
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onOver, this, this.ryw_onOver)
    }

    onDisable(){
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_OnMovePike,this, this.ryw_onMovePikeCall)
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onOverAction,this, this.ryw_onOverAction)
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onQueenStand, this, this.ryw_onSaveQueen)
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onOver, this, this.ryw_onOver)
    }

    public ryw_setTipsMode(value:boolean){
        console.log("setTipsMode  value = ",value);
        if (value==false){return ;}
        this._isTipMode = true;
        this.ryw_tipsSetPikeForbid();

        // let currentOptimalSolution = this.optimalSolutionPathArr[0];
        this._solutionArr = this.optimalSolutionPathArr[this._levelIndex-1];
        let self = this;
        Laya.timer.once(1000*1, this, ()=>{
            let num = self._solutionArr[0];
            self.ryw_tipsSetPikeForbid(num);
        });
    }

    protected ryw_tipsSetPikeForbid(num ?: number){
        console.log("tipsSetPikeForbid   num = ",num);
        for (let i = 0; i < this._pikeAll.length; i++) {
            let pike = this._pikeAll[i];
            if (null != pike){
                if (null==num){
                    pike.ryw_tipsModeForbid = true;
                }
                else{
                    console.log("pike.owner.name  = ",pike.owner.name);
                    if (pike.owner.name.indexOf("Pike"+num) != -1){
                        pike.ryw_tipsModeForbid = false;
                        this.ryw_onShowGameGuide(pike);
                        break;
                    }
                    else{
                        pike.ryw_tipsModeForbid = true;
                    }
                }
            }
            else{
                
            }
        }


    }

    public ryw_onSetPikePath(levelIndex : number){
        this._levelIndex = levelIndex;

        let self = this;
        Laya.Sprite3D.load("subRes/LayaScene/Conventional/beijing.lh", Laya.Handler.create(null, function(sp){
            self.Scene3D.addChild(sp);
        }));
        
        this._pikePathArr = this._levelPikePathArr[levelIndex-1];
        if (levelIndex == 1){
            this.ryw_onShowGameGuide(this._pikeAll[0]);
        }

    }
    ryw_onMovePikeCall(para){
        var pike : Pike = para.pike
        if (this._isTipMode){
            // return ;
            var indexStr = pike.owner.name.substring(4);
            console.log("onMovePikeCall   indexStr = ",indexStr);
            var num1 : number = Number(indexStr);
            let num2 = this._solutionArr[0];
            console.log("onMovePikeCall  num2 = ",num2);
            if (num1 == num2){
                this._solutionArr.splice(0,1);
                console.log("onMovePikeCall  this._solutionArr = ",this._solutionArr)
                let self = this;
                Laya.timer.once(300, this, ()=>{
                    let num = self._solutionArr[0];
                    console.log("onMovePikeCall  num = ",num);
                    self.ryw_tipsSetPikeForbid(num);
                });

                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onHideGuide)
            }

        }
        else if (this._levelIndex == 1){
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onHideGuide)
        }

        // _pikeAll
        for (let i = 0; i < this._pikeAll.length; i++) {
            let p = this._pikeAll[i];
            if (pike == p){
                this._pikeAll.splice(i,1);
                break;
            }
        }

        Laya.timer.once(100, this, ()=>{
            // onLateUpdate 是每一帧判断的，一开始检测的动作状态还没发生改变，延后100毫秒 判断
            this._isForbidTouch = true;

            var pike : Pike = para.pike
            var indexStr = pike.owner.name.substring(4);
            var num : number = Number(indexStr)
            for (let i = 0; i < this._pikePathArr.length; i++) {
                let element = this._pikePathArr[i];
                if (element.length==0){continue;}
                for (let j = 0; j < element.length; j++) {
                    let pikeNum  = element[j];
                    if (pikeNum == num){
                        element.splice(j, 1);
                        if (this.ryw_onSaveQueen()){
                            return ;
                        }
                        else{
                            break;
                        }
                    }
                }
            }
        });
    }

    protected ryw_onOver(para) {
        this.gameState = ryw_levelState.ryw_gameover;   
    }

    protected ryw_onOverAction(para){
        if (this.gameState == ryw_levelState.ryw_gameover) {return ;}
        this.gameState = ryw_levelState.ryw_gameover;

        let result = para.result;

        
        //移动摄像机，将女王显示到正中间
        var pos1 = this._queen.transform.position;
        var pos2 = this._warrior.transform.position;
        var pos = new Laya.Vector3();
        if (result == 0){
            //胜利
            pos = new Laya.Vector3(pos1.x*0.6+pos2.x*0.4,(pos1.y+pos2.y)/2,(pos1.z+pos2.z)/2);
        }
        else if (result == 1){
            //女主 死亡
            pos = new Laya.Vector3(pos1.x,pos1.y,pos1.z);
        }
        else if  (result == 2){
            //男主 死亡
            pos = new Laya.Vector3(pos2.x,pos2.y,pos2.z);
        }



        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onShowShade);

        var self = this;
        Laya.Tween.to(self._camera.transform,{
            localPositionX:pos.x,
            localPositionY:pos.y},
            500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{

                let outPos = new Laya.Vector4();
                self._camera.viewport.project(pos, self._camera.projectionViewMatrix, outPos)
                console.log("this._camera  pos = ", outPos);
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onMoveShade,{x:outPos.x / Laya.stage.clientScaleX, y:outPos.y / Laya.stage.clientScaleY});


                Laya.Tween.to(self._camera,{
                    orthographicVerticalSize:50
                }, 500,Laya.Ease.linearNone, Laya.Handler.create(this,()=>{

                }))
            })
        );
    }

    //拯救女王
    private ryw_onSaveQueen():boolean{
        console.log("onSaveQueen  private onSaveQueen():boolean")
        if (false==this._queen.ryw_standOnTheGround){
            console.log("onSaveQueen  false==this._queen.standOnTheGround")
            return false;
        }

        for (let i = 0; i < this._pikePathArr.length; i++) {
            let element = this._pikePathArr[i];
            if (element.length==0){
                this._warrior.ryw_onWarriorMove(this._queen.transform.localPosition);
                console.log("猪脚去救女王")
                return true;
            }
            
        }
        return false;
    }

    onPostRender(){
        // (v.owner as Laya.View).zOrder = 1;
        if (this._onPostValue){
            this._onPostValue = false; 
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_App_CloseFirstLoadingView);
        }
    }
}