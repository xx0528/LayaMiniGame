import TT_wcjtn_Template_wcjtn_View_wcjtn_Base from "../TTTemplateViewBase";
import RewardBox from "./RewardBox";
import TT_wcjtn_API from "../../../TTAPI";
import Utilit_wcjtn_ from "../../../Utilit";

//抖音开宝箱界面
export default class TTReward extends TT_wcjtn_Template_wcjtn_View_wcjtn_Base 
{
    protected _center_wcjtn_Zone : Laya.Clip = null;

    protected _reward_wcjtn_Boxs : Array<RewardBox> = [];
    protected _keys_wcjtn_Root : Laya.Sprite = null;
    protected _keys_wcjtn_: Array<Laya.Sprite> = [];
    protected _key_wcjtn_Count : number = 3;//钥匙数量

    protected _get_wcjtn_KeyZone : Laya.Sprite = null;
    protected _ad_wcjtn_Toggle : Laya.Sprite = null;
    protected _ad_wcjtn_ToggleTag : Laya.Sprite = null;
    protected _getKey_wcjtn_Btn : Laya.Sprite = null;
    protected _skip_wcjtn_Btn : Laya.Sprite = null;
    protected _skip_wcjtn_OkTag : Laya.Sprite = null;
    protected _skip_wcjtn_NoTag : Laya.Sprite = null;
    
    protected _getKey_wcjtn_Times : number = 1;//获取钥匙机会

    protected _ad_wcjtn_ing : boolean = false;//是否正在看视频中

    onAwake()
    {
        super.onAwake();

        this._topZone = this.View_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
            }
        }

        this._get_wcjtn_KeyZone = this._center_wcjtn_Zone.getChildByName("GetKeyZone") as Laya.Clip;
        this._ad_wcjtn_Toggle = this._get_wcjtn_KeyZone.getChildByName("AdToggle") as Laya.Sprite;
        this._ad_wcjtn_ToggleTag = this._ad_wcjtn_Toggle.getChildByName("Tag") as Laya.Sprite;
        this._getKey_wcjtn_Btn = this._get_wcjtn_KeyZone.getChildByName("GetKeyBtn") as Laya.Sprite;
        this._skip_wcjtn_Btn = this._get_wcjtn_KeyZone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skip_wcjtn_OkTag = this._skip_wcjtn_Btn.getChildByName("Ok") as Laya.Sprite;
        this._skip_wcjtn_NoTag = this._skip_wcjtn_Btn.getChildByName("No") as Laya.Sprite;      

        this._ad_wcjtn_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);

        let boxsRoot : Laya.Node = this._center_wcjtn_Zone.getChildByName("BoxsRoot") as Laya.Clip;
        let indexs = []
        for (let i = 0; i < boxsRoot.numChildren; ++i)  
        {
            let boxObj = boxsRoot.getChildAt(i);
            let rewardBox : RewardBox = boxObj.getComponent(RewardBox);
            rewardBox.init(this);
            rewardBox.AdTag.visible = false;
            this._reward_wcjtn_Boxs.push(rewardBox);
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
            this._reward_wcjtn_Boxs[indexs.shift()].AdTag.visible = true;
        }
        this._keys_wcjtn_Root = this._center_wcjtn_Zone.getChildByName("KeysRoot") as Laya.Clip;
        for (let i = 0; i < this._keys_wcjtn_Root.numChildren; ++i)  
        {
            let key = this._keys_wcjtn_Root.getChildAt(i) as Laya.Sprite;
            this._keys_wcjtn_.push(key);
        }
        this.refreshKeyState();
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._getKey_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onGetKeyBtn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onSkipText);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._getKey_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onGetKeyBtn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onSkipText);
    }
    
    public onRewardBoxClick(box : RewardBox)
    {
        if(this._ad_wcjtn_ing)
        {
            return;//看视频中点击无效
        }
        if(box.AdTag.visible)//视频标记是打开的，走看视频拿奖励逻辑
        {
            this._ad_wcjtn_ing = true;
            let self = this;
            TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd((ok) =>  
            {
                if (ok)  {
                    //todo:看视频成功
                    //todo:处理开箱之后的逻辑
                }
                else  {
                    //todo:未完整观看视频
                    self._ad_wcjtn_ing = false;
                    box.AdTag.visible = false;
                }
            }, 
            () =>  
            {
                //todo:看视屏失败
                self._ad_wcjtn_ing = false;
            })
            return;
        }
        else//使用钥匙获取奖励逻辑
        {
            if (this._key_wcjtn_Count <= 0)
                return;
            --this._key_wcjtn_Count;
            this.refreshKeyState();
            //todo:处理开箱之后的逻辑
        }
    }   

    protected refreshKeyState()
    {
        for (let i = 0; i < this._keys_wcjtn_.length; ++i)  
        {
            let key = this._keys_wcjtn_[i];
            key.visible = ((i + 1) <= this._key_wcjtn_Count);
        }
        this._get_wcjtn_KeyZone.visible = this._key_wcjtn_Count <= 0 && this._getKey_wcjtn_Times > 0;
        this._keys_wcjtn_Root.visible = this._key_wcjtn_Count > 0 || this._getKey_wcjtn_Times <= 0;
    }
    
    protected onGetKeyBtn()  
    {
        if (this._ad_wcjtn_ing)
            return;//看视频中点击无效
        if(this._getKey_wcjtn_Times <= 0) 
            return;//获取钥匙机会用完
        this._ad_wcjtn_ing = true;
        let self = this;
        TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                --self._getKey_wcjtn_Times;
                self._key_wcjtn_Count = 3;
                self.refreshKeyState();
                self._ad_wcjtn_ing = false;
            }
            else  {
                //todo:未完整观看视频
                self._ad_wcjtn_ing = false;
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self._ad_wcjtn_ing = false;
        })
    }

    protected onAdToggle()
    {
        if (this._ad_wcjtn_ing)
            return;//看视频中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    }

    protected onSkipText()
    {
        if (this._ad_wcjtn_ing)
            return;//看视频中点击无效
        this._ad_wcjtn_ing = true;
        let self = this;
        if (this._ad_wcjtn_ToggleTag.visible && this._getKey_wcjtn_Times > 0) {
            TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    --self._getKey_wcjtn_Times;
                    self._key_wcjtn_Count = 3;
                    self.refreshKeyState();
                    self._ad_wcjtn_ing = false;
                }
                else  {
                    //todo:未完整观看视频
                    self._ad_wcjtn_ing = false;
                }
            }, () =>  {
                    //todo:看视屏失败
                    self._ad_wcjtn_ing = false;
                })
        }
        else  {
            //todo:跳过
        }
    }
    
    protected on_wcjtn_AdToggle_wcjtn_StateChange(visible : boolean)
    {
        if(visible)
        {
            this._skip_wcjtn_OkTag.visible = true;
            this._skip_wcjtn_NoTag.visible = false;
        }
        else
        {
            this._skip_wcjtn_OkTag.visible = false;
            this._skip_wcjtn_NoTag.visible = true;
        }
    }
}