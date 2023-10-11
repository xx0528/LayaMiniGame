import { SongNote, Beat } from "./NoteManager";
import GameController from "./GameController";
import NoteBoard from "./NoteBoard";
import GameConst from "./GameConst";
import { BallColor } from "./BallController";
import SoundManager from "./SoundManager";
import BandBehavior from "./Audio/BandBehavior";
import ParamCube from "./Audio/ParamCubeCube";
import AudioWraper from "./Audio/AudioWraper";

const CrashEffect: string = "CrashEffect";
const PerfectCrashEffect: string = "CrashEffect";
const SmallNoteBoard: string = "SmallNoteBoard";
const BigNoteBoard: string = "BigNoteBoard";

export default class NoteBoardManager extends Laya.Script3D {
    private _songNote: SongNote = null;
    private _lastAppearBeat: Beat = null;

    private _boardPrefab: Laya.Sprite3D;
    private _noteBoards: Array<NoteBoard> = null;
    private _pastNoteBoards: Array<NoteBoard> = null;
    public PreLoadNoteTime: number = 20;

    private _bandCubes: BandBehavior[] = new Array;

    private _correctColor: BallColor = BallColor.Red;
    private _crashPrefab: Laya.Sprite3D = null;
    private _perfectCrashPrefab: Laya.Sprite3D = null;
    private _bigNoteBoardPrefab: Laya.Sprite3D = null;
    private _smallNoteBoardPrefab: Laya.Sprite3D = null;

    public get gameObject(): Laya.Sprite3D {
        return this.owner as Laya.Sprite3D;
    }

    onAwake(): void {
        let prefabs = GameController.Instance.scene.getChildByName("Prefabs");
        this._crashPrefab = prefabs.getChildByName("crashEffect") as Laya.Sprite3D;
        this._perfectCrashPrefab = prefabs.getChildByName("perfectCrashEffect") as Laya.Sprite3D;
        this._bigNoteBoardPrefab = prefabs.getChildByName("BigNoteBoard") as Laya.Sprite3D;
        this._smallNoteBoardPrefab = prefabs.getChildByName("SmallNoteBoard") as Laya.Sprite3D;
        this.InitBandEffect();
    }

    private InitBandEffect(): void {
        let effectNode = this.gameObject.getChildByName("Effect");
        for (let i = 0; i < 2; i++) {
            let bandCubes  = effectNode.getChildByName("BandCubes" + i);
            for (let j = 0; j < 8; j++) {
                let cube = bandCubes.getChildByName("BandCube" + j);
                if (cube.active == false) continue;
                let paramCubeCube = cube.addComponent(ParamCube) as ParamCube;
                paramCubeCube.bandIndex = j;
                this._bandCubes.push(paramCubeCube);
            }
        }

        // effectNode = this.gameObject.getChildByName("Synthesis");
        // for (let i = 0; i < 3; i++) {
        //     let bandCubes  = effectNode.getChildByName("BandCubes" + i);
        //     for (let j = 0; j < 8; j++) {
        //         let cube = bandCubes.getChildByName("BandCube" + j);
        //         let paramCubeCube = cube.addComponent(ParamCube) as ParamCube;
        //         paramCubeCube.startScaleY = 0.55;
        //         paramCubeCube.maxScaleY = 0.7
        //         paramCubeCube.bandIndex = j;
        //         this._bandCubes.push(paramCubeCube);
        //     }
        // }
    }

    public InitNoteBoard(songNote: SongNote) {
        this.Clear();
        this._songNote = songNote;
        this.AutoSpawnNewNoteBoard(0);
    }

    private AutoSpawnNewNoteBoard(curTime) {
        let inde = 0;
        const timeDelay = 0.1;
        let willShow = (curTime + this.PreLoadNoteTime);
        let beats = this._songNote.beats;
        for (let i = 0; i < beats.length; i++) {
            let beat = beats[i];
            let timeAppear = beat.timeAppear;
            if (timeAppear > willShow || this._noteBoards.length > 7) {
                break;
            }
            if (this._lastAppearBeat != null && this._lastAppearBeat.timeAppear >= beat.timeAppear) {
                continue;
            }

            //console.log("加载音符：" + beat.guid);
            let noteBoard = this.SpawnNewNoteBoard(beat, (inde++ * timeDelay));
            this._noteBoards.push(noteBoard);
            this._lastAppearBeat = beat;
        }
    }

    private SpawnNewNoteBoard(beat, tweenDelay): NoteBoard {
        let position = new Laya.Vector3(0, 0, 0);
        if (this._lastAppearBeat != null) {
            let lastBoard = this._noteBoards[this._noteBoards.length - 1];
            let timeIncrement = beat.timeAppear - this._lastAppearBeat.timeAppear
            if (timeIncrement >= GameConst.BoardIntervalTime) {
                let z = timeIncrement * (GameConst.BoardIntervalSpace / GameConst.BoardIntervalTime)
                position.setValue(0, 0, lastBoard.gameObject.transform.position.z + z);
            } else {
                position.setValue(0, 0, lastBoard.gameObject.transform.position.z + GameConst.BoardIntervalSpace);
            }
        }

        let isBigBoard: boolean = beat.notes.length >= 2;
        if (isBigBoard) { 
            this._correctColor = NoteBoard.GetBigBoardColor(beat); 
        }
        let prefabString: string = isBigBoard ? BigNoteBoard : SmallNoteBoard;
        let boardObj = this.AutoSpawnPrefab(prefabString);
        let noteBoard: NoteBoard = boardObj.getComponent(NoteBoard);
        if (noteBoard == null) {
            noteBoard = boardObj.addComponent(NoteBoard);
        }
        let showOneColor = GameController.Instance.currentSong.showOneColor;
        noteBoard.ResetBoard(beat, position, showOneColor ? this._correctColor : null);
        noteBoard.TweenAnimtion(tweenDelay);
        return noteBoard;
    }

