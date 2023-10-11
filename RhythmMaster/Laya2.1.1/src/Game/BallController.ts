import Event_myqq_Mgr from "../Event/EventMgr";
import NoteBoard from "./NoteBoard";
import GameController from "./GameController";
import PhysicTrigger3d from "./Tools/PhysicTrigger3d";
import FSMStateMachine from "./Tools/FSMStateMachine";
import MouseMgr from "./MouseMgr";
import NoteManager, { Beat } from "./NoteManager";
import GameConst from "./GameConst";
import AudioWraper from "./Audio/AudioWraper";
import NativeCallback from "../NativeCallback";
//import BallControllerTmep from "./Audio/BallController";

const Stand: string = "Stand";
const Run: string = "Run";
const RunEnd: string = "RunEnd";
const Die: string = "Die";

export enum BallColor {
    Red, Yellow, Blue,
}

export default class BallController extends Laya.Script3D {
    public ball: Laya.Sprite3D;
    private originalPos: Laya.Vector3;
    private originalScale: Laya.Vector3;
    public curColor: BallColor = BallColor.Red;
    private meshRenderer: Laya.MeshRenderer;
    private trailMaterial: Laya.TrailMaterial;
    private mouseDownPosition: Laya.Vector3 = new Laya.Vector3();

    private songDelay: number = 0;
    private currentTime: number = 0;

    private curNodeIndex: number = 0;
    private endNodeIndex: number = 0;
    private dieNodeIndex: number = 0;
    private waySpace: number = 0;
    private wayTotal: number = 0;
    private wayTotalTime: number = 0;

    private stateMachine: FSMStateMachine = null;

    public get gameObject(): Laya.Sprite3D { return this.owner as Laya.Sprite3D; }

    public get isRun(): boolean { return this.stateMachine.curState.key == Run; }
    public get RunBeatIndex(): number {return this.curNodeIndex; }
    public get finishProgress(): number { return Math.min(1, this.curNodeIndex / this.endNodeIndex); }

    onAwake(): void {
        this.ball = this.gameObject.getChildByName("Ball") as Laya.Sprite3D;
        this.originalPos = this.gameObject.transform.position.clone();
        this.originalScale = this.ball.transform.localScale.clone();
        PhysicTrigger3d.GetTrigger(this.ball).OnTriggerEnter(this, this.onBallTriggerEnter);
        let meshSprite3d: Laya.MeshSprite3D = this.ball as Laya.MeshSprite3D;
        this.meshRenderer = meshSprite3d._render as Laya.MeshRenderer;

        this.stateMachine = new FSMStateMachine();
        this.stateMachine.AddAction(Stand);
        this.stateMachine.AddAction(Run, Laya.Handler.create(this, this.OnSongRun), Laya.Handler.create(this, this.OnSongRunExit));
        this.stateMachine.AddAction(RunEnd, Laya.Handler.create(this, this.OnRunEndBoard));
        this.stateMachine.AddAction(Die, Laya.Handler.create(this, this.OnDeath));

        let ballRigidbody = this.ball.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        ballRigidbody.ccdSweptSphereRadius = 3;
        ballRigidbody.ccdMotionThreshold = 0.001;

        let trailSprite = this.ball.getChildByName("TUOWEI") as Laya.TrailSprite3D;
        this.trailMaterial = trailSprite.trailRenderer.material as Laya.TrailMaterial;
    }

    public Start(songDelay: number = 0, runNodeIndex: number = 0, color: BallColor = BallColor.Red): void {
        if (this.stateMachine.curState.key == Run) {
            return;
        }
        // console.log("开始游戏--- 音乐延迟时间 = " + songDelay + " runNodeIndex = " + runNodeIndex + " color == " + color);
        this.RestPosition();
        this.ClearSyncAudioTime();
        this.ballWillBounce = false;
        this.songDelay = songDelay;
        this.ChangeColor(color);
        this.SetRunPosition(runNodeIndex);
        this.Run();
    }
    
    public Run(): void { this.stateMachine.Switch(Run); }
    
