
export default class Sou_XYXZS_ndMgr {
    public static readonly sound_XYXZS_ResPath = "subRes/sound/"
    public static readonly ins_XYXZS_tance: Sou_XYXZS_ndMgr = new Sou_XYXZS_ndMgr();
    
    private b_XYXZS_gm:any;

    private constructor() {
    }

    public get Enab_XYXZS_led()
    {
        return this._en_XYXZS_abled;
    }

    public set Enab_XYXZS_led(e : boolean)
    {
        if(!e)
        {
            this.stop_XYXZS_BGM();
        }
        this._en_XYXZS_abled = e;
    }

    protected _en_XYXZS_abled : boolean = true;

    public getS_XYXZS_oundUrl(name: string) : string
    {
        let url = Sou_XYXZS_ndMgr.sound_XYXZS_ResPath + name + ".ogg";
        return url;
    }

    public play_XYXZS_Sound(name: string): void {
        if(!this._en_XYXZS_abled)
            return;
        var url = this.getS_XYXZS_oundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = Laya.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sou_XYXZS_ndMgr.sound_XYXZS_ResPath + name + ".ogg";
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

    public play_XYXZS_BGM(name){
        if(!this._en_XYXZS_abled)
            return;
        let url = this.getS_XYXZS_oundUrl(name);
        if (Laya.Browser.onMiniGame) {
            if(!this.b_XYXZS_gm)
            {
                this.b_XYXZS_gm = wx.createInnerAudioContext();
            }
            this.b_XYXZS_gm.pause();
            this.b_XYXZS_gm.src = url;
            this.b_XYXZS_gm.loop = true;
            this.b_XYXZS_gm.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public stop_XYXZS_BGM(){
        if (Laya.Browser.onMiniGame) {
            if(this.b_XYXZS_gm){
                this.b_XYXZS_gm.pause();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}