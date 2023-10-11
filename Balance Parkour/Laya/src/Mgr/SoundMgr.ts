
export default class Sound_tippy_Mgr {
    public static readonly soundResPath = "subRes/sound/"
    public static readonly instance: Sound_tippy_Mgr = new Sound_tippy_Mgr();
    
    private bg_tippy_m:any;

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
            this.stop_tippy_BGM();
        }
        this._enabled = e;
    }

    protected _enabled : boolean = true;

    public get_tippy_SoundUrl(name: string) : string
    {
        let url = Sound_tippy_Mgr.soundResPath + name + ".ogg";
        return url;
    }

    public play_tippy_Sound(name: string): void {
        if(!this._enabled)
            return;
        var url = this.get_tippy_SoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = Laya.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sound_tippy_Mgr.soundResPath + name + ".ogg";
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

    public play_tippy_BGM(name){
        if(!this._enabled)
            return;
        let url = this.get_tippy_SoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            if(!this.bg_tippy_m)
            {
                this.bg_tippy_m = wx.createInnerAudioContext();
            }
            this.bg_tippy_m.stop();
            this.bg_tippy_m.src = url;
            this.bg_tippy_m.loop = true;
            this.bg_tippy_m.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public stop_tippy_BGM(){
        if (Laya.Browser.onMiniGame) {
            if(this.bg_tippy_m){
                this.bg_tippy_m.stop();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}