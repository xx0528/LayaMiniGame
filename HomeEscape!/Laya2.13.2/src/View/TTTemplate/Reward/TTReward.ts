import ryw_TTTemplateViewBase from "../TTTemplateViewBase";
import ryw_RewardBox from "./RewardBox";
import ryw_TTAPI from "../../../TTAPI";
import ryw_Utilit from "../../../Utilit";

//抖音开宝箱界面
export default class ryw_TTReward extends ryw_TTTemplateViewBase 
{
    protected ryw__centerZone : Laya.Clip = null;

    protected ryw__rewardBoxs : Array<ryw_RewardBox> = [];
    protected ryw__keysRoot : Laya.Sprite = null;
    protected ryw__keys: Array<Laya.Sprite> = [];
    protected ryw__keyCount : number = 3;//钥匙数量

    protected ryw__getKeyZone : Laya.Sprite = null;
    protected ryw__adToggle : Laya.Sprite = null;
    protected ryw__adToggleTag : Laya.Sprite = null;
    protected ryw__getKeyBtn : Laya.Sprite = null;
    protected ryw__skipBtn : Laya.Sprite = null;
    protected ryw__skipOkTag : Laya.Sprite = null;
    protected ryw__skipNoTag : Laya.Sprite = null;
    
    protected ryw__getKeyTimes : number = 1;//获取钥匙机会

    protected ryw__ading : boolean = false;//是否正在看视频中

    onAwake()
    {
        super.onAwake();

        this._topZone = this.ryw_View.getChildByName("TopZone") as Laya.Clip;
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(ryw_Utilit.ryw_isIphoneX())
            {
                this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
            }
        }

        this.ryw__getKeyZone = this.ryw__centerZone.getChildByName("GetKeyZone") as Laya.Clip;
        this.ryw__adToggle = this.ryw__getKeyZone.getChildByName("AdToggle") as Laya.Sprite;
        this.ryw__adToggleTag = this.ryw__adToggle.getChildByName("Tag") as Laya.Sprite;
        this.ryw__getKeyBtn = this.ryw__getKeyZone.getChildByName("GetKeyBtn") as Laya.Sprite;
        this.ryw__skipBtn = this.ryw__getKeyZone.getChildByName("SkipBtn") as Laya.Sprite;
        this.ryw__skipOkTag = this.ryw__skipBtn.getChildByName("Ok") as Laya.Sprite;
        this.ryw__skipNoTag = this.ryw__skipBtn.getChildByName("No") as Laya.Sprite;      

        this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.onAdToggleStateChange(this.ryw__adToggleTag.visible);

        let boxsRoot : Laya.Node = this.ryw__centerZone.getChildByName("BoxsRoot") as Laya.Clip;
        let indexs = []
        for (let i = 0; i < boxsRoot.numChildren; ++i)  
        {
            let boxObj = boxsRoot.getChildAt(i);
            let rewardBox : ryw_RewardBox = boxObj.getComponent(ryw_RewardBox);
            rewardBox.ryw_init(this);
            rewardBox.ryw_AdTag.visible = false;
            this.ryw__rewardBoxs.push(rewardBox);
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
            this.ryw__rewardBoxs[indexs.shift()].ryw_AdTag.visible = true;
        }
        this.ryw__keysRoot = this.ryw__centerZone.getChildByName("KeysRoot") as Laya.Clip;
        for (let i = 0; i < this.ryw__keysRoot.numChildren; ++i)  
        {
            let key = this.ryw__keysRoot.getChildAt(i) as Laya.Sprite;
            this.ryw__keys.push(key);
        }
        this.refreshKeyState();
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__getKeyBtn.on(Laya.Event.CLICK,this,this.onGetKeyBtn);
        this.ryw__adToggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this.ryw__skipBtn.on(Laya.Event.CLICK,this,this.onSkipText);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__getKeyBtn.off(Laya.Event.CLICK,this,this.onGetKeyBtn);
        this.ryw__adToggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this.ryw__skipBtn.off(Laya.Event.CLICK,this,this.onSkipText);
    }
    
    public onRewardBoxClick(box : ryw_RewardBox)
    {
        if(this.ryw__ading)
        {
            return;//看视频中点击无效
        }
        if(box.ryw_AdTag.visible)//视频标记是打开的，走看视频拿奖励逻辑
        {
            this.ryw__ading = true;
            let self = this;
            ryw_TTAPI.ryw_showRewardedVideoAd((ok) =>  
            {
                if (ok)  {
                    //todo:看视频成功
                    //todo:处理开箱之后的逻辑
                }
                else  {
                    //todo:未完整观看视频
                    self.ryw__ading = false;
                    box.ryw_AdTag.visible = false;
                }
            }, 
            () =>  
            {
                //todo:看视屏失败
                self.ryw__ading = false;
            })
            return;
        }
        else//使用钥匙获取奖励逻辑
        {
            if (this.ryw__keyCount <= 0)
                return;
            --this.ryw__keyCount;
            this.refreshKeyState();
            //todo:处理开箱之后的逻辑
        }
    }   

    protected refreshKeyState()
    {
        for (let i = 0; i < this.ryw__keys.length; ++i)  
        {
            let key = this.ryw__keys[i];
            key.visible = ((i + 1) <= this.ryw__keyCount);
        }
        this.ryw__getKeyZone.visible = this.ryw__keyCount <= 0 && this.ryw__getKeyTimes > 0;
        this.ryw__keysRoot.visible = this.ryw__keyCount > 0 || this.ryw__getKeyTimes <= 0;
    }
    
    protected onGetKeyBtn()  
    {
        if (this.ryw__ading)
            return;//看视频中点击无效
        if(this.ryw__getKeyTimes <= 0) 
            return;//获取钥匙机会用完
        this.ryw__ading = true;
        let self = this;
        ryw_TTAPI.ryw_showRewardedVideoAd((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                --self.ryw__getKeyTimes;
                self.ryw__keyCount = 3;
                self.refreshKeyState();
                self.ryw__ading = false;
            }
            else  {
                //todo:未完整观看视频
                self.ryw__ading = false;
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self.ryw__ading = false;
        })
    }

    protected onAdToggle()
    {
        if (this.ryw__ading)
            return;//看视频中点击无效
        this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
        this.onAdToggleStateChange(this.ryw__adToggleTag.visible);
    }

    protected onSkipText()
    {
        if (this.ryw__ading)
            return;//看视频中点击无效
        this.ryw__ading = true;
        let self = this;
        if (this.ryw__adToggleTag.visible && this.ryw__getKeyTimes > 0) {
            ryw_TTAPI.ryw_showRewardedVideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    --self.ryw__getKeyTimes;
                    self.ryw__keyCount = 3;
                    self.refreshKeyState();
                    self.ryw__ading = false;
                }
                else  {
                    //todo:未完整观看视频
                    self.ryw__ading = false;
                }
            }, () =>  {
                    //todo:看视屏失败
                    self.ryw__ading = false;
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
            this.ryw__skipOkTag.visible = true;
            this.ryw__skipNoTag.visible = false;
        }
        else
        {
            this.ryw__skipOkTag.visible = false;
            this.ryw__skipNoTag.visible = true;
        }
    }
}