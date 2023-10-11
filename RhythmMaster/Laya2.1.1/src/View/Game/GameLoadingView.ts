import TextureProcessBar from "../TextureProcessBar";
import ViewBase from "../ViewBase";
import GameController from "../../Game/GameController";
import { Song } from "../../Game/Version";
import View_myqq_Mgr, { ViewDef } from "../../Mgr/ViewMgr";

export default class GameLoadingView extends ViewBase {

    private curLoadSongName: Song = null;
    private completed: Laya.Handler = null;
    private processBar: TextureProcessBar = null

    onAwake(): void {
        this.processBar = this.owner.getChildByName("ProcessBar").getComponent(TextureProcessBar);
    }

    show(): void {
        this.processBar.setValue(0, 0);
        this.curLoadSongName = this._data;

        this.LoadSong();
    }

    private LoadSong(): void {
        Laya.timer.clearAll(this);
        GameController.Instance.GameReady(this.curLoadSongName, Laya.Handler.create(this, (succeed) => {
            console.log("Song Load Succeed");
        }), Laya.Handler.create(this, (process) => {
            console.log("Process:" + process);
            this.processBar.setValue(process);
        }));

        this.completed = Laya.Handler.create(this, () => {
            View_myqq_Mgr.instance.openView(ViewDef.GameWorkView, null, () => {
                this.closeView();
            });
        });

        Laya.timer.frameLoop(20, this, () => {
            if (this.processBar.CurrentValue != 1)
                return;

            //记载完成
            if (this.completed != null) {
                this.completed.run();
                this.ClearHander();
            }
        });
    }

    private ClearHander(): void {
        Laya.timer.clearAll(this);
        if (this.completed != null) {
            this.completed.recover();
            this.completed = null;
        }
    }

    onDisable(): void {
        this.ClearHander();
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
    }
}