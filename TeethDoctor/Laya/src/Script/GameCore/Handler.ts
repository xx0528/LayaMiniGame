import { HandlerState, HandlerType } from "../Enum";
import SceneManager from "./SceneManager";
import CleanToothStep from "./Tooth/CleanToothStep";
import Vibr_XYXZS_ateMgr from "../../Mgr/VibrateMgr";
import Sou_XYXZS_ndMgr from "../../Mgr/SoundMgr";

export default class Handler extends Laya.Script3D {
    constructor() {
        super()
    }
    /* 当前场景引用 */
    private _scene: Laya.Scene3D;
    /* 摄像机旋转中心 */
    private _cameraCenter: Laya.Sprite3D;
    /* 摄像机引用 */
    private _camera: Laya.Camera;
    /* 手柄3D精灵 */
    private _handlerSp: Laya.Sprite3D;
    /* 手柄Mesh网格 */
    private _handlerMeshs: Laya.Sprite3D;
    /* 手柄现在的状态 */
    private _handlerState: HandlerState;
    /* 手柄种类 */
    private _handlerType: HandlerType;
    /* 当前摄像机旋转值 */
    private _cameraCurRotate: number = 0;
    /* 当前摄像机上下偏移 */
    private _cameraCurUpDownOffset: number = 0;
    /* 当前摄像机偏移 */
    private _cameraLockRotate: number = 0;
    /* 当前摄像机总偏移 */
    private _cameraCurOffset: Laya.Vector3 = new Laya.Vector3();
    /* 当前手柄旋转 */
    private _handleCurRotate: number = 0;
    /* 当前手柄上下偏移 */
    private _handleCurUpCurDownOffset: number = 0;
    /* 当前手柄总偏移 */
    private _handleCurOffset: Laya.Vector3 = new Laya.Vector3();
    /* 手柄特效 */
    private _cleanEffect: Laya.Sprite3D;
    /* 手柄特效计时器 */
    private _cleanEffectTimer: number = 0;
    /* 舌头特效 */
    private _tongueAni: Laya.Animator;
    /* 扁桃体特效 */
    private _tonsilAni: Laya.Animator;
    /* 动画特效 */
    private _aniTimer: number = 0;
    /* 游戏结束 */
    private _isGameOver: boolean = false;
    /* 游戏结束特效 */
    private _gameOverEffect: Laya.Sprite3D;
    /* 声音计时器 */
    private _soundTimer: number = 0;;
    /* 牙齿名 */
    private _toothName: string;
    /* 开始移动计时器 */
    private _startMoveTimer: number = 0;
    /* 是否允许输入 */
    private _enableInput: boolean = false;
    //#region 保存的手柄精灵组件
    private _currentHanderSp3D: Laya.Sprite3D;
    private _pointedHandlerSp3D: Laya.Sprite3D;
    private _pincersHandlerSp3d: Laya.Sprite3D;
    private _tweezersHandlerSp3d: Laya.Sprite3D;
    private _nozzleHandlerSp3d: Laya.Sprite3D;
    private _pincersHandlerAni: Laya.Animator;
    //#endregion

    /* 手柄精灵组件对外封装 */
    public get Sprite3D(): Laya.Sprite3D {
        return this._handlerSp;
    }

