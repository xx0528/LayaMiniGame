
export default class ryw_SoundMgr {
    public static readonly ryw_soundResPath = "subRes/sound/"
    public static readonly ryw_instance: ryw_SoundMgr = new ryw_SoundMgr();
    
    private ryw_bgm:any;

    private constructor() {
    }

    public get ryw_Enabled()
    {
        return this.ryw__enabled;
    }

    public set ryw_Enabled(e : boolean)
    {
        if(!e)
        {
            this.ryw_stopBGM();
        }
        this.ryw__enabled = e;
    }

    protected ryw__enabled : boolean = true;

    public ryw_getSoundUrl(name: string) : string
    {
        let url = ryw_SoundMgr.ryw_soundResPath + name + ".ogg";
        return url;
    }

    public ryw_playSound(name: string): void {
        if(!this.ryw__enabled)
            return;
        var url = this.ryw_getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = Laya.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = ryw_SoundMgr.ryw_soundResPath + name + ".ogg";
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

    public ryw_playBGM(name){
        if(!this.ryw__enabled)
            return;
        let url = this.ryw_getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            if(!this.ryw_bgm)
            {
                this.ryw_bgm = wx.createInnerAudioContext();
            }
            this.ryw_bgm.pause();
            this.ryw_bgm.src = url;
            this.ryw_bgm.loop = true;
            this.ryw_bgm.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public ryw_stopBGM(){
        if (Laya.Browser.onMiniGame) {
            if(this.ryw_bgm){
                this.ryw_bgm.pause();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}