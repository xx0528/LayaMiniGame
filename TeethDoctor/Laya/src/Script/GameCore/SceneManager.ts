import { ToothStepType, HandlerType } from "../Enum";
import CleanToothStep from "./Tooth/CleanToothStep";
import Handler from "./Handler";
import Gam_XYXZS_eMgr from "../../Mgr/GameMgr";
import FillingTooth from "./Tooth/TypesOfTooth/FillingTooth";
import CalculusThooth from "./Tooth/TypesOfTooth/CalculusTooth";
import PullTooth from "./Tooth/TypesOfTooth/PullTooth";
import BraceTooth from "./Tooth/TypesOfTooth/BraceTooth";
import CutTooth from "./Tooth/TypesOfTooth/CutTooth";
import PaintTooth from "./Tooth/TypesOfTooth/PaintTooth";
import Sou_XYXZS_ndMgr from "../../Mgr/SoundMgr";
import Uti_XYXZS_lit from "../../Utilit";

export default class SceneManager extends Laya.Script {
    constructor() {
        super()
    }

    //#region 涉及到游戏的各个属性
    //摄像机初始偏移
    public static readonly CameraOrigOffset: Laya.Vector3 = new Laya.Vector3(0, 0.5, -11);
    //手柄最大旋转角度
    public static readonly MaxHandleRotateAngle: number = 60;
    //手柄初始偏移
    public static readonly HandleOrigOffset: Laya.Vector3 = new Laya.Vector3(0, 0, -2.3);
    //手柄最大上下移动偏移
    public static readonly MaxHandleUpDownOffset: number = 1.5;
    //#endregion

    //#region 私有属性
    /* 当前场景引用 */
    private _scene: Laya.Scene3D;
    /* 手柄的脚本 */
    private _handleScript: Handler;
    /* 当前牙齿步骤列表 */
    private _currentToothSteep: CleanToothStep;
    /* 待处理的牙齿步骤列表 */
    private _toothStepList: Array<CleanToothStep> = [];
    /* 当前待处理牙齿是哪个步骤 */
    private _currentToothStepIndex: number = 0;
    /* 脸的引用 */
    private _faceSp3D: Laya.Sprite3D;
    /* 上牙床 */
    private _topJaw: Laya.Sprite3D;
    /* 牙齿列表 */
    private _topToothList: Array<Laya.Sprite3D> = [];
    /* 下牙床 */
    private _bottomJaw: Laya.Sprite3D;
    /* 下牙床牙齿列表 */
    private _bottomToothList: Array<Laya.Sprite3D> = [];
    /* 所有牙齿的列表 */
    private _allToothList: Array<Laya.Sprite3D> = [];
    /* 游戏是否结束 */
    private _isGameOver: boolean = false;
    /* 当前等级 */
    private _currentLevel: number = 0;
    /* 清理牙齿的步骤 */
    private _cleanStepCount: number = 0;
    //#endregion

    //#region 牙齿随机表
    //1:洗牙
    private _calculusToothList: Array<Laya.Sprite3D> = [];
    //2:补牙
    private _fillingToothList: Array<Laya.Sprite3D> = [];
    //3:拔牙
    private _pullToothList: Array<Laya.Sprite3D> = [];
    //4:钻牙
    private _cutToothList: Array<Laya.Sprite3D> = [];
    //5:箍牙
    private _braceToothList: Array<Laya.Sprite3D> = [];
    //6:包金牙
    private _paintToothList: Array<Laya.Sprite3D> = [];
    //7:正常牙
    private _normalToothList: Array<Laya.Sprite3D> = [];
    //#endregion


    /**
     * 单例模式对外封装
     * 
     * @readonly
     * @type {SceneManager}
     * @memberof SceneManager
     */
    public static get Instance(): SceneManager {
        return this._instance;
    }
    private static _instance: SceneManager;

    /**
     * 当前场景
     * 
     * @readonly
     * @type {Laya.Scene3D}
     * @memberof SceneManager
     */
    public get CurrentScene(): Laya.Scene3D {
        return this._scene;
    }

