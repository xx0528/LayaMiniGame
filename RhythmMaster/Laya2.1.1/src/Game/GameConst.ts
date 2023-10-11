import App_myqq_Config from "../AppConfig";

export default class GameConst {
    public static readonly SoundFile = "/Sound/";
    public static readonly SoundPreviewImages = "/PreviewImage/"
    public static readonly VersionFile = "/Music/";
    public static readonly GameScenePath = "subRes/Scenes/LayaScene_Game/Conventional/Game.ls";

    public static BoardInterval = 3.75;  //横向间隔
    public static BoardIntervalTime = 0.2; //最小间隔时间
    public static BoardIntervalSpace = 3; //最小跳板间隔

    public static get RemoteRes(): string { return App_myqq_Config.ResServer; }

    public static get GetLocalSubResVersionPath(): string {
        return "subRes" + GameConst.VersionFile + "Version.json";
    }

    public static get GetRemoteVersionPath(): string {
        return GameConst.RemoteRes + GameConst.VersionFile + "Version.json";
    }

    public static get GetRandomSongPreviewPng(): string {
        return "Resource/SongDisc/" + 0 + ".png";
    }
}