    private AutoRecycleNoteBoard() {
        const RemovalDistance = 10
        for (let i = 0; i < this._noteBoards.length;) {
            let noteBoard = this._noteBoards[i];

            let distance = GameController.Instance.ballController.gameObject.transform.position.z - noteBoard.gameObject.transform.position.z;
            if (distance < RemovalDistance / 2) { i++; continue; }

            this._noteBoards.splice(i, 1);
            this._pastNoteBoards.push(noteBoard);
        }
        
        for (let i = 0; i < this._pastNoteBoards.length;) {
            let noteBoard = this._pastNoteBoards[i];

            let distance = GameController.Instance.ballController.gameObject.transform.position.z - noteBoard.gameObject.transform.position.z;
            if (distance < RemovalDistance) { i++; continue; }

            this._pastNoteBoards.splice(i, 1);
            this.RecycleNoteBoard(noteBoard);
        }
    }

    private RecycleNoteBoard(noteBoard) {
        noteBoard.gameObject.transform.localPositionY = -100;
        let boardString = noteBoard.IsBigBoard ? BigNoteBoard : SmallNoteBoard;
        this.RecyclePrefab(boardString, noteBoard.gameObject);
    }

    public Clear(): void {
        if (this._noteBoards != null ) {
            for (let i = 0; i < this._noteBoards.length;) {
                let noteBoard = this._noteBoards[i];
                this._noteBoards.splice(0, 1);
                this.RecycleNoteBoard(noteBoard);
            }
        }

        if (this._pastNoteBoards != null) {
            for (let i = 0; i < this._pastNoteBoards.length;) {
                let noteBoard = this._pastNoteBoards[i];
                this._pastNoteBoards.splice(0, 1);
                this.RecycleNoteBoard(noteBoard);
            }
        }

        this._correctColor = null;
        this._lastAppearBeat = null;
        this._noteBoards = new Array;
        this._pastNoteBoards = new Array;
        this.gameObject.transform.position = new Laya.Vector3();
    }

    public GetNoteBoardbyBeat(beat: Beat): NoteBoard {
        for (let i = 0; i < this._noteBoards.length; i++) {
            let noteBoard = this._noteBoards[i];
            if (beat.guid == noteBoard.beat.guid) {
                return noteBoard;
            }
        }
        return null;
    }

    public KnockNote(): void {
        let effectNode = this.owner.getChildByName("Effect");
        let note1 = effectNode.getChildByName("yingbo") as Laya.Sprite3D;
        
        const tweenTime = 0.07 * 1000;
        const tweenScale = 1.03;
        Laya.Tween.clearAll(note1.transform);
        let change: any = {localScaleX: tweenScale, localScaleY: tweenScale, localScaleZ: tweenScale};
        let def:any = {localScaleX: 1, localScaleY: 1, localScaleZ: 1};
        Laya.Tween.to(note1.transform, change, tweenTime, Laya.Ease.quadOut, Laya.Handler.create(this, () => {
            Laya.Tween.to(note1.transform, def, tweenTime, Laya.Ease.quadIn);
        }));
    }

    public AutoSpawnPrefab(key: string): Laya.Sprite3D {
        let obj = Laya.Pool.getItem(key) as Laya.Sprite3D;
        if (obj != null) {
            return obj;
        }
        let scene = GameController.Instance.scene;
        switch (key) {
            case CrashEffect: {
                obj = Laya.Sprite3D.instantiate(this._crashPrefab, scene);
                break;
            }
            case PerfectCrashEffect: {
                obj = Laya.Sprite3D.instantiate(this._perfectCrashPrefab, scene);
                break;
            }
            case BigNoteBoard: {
                console.log("create big");
                obj = Laya.Sprite3D.instantiate(this._bigNoteBoardPrefab, scene)
                break;
            }
            case SmallNoteBoard: {
                console.log("create small");
                obj = Laya.Sprite3D.instantiate(this._smallNoteBoardPrefab, scene);
                break;
            }
            default: throw "没有这个预制体：" + key;
        }
        return obj;
    }

    public RecyclePrefab(key: string, obj: Laya.Sprite3D): void {
        obj.transform.localPositionX = -10;
        Laya.Pool.recover(key, obj);
    }

    public BandCubesStart(): void {
        for (let i = 0; i < this._bandCubes.length; i++) {
            this._bandCubes[i].Start();
        }
    }

    public BandCubesStop(): void {
        for (let i = 0; i < this._bandCubes.length; i++) {
            this._bandCubes[i].Stop();
        }
    }

    onLateUpdate(): void {
        if (!GameController.Instance.isRun) {
            return;
        }

        this.AutoRecycleNoteBoard();
        if (AudioWraper.Instance.SoundChannel) {
            this.AutoSpawnNewNoteBoard(AudioWraper.Instance.PlayPosition);
        }
        
        let transform = (this.owner as Laya.Sprite3D).transform;
        transform.position = GameController.Instance.ballController.gameObject.transform.position.clone();
    }
}