    /**
     * 游戏是否结束
     * 
     * @readonly
     * @type {boolean}
     * @memberof SceneManager
     */
    public get IsGameOver(): boolean {
        return this._isGameOver;
    }

    /**
     * 当前清理牙齿的步骤
     * 
     * @readonly
     * @type {CleanToothStep}
     * @memberof SceneManager
     */
    public get CurrentToothStep(): CleanToothStep {
        return this._currentToothSteep;
    }

    /**
     * 当前清理牙齿的步骤索引
     * 
     * @readonly
     * @type {number}
     * @memberof SceneManager
     */
    public get CurrentToothStepIndex(): number {
        return this._currentToothStepIndex;
    }

    /**
     * 当前牙齿步骤列表 
     * 
     * @readonly
     * @type {Array<CleanToothStep>}
     * @memberof SceneManager
     */
    public get ToothStepList(): Array<CleanToothStep> {

        return this._toothStepList;
    }

    onAwake() {
        SceneManager._instance = this;
        // console.log(this._handle.transform.position);
        this.InitObjects();
        this.RandomSetToothStep();
    }

    public StartGame() {
        this._handleScript.StartGameMove();
    }
    /**
     * 处理输入
     * 
     * @param {number} xInput 
     * @param {number} yInput 
     * @memberof SceneManager
     */
    public Input(xInput: number, yInput: number) {
        this._handleScript.Input(xInput, yInput);
        // console.log(this._handle.transform.localScale);
        // this.SetHandlerMove();
    }

    /**
     * 
     * 
     * @memberof SceneManager
     */
    public SetGameOver() {
        this._handleScript.GameOver();
    }

    /**
     * 初始化场景中的物体等
     * 
     * @memberof SceneManager
     */
    InitObjects() {
        this._scene = this.owner as Laya.Scene3D;
        this._faceSp3D = this._scene.getChildByName("Face") as Laya.Sprite3D;
        this._topJaw = this._faceSp3D.getChildByName("TopJaw") as Laya.Sprite3D;
        /* 把上牙床的牙齿推入数组 */
        for (let index = 0; index < this._topJaw.numChildren; index++) {
            const element = this._topJaw.getChildAt(index) as Laya.Sprite3D;
            this._topToothList.push(element);
        }
        this._bottomJaw = this._faceSp3D.getChildByName("BottomJaw") as Laya.Sprite3D;
        /* 把下牙床的牙齿推入数组 */
        for (let index = 0; index < this._bottomJaw.numChildren; index++) {
            const element = this._bottomJaw.getChildAt(index) as Laya.Sprite3D;
            this._bottomToothList.push(element);
        }
        this._allToothList = this._topToothList.concat(this._bottomToothList);
        this._handleScript = (this._scene.getChildByName("Handler") as Laya.Sprite3D).addComponent(Handler);
        this._currentLevel = Gam_XYXZS_eMgr.getIns_XYXZS_tance().Curr_XYXZS_entLevel;
    }

