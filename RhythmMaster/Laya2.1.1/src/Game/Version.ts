import GameConst from "./GameConst";

export default class Version {
    public static songs: Song[] = new Array;
    public static enableCharge: boolean = true;
    
    public static Load(url: string, caller?: any, completed?: Function): void {
        console.log(url);
        Laya.loader.load(url, Laya.Handler.create(this, () => {
            let json = Laya.loader.getRes(url);
            if (json == null) {
                console.log("访问Version文件资源失败！" + url)
                return;
            }
            url = url.replace("/Version.json", "");
            Version.LoadJons(url, json);
            if (completed != null) {
                completed.call(caller);
            }
        }), null, Laya.Loader.JSON);
    }

    public static LoadJons(url, json): void {
        let songs = json["songs"];

        if (songs == null) {
            console.log("当前版本无歌曲!" + url)
            return;
        }
        for (let i = 0; i < songs.length; i++) {
            let node = songs[i];
            let rootPath = url + GameConst.SoundFile;
            let rootPreviewImage = url + GameConst.SoundPreviewImages;
            let song = Version.objToSong(node, rootPath, rootPreviewImage);
            Version.songs.push(song);
        }

        let enableCharge = json["enableCharge"];
        this.enableCharge = enableCharge == true;
    }

    private static objToSong(obj, rootPath, rootPreviewImage): Song {
        let name = obj.name;
        let songName = obj.songName;
        let song = new Song(name, songName);
        let previewImages = obj.pngs;
        song.rootPath = rootPath;
        song.rootPreviewImage = rootPreviewImage;
        song.SetPreviewImages(previewImages);
        song.chargeType = obj.enableCharge ? obj.enableCharge : 0;
        song.costPower = obj.costPower;
        song.showOneColor = obj.showOneColor == true;
        return song;
    }

    public static Clear(): void {
        this.songs = new Array;
    }
}

export enum ChargeType {
    Free = 0, Power = 1, Video = 2,
}

export class Song {
    public name: string = "";
    public songName: string = "";
    public rootPath: string = "";
    public rootPreviewImage: string = "";
    public chargeType: ChargeType = 0;
    public costPower: number = 0;
    public showOneColor: boolean = false;
    public enableBand: boolean = true;
    public previewPngs: string[] = null;
    constructor (name, songName) {
        this.name = name;
        this.songName = songName;
        this.previewPngs = new Array;
    }

    public SetPreviewImages(names: Array<string>): void {
        if (names == null) {
            return;
        }
        for (let i = 0; i < names.length; i++) {
            let path = this.rootPreviewImage + names[i];
            this.previewPngs.push(path);
        }
    }

    private getSoundPath(suffix): string {
        return this.rootPath +  this.name + "/" + this.name + suffix;
    }

    public get songPath(): string {
        return this.getSoundPath(".ogg");
    }

    public get songJosnPath(): string {
        return this.getSoundPath(".mc");
    }

    public get songBandPath(): string {
        return this.getSoundPath(".band");
    }

    public clone(): Song {
        let song = new Song(this.name, this.songName);
        song.rootPath = this.rootPath;
        song.rootPreviewImage = this.rootPreviewImage;
        song.chargeType = this.chargeType;
        song.costPower = this.costPower;
        song.showOneColor = this.showOneColor;
        this.enableBand = this.enableBand;
        this.previewPngs = this.previewPngs;
        return song;
    }
 }

Song.prototype.toString = function () {
    return "Name:" + this.Name + "Path:" + this.Path + "SongName:" + this.SongName;
}

/*
{
    "songs": [
        {
            "name": 1570679056,
            "songName": "这是第一首歌",
            "showOneColor": false,
            "//":"使用体力解锁时消耗",
            "costPower": 10,
            "//":"0 免费 1 体力 2 广告",
            "enableCharge": 0,
            "//":"预览图",
            "pngs": [

            ]
        }
    ],
    "//":"每次游戏消耗体力",
    "playSongPower": 10,
    "//":"游戏中复活次数",
    "resurgenceCount": 1,
    "//":"是否开启收费 全局控制",
    "enableCharge": false
}
*/