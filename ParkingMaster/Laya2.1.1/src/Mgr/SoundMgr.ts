
export default class SoundMgr {
    public static readonly soundResPath = "subRes/sound/"
    public static readonly instance: SoundMgr = new SoundMgr();
    
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
        let url = SoundMgr.soundResPath + name + ".ogg";
        return url;
    }

    public playSound(name: string): void {
        if(!this._enabled)
            return;
        var url = this.getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = SoundMgr.soundResPath + name + ".ogg";
                sound.onEnded(() => {
                    laya.utils.Pool.recover(name, sound);
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
            this.bgm.pause();
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
                this.bgm.pause();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}