    /**
     * 随机设置牙齿步骤
     * 
     * @memberof SceneManager
     */
    RandomSetToothStep() {
        //保存全部原始牙齿的数组
        this._normalToothList = this._allToothList.concat();
        let braceStep = null;
        let paintStep = null;
        let pullStep = null;
        let cutStep = null;
        let calclusStep = null;
        let fillStep = null;
        /* 首先完成上牙床步骤 */
        /* 清除所有的牙垢 */
        if (this._currentLevel == 1) {
            calclusStep = this.SetCalculusToothStep();
        }
        else if (this._currentLevel == 2) {
            fillStep = this.SetFillingTooth();
        }
        else if (this._currentLevel == 3) {
            paintStep = this.SetPaintToothStep();
            calclusStep = this.SetCalculusToothStep();
        }
        else if (this._currentLevel == 4) {
            braceStep = this.SetBraceToothStep();
            fillStep = this.SetFillingTooth();
        }
        else if (this._currentLevel == 5) {
            pullStep = this.SetPullToothStep();
            paintStep = this.SetPaintToothStep();
        }
        else if (this._currentLevel == 6) {
            braceStep = this.SetBraceToothStep();
            cutStep = this.SetCutToothStep();
        }
        // /* 开始出现补牙 */
        // else if (this._currentLevel > 0 && this._currentLevel <= 2) {
        //     calclusStep = this.SetCalculusToothStep();
        //     fillStep = this.SetFillingTooth();
        // }
        // /* 开始出现箍牙 */
        // else if (this._currentLevel > 2 && this._currentLevel <= 4) {
        //     braceStep = this.SetBraceToothStep();
        //     calclusStep = this.SetCalculusToothStep();
        //     fillStep = this.SetFillingTooth();
        // }
        // /* 开始出现拔牙 */
        // else if (this._currentLevel > 4 && this._currentLevel <= 8) {
        //     if (Math.random() > 0.4) {
        //         braceStep = this.SetBraceToothStep();
        //     }
        //     if (Math.random() > 0.4 || braceStep == null) {
        //         paintStep = this.SetPaintToothStep();
        //     }
        //    /*  if (Math.random() > 0.4) {
        //         fillStep = this.SetFillingTooth();
        //         calclusStep = this.SetCalculusToothStep();
        //     }
        //     else */ {
        //         calclusStep = this.SetCalculusToothStep();
        //         fillStep = this.SetFillingTooth();
        //     }
        // }
        // /* 开始出现切牙 */
        // else if (this._currentLevel > 8 && this._currentLevel <= 16) {
        //     if (Math.random() > 0.4) {
        //         braceStep = this.SetBraceToothStep();
        //     }
        //     if (Math.random() > 0.4 || braceStep == null) {
        //         paintStep = this.SetPaintToothStep();
        //     }
        //     if (Math.random() > 0.4 || braceStep == null) {
        //         cutStep = this.SetCutToothStep();
        //     }
        //     /* if (Math.random() > 0.4) {
        //         fillStep = this.SetFillingTooth();
        //         calclusStep = this.SetCalculusToothStep();
        //     }
        //     else  */{
        //         calclusStep = this.SetCalculusToothStep();
        //         fillStep = this.SetFillingTooth();
        //     }
        // }
        /* 开始出现包金牙 */
        else {
            let count = 0;
            if (Math.random() > 0.4) {
                braceStep = this.SetBraceToothStep();
                if (braceStep != null) {
                    count++;
                }
            }
            if (Math.random() > 0.4 || braceStep == null) {
                paintStep = this.SetPaintToothStep();
                if (paintStep != null) {
                    count++;
                }
            }
            if (Math.random() > 0.4 || braceStep == null || paintStep == null) {
                cutStep = this.SetCutToothStep();
                if (cutStep != null) {
                    count++;
                }
            }
            if ((Math.random() > 0.8) && count < 4 && (Math.random() > 0.4 || braceStep == null || paintStep == null)) {
                pullStep = this.SetPullToothStep();
                if (pullStep != null) {
                    count++;
                }
            }
            if (count < 4 || (count > 2 && Math.random() > 0.3)) {
                calclusStep = this.SetCalculusToothStep();
                count++;
            }
            if (count < 4 || (count > 2 && Math.random() > 0.3)) {
                fillStep = this.SetFillingTooth();
                count++;
            }
        }
        /* 按照特定顺序决定清牙步骤 */
        let rd = Math.random();
        if (rd < 0.3) {
            if (calclusStep != null) {
                this._toothStepList.push(calclusStep);
            }
            if (fillStep != null) {
                this._toothStepList.push(fillStep);
            }
            if (braceStep != null) {
                this._toothStepList.push(braceStep);
            }
            if (cutStep != null) {
                this._toothStepList.push(cutStep);
            }
            if (paintStep != null) {
                this._toothStepList.push(paintStep);
            }
            if (pullStep != null) {
                this._toothStepList.push(pullStep);
            }
        }
        else if (rd < 0.66) {
            if (calclusStep != null) {
                this._toothStepList.push(calclusStep);
            }
            if (fillStep != null) {
                this._toothStepList.push(fillStep);
            }
            if (pullStep != null) {
                this._toothStepList.push(pullStep);
            }
            if (paintStep != null) {
                this._toothStepList.push(paintStep);
            }
            if (cutStep != null) {
                this._toothStepList.push(cutStep);
            }
            if (braceStep != null) {
                this._toothStepList.push(braceStep);
            }
        }
        else {
            if (calclusStep != null) {
                this._toothStepList.push(calclusStep);
            }
            if (fillStep != null) {
                this._toothStepList.push(fillStep);
            }
            if (braceStep != null) {
                this._toothStepList.push(braceStep);
            }
            if (paintStep != null) {
                this._toothStepList.push(paintStep);
            }
            if (pullStep != null) {
                this._toothStepList.push(pullStep);
            }
            if (cutStep != null) {
                this._toothStepList.push(cutStep);
            }
        }
        this.RemoveUnusedTooth();
    }

