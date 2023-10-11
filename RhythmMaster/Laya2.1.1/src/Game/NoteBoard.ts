import PhysicTrigger3d from "./Tools/PhysicTrigger3d";
import BallController, { BallColor } from "./BallController";
import { Beat } from "./NoteManager";
import GameConst from "./GameConst";
import Utilit from "../Utilit";
import GameController from "./GameController";

export default class NoteBoard extends Laya.Script3D {
    public IsBigBoard: boolean;

    // 大跳板属性
    private color: BallColor;
    private meshRenderer: Laya.MeshRenderer;

    //小跳板属性
    private perfectEffect: Laya.Sprite3D;

    private animator: Laya.Animator;
    private crashEffect: Laya.Sprite3D;

    public beat: Beat;
    private boards: Laya.Sprite3D;
    public get gameObject(): Laya.Sprite3D { return this.owner as Laya.Sprite3D }

    onAwake(): void {
        this.IsBigBoard = this.owner.name == "BigNoteBoard";
        this.boards = Utilit.FindChild(this.owner, "Boards") as Laya.Sprite3D;
        this.animator = this.boards.getComponent(Laya.Animator);
        this.crashEffect = Utilit.FindChild(this.owner, "Effect/crashEffect") as Laya.Sprite3D;

        if (this.IsBigBoard) {
            let box = Utilit.FindChild(this.boards, "Box/Box002_0") as Laya.Sprite3D;
            this.meshRenderer = (box as Laya.MeshSprite3D)._render as Laya.MeshRenderer;
        }
        else {
            this.perfectEffect = Utilit.FindChild(this.owner, "Effect/perfectCrashEffect") as Laya.Sprite3D;
        }
    }

    public TweenAnimtion(tweenDelay) {
        this.gameObject.transform.localScaleX = 0.0001;
        this.gameObject.transform.localPositionY = 0;
        Laya.Tween.to(this.gameObject.transform, {localScaleX: 1}, 0.3 * 1000, Laya.Ease.backOut, null, tweenDelay * 1000);
        Laya.Tween.to(this.gameObject.transform, {localPositionY: 0}, 0.3 * 1000, Laya.Ease.backOut, null, tweenDelay * 1000);
    }

    public ResetBoard(beat: Beat, position: Laya.Vector3, showColor?: any) {
        if (this.IsBigBoard) {
            this.color = (beat.notes[0].columnIndex % 3) as BallColor;
            let material = GameController.Instance.GetColorMaterial(this.color, null);
            this.meshRenderer.material = material;
        }
        else {
            let redIndex = beat.notes[0].columnIndex % 3;
            let redBox = this.boards.getChildByName("Red");
            let yellowBox = this.boards.getChildByName("Yellow");
            let blueBox = this.boards.getChildByName("Blue");
            this.boards.setChildIndex(redBox, redIndex++);
            this.boards.setChildIndex(yellowBox, ((redIndex++) % 3));
            this.boards.setChildIndex(blueBox, ((redIndex++) % 3));
            let position = new Laya.Vector3(GameConst.BoardInterval, 0, 0);
            for (let i = 0; i < this.boards._children.length; i++) {
                let board = this.boards.getChildAt(i) as Laya.Sprite3D;
                board.transform.localPosition = position;
                position.setValue(position.x - GameConst.BoardInterval, 0, 0);
                if (showColor != null) {
                    board.active = this.GetColorByString(board.name) == showColor;
                } else {
                    board.active = true;
                }
            }
        }

        this.beat = beat;
        (this.owner as Laya.Sprite3D).transform.position = position;
    }

    public GetNoteColorPosition(beat: Beat, color: BallColor): Laya.Vector3 {
        let position = new Laya.Vector3;

        if (!this.IsBigBoard) {
            let redIndex = (beat.notes[0].columnIndex % 3);
            let colorIndex = ((color as number) + redIndex) % 3;
            position = new Laya.Vector3(GameConst.BoardInterval - colorIndex * GameConst.BoardInterval, 0, 0);
            // console.log("color = " + color + "  beat.notes[0].columnIndex = " + beat.notes[0].columnIndex + " redIndex = " + redIndex + "  colorIndex = " + colorIndex) ;
        }
        // console.log(" position = " + JSON.stringify(position))

        return position;
    }

    public CheckTirgger(ball: BallController, board: Laya.Sprite3D): void {
        if (this.IsBigBoard) {
            this.TirggerBigBoard(ball, board);
        } 
        else {
            this.TirggerSmallBoard(ball, board);
        }
    }

    private TirggerBigBoard(ball: BallController, board: Laya.Sprite3D): void {
        let color = this.color;
        ball.ChangeColor(color);
        this.ActiveCrashEffect(this.gameObject.transform.position.clone());
        GameController.Instance.AddSongSource(true, ball.finishProgress);
    }

    private TirggerSmallBoard(ball: BallController, board: Laya.Sprite3D) {
        if (ball == null || board == null) {
            return;
        }

        let ballColor = ball.curColor;
        let boardColor = this.GetColorByString(board.name);
        if (ballColor != boardColor) {
            ball.Death(false);
            return;
        }

        const perfectDis = 0.5;
        let isPrefect = Math.abs(board.transform.position.x - ball.ball.transform.position.x) < perfectDis;

        GameController.Instance.AddSongSource(isPrefect, ball.finishProgress);

        this.ActiveCrashEffect(board.transform.position.clone());
        if (isPrefect) {
            this.ActivePerfectEffect(board.transform.position.clone());
        }
    }

    private ActiveCrashEffect(position: Laya.Vector3): void {
        this.crashEffect.active = true;
        position.setValue(position.x, position.y + 0.1, position.z);
        this.crashEffect.transform.position = position;
        this.animator.play("Shank");
        Laya.timer.once(1 * 1000, this, () => {
            this.animator.play("Def");
            this.crashEffect.active = false;
        })
    }

    private ActivePerfectEffect(position: Laya.Vector3): void {
        this.perfectEffect.active = true;
        position.setValue(position.x, position.y + 0.1, position.z);
        this.perfectEffect.transform.position = position;
        Laya.timer.once(1 * 1000, this, () => {
            this.perfectEffect.active = false;
        })
    }

    private GetColorByString(str: string) {
        let color = BallColor.Red;
        switch (str) {
            case "Red": color = BallColor.Red; break;
            case "Blue": color = BallColor.Blue; break;
            case "Yellow": color = BallColor.Yellow; break;
        }
        return color;
    }

    public static GetBigBoardColor(beat: Beat): BallColor {
        return (beat.notes[0].columnIndex % 3) as BallColor;
    }
}