    onAwake() {
        this._scene = SceneManager.Instance.CurrentScene;
        this._tongueAni = this._scene.getChildByName("Face").getChildByName("Toung").getComponent(Laya.Animator);
        this._tonsilAni = this._scene.getChildByName("Face").getChildByName("Tonsil").getComponent(Laya.Animator);
        this._gameOverEffect = this._scene.getChildByName("Effect") as Laya.Sprite3D;
        this._gameOverEffect.active = false;
        this._handlerSp = this.owner as Laya.Sprite3D;
        this._cameraCenter = this._scene.getChildByName("CameraCenter") as Laya.Sprite3D;
        this._camera = this._scene.getChildByName("Main Camera") as Laya.Camera;
        this._handlerMeshs = this._handlerSp.getChildByName("HandlerMeshs") as Laya.Sprite3D;
        this._pointedHandlerSp3D = this._handlerMeshs.getChildByName("PointedHandler") as Laya.Sprite3D;
        this._pincersHandlerSp3d = this._handlerMeshs.getChildByName("PincersHandler") as Laya.Sprite3D;
        this._tweezersHandlerSp3d = this._handlerMeshs.getChildByName("TweezersHandler") as Laya.Sprite3D;
        this._nozzleHandlerSp3d = this._handlerMeshs.getChildByName("NozzleHandler") as Laya.Sprite3D;
        this._pointedHandlerSp3D.active = false;
        this._pincersHandlerSp3d.active = false;
        this._pincersHandlerAni = this._pincersHandlerSp3d.getComponent(Laya.Animator);
        this._pincersHandlerAni.play("Idle");
        this._tweezersHandlerSp3d.active = false;
        this._nozzleHandlerSp3d.active = false;
        this._camera.transform.position = new Laya.Vector3(0, 0, 0);// Laya.Vector3._ZERO.clone();
        this._handlerSp.transform.position = new Laya.Vector3(0, 0, 0);// Laya.Vector3._ZERO.clone();
        Laya.Vector3.add(this._cameraCenter.transform.position, SceneManager.CameraOrigOffset, this._camera.transform.position);
        Laya.Vector3.add(this._cameraCenter.transform.position, SceneManager.HandleOrigOffset, this._handlerSp.transform.position);
        this._camera.transform.position = this._camera.transform.position;
        // this._camera.transform.lookAt(this._cameraCenter.transform.position, Laya.Vector3._Up);
        this._handlerSp.transform.position = this._handlerSp.transform.position;
        this._cameraCurOffset = SceneManager.CameraOrigOffset.clone();
        this._handleCurOffset = SceneManager.HandleOrigOffset.clone();
        this._handlerSp.on("SwitchAni", this, this.SwitchOutIn);
        this._handlerSp.on("PullingTooth", this, this.ClippingTooth);
        this._handlerSp.on("ShowEffect", this, this.ShowEffect);
        // this._handlerSp.on("PullingToothSwitchAni", this, this.ClippingTooth);
    }
    onStart() {
        Laya.timer.once(500, this, () => {
            this.Input(0, 0);
        });
    }
    /**
     * 每次跟新状态需要设置手柄
     * 
     * @memberof Handler
     */
    SetHandlerType(handerType: HandlerType, toothName?: string) {
        this._handlerType = handerType;
        this.SwitchHandler(toothName);
    }

    onUpdate() {
        this.SetHandlerMove();
        this.UpdateEffect();
        this.UpdateCamere();
    }

    StartGameMove() {
        this._cameraLockRotate = 60;
        Laya.timer.once(1000, this, () => {
            this._cameraLockRotate = -60;
        })
        Laya.timer.once(2000, this, () => {
            this._cameraLockRotate = 0;
            this._enableInput = true;
        })
    }

    /**
     * 
     * 
     * @memberof Handler
     */
    UpdateEffect() {
        if (this._cleanEffect == null) {
            this._cleanEffectTimer = 0;
        }
        else {
            if (this._cleanEffectTimer < 150) {
                this._cleanEffectTimer += Laya.timer.delta;
                this._cleanEffect.active = true;
            }
            else {
                this._cleanEffect.active = false;
                this
            }
        }
        if (this._aniTimer < 500) {
            this._aniTimer += Laya.timer.delta;
            this._tongueAni.speed = 1;
            this._tonsilAni.speed = 1;
        }
        else {
            this._tongueAni.speed = 0;
            this._tonsilAni.speed = 0;
        }
        this._soundTimer += Laya.timer.delta;
    }

    /**
     * 
     * 
     * @memberof Handler
     */
    UpdateCamere() {
        let speed = 0;
        if (this._cameraLockRotate > this._cameraCurRotate) {
            if (this._isGameOver || !this._enableInput) {
                speed = Laya.timer.delta / 1000 * 180;
            }
            else {
                speed = 1 + (this._cameraLockRotate - this._cameraCurRotate) * 0.05;
            }
            this._cameraCurRotate += speed;
            if (this._cameraLockRotate < this._cameraCurRotate) {
                this._cameraCurRotate = this._cameraLockRotate;
            }
        }
        else if (this._cameraLockRotate < this._cameraCurRotate) {
            if (this._isGameOver || !this._enableInput) {
                speed = Laya.timer.delta / 1000 * 180;
            }
            else {
                speed = 1 + (this._cameraCurRotate - this._cameraLockRotate) * 0.05;
            }
            this._cameraCurRotate -= speed;
            if (this._cameraLockRotate > this._cameraCurRotate) {
                this._cameraCurRotate = this._cameraLockRotate;
            }
        }
        this.SetPosByRotateAndOffset(this._cameraCurRotate, 0, SceneManager.CameraOrigOffset, this._cameraCurOffset);
        Laya.Vector3.add(this._cameraCenter.transform.position, this._cameraCurOffset, this._camera.transform.position);
        this._camera.transform.position = this._camera.transform.position;
        this._camera.transform.lookAt(this._cameraCenter.transform.position, new Laya.Vector3(0, 1, 0));

        // if (this._cameraLockRotate > this._cameraCurRotate) {
        //     this._cameraCurRotate += 1 + (this._cameraLockRotate - this._cameraCurRotate) * 0.1;
        //     if (this._cameraLockRotate < this._cameraCurRotate) {
        //         this._cameraCurRotate = this._cameraLockRotate;
        //     }
        // }
        // else if (this._cameraLockRotate < this._cameraCurRotate) {
        //     this._cameraCurRotate -= 1 + (this._cameraCurRotate - this._cameraLockRotate) * 0.1;
        //     if (this._cameraLockRotate > this._cameraCurRotate) {
        //         this._cameraCurRotate = this._cameraLockRotate;
        //     }

        // }
        // this.SetPosByRotateAndOffset(this._cameraCurRotate, 0, SceneManager.CameraOrigOffset, this._cameraCurOffset);
        // Laya.Vector3.add(this._cameraCenter.transform.position, this._cameraCurOffset, this._camera.transform.position);
        // this._camera.transform.position = this._camera.transform.position;
        // this._camera.transform.lookAt(this._cameraCenter.transform.position, Laya.Vector3._Up);
    }

