
export default class Sound_sdlyg_Mgr {
    public static readonly soundResPath = "subRes/sound/"
    public static readonly instance: Sound_sdlyg_Mgr = new Sound_sdlyg_Mgr();
    
    private bgm:any;

    private constructor() {
    }

    public get Enabled()
    {
        return this._enabled;
    }

    public set Enabled(e : boolean)
    {
        if(!e)
        {
            this.stopBGM();
        }
        this._enabled = e;
    }

    protected _enabled : boolean = true;

    public getSoundUrl(name: string) : string
    {
        let url = Sound_sdlyg_Mgr.soundResPath + name + ".wav";
        return url;
    }

    public playSound(name: string): void {
        if(!this._enabled)
            return;
        var url = this.getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = Laya.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sound_sdlyg_Mgr.soundResPath + name + ".wav";
                sound.onEnded(() => {
                    Laya.Pool.recover(name, sound);
                    sound.offEnded();
                })
            }
            sound.play();
        } else {
            Laya.SoundManager.playSound(url, 1);
        }
    }

    public playBGM(name){
        if(!this._enabled)
            return;
        let url = this.getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            if(!this.bgm)
            {
                this.bgm = wx.createInnerAudioContext();
            }
            this.bgm.stop();
            this.bgm.src = url;
            this.bgm.loop = true;
            this.bgm.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public stopBGM(){
        if (Laya.Browser.onMiniGame) {
            if(this.bgm){
                this.bgm.stop();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}

export enum SoundType{
    Button="按钮",
    DesorbPower="高尔夫挥杆",
    Unlock="解锁新皮肤",
    GetScore="球掉进洞里",
    StrikeGround="球撞到墙上",
    Win="游戏胜利",
    Lose="游戏失败",
    GetCoin = "得到金币",
    SkinBtn = "皮肤界面按钮",
    AddStar = "加星"
}