    /**
     * update函数
     * 
     * @memberof SceneManager
     */
    onUpdate() {
        if (!this._isGameOver) {
            if (this._currentToothSteep == null || this._currentToothSteep != this._toothStepList[this._currentToothStepIndex]) {
                this._currentToothSteep = this._toothStepList[this._currentToothStepIndex];
                switch (this._currentToothSteep.ToothStepType) {
                    case ToothStepType.CalculusTooth:
                        this._handleScript.SetHandlerType(HandlerType.PointedHandler, "CalculusTooth");
                    case ToothStepType.CutTooth:
                        this._handleScript.SetHandlerType(HandlerType.PointedHandler, "CutTooth");
                        break;
                    case ToothStepType.FillingTooth:
                        this._handleScript.SetHandlerType(HandlerType.PointedHandler, "FillingTooth");
                        break
                    case ToothStepType.PaintTooth:
                        this._handleScript.SetHandlerType(HandlerType.NozzleHandler);
                        break
                    case ToothStepType.BraceTooth:
                        this._handleScript.SetHandlerType(HandlerType.TweezersHandler);
                        break;
                    case ToothStepType.PullTooth:
                        this._handleScript.SetHandlerType(HandlerType.PincersHandler);
                        break;
                }
            }
            let updateRes = this._handleScript.UpdateCleanTooth(this._currentToothSteep);
            if (updateRes) {
                this._currentToothStepIndex++;
                if (this._currentToothStepIndex >= this._toothStepList.length) {
                    console.log("所有流程结束");
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("全部完成展示");
                    this._handleScript.GameOver();
                    this._isGameOver = true;
                }
                else {
                    // this._handleScript.SetHandlerType(HandlerType.NozzleHandler);
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("小节完成");
                    console.log("游戏进入下一步");
                }
            }
        }
    }

