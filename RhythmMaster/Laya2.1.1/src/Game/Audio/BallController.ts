// import AudioBehavior from "./AudioBehavior";
// import FSMStateMachine from "../Tools/FSMStateMachine";
// import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
// import GameController from "../GameController";
// import NoteManager, { Beat } from "../NoteManager";
// import MouseMgr from "../MouseMgr";
// import GameConst from "../GameConst";
// import NoteBoard from "../NoteBoard";
// import AudioWraper from "./AudioWraper";

// export enum BallColor {
//     Red, Yellow, Blue,
// }

// const Stand: string = "Stand";
// const Run: string = "Run";
// const RunEnd: string = "RunEnd";
// const Die: string = "Die";
// export default class BallControllerTmep extends AudioBehavior {
//     public ball: Laya.Sprite3D;
//     private originalPos: Laya.Vector3;
//     private originalScale: Laya.Vector3;
//     public curColor: BallColor = BallColor.Red;
//     private meshRenderer: Laya.MeshRenderer;
//     private trailMaterial: Laya.TrailMaterial;
//     private mouseDownPosition: Laya.Vector3 = new Laya.Vector3();

//     private songDelay: number = 0;
//     private curNodeIndex: number = 0;
//     private endNodeIndex: number = 0;
//     private dieNodeIndex: number = 0;
//     private waySpace: number = 0;
//     private wayTotal: number = 0;
//     private wayTotalTime: number = 0;
//     private stateMachine: FSMStateMachine = null;

//     // 跳跃表现相关
//     private upV = 0; //向上的初速
//     private downG = 0; // 向下的g加速度
//     private jumpHeight = 4.5;
//     private lowerHeightFactor = 0.4;
//     private higherHeightFactor = 0.7;
//     private jumpSpeed = 4;
//     private beatDuration = 1;
//     private ballWillBounce = false;
//     private jumpFixedHeight = true;

//     public get gameObject(): Laya.Sprite3D { return this.owner as Laya.Sprite3D; }
//     public get isRun(): boolean { return this.stateMachine.curState.key == Run; }
//     public get RunBeatIndex(): number {return this.curNodeIndex; }
//     public get finishProgress(): number { return Math.min(1, this.curNodeIndex / this.endNodeIndex); }

//     onAwake(): void {
//         this.ball = this.gameObject.getChildByName("Ball") as Laya.Sprite3D;
//         this.originalPos = this.gameObject.transform.position.clone();
//         this.originalScale = this.ball.transform.localScale.clone();
//         PhysicTrigger3d.GetTrigger(this.ball).OnTriggerEnter(this, this.onBallTriggerEnter);
//         let meshSprite3d: Laya.MeshSprite3D = this.ball as Laya.MeshSprite3D;
//         this.meshRenderer = meshSprite3d._render as Laya.MeshRenderer;
//         let trailSprite = this.ball.getChildByName("TUOWEI") as Laya.TrailSprite3D;
//         this.trailMaterial = trailSprite.trailRenderer.material as Laya.TrailMaterial;

//         this.stateMachine = new FSMStateMachine();
//         this.stateMachine.AddAction(Stand);
//         this.stateMachine.AddAction(Run, Laya.Handler.create(this, this.OnBallRun), Laya.Handler.create(this, this.OnBallRunExit));
//         this.stateMachine.AddAction(RunEnd, Laya.Handler.create(this, this.OnRunEndBoard));
//         this.stateMachine.AddAction(Die, Laya.Handler.create(this, this.OnDeath));

//         let ballRigidbody = this.ball.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
//         ballRigidbody.ccdSweptSphereRadius = 3;
//         ballRigidbody.ccdMotionThreshold = 0.001;
//     }

//     public Start(songDelay: number = 0, runIndex: number = 0, color: BallColor = BallColor.Red): void {
//         if (this.stateMachine.curState.key == Run) {
//             return;
//         }
//         this.RestPosition();
//         this.ClearSyncAudioTime();
//         this.ballWillBounce = false;
//         this.songDelay = songDelay;
//         this.ChangeColor(color);
//         this.SetRunPosition(runIndex);
//         this.Run();
//     }

//     public ChangeColor(color: BallColor) {
//         let color4 = new Laya.Vector4();
//         let material = GameController.Instance.GetColorMaterial(color, color4);
//         if (material == null) {
//             return;
//         }
//         this.meshRenderer.material = GameController.Instance.GetColorMaterial(color, color4);
        
//         this.curColor = color;
//         this.trailMaterial.color = color4;
//     }

