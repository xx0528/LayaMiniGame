import TTTemplateViewBase from "../TTTemplateViewBase";
import RewardBox from "./RewardBox";
import TTAPI from "../../../TTAPI";
import Utilit from "../../../Utilit";

//抖音开宝箱界面
export default class TTReward extends TTTemplateViewBase 
{
    protected _centerZone : Laya.Clip = null;

    protected _rewardBoxs : Array<RewardBox> = [];
    protected _keysRoot : Laya.Sprite = null;
    protected _keys: Array<Laya.Sprite> = [];
    protected _keyCount : number = 3;//钥匙数量

    protected _getKeyZone : Laya.Sprite = null;
    protected _adToggle : Laya.Sprite = null;
    protected _adToggleTag : Laya.Sprite = null;
    protected _getKeyBtn : Laya.Sprite = null;
    protected _skipBtn : Laya.Sprite = null;
    protected _skipOkTag : Laya.Sprite = null;
    protected _skipNoTag : Laya.Sprite = null;
    
    protected _getKeyTimes : number = 1;//获取钥匙机会

    protected _ading : boolean = false;//是否正在看视频中

    onAwake()
    {
        super.onAwake();

        this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit.isIphoneX_())
            {
                this._centerZone.top =  this._centerZone.top + 75;
            }
        }

        this._getKeyZone = this._centerZone.getChildByName("GetKeyZone") as Laya.Clip;
        this._adToggle = this._getKeyZone.getChildByName("AdToggle") as Laya.Sprite;
        this._adToggleTag = this._adToggle.getChildByName("Tag") as Laya.Sprite;
        this._getKeyBtn = this._getKeyZone.getChildByName("GetKeyBtn") as Laya.Sprite;
        this._skipBtn = this._getKeyZone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skipOkTag = this._skipBtn.getChildByName("Ok") as Laya.Sprite;
        this._skipNoTag = this._skipBtn.getChildByName("No") as Laya.Sprite;      

        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.onAdToggleStateChange(this._adToggleTag.visible);

        let boxsRoot : Laya.Node = this._centerZone.getChildByName("BoxsRoot") as Laya.Clip;
        let indexs = []
        for (let i = 0; i < boxsRoot.numChildren; ++i)  
        {
            let boxObj = boxsRoot.getChildAt(i);
            let rewardBox : RewardBox = boxObj.getComponent(RewardBox);
            rewardBox.init(this);
            rewardBox.AdTag.visible = false;
            this._rewardBoxs.push(rewardBox);
            indexs.push(i);
        }
        for (let i = 0; i < indexs.length; ++i)
        {
            let index = indexs[i];
            let randomIndex = Math.floor(Math.random() * indexs.length);
            let temp = indexs[randomIndex];
            indexs[randomIndex] = index;
            indexs[i] = temp;
        }
        for (let i = 0; i < 3; ++i)  
        {
            this._rewardBoxs[indexs.shift()].AdTag.visible = true;
        }
        this._keysRoot = this._centerZone.getChildByName("KeysRoot") as Laya.Clip;
        for (let i = 0; i < this._keysRoot.numChildren; ++i)  
        {
            let key = this._keysRoot.getChildAt(i) as Laya.Sprite;
            this._keys.push(key);
        }
        this.refreshKeyState();
    }

    addEvent()
    {
        super.addEvent();
        this._getKeyBtn.on(Laya.Event.CLICK,this,this.onGetKeyBtn);
        this._adToggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._skipBtn.on(Laya.Event.CLICK,this,this.onSkipText);
    }

    removeEvent()
    {
        super.removeEvent();
        this._getKeyBtn.off(Laya.Event.CLICK,this,this.onGetKeyBtn);
        this._adToggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._skipBtn.off(Laya.Event.CLICK,this,this.onSkipText);
    }
    
    public onRewardBoxClick(box : RewardBox)
    {
        if(this._ading)
        {
            return;//看视频中点击无效
        }
        if(box.AdTag.visible)//视频标记是打开的，走看视频拿奖励逻辑
        {
            this._ading = true;
            let self = this;
            TTAPI.showRewardedVideoAd_ppxhc((ok) =>  
            {
                if (ok)  {
                    //todo:看视频成功
                    //todo:处理开箱之后的逻辑
                }
                else  {
                    //todo:未完整观看视频
                    self._ading = false;
                    box.AdTag.visible = false;
                }
            }, 
            () =>  
            {
                //todo:看视屏失败
                self._ading = false;
            })
            return;
        }
        else//使用钥匙获取奖励逻辑
        {
            if (this._keyCount <= 0)
                return;
            --this._keyCount;
            this.refreshKeyState();
            //todo:处理开箱之后的逻辑
        }
    }   

    protected refreshKeyState()
    {
        for (let i = 0; i < this._keys.length; ++i)  
        {
            let key = this._keys[i];
            key.visible = ((i + 1) <= this._keyCount);
        }
        this._getKeyZone.visible = this._keyCount <= 0 && this._getKeyTimes > 0;
        this._keysRoot.visible = this._keyCount > 0 || this._getKeyTimes <= 0;
    }
    
    protected onGetKeyBtn()  
    {
        if (this._ading)
            return;//看视频中点击无效
        if(this._getKeyTimes <= 0) 
            return;//获取钥匙机会用完
        this._ading = true;
        let self = this;
        TTAPI.showRewardedVideoAd_ppxhc((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                --self._getKeyTimes;
                self._keyCount = 3;
                self.refreshKeyState();
                self._ading = false;
            }
            else  {
                //todo:未完整观看视频
                self._ading = false;
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self._ading = false;
        })
    }

    protected onAdToggle()
    {
        if (this._ading)
            return;//看视频中点击无效
        this._adToggleTag.visible = !this._adToggleTag.visible;
        this.onAdToggleStateChange(this._adToggleTag.visible);
    }

    protected onSkipText()
    {
        if (this._ading)
            return;//看视频中点击无效
        this._ading = true;
        let self = this;
        if (this._adToggleTag.visible && this._getKeyTimes > 0) {
            TTAPI.showRewardedVideoAd_ppxhc((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    --self._getKeyTimes;
                    self._keyCount = 3;
                    self.refreshKeyState();
                    self._ading = false;
                }
                else  {
                    //todo:未完整观看视频
                    self._ading = false;
                }
            }, () =>  {
                    //todo:看视屏失败
                    self._ading = false;
                })
        }
        else  {
            //todo:跳过
        }
    }
    
    protected onAdToggleStateChange(visible : boolean)
    {
        if(visible)
        {
            this._skipOkTag.visible = true;
            this._skipNoTag.visible = false;
        }
        else
        {
            this._skipOkTag.visible = false;
            this._skipNoTag.visible = true;
        }
    }
}