    /**
     * 设置箍牙步骤
     * 箍牙可以设置前步骤洗牙垢和补牙
     * 
     * @memberof SceneManager
     */
    public SetBraceToothStep(): CleanToothStep {
        let templist = [];
        if (Math.random() > 0.4) {
            templist = this._topToothList.concat();
        }
        else {
            templist = this._bottomToothList.concat();
        }
        /* 把选中的牙从正常牙齿中移除 */
        for (let i = 0; i < templist.length; i++) {
            const tempT = templist[i];
            for (let j = 0; j < this._normalToothList.length; j++) {
                const normalT = this._normalToothList[j];
                if (normalT == tempT) {
                    this._normalToothList.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        /* 如果列表数量大于1,则设置成功 */
        if (templist.length > 0) {
            let toothStep = new CleanToothStep();
            this._cleanStepCount++;
            this._braceToothList = templist;
            toothStep.SetTooth(templist, ToothStepType.BraceTooth);
            return toothStep;
        }
        else {
            return null;
        }
    }

    /**
     * 设置拔牙步骤,拔牙之前不可以设置其他步骤
     * 
     * @memberof SceneManager
     */
    public SetPullToothStep(): CleanToothStep {
        let templist = this._normalToothList.concat();
        // /* 拔牙和冲突，从列表中移除补牙 */
        // /* 随机移除几颗牙齿 */
        // if (templist.length > 4) {
        //     /* 关卡和步骤越多,缺失的牙齿就越多 */
        //     let levDecCount = Math.min(this._currentLevel, 3);
        //     let stepDecCount = Math.min(this._cleanStepCount, 3);
        //     /* 安全值，牙齿最多不能移除3个 */
        //     let deccount = Math.min(3, Math.ceil(Math.random() * (levDecCount + stepDecCount)));
        //     templist.sort(() => {
        //         return Math.random() - 0.5;
        //     })
        //     templist.splice(0, deccount);
        // }
        /* 能拔的牙只能是4，5，6，7牙，移除不符合要求的*/
        for (let index = 0; index < templist.length; index++) {
            const element = templist[index];
            if (element.name != "4" && element.name != "5" && element.name != "6" && element.name != "7") {
                templist.splice(index, 1);
                index--;
            }
        }
        /* 随机移除几颗牙齿 */
        if (templist.length > 3) {
            let deccount = Math.floor(Math.random() * (templist.length - 3));
            templist.sort(() => {
                return Math.random() - 0.5;
            })
            templist.splice(0, deccount);
        }
        /* 把设置的牙齿从正常牙齿中移除 */
        for (let i = 0; i < templist.length; i++) {
            const tempT = templist[i];
            for (let j = 0; j < this._normalToothList.length; j++) {
                const normalT = this._normalToothList[j];
                if (normalT == tempT) {
                    this._normalToothList.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        /* 如果设置的牙齿大于1，则设置生效 */
        if (templist.length > 0) {
            let toothStep = new CleanToothStep();
            this._cleanStepCount++;
            this._pullToothList = templist;
            toothStep.SetTooth(templist, ToothStepType.PullTooth);
            return toothStep;
        }
        else {
            return null;
        }
    }

    /**
     * 设置钻牙步骤，钻牙之前不可以设置其他步骤
     * 
     * @memberof SceneManager
     */
    public SetCutToothStep(): CleanToothStep {
        let templist = this._normalToothList.concat();
        /* 不是所有牙齿都能切 */
        for (let index = 0; index < templist.length; index++) {
            const element = templist[index];
            if (element.name != "4" && element.name != "5" && element.name != "6" && element.name != "7") {
                templist.splice(index, 1);
                index--;
            }
        }
        /* 随机移除几颗牙齿 */
        // if (templist.length > 4) {
        //     /* 关卡和步骤越多,缺失的牙齿就越多 */
        //     let levDecCount = Math.min(this._currentLevel, 3);
        //     let stepDecCount = Math.min(this._cleanStepCount, 3);
        //     /* 安全值，牙齿最多不能移除3个 */
        //     let deccount = Math.min(3, Math.ceil(Math.random() * (levDecCount + stepDecCount)));
        //     templist.sort(() => {
        //         return Math.random() - 0.5;
        //     })
        //     templist.splice(0, deccount);
        // }
        /* 随机移除几颗牙齿 */
        if (templist.length > 3) {
            let deccount = Math.floor(Math.random() * (templist.length - 3));
            templist.sort(() => {
                return Math.random() - 0.5;
            })
            templist.splice(0, deccount);
        }
        /* 把设置的牙齿从正常牙齿中移除 */
        for (let i = 0; i < templist.length; i++) {
            const tempT = templist[i];
            for (let j = 0; j < this._normalToothList.length; j++) {
                const normalT = this._normalToothList[j];
                if (normalT == tempT) {
                    this._normalToothList.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        /* 如果牙齿数量大于1,则设置生效 */
        if (templist.length > 0) {
            let toothStep = new CleanToothStep();
            this._cleanStepCount++;
            this._cutToothList = templist;
            toothStep.SetTooth(templist, ToothStepType.CutTooth);
            return toothStep;
        }
        else {
            return null;
        }
    }

    /**
     * 设置包金牙步骤，包金牙步骤之前可以设置洗牙垢，补牙步骤
     * 
     * @memberof SceneManager
     */
    public SetPaintToothStep(): CleanToothStep {
        let templist = this._normalToothList.concat();
        /* 不是所有牙齿都能切 */
        for (let index = 0; index < templist.length; index++) {
            const element = templist[index];
            if (element.name != "4" && element.name != "5" && element.name != "6" && element.name != "7") {
                templist.splice(index, 1);
                index--;
            }
        }
        // /* 随机移除几颗牙齿 */
        // if (templist.length > 4) {
        //     /* 关卡和步骤越多,缺失的牙齿就越多 */
        //     let levDecCount = Math.min(this._currentLevel, 3);
        //     let stepDecCount = Math.min(this._cleanStepCount, 3);
        //     /* 安全值，牙齿最多不能移除3个 */
        //     let deccount = Math.min(3, Math.ceil(Math.random() * (levDecCount + stepDecCount)));
        //     templist.sort(() => {
        //         return Math.random() - 0.5;
        //     })
        //     templist.splice(0, deccount);
        // }
        /* 随机移除几颗牙齿 */
        if (Uti_XYXZS_lit.isI_XYXZS_phone) {
            if (templist.length > 5) {
                let deccount = templist.length - 5;
                templist.sort(() => {
                    return Math.random() - 0.5;
                })
                templist.splice(0, deccount);
            }
        }
        else {
            if (templist.length > 3) {
                let deccount = Math.floor(Math.random() * (templist.length - 3));
                templist.sort(() => {
                    return Math.random() - 0.5;
                })
                templist.splice(0, deccount);
            }
        }
        /* 把设置的牙齿从正常牙齿中移除 */
        for (let i = 0; i < templist.length; i++) {
            const tempT = templist[i];
            for (let j = 0; j < this._normalToothList.length; j++) {
                const normalT = this._normalToothList[j];
                if (normalT == tempT) {
                    this._normalToothList.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        /* 如果牙齿数量大于1,则设置生效 */
        if (templist.length > 0) {
            let toothStep = new CleanToothStep();
            this._cleanStepCount++;
            this._paintToothList = templist;
            toothStep.SetTooth(templist, ToothStepType.PaintTooth);
            return toothStep;
        }
        else {
            return null;
        }
    }

    /**
     * 设置洗牙垢步骤，洗牙垢后可以设置箍牙，包金牙步骤
     * 
     * @memberof SceneManager
     */
    public SetCalculusToothStep(): CleanToothStep {
        let templist = this._normalToothList.concat();
        templist.concat(this._braceToothList);
        templist.concat(this._paintToothList);
        /* 补牙和洗牙冲突，从列表中移除补牙 */
        for (let i = 0; i < this._fillingToothList.length; i++) {
            const calTooth = this._fillingToothList[i];
            for (let j = 0; j < templist.length; j++) {
                const tempTooth = templist[j];
                if (tempTooth == calTooth) {
                    templist.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        // /* 随机移除几颗牙齿 */
        // if (templist.length > 4) {
        //     /* 关卡和步骤越多,缺失的牙齿就越多 */
        //     let levDecCount = Math.min(this._currentLevel, 3);
        //     let stepDecCount = Math.min(this._cleanStepCount, 3);
        //     /* 安全值，牙齿最多不能移除3个 */
        //     let deccount = Math.min(3, Math.ceil(Math.random() * (levDecCount + stepDecCount)));
        //     templist.sort(() => {
        //         return Math.random() - 0.5;
        //     })
        //     templist.splice(0, deccount);
        // }
        if (Uti_XYXZS_lit.isI_XYXZS_phone) {
            if (templist.length > 5) {
                let deccount = templist.length - 5;
                templist.sort(() => {
                    return Math.random() - 0.5;
                })
                templist.splice(0, deccount);
            }
        }
        else {
            if (templist.length > 3) {
                let deccount = Math.floor(Math.random() * (templist.length - 3));
                templist.sort(() => {
                    return Math.random() - 0.5;
                })
                templist.splice(0, deccount);
            }
        }

        /* 把设置的牙齿从正常牙齿中移除 */
        for (let i = 0; i < templist.length; i++) {
            const tempT = templist[i];
            for (let j = 0; j < this._normalToothList.length; j++) {
                const normalT = this._normalToothList[j];
                if (normalT == tempT) {
                    this._normalToothList.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        /* 如果牙齿数量大于1,则步骤生效 */
        if (templist.length > 0) {
            let toothStep = new CleanToothStep();
            this._cleanStepCount++;
            this._calculusToothList = templist;
            toothStep.SetTooth(templist, ToothStepType.CalculusTooth);
            return toothStep;
        }
        else {
            return null;
        }
    }

    /**
     * 设置补牙步骤，补牙后可以设置箍牙，包金牙步骤
     * 
     * @memberof SceneManager
     */
    public SetFillingTooth(): CleanToothStep {
        let templist = this._normalToothList.concat();
        templist.concat(this._braceToothList);
        templist.concat(this._paintToothList);
        /* 补牙和洗牙冲突，从列表中移除洗牙 */
        for (let i = 0; i < this._calculusToothList.length; i++) {
            const calTooth = this._calculusToothList[i];
            for (let j = 0; j < templist.length; j++) {
                const tempTooth = templist[j];
                if (tempTooth == calTooth) {
                    templist.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        /* 随机移除几颗牙齿 */
        if (templist.length > 4) {
            let rd = Math.floor(Math.random() * 3) + 4;
            let deccount = templist.length - Math.min(templist.length, rd)
            templist.sort(() => {
                return Math.random() - 0.5;
            })
            templist.splice(0, deccount);
        }
        /* 把设置的牙齿从正常牙齿中移除 */
        for (let i = 0; i < templist.length; i++) {
            const tempT = templist[i];
            for (let j = 0; j < this._normalToothList.length; j++) {
                const normalT = this._normalToothList[j];
                if (normalT == tempT) {
                    this._normalToothList.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        /* 如果牙齿数量大于1，则返回 */
        if (templist.length > 0) {
            this._cleanStepCount++;
            let toothStep = new CleanToothStep();
            this._fillingToothList = templist;
            toothStep.SetTooth(templist, ToothStepType.FillingTooth);
            return toothStep;
        }
        else {
            return null;
        }
    }

    /**
     * 将牙齿上多余的步骤删除
     * 
     * @param {Array<Laya.Sprite3D>} toothList 
     * @memberof SceneManager
     */
    public RemoveUnusedTooth() {
        /* 将正常牙齿的不需要组件删除 */
        for (let index = 0; index < this._allToothList.length; index++) {
            const tooth = this._allToothList[index] as Laya.Sprite3D;
            if (tooth.getComponent(FillingTooth) == null) {
                let fillTooth = tooth.getChildByName("FillTooth");
                if (fillTooth) fillTooth.destroy();
            }
            if (tooth.getComponent(CalculusThooth) == null) {
                let calculusThooth = tooth.getChildByName("CalculusThooth");
                if (calculusThooth) calculusThooth.getChildByName("yagou").destroy();
            }
            if (tooth.getComponent(PullTooth) == null) {
                let pullTooth = tooth.getChildByName("PullTooth");
                if (pullTooth) pullTooth.destroy();
            }
            if (tooth.getComponent(BraceTooth) == null) {
                let braceTooth = tooth.getChildByName("BraceTooth");
                if (braceTooth) braceTooth.destroy();
            }
            if (tooth.getComponent(CutTooth) == null) {
                let cutTooth = tooth.getChildByName("CutTooth");
                if (cutTooth) cutTooth.destroy();
            }
            if (tooth.getComponent(PaintTooth) == null) {
                let paintTooth = tooth.getChildByName("PaintTooth");
                if (paintTooth) paintTooth.destroy();
            }
        }
    }
}