    /**
     * 
     * 
     * @memberof Handler
     */
    ShowEffect(effectName?: string) {
        this._cleanEffectTimer = 0;
        this._aniTimer = 0;
        Vibr_XYXZS_ateMgr.vibr_XYXZS_ateShort();
        if (this._soundTimer > 30) {
            let rd = Math.random()
            if (effectName == "CalculusTooth") {
                Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("除垢");
                // if (rd < 0.25) {
                //     Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("牙垢");
                // }
                // else if (rd < 0.5) {
                //     Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("牙垢1");
                // }
                // else if (rd < 0.75) {
                //     Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("牙垢2");
                // }
                // else {
                //     Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("牙垢3");
                // }
                this._soundTimer = -1500;
            }
            else if (effectName == "PullTooth1") {
                Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("拔牙夹住牙齿");
                this._soundTimer = -1500;
            }
            else if (effectName == "PullTooth2") {
                if (Math.random() < 0.3) {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("拔牙1");
                }
                if (Math.random() < 0.6) {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("拔牙2");
                }
                else {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("拔牙3");
                }
                this._soundTimer = -1000;
            }
            else if (effectName == "PaintTooth") {
                Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("包金牙");
                this._soundTimer = -1000;
            }
            else if (effectName == "FillingTooth") {
                Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("虫牙补洞");
                this._soundTimer = -800;
            }
            else if (effectName == "BraceTooth") {
                if (rd < 0.5) {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("下牙支架链接2");
                }
                else {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("上牙支架链接1");
                }
            }
            else if (effectName == "CutTooth") {
                Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("磨牙和洗牙垢");
                this._soundTimer = -1200;
            }
            // this._soundTimer = 0;
        }

    }
    //#region 拔牙时的手柄特殊处理代码

    /* 拔牙的进度条 */
    private _pullingProgress: number = 0;

    /**
     * 拔牙时的特殊输入方式,会按照y轴输入的数值动态调整拔牙进度
     * 
     * @param {number} xInput 
     * @param {number} yInput 
     * @memberof Handler
     */
    public PullingToothInputProgress(xInput: number, yInput: number) {
        if (this._pullingProgress < 1) {
            if (this._handleCurUpCurDownOffset > 0) {
                if (yInput > 0) {
                    this._pullingProgress += 1 * yInput / 10;
                }
                else {
                    this._pullingProgress += -1 * yInput / 10;
                }
                this._currentHanderSp3D.transform.localPositionY = this._pullingProgress * -5;
            }
            else {
                if (yInput < 0) {
                    this._pullingProgress += -1 * yInput / 10;
                }
                else {
                    this._pullingProgress += 1 * yInput / 10;
                }
                this._currentHanderSp3D.transform.localPositionY = this._pullingProgress * 5;
            }
        }
        if (this._pullingProgress > 0.18 && this._pullingProgress < 1) {
            this._pullingProgress = 1;
            this.PullToothOut();
        }
        if (this._pullingProgress >= 1.02) {
            if (this._handleCurUpCurDownOffset > 0) {
                if (yInput < 0) {
                    this._pullingProgress += -1 * yInput / 10;
                }
                else {
                    this._pullingProgress += 1 * yInput / 10;
                }
                this._currentHanderSp3D.transform.localPositionY = (this._pullingProgress - 1.20) * 5;
            }
            else {
                if (yInput > 0) {
                    this._pullingProgress += 1 * yInput / 10;
                }
                else {
                    this._pullingProgress += -1 * yInput / 10;
                }
                this._currentHanderSp3D.transform.localPositionY = (this._pullingProgress - 1.20) * -5;
            }
        }
        if (this._pullingProgress > 1.20) {
            this._pullingProgress = 2;
            this._currentHanderSp3D.transform.localPosition = new Laya.Vector3(0, 0, 0); // Laya.ConchVector3.ZERO.clone(); // Laya.Vector3._ZERO.clone();
            Laya.timer.once(100, this, () => {
                this._pullingProgress = 0;
                this.SwitchOutIn();
            })
        }
    }