    private OnSongRun() {
        //MouseMgr.Instance.ResetMouseOffset();
        this.mouseDownPosition = this.ball.transform.localPosition.clone()
        // console.log("鼠标按下位置 = 小球本地位置 == x:" + this.mouseDownPosition.x + " y:" + this.mouseDownPosition.y + " z:" + this.mouseDownPosition.z);
        Laya.timer.frameLoop(1, this, this.TimeDelayLogic);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnMouseDown);
    }

    private OnSongRunExit() {
        Laya.timer.clear(this, this.TimeDelayLogic);
        Laya.timer.clear(this, this.SongPlayLogic);
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.OnMouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.OnMouseUp);
    }

    private TimeDelayLogic(): void {
        if (this.currentTime < this.songDelay) {
            this.currentTime += (Laya.timer.delta / 1000);
            // NativeCallback.ShowLog("Refresh currFrame " + Laya.timer.currFrame + "----Laya.timer.delta----" + Laya.timer.delta + " --- " + this.currentTime);
            this.Refresh(this.currentTime);
            return;
        }
        //音乐延迟时间到了 该播放音乐;
        Laya.timer.clear(this, this.TimeDelayLogic);
        this.lAudioTime = AudioWraper.Instance.PlayPosition + this.songDelay;
        this.rTime = this.currentTime, this.pTime = this.currentTime;
        Laya.timer.frameLoop(1, this, this.SongPlayLogic, [this.rTime, this.pTime, this.lAudioTime]);
    }

    private rTime: number;
    private pTime: number;
    private lAudioTime: number;
    private syncCounter: number;
    private SongPlayLogic(): void {
        if (this.curNodeIndex < this.endNodeIndex) {
            this.Refresh(this.currentTime);
            if (this.stateMachine.curState.key == Run) {
                this.SyncAudioTime(0.2);
            }
        }
        //this.Refresh(AudioManager.Instance.SoundChannel.position/*GameController.Instance.CurrentRunTime*/);
    }

    private SyncAudioTime(p: number = 0.2) {
        let deltaTime = (Laya.timer.delta / 1000);
        this.rTime += deltaTime;

        if (this.syncCounter > 0) {
            this.syncCounter--;
            this.pTime += deltaTime;
        }
        else if (GameController.Instance.SoundInPause) {
            this.pTime = GameController.Instance.soundPauseTime;
            this.rTime = this.pTime;
            this.currentTime = this.rTime;
            return;
        }
        else if (AudioWraper.Instance.IsStoped) {
            this.pTime = this.rTime;
        }
        else {
            let time = AudioWraper.Instance.PlayPosition;
            if (Math.abs(this.lAudioTime - time) < 0.01) {
                this.pTime += deltaTime;
            }
            else {
                const sysncEventFrame: number = 1;
                this.syncCounter = sysncEventFrame;
                this.pTime = time + this.songDelay;
            }
            // console.log("currentTime:" + this.currentTime + "  AudioTime:" + time + "  c:" + Math.abs(this.lAudioTime - time));
        }
        this.currentTime = this.Lerp(this.rTime, this.pTime, p);
        this.rTime = this.currentTime;
        this.lAudioTime = this.pTime;
    }

    private ClearSyncAudioTime() {
        this.syncCounter = 0;
        this.currentTime = 0;
        this.lAudioTime = this.rTime = this.pTime = 0;
    }

    // 跳跃表现相关
    private upV = 0; //向上的初速
    private downG = 0; // 向下的g加速度
    private jumpHeight = 4.5;
    private lowerHeightFactor = 0.4;
    private higherHeightFactor = 0.7;
    private jumpSpeed = 4;
    private beatDuration = 1;
    private ballWillBounce = false;
    private jumpFixedHeight = true;
    private Refresh(realTime) {
        let curBeat = NoteManager.Instance.GetBeat(this.curNodeIndex);
        let nextBeat = NoteManager.Instance.GetBeat(this.curNodeIndex + 1);
        if (realTime > nextBeat.timeAppear) {
            if (this.ballWillBounce == true) {
                this.curNodeIndex++;
                this.ballWillBounce = false;
                if (this.curNodeIndex >= this.endNodeIndex) {
                    this.stateMachine.Switch(RunEnd);
                    return;
                }
                realTime = nextBeat.timeAppear;
                let beats = NoteManager.Instance.songNote.beats;
                curBeat = NoteManager.Instance.GetBeat(this.curNodeIndex);
                nextBeat = NoteManager.Instance.GetBeat(this.curNodeIndex + 1);
                this.SetBallMovement(curBeat, nextBeat);
                return;
            }
        }

        this.UpdatePosition(curBeat.timeAppear, realTime);
    }

    private SetJumpForce(curNodeTime, nextNodeTime) {
        let leadTime = (nextNodeTime - curNodeTime) / 2.0;
        if (this.jumpFixedHeight) {
            let TargetHeight = 0;
            let leadTimeHalf = leadTime / this.beatDuration;
            if (leadTimeHalf < 1) {
                TargetHeight = this.jumpHeight * (1 - (1 - leadTimeHalf) * this.lowerHeightFactor);
            }
            else {
                TargetHeight = this.jumpHeight * (1 + (leadTimeHalf - 1) * this.higherHeightFactor);
            }
            this.downG = -2 * TargetHeight / (leadTime * leadTime);
            this.upV = -this.downG * leadTime;
        }
        else {
            this.upV = this.jumpSpeed;
            this.downG = -this.upV / leadTime;
        }
    }

    private SetMoveSpace(curNode: Beat, nextNode: Beat): void {
        try {
            let curBoard = GameController.Instance.boardManager.GetNoteBoardbyBeat(curNode);
            let nextBoard = GameController.Instance.boardManager.GetNoteBoardbyBeat(nextNode);
            this.wayTotalTime = nextNode.timeAppear - curNode.timeAppear;
            let oldWay = this.waySpace;
            // console.log("waySpace == " + this.waySpace);
            let newWay = nextBoard.gameObject.transform.position.z - curBoard.gameObject.transform.position.z;
            this.waySpace = newWay;
            // console.log("newWay = " + newWay);
            this.wayTotal += oldWay;
            // console.log("wayTotal = " + this.wayTotal);
        } catch (error) {}
        //this.ball.transform.localPositionY = 0;
        let position: Laya.Vector3 = this.gameObject.transform.position.clone();
        position.setValue(position.x, position.y, this.wayTotal);
        this.gameObject.transform.position = position;
        // NativeCallback.ShowLog("gameobject pos = "+ JSON.stringify(this.gameObject.transform.position));
    }

    private SetBallMovement(curBeat: Beat, nextBeat: Beat): void {
        this.SetMoveSpace(curBeat, nextBeat);
        this.SetJumpForce(curBeat.timeAppear, nextBeat.timeAppear);
    }

    private UpdatePosition(curTime, realTime) {
        let time = realTime - curTime;
        if (time < 0.0) {
            console.log(("something wrong: " + realTime + " < " + curTime + " : audioTime=" + AudioWraper.Instance.PlayPosition + " : cNoteTime=" + NoteManager.Instance.songNote.beats[this.curNodeIndex].timeAppear));
        }
        else {
            if (MouseMgr.Instance.isDown) {
                const MaxX = GameConst.BoardInterval;
                let offset = this.mouseDownPosition.x + -MouseMgr.Instance.GetMouseOffsetBySize(0.03, false, true, true).x;
                this.ball.transform.localPositionX = this.Lerp(this.ball.transform.localPositionX - this.originalPos.x, Math.max(-MaxX, Math.min(MaxX, offset)), 1 / 60 * 20);
                // console.log("设置小球 x = " + this.ball.transform.localPositionX);
            }
            const process = 0.7;
            let y = (this.upV + (this.downG * time / 2)) * time;
            let curWay = this.waySpace * (time / this.wayTotalTime);
            this.ball.transform.localPositionY = this.Lerp(this.ball.transform.localPositionY, y, process);
            this.gameObject.transform.localPositionZ = this.Lerp(this.gameObject.transform.localPositionZ, this.wayTotal + curWay, process);//worldScale * this.worldLength;
            if (this.ball.transform.position.y < -3) {
                this.Death(true);
                return;
            }
        }
    }

    private Lerp(num1, num2, t): number {
        return num1 + t * (num2 - num1);
    }

    private OnRunEndBoard() {
        this.PlayBombEffect();
        GameController.Instance.GameEnd();
        // let position: Laya.Vector3 = this.ball.transform.localPosition.clone();
        // position.setValue(position.x, this.originalPos.y, position.z);
        // this.ball.transform.localPosition = position;
    }

    public ActiveStand(isActive: boolean) {
        this.stateMachine.Switch(isActive ? Stand : Run);
    }

    public Death(isDropout) {
        if (this.stateMachine.curState.key == Die) {
            return;
        }
        this.stateMachine.Switch(Die, isDropout);
    }

    private OnDeath(isDropout: boolean) {
        this.dieNodeIndex = this.curNodeIndex;
        if (isDropout) {
            this.ball.transform.localPositionY = -100;
        } else {
            this.PlayBombEffect();
        }
        GameController.Instance.GameFailure();
    }

    public Resurrection() {
        let resurrectionIndex = this.dieNodeIndex;
        resurrectionIndex += 1;
        if (resurrectionIndex >= this.endNodeIndex) {
            this.stateMachine.Switch(RunEnd);
            return;
        }
        this.SetRunPosition(resurrectionIndex);
    }

    public SetRunPosition(nodeIndex): void {
        // NativeCallback.ShowLog("设置起始点---------------" + nodeIndex);
        let songBeats = NoteManager.Instance.songNote.beats;
        this.curNodeIndex = nodeIndex;
        this.endNodeIndex = songBeats.length - 1;
        let curBeat = songBeats[nodeIndex];
        let nextBeat = songBeats[nodeIndex + 1];
        // console.log("endNodeIndex = " + this.endNodeIndex  + "  curBeat = " + JSON.stringify(curBeat) + "  nextBeat = " + JSON.stringify(nextBeat));
        this.currentTime = curBeat.timeAppear;
        // NativeCallback.ShowLog("SetRunPosition this.currentTime = " + this.currentTime);
        this.SetBallMovement(curBeat, nextBeat);
        this.UpdatePosition(curBeat.timeAppear, curBeat.timeAppear);
        let board = GameController.Instance.boardManager.GetNoteBoardbyBeat(curBeat);
        let position = board.GetNoteColorPosition(curBeat, this.curColor);
        position.setValue(position.x, this.originalPos.y, position.z);
        this.ball.transform.localPosition = position.clone();
        // console.log("设置小球起始点localPosition x:" + position.x + "   y:  " + this.originalPos.y + "  z : " +  position.z)
        this.ball.transform.localScale = this.originalScale.clone();
    }

    public ChangeColor(color: BallColor) {
        let color4 = new Laya.Vector4();
        let material = GameController.Instance.GetColorMaterial(color, color4);
        if (material == null) {
            return;
        }
        this.meshRenderer.material = GameController.Instance.GetColorMaterial(color, color4);
        
        this.curColor = color;
        this.trailMaterial.color = color4;
    }

    public Reset(): void {
        this.RestPosition();
        this.ClearSyncAudioTime();
    }

    private RestPosition(): void {
        this.waySpace = 0;
        this.wayTotal = 0;
        this.wayTotalTime = 0;
        this.ball.transform.localScale = this.originalScale.clone();
        this.ball.transform.localPosition = this.originalPos.clone();
        this.gameObject.transform.position = new Laya.Vector3(this.originalPos.x, 0, this.originalPos.z);
        // console.log("重置 waySpace 为 0 wayTotal 为 0 wayTotalTime 为 0  小球控制器位置 == x:" + this.gameObject.transform.position.x + " y:" + this.gameObject.transform.position.y+ " z:" + this.gameObject.transform.position.z);
        // console.log("小球本地坐标设为最初 == x:" + this.ball.transform.localPosition.x + " y:" + this.ball.transform.localPosition.y + " z:" + this.ball.transform.localPosition.z)
    }

    onBallTriggerEnter(otherA: Laya.Sprite3D, otherB: Laya.PhysicsComponent): void {
        this.KnockNote(otherB.owner as Laya.Sprite3D);
    }

    CheckBallTrigger(): void {
        // return;
        // let ray = new Laya.Ray(this.gameObject.transform.position.clone(), new Laya.Vector3(0, -1, 0))
        // let rayHit = new Laya.HitResult();
        // GameController.Instance.RayCast(ray, rayHit, 0.5);
        // if (rayHit.collider == null) {
        //     return;
        // }

        // console.log("ddd" + rayHit.collider.owner.name);
        // this.KnockNote(rayHit.collider.owner as Laya.Sprite3D);
    }

    private KnockNote(node: Laya.Sprite3D): void {
        //if (!this.isRun) return;
        if (node.name == "DieBox") {
            this.Death(true);
            return;
        }
        let board: NoteBoard = node.parent.parent.getComponent(NoteBoard);
        if (board) {
            // console.log("敲击Board -- " + board.beat.timeAppear)        
            board.CheckTirgger(this, node);
            this.ballWillBounce = true;
        }
        GameController.Instance.boardManager.KnockNote();
    }

    private PlayBombEffect(): void{
        let deathEffect: Laya.Sprite3D = this.gameObject.getChildByName("DeathEffect") as Laya.Sprite3D;
        deathEffect.active = true
        deathEffect.transform.localPosition = this.ball.transform.localPosition.clone();
        this.ball.transform.localScale = new Laya.Vector3(0.001, 0.001, 0.001);
        Laya.timer.once(1.5 * 1000, this, () => { deathEffect.active = false });
    }

    onUpdate(): void { this.stateMachine.Update(); }

    public OffsetPercent(): number { return this.ball.transform.localPositionX / GameConst.BoardInterval; }
    
    OnMouseDown(): void { this.mouseDownPosition = this.ball.transform.localPosition.clone(); }
    OnMouseUp(): void { this.mouseDownPosition = new Laya.Vector3(); }
}