//     public SetRunPosition(nodeIndex): void {
//         let songBeats = NoteManager.Instance.songNote.beats;
//         this.curNodeIndex = nodeIndex;
//         this.endNodeIndex = songBeats.length - 1;
//         let curBeat = songBeats[nodeIndex];
//         let nextBeat = songBeats[nodeIndex + 1];
//         this.currentTime = curBeat.timeAppear;
//         this.SetBallMovement(curBeat, nextBeat);
//         this.UpdatePosition(curBeat.timeAppear, curBeat.timeAppear);
//         let board = GameController.Instance.boardManager.GetNoteBoardbyBeat(curBeat);
//         let position = board.GetNoteColorPosition(curBeat, this.curColor);
//         position.setValue(position.x, this.originalPos.y, position.z);
//         this.ball.transform.localPosition = position.clone();
//         this.ball.transform.localScale = this.originalScale.clone();
//     }

//     private SetBallMovement(curBeat: Beat, nextBeat: Beat): void {
//         this.SetMoveSpace(curBeat, nextBeat);
//         this.SetJumpForce(curBeat.timeAppear, nextBeat.timeAppear);
//     }

//     private SetJumpForce(curNodeTime, nextNodeTime) {
//         let leadTime = (nextNodeTime - curNodeTime) / 2.0;
//         if (this.jumpFixedHeight) {
//             let TargetHeight = 0;
//             let leadTimeHalf = leadTime / this.beatDuration;
//             if (leadTimeHalf < 1) {
//                 TargetHeight = this.jumpHeight * (1 - (1 - leadTimeHalf) * this.lowerHeightFactor);
//             }
//             else {
//                 TargetHeight = this.jumpHeight * (1 + (leadTimeHalf - 1) * this.higherHeightFactor);
//             }
//             this.downG = -2 * TargetHeight / (leadTime * leadTime);
//             this.upV = -this.downG * leadTime;
//         }
//         else {
//             this.upV = this.jumpSpeed;
//             this.downG = -this.upV / leadTime;
//         }
//     }

//     private UpdatePosition(curTime, realTime) {
//         let time = realTime - curTime;
//         if (time < 0.0) {
//             console.log(("something wrong: " + realTime + " < " + curTime + " : audioTime=" + AudioWraper.Instance.PlayPosition + " : cNoteTime=" + NoteManager.Instance.songNote.beats[this.curNodeIndex].timeAppear));
//         }
//         else {
//             if (MouseMgr.Instance.isDown) {
//                 const MaxX = GameConst.BoardInterval;
//                 let offset = this.mouseDownPosition.x + -MouseMgr.Instance.GetMouseOffsetBySize(0.02, false, true, true).x;
//                 this.ball.transform.localPositionX = this.Lerp(this.ball.transform.localPositionX - this.originalPos.x, Math.max(-MaxX, Math.min(MaxX, offset)), 1 / 60 * 20);
//             }
//             const process = 0.7;
//             let y = (this.upV + (this.downG * time / 2)) * time;
//             let curWay = this.waySpace * (time / this.wayTotalTime);
//             this.ball.transform.localPositionY = this.Lerp(this.ball.transform.localPositionY, y, process);
//             this.gameObject.transform.localPositionZ = this.Lerp(this.gameObject.transform.localPositionZ, this.wayTotal + curWay, process);//worldScale * this.worldLength;
//             if (this.ball.transform.position.y < -3) {
//                 this.Death(true);
//                 return;
//             }
//         }
//     }

//     private SetMoveSpace(curNode: Beat, nextNode: Beat): void {
//         try {
//             let curBoard = GameController.Instance.boardManager.GetNoteBoardbyBeat(curNode);
//             let nextBoard = GameController.Instance.boardManager.GetNoteBoardbyBeat(nextNode);
//             this.wayTotalTime = nextNode.timeAppear - curNode.timeAppear;
//             let oldWay = this.waySpace;
//             let newWay = nextBoard.gameObject.transform.position.z - curBoard.gameObject.transform.position.z;
//             this.waySpace = newWay;
//             this.wayTotal += oldWay;
//         } catch (error) {}
//         this.ball.transform.localPositionY = 0;
//         let position: Laya.Vector3 = this.gameObject.transform.position.clone();
//         position.setValue(position.x, position.y, this.wayTotal);
//         this.gameObject.transform.position = position;
//     }

//     public ActiveStand(isActive: boolean) {
//         this.stateMachine.Switch(isActive ? Stand : Run);
//     }

//     public Run(): void { 
//         this.stateMachine.Switch(Run); 
//     }

//     private OnBallRun() { 
//         this.StartTimeRun(this.songDelay);
//         this.ActiveMouseOpration(true);
//         this.mouseDownPosition = this.ball.transform.localPosition.clone();
//     }

//     private OnBallRunExit() {
//         this.StopTimeRun();
//         this.ActiveMouseOpration(false);
//     }

//     protected OnTimeRefresh(time) {
//         let curBeat = NoteManager.Instance.GetBeat(this.curNodeIndex);
//         let nextBeat = NoteManager.Instance.GetBeat(this.curNodeIndex + 1);

