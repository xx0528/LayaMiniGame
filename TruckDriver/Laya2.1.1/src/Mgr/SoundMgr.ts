
export default class Sound_ppxhc_Mgr {
    public static readonly sound_ppxhc_ResPath = "subRes2/sounds/"
    public static readonly instance_: Sound_ppxhc_Mgr = new Sound_ppxhc_Mgr();
    
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
            this.stop_ppxhc_BGM();
        }
        this._enabled = e;
    }

    protected _enabled : boolean = true;

    public getSoundUrl(name: string) : string
    {
        let url = Sound_ppxhc_Mgr.sound_ppxhc_ResPath + name + ".ogg";
        return url;
    }

    public play_ppxhc_Sound(name: string): void {
        if(!this._enabled)
            return;
        var url = this.getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sound_ppxhc_Mgr.sound_ppxhc_ResPath + name + ".ogg";
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

    public play_ppxhc_BGM(name){
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

    public stop_ppxhc_BGM(){
        if (Laya.Browser.onMiniGame) {
            if(this.bgm){
                this.bgm.pause();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}