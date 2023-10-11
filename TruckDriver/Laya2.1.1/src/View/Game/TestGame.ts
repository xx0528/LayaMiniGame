import ViewBase from "../ViewBase";
import Game from "../../Game/Game";

export default class TestGame extends ViewBase {
    private playButton: Laya.Image;
    private resetButton: Laya.Image;

    public onAwake(): void {
        this.playButton = this.owner.getChildByName("PlayButton") as Laya.Image;
        this.resetButton = this.owner.getChildByName("ResetButton") as Laya.Image;

        this.playButton.on(Laya.Event.CLICK, this, this.OnPlayButton);
        this.resetButton.on(Laya.Event.CLICK, this, this.OnResetButton);
    }

    private OnPlayButton(): void {
        Game.PlayGame();
    }

    private OnResetButton(): void {
        Game.ResetGame();
    }
}