//         if (time > nextBeat.timeAppear) {
//             if (this.ballWillBounce == true) {
//                 this.curNodeIndex++;
//                 this.ballWillBounce = false;
//                 if (this.curNodeIndex >= this.endNodeIndex) {
//                     this.stateMachine.Switch(RunEnd);
//                     return;
//                 }
//                 time = nextBeat.timeAppear;
//                 let beats = NoteManager.Instance.songNote.beats;
//                 curBeat = NoteManager.Instance.GetBeat(this.curNodeIndex);
//                 nextBeat = NoteManager.Instance.GetBeat(this.curNodeIndex + 1);
//                 this.SetBallMovement(curBeat, nextBeat);
//                 return;
//             }
//         }
//         this.UpdatePosition(curBeat.timeAppear, time);
//     }

//     private OnRunEndBoard() {
//         this.PlayBombEffect();
//         GameController.Instance.GameEnd();
//     }

//     public Death(isDropout) {
//         if (this.stateMachine.curState.key == Die) {
//             return;
//         }
//         this.stateMachine.Switch(Die, isDropout);
//     }

//     private OnDeath(isDropout: boolean) {
//         this.dieNodeIndex = this.curNodeIndex;
//         if (isDropout) {
//             this.ball.transform.localPositionY = -100;
//         } else {
//             this.PlayBombEffect();
//         }
//         GameController.Instance.GameFailure();
//     }

//     public Resurrection() {
//         let resurrectionIndex = this.dieNodeIndex;
//         resurrectionIndex += 1;
//         if (resurrectionIndex >= this.endNodeIndex) {
//             this.stateMachine.Switch(RunEnd);
//             return;
//         }
//         this.SetRunPosition(resurrectionIndex);
//     }

//     onBallTriggerEnter(otherA: Laya.Sprite3D, otherB: Laya.PhysicsComponent): void {
//         this.KnockNote(otherB.owner as Laya.Sprite3D);
//     }

//     CheckBallTrigger(): void {
//         // return;
//         // let ray = new Laya.Ray(this.gameObject.transform.position.clone(), new Laya.Vector3(0, -1, 0))
//         // let rayHit = new Laya.HitResult();
//         // GameController.Instance.RayCast(ray, rayHit, 0.5);
//         // if (rayHit.collider == null) {
//         //     return;
//         // }

//         // console.log("ddd" + rayHit.collider.owner.name);
//         // this.KnockNote(rayHit.collider.owner as Laya.Sprite3D);
//     }

//     private KnockNote(node: Laya.Sprite3D): void {
//         if (!this.isRun) return;
//         if (node.name == "DieBox") {
//             this.Death(true);
//             return;
//         }
//         let board: NoteBoard = node.parent.parent.getComponent(NoteBoard);
//         if (board) {
//             board.CheckTirgger(this, node);
//             this.ballWillBounce = true;
//         }
//         GameController.Instance.boardManager.KnockNote();
//     }

//     public Reset(): void {
//         this.RestPosition();
//         this.ClearSyncAudioTime();
//     }

//     private RestPosition(): void {
//         this.waySpace = 0;
//         this.wayTotal = 0;
//         this.wayTotalTime = 0;
//         this.ball.transform.localScale = this.originalScale.clone();
//         this.ball.transform.localPosition = this.originalPos.clone();
//         this.gameObject.transform.position = new Laya.Vector3(this.originalPos.x, 0, this.originalPos.z);
//     }

//     public OffsetPercent(): number { 
//         return this.ball.transform.localPositionX / GameConst.BoardInterval; 
//     }

//     private ActiveMouseOpration(isActive: boolean) {
//         let func: Function = isActive ? Laya.stage.on : Laya.stage.off;
//         func.call(Laya.stage, Laya.Event.MOUSE_UP, this, this.OnMouseUp);
//         func.call(Laya.stage, Laya.Event.MOUSE_OUT, this, this.OnMouseDown);
//         func.call(Laya.stage, Laya.Event.MOUSE_DOWN, this, this.OnMouseDown);
//     }

//     private Lerp(num1, num2, t): number { return num1 + t * (num2 - num1); }
//     private OnMouseUp(): void { 
//         this.mouseDownPosition = new Laya.Vector3(); 
//     }
//     private OnMouseDown(): void { 
//         this.mouseDownPosition = this.ball.transform.localPosition.clone(); 
//     }

//     private PlayBombEffect(): void{
//         let deathEffect: Laya.Sprite3D = this.gameObject.getChildByName("DeathEffect") as Laya.Sprite3D;
//         deathEffect.active = true
//         deathEffect.transform.localPosition = this.ball.transform.localPosition.clone();
//         this.ball.transform.localScale = new Laya.Vector3(0.001, 0.001, 0.001);
//         Laya.timer.once(1.5 * 1000, this, () => { deathEffect.active = false });
//     }
// }