    /**
     * 拔牙齿拔出去
     * 
     * @memberof Handler
     */
    PullToothOut() {
        this._handlerState = HandlerState.SwitchingAni;
        let moveLoc = 0;
        if (this._handleCurRotate > 0) {
            moveLoc = -5;
        }
        else {
            moveLoc = 5;
        }
        Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: moveLoc, localPositionZ: -5 }, 500, null,
            Laya.Handler.create(this, () => {
                this._pullingProgress = 1.01;
                this.PullToothIn();
            })
        )
    }

    /**
     * 将新牙齿装入
     * 
     * @memberof Handler
     */
    PullToothIn() {
        Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: 0, localPositionZ: 0 }, 300, null, Laya.Handler.create(this, () => {
            this._pullingProgress = 1.02;
            this._handlerState = HandlerState.PullingTooth;
        }));
    }

    /**
     * 拔牙步骤,夹住牙齿
     * 
     * @memberof Handler
     */
    ClippingTooth(pullLocTrans: Laya.Transform3D) {
        this._handlerState = HandlerState.SwitchingAni;
        Laya.Tween.to(this._handlerSp.transform.position, { x: pullLocTrans.position.x, y: pullLocTrans.position.y, z: pullLocTrans.position.z }, 500);
        Laya.Tween.to(this._currentHanderSp3D.transform.localRotationEuler, { x: 0, y: 0, z: 0 }, 500);
        Laya.Tween.to(this._currentHanderSp3D.transform.localPosition, { x: 0, y: 0, z: 0 }, 500, null, Laya.Handler.create(this, this.PlayPincersAni));
        // this._currentHanderSp3D.transform.localRotationEuler = Laya.Vector3._ZERO.clone();
    }

    /**
     * 
     * 
     * @memberof Handler
     */
    PlayPincersAni() {
        this._pincersHandlerAni.play("Clipping");
        Laya.timer.once(600, this, () => {
            this._handlerState = HandlerState.PullingTooth;
        });
    }

    /**
     * 拔牙特殊的动画
     * 
     * @memberof Handler
     */
    PullingToothSwitchAni() {
        let moveLoc = 0;
        if (this._handleCurRotate > 0) {
            moveLoc = -5;
        }
        else {
            moveLoc = 5;
        }
    }
    //#endregion

    /**
     * 更换手柄
     * 
     * @memberof Handler
     */
    SwitchHandler(toothName?: string) {
        this._toothName = toothName;
        if (this._currentHanderSp3D == null) {
            switch (this._handlerType) {
                case HandlerType.PointedHandler:
                    this._currentHanderSp3D = this._pointedHandlerSp3D;
                    if (this._toothName == "CalculusTooth") {
                        this._cleanEffect = this._currentHanderSp3D.getChildByName("Xiya") as Laya.Sprite3D;
                        this._currentHanderSp3D.getChildByName("Zuanya").active = false;
                    }
                    else if (this._toothName == "CutTooth") {
                        this._cleanEffect = this._currentHanderSp3D.getChildByName("Zuanya") as Laya.Sprite3D;
                        this._currentHanderSp3D.getChildByName("Xiya").active = false;
                    }
                    else if (this._toothName == "FillingTooth") {
                        this._cleanEffect = this._currentHanderSp3D.getChildByName("Xiya") as Laya.Sprite3D;
                        this._currentHanderSp3D.getChildByName("Zuanya").active = false;
                    }
                    else {
                        this._cleanEffect = null;
                    }
                    if (this._cleanEffect != null) {
                        this._cleanEffect.active = false;
                    }
                    break;
                case HandlerType.NozzleHandler:
                    this._currentHanderSp3D = this._nozzleHandlerSp3d;
                    this._cleanEffect = this._currentHanderSp3D.getChildByName("Effect") as Laya.Sprite3D;
                    this._cleanEffect.active = false;
                    break;
                case HandlerType.TweezersHandler:
                    this._currentHanderSp3D = this._tweezersHandlerSp3d;
                    this._cleanEffect = null;
                    break;
                case HandlerType.PincersHandler:
                    this._currentHanderSp3D = this._pincersHandlerSp3d;
                    this._cleanEffect = null;
                    break;
            }
            this.SwitchIn();
        }
        else {
            this.SwitchOutIn();
        }
    }

    /**
     * 游戏结束，手柄隐藏
     * 
     * @memberof Handler
     */
    GameOver() {
        this._handlerMeshs.active = false;
        this._handlerSp.getChildByName("Select").active = false;
        this._handlerState = HandlerState.SwitchingAni;
        this._cameraLockRotate = 0;
        this._isGameOver = true;
        Laya.Tween.to(this._camera, { fieldOfView: 70 }, 1000);
        Laya.timer.once(500, this, () => {
            this._gameOverEffect.active = true;
        });
        // let moveLoc = 0;
        // if (this._handleCurRotate > 0) {
        //     moveLoc = -5;
        // }
        // else {
        //     moveLoc = 5;
        // }
        // Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: moveLoc, localPositionZ: -5 }, 500);
    }

    /**
     * 先把现有的手柄移出在移入
     * 
     * @memberof Handler
     */
    SwitchOutIn() {
        this._handlerState = HandlerState.SwitchingAni;
        let moveLoc = 0;
        if (this._handleCurRotate > 0) {
            moveLoc = -5;
        }
        else {
            moveLoc = 5;
        }
        this._currentHanderSp3D.transform.localRotationEuler = new Laya.Vector3();
        Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: moveLoc, localPositionZ: -5 }, 500, null,
            Laya.Handler.create(this, () => {
                this._currentHanderSp3D.transform.localPositionX = 0;
                this._currentHanderSp3D.transform.localPositionY = 0;
                this._currentHanderSp3D.transform.localPositionZ = 0;
                this._currentHanderSp3D.active = false;
                switch (this._handlerType) {
                    case HandlerType.PointedHandler:
                        this._currentHanderSp3D = this._pointedHandlerSp3D;
                        if (this._toothName == "CalculusTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Xiya") as Laya.Sprite3D;
                            this._currentHanderSp3D.getChildByName("Zuanya").active = false;
                        }
                        else if (this._toothName == "CutTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Zuanya") as Laya.Sprite3D;
                            this._currentHanderSp3D.getChildByName("Xiya").active = false;
                        }
                        else if (this._toothName == "FillingTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Xiya") as Laya.Sprite3D;
                            this._currentHanderSp3D.getChildByName("Zuanya").active = false;

                        }
                        else {
                            this._cleanEffect = null;
                        }
                        if (this._cleanEffect != null) {
                            this._cleanEffect.active = false;
                        }
                        break;
                    case HandlerType.NozzleHandler:
                        this._currentHanderSp3D = this._nozzleHandlerSp3d;
                        this._cleanEffect = this._currentHanderSp3D.getChildByName("Effect") as Laya.Sprite3D;
                        this._cleanEffect.active = false;
                        break;
                    case HandlerType.TweezersHandler:
                        this._currentHanderSp3D = this._tweezersHandlerSp3d;
                        this._cleanEffect = null;
                        break;
                    case HandlerType.PincersHandler:
                        this._currentHanderSp3D = this._pincersHandlerSp3d;
                        this._cleanEffect = null;
                        break;
                }
                this.SwitchIn();
            })
        )
    }


    /**
     * 把现有的手柄移入
     * 
     * @memberof Handler
     */
    SwitchIn() {
        let moveLoc = 0;
        if (this._handleCurRotate > 0) {
            moveLoc = -5;
        }
        else {
            moveLoc = 5;
        }
        this._currentHanderSp3D.active = true;
        this._currentHanderSp3D.transform.localPositionX = moveLoc;
        this._currentHanderSp3D.transform.localPositionZ = -5;
        Laya.timer.once(50, this, () => {
            this._handlerState = HandlerState.Normal;
            // this._handleCurUpCurDownOffset = 0;
            // this._handleCurRotate = 0;
        });
        // this._handlerSp.transform.position = Laya.Vector3._ZERO.clone();
        // Laya.Vector3.add(this._cameraCenter.transform.position, SceneManager.HandleOrigOffset, this._handlerSp.transform.position);
        // this._handlerSp.transform.position = this._handlerSp.transform.position;
        this._handleCurUpCurDownOffset = 0;
        // this._handleCurRotate = 0;
        this.SetPosByRotateAndOffset(this._handleCurRotate, this._handleCurUpCurDownOffset, SceneManager.HandleOrigOffset, this._handleCurOffset);
        Laya.Vector3.add(this._cameraCenter.transform.position, this._handleCurOffset, this._handlerSp.transform.position);
        this._handlerSp.transform.position = this._handlerSp.transform.position;
        Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: 0, localPositionZ: 0, localPositionY: 0 }, 300, null, Laya.Handler.create(this, () => {

        }));
        Laya.Tween.to(this._currentHanderSp3D.transform, { localRotationEulerX: 0, localRotationEulerY: 0, localRotationEulerZ: 0 }, 300, null, Laya.Handler.create(this, () => {

        }));
        Laya.Tween.to(this._handlerMeshs.transform, { localPositionX: 0, localPositionZ: 0, localPositionY: 0 }, 100, null, Laya.Handler.create(this, () => {

        }));
        Laya.Tween.to(this._handlerMeshs.transform, { localRotationEulerX: 0, localRotationEulerY: 0, localRotationEulerZ: 0 }, 100, null, Laya.Handler.create(this, () => {

        }));

    }

    /**
     * 
     * 
     * @param {number} xInput 
     * @param {number} yInput 
     * @memberof Handler
     */
    public Input(xInput: number, yInput: number) {
        if (!this._enableInput) return;
        if (this._handlerState == HandlerState.SwitchingAni) {
            return;
        }
        switch (this._handlerType) {
            /* 第一种移动手柄的方式,适合补牙,洗牙垢,钻牙,包金牙 */
            case HandlerType.NozzleHandler:
            case HandlerType.PointedHandler:
            case HandlerType.TweezersHandler:
                this.NormalMoveHandler(xInput, yInput);
                break;
            /* 第二种移动手柄的方式，适合拔牙 */
            case HandlerType.PincersHandler:
                if (this._handlerState == HandlerState.Normal) {
                    this.NormalMoveHandler(xInput, yInput);
                }
                // else if (this._handlerState == HandlerState.PullingToothAni) {
                //     this.PullingToothInputProgress(xInput, yInput);
                // }
                if (this._handlerState == HandlerState.PullingTooth) {
                    this.PullingToothInputProgress(xInput, yInput);
                }
                break;
        }
    }

    /**
     * 正常移动手柄的方法
     * 
     * @param {number} xInput 
     * @param {number} yInput 
     * @memberof Handler
     */
    public NormalMoveHandler(xInput: number, yInput: number) {
        /* if (Math.abs(xInput) > 0)  */{
            // this._cameraCurRotate += x * 0.5
            // this._cameraCurRotate = Math.max(-1 * this.MaxCameraRotateAngle, Math.min(this.MaxCameraRotateAngle, this._cameraCurRotate));
            this._handleCurRotate += xInput;
            this._handleCurRotate = Math.max(-1 * SceneManager.MaxHandleRotateAngle, Math.min(SceneManager.MaxHandleRotateAngle, this._handleCurRotate));
            let temp = this._handleCurRotate;
            if (Math.abs(temp - this._cameraLockRotate) > 20) {
                let dir = this._handleCurRotate > this._cameraLockRotate ? -1 : 1;
                // if (this._cameraCurRotate > 45 || this._cameraCurRotate < -45) return;
                // this._cameraCurRotate += dir * 30;
                this._cameraLockRotate -= (dir * 20);
            }

            /* 老摄像机 */
            // if (Math.abs(this._cameraCurRotate - this._cameraLockAngle) > 30) {
            //     let dir = this._cameraCurRotate > this._cameraLockAngle ? -1 : 1;
            //     // if (this._cameraCurRotate > 45 || this._cameraCurRotate < -45) return;
            //     // this._cameraCurRotate += dir * 30;
            //     this._cameraLockAngle += dir * 30;
            // }


            // if (Math.abs(this._handleCurRotate - this._cameraCurRotate) < 60) {
            //     this._cameraCurRotate = 0
            // }
            // else {
            //     let dir = this._handleCurRotate > 0 ? 1 : -1;
            //     this._cameraCurRotate = (Math.abs(this._handleCurRotate) - 60) / 1.5 * dir;
            // }
            // this._cameraCurRotate = this._handleCurRotate;
        }
        /* if (Math.abs(yInput) > 0.005)  */{
            this._handleCurUpCurDownOffset -= yInput;
            this._handleCurUpCurDownOffset = Math.max(-1 * SceneManager.MaxHandleUpDownOffset, Math.min(SceneManager.MaxHandleUpDownOffset, this._handleCurUpCurDownOffset));
        }
        // this.SetPosByRotateAndOffset(this._cameraCurRotate, 0, SceneManager.CameraOrigOffset, this._cameraCurOffset);
        // Laya.Vector3.add(this._cameraCenter.transform.position, this._cameraCurOffset, this._camera.transform.position);
        // this._camera.transform.position = this._camera.transform.position;
        // this._camera.transform.lookAt(this._cameraCenter.transform.position, Laya.Vector3._Up);
        this.SetPosByRotateAndOffset(this._handleCurRotate, this._handleCurUpCurDownOffset, SceneManager.HandleOrigOffset, this._handleCurOffset);
        Laya.Vector3.add(this._cameraCenter.transform.position, this._handleCurOffset, this._handlerSp.transform.position);
        this._handlerSp.transform.position = this._handlerSp.transform.position;
        //下面的步骤用于处理手柄的旋转
        let tempv3 = new Laya.Vector3();
        Laya.Vector3.subtract(this._handlerSp.transform.position, this._cameraCenter.transform.position, tempv3);
        Laya.Vector3.add(tempv3, this._handlerSp.transform.position, tempv3);
        tempv3.y = this._handlerSp.transform.position.y;
        this._handlerSp.transform.lookAt(tempv3, new Laya.Vector3(0, 1, 0));
    }

    //#region 箍牙时的手柄特殊处理代码

    //#endregion

    /**
     * 设置手柄的旋转
     * 
     * @memberof Handler
     */
    public SetHandlerMove() {
        switch (this._handlerType) {
            case HandlerType.PincersHandler:
                this.PincersHandlerMove();
                break;
            case HandlerType.TweezersHandler:
                this.TweezersHandler();
                break;
            case HandlerType.PointedHandler:
            case HandlerType.NozzleHandler:
                this.PointedHandlerMove();
                break;
        }
        // this._handlerMeshs.transform.localRotationEuler = this._handlerMeshs.transform.localRotationEuler;
        // this._handlerMeshs.transform.localPositionY = (-this._handleCurUpCurDownOffset / 8) + ((() / SceneManager.MaxHandleRotateAngle) * 2);
        // this._handlerMeshs.transform.localPositionY = (Math.abs(this._handleCurRotate) / SceneManager.MaxHandleRotateAngle) * this._handleCurUpCurDownOffset * -0.2;
        // if (this._handleCurUpCurDownOffset > 0) {
        //     this._handlerMeshs.transform.localPositionY = (Math.abs(this._handleCurRotate) / SceneManager.MaxHandleRotateAngle) * this._handleCurUpCurDownOffset * -0.2;
        // }
        // else if (this._handleCurUpCurDownOffset < 0) {
        //     this._handlerMeshs.transform.localPositionY = (Math.abs(this._handleCurRotate) / SceneManager.MaxHandleRotateAngle) * this._handleCurUpCurDownOffset;
        // }
        // this._handle.transform.localRotationEuler.y = parentY;
        // this._handle.transform.localRotationEuler = this._handle.transform.localRotationEuler;
    }

    /**
     * 处理镊子手柄移动
     * 
     * @memberof Handler
     */
    public TweezersHandler() {
        /* if (this._handleCurUpCurDownOffset < 0)  */{
            this._currentHanderSp3D.transform.localPositionZ = Math.abs(this._handleCurRotate / SceneManager.MaxHandleRotateAngle) * -0.6;
            this._currentHanderSp3D.transform.localPositionY = this._handleCurUpCurDownOffset / SceneManager.MaxHandleUpDownOffset * -0.1;
            // if (this._currentHanderSp3D.transform.localRotationEulerZ > 0) {
            //     this._currentHanderSp3D.transform.localRotationEulerZ -= 1;
            // }
            // else if (this._currentHanderSp3D.transform.localRotationEulerZ < 0) {
            //     this._currentHanderSp3D.transform.localRotationEulerZ += 1;
            // }
            // console.log(this._currentHanderSp3D.transform.localRotationEulerX );
        }
        /* else */ /* if (this._handleCurUpCurDownOffset > 0)  */ {
            this._currentHanderSp3D.transform.localRotationEulerZ = 65 * this._handleCurRotate / SceneManager.MaxHandleRotateAngle
            // if (this._currentHanderSp3D.transform.localRotationEulerX > 0) {
            //     this._currentHanderSp3D.transform.localRotationEulerX -= 1;
            // }
            // else if (this._currentHanderSp3D.transform.localRotationEulerX < 0) {
            //     this._currentHanderSp3D.transform.localRotationEulerX += 1;
            // }
        }
    }

    /**
     * 处理钳子手柄移动
     * 
     * @memberof Handler
     */
    public PincersHandlerMove() {
        // this._handlerMeshs.transform.localRotationEuler = Laya.Vector3._ZERO.clone();
        // this._handlerMeshs.transform.localPosition = Laya.Vector3._ZERO.clone();
        let updown = this._handleCurUpCurDownOffset / SceneManager.MaxHandleUpDownOffset;
        if (updown > 0) {
            this._currentHanderSp3D.transform.localRotationEulerZ = 90 - (Math.min(1, (updown) * 2) * 90)
        }
        else {
            // console.log();
            this._currentHanderSp3D.transform.localRotationEulerZ = 90 + Math.min(1, (- updown) * 2) * 90
        }
        // this._currentHanderSp3D.transform.localRotationEulerZ = 0
        this._handlerSp.transform.position = this._handlerSp.transform.position;
        this._currentHanderSp3D.transform.localRotationEuler = this._currentHanderSp3D.transform.localRotationEuler;
        this._currentHanderSp3D.transform.localPosition = this._currentHanderSp3D.transform.localPosition;
        // this._currentHanderSp3D.transform.position = this._currentHanderSp3D.transform.position;
        return;
    }

    /**
     * 处理包金牙或者钻牙手柄移动
     * 
     * @memberof Handler
     */
    public PointedHandlerMove() {
        let parentY = this._handlerSp.transform.localRotationEuler.y;
        if (parentY > 0) {
            parentY = ((90 - parentY) / 90) * 45;
        }
        else/*  if (parentY < 0)  */ {
            parentY = ((parentY + 90) / 90) * -45;
        }
        let meshY = this._currentHanderSp3D.transform.localRotationEulerY;
        if (meshY > parentY) {
            meshY -= 3;
            if (meshY < parentY) {
                meshY = parentY;
            }
        }
        else if (meshY < parentY) {
            meshY += 3;
            if (meshY > parentY) {
                meshY = parentY;
            }
        }
        /* if (this._handleCurUpCurDownOffset < 0)  */{
            let dir = Math.abs(this._handleCurRotate) / SceneManager.MaxHandleRotateAngle
            this._currentHanderSp3D.transform.localRotationEulerX = (this._handleCurUpCurDownOffset * 10 * -dir);
            // if (this._currentHanderSp3D.transform.localRotationEulerZ > 0) {
            //     this._currentHanderSp3D.transform.localRotationEulerZ -= 1;
            // }
            // else if (this._currentHanderSp3D.transform.localRotationEulerZ < 0) {
            //     this._currentHanderSp3D.transform.localRotationEulerZ += 1;
            // }
            // console.log(this._currentHanderSp3D.transform.localRotationEulerX );
        }
        /* else */ /* if (this._handleCurUpCurDownOffset > 0)  */ {
            let dir = (this._handleCurRotate) / SceneManager.MaxHandleRotateAngle
            this._currentHanderSp3D.transform.localRotationEulerZ = meshY + (this._handleCurUpCurDownOffset * 30 * dir);
            // if (this._currentHanderSp3D.transform.localRotationEulerX > 0) {
            //     this._currentHanderSp3D.transform.localRotationEulerX -= 1;
            // }
            // else if (this._currentHanderSp3D.transform.localRotationEulerX < 0) {
            //     this._currentHanderSp3D.transform.localRotationEulerX += 1;
            // }
        }
        this._currentHanderSp3D.transform.localRotationEulerY = meshY;

    }


    /**
     * 按照旋转值和上下偏移设置最终的偏移
     * 
     * @param {number} rotate 
     * @param {number} UpDownOffset 
     * @param {Laya.Vector3} Offset 
     * @memberof SceneManager
     */
    public SetPosByRotateAndOffset(rotate: number, upDownOffset: number, origOffset: Laya.Vector3, resOffset) {
        let distance = origOffset.z;
        let rad = (rotate * Math.PI) / 180;
        let z = Math.cos(rad) * distance;
        let x = Math.sin(rad) * distance;
        resOffset.x = x;
        resOffset.z = z;
        resOffset.y = upDownOffset;
    }

    /**
     * 更新手柄状态
     * 
     * @param {CleanToothStep} step 
     * @returns 
     * @memberof Handler
     */
    public UpdateCleanTooth(step: CleanToothStep) {
        switch (this._handlerState) {
            case HandlerState.SwitchingAni:
                if (this._handlerType == HandlerType.PincersHandler) {
                    return step.onToothStepUpdate(this._handlerSp, { progress: this._pullingProgress, upJaw: this._handleCurUpCurDownOffset > 0 });
                }
                return false;
            // break;
            case HandlerState.Normal:
                return step.onToothStepUpdate(this._handlerSp);
            // break;
            // case HandlerState.PullingToothAni:
            //     return false;
            // break;
            case HandlerState.PullingTooth:
                return step.onToothStepUpdate(this._handlerSp, { progress: this._pullingProgress, upJaw: this._handleCurUpCurDownOffset > 0 });
            // break;

        }

        // if (this._handlerState != HandlerState.PullingTooth && this._handlerState != HandlerState.PushingTooth) {
        //     if (this._handlerState == HandlerState.SwitchingAni) {
        //         return false;
        //     }
        //     return step.onToothStepUpdate(this._handlerSp);
        // }
        // else {

        // }
    }
}