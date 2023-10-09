import TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base from "../TTTemplateViewBase";
import RewardBox from "./RewardBox";
import TT_ZMDGJ_API from "../../../TTAPI";
import Utilit_ZMDGJ_ from "../../../Utilit";

//抖音开宝箱界面
export default class TTReward extends TT_ZMDGJ_Template_ZMDGJ_View_ZMDGJ_Base 
{
    protected _center_ZMDGJ_Zone : Laya.Clip = null;

    protected _reward_ZMDGJ_Boxs : Array<RewardBox> = [];
    protected _keys_ZMDGJ_Root : Laya.Sprite = null;
    protected _keys_ZMDGJ_: Array<Laya.Sprite> = [];
    protected _key_ZMDGJ_Count : number = 3;//钥匙数量

    protected _get_ZMDGJ_KeyZone : Laya.Sprite = null;
    protected _ad_ZMDGJ_Toggle : Laya.Sprite = null;
    protected _ad_ZMDGJ_ToggleTag : Laya.Sprite = null;
    protected _getKey_ZMDGJ_Btn : Laya.Sprite = null;
    protected _skip_ZMDGJ_Btn : Laya.Sprite = null;
    protected _skip_ZMDGJ_OkTag : Laya.Sprite = null;
    protected _skip_ZMDGJ_NoTag : Laya.Sprite = null;
    
    protected _getKey_ZMDGJ_Times : number = 1;//获取钥匙机会

    protected _ad_ZMDGJ_ing : boolean = false;//是否正在看视频中

    onAwake()
    {
        super.onAwake();

        this._topZone = this.View_ZMDGJ_.getChildByName("TopZone") as Laya.Clip;
        this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone") as Laya.Clip;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
            {
                this._center_ZMDGJ_Zone.top =  this._center_ZMDGJ_Zone.top + 75;
            }
        }

        this._get_ZMDGJ_KeyZone = this._center_ZMDGJ_Zone.getChildByName("GetKeyZone") as Laya.Clip;
        this._ad_ZMDGJ_Toggle = this._get_ZMDGJ_KeyZone.getChildByName("AdToggle") as Laya.Sprite;
        this._ad_ZMDGJ_ToggleTag = this._ad_ZMDGJ_Toggle.getChildByName("Tag") as Laya.Sprite;
        this._getKey_ZMDGJ_Btn = this._get_ZMDGJ_KeyZone.getChildByName("GetKeyBtn") as Laya.Sprite;
        this._skip_ZMDGJ_Btn = this._get_ZMDGJ_KeyZone.getChildByName("SkipBtn") as Laya.Sprite;
        this._skip_ZMDGJ_OkTag = this._skip_ZMDGJ_Btn.getChildByName("Ok") as Laya.Sprite;
        this._skip_ZMDGJ_NoTag = this._skip_ZMDGJ_Btn.getChildByName("No") as Laya.Sprite;      

        this._ad_ZMDGJ_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.on_ZMDGJ_AdToggle_ZMDGJ_StateChange(this._ad_ZMDGJ_ToggleTag.visible);

        let boxsRoot : Laya.Node = this._center_ZMDGJ_Zone.getChildByName("BoxsRoot") as Laya.Clip;
        let indexs = []
        for (let i = 0; i < boxsRoot.numChildren; ++i)  
        {
            let boxObj = boxsRoot.getChildAt(i);
            let rewardBox : RewardBox = boxObj.getComponent(RewardBox);
            rewardBox.init(this);
            rewardBox.AdTag.visible = false;
            this._reward_ZMDGJ_Boxs.push(rewardBox);
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
            this._reward_ZMDGJ_Boxs[indexs.shift()].AdTag.visible = true;
        }
        this._keys_ZMDGJ_Root = this._center_ZMDGJ_Zone.getChildByName("KeysRoot") as Laya.Clip;
        for (let i = 0; i < this._keys_ZMDGJ_Root.numChildren; ++i)  
        {
            let key = this._keys_ZMDGJ_Root.getChildAt(i) as Laya.Sprite;
            this._keys_ZMDGJ_.push(key);
        }
        this.refreshKeyState();
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._getKey_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onGetKeyBtn);
        this._ad_ZMDGJ_Toggle.on(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onSkipText);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._getKey_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onGetKeyBtn);
        this._ad_ZMDGJ_Toggle.off(Laya.Event.CLICK,this,this.onAdToggle);
        this._skip_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onSkipText);
    }
    
    public onRewardBoxClick(box : RewardBox)
    {
        if(this._ad_ZMDGJ_ing)
        {
            return;//看视频中点击无效
        }
        if(box.AdTag.visible)//视频标记是打开的，走看视频拿奖励逻辑
        {
            this._ad_ZMDGJ_ing = true;
            let self = this;
            TT_ZMDGJ_API.show_ZMDGJ_Rewarded_ZMDGJ_VideoAd((ok) =>  
            {
                if (ok)  {
                    //todo:看视频成功
                    //todo:处理开箱之后的逻辑
                }
                else  {
                    //todo:未完整观看视频
                    self._ad_ZMDGJ_ing = false;
                    box.AdTag.visible = false;
                }
            }, 
            () =>  
            {
                //todo:看视屏失败
                self._ad_ZMDGJ_ing = false;
            })
            return;
        }
        else//使用钥匙获取奖励逻辑
        {
            if (this._key_ZMDGJ_Count <= 0)
                return;
            --this._key_ZMDGJ_Count;
            this.refreshKeyState();
            //todo:处理开箱之后的逻辑
        }
    }   

    protected refreshKeyState()
    {
        for (let i = 0; i < this._keys_ZMDGJ_.length; ++i)  
        {
            let key = this._keys_ZMDGJ_[i];
            key.visible = ((i + 1) <= this._key_ZMDGJ_Count);
        }
        this._get_ZMDGJ_KeyZone.visible = this._key_ZMDGJ_Count <= 0 && this._getKey_ZMDGJ_Times > 0;
        this._keys_ZMDGJ_Root.visible = this._key_ZMDGJ_Count > 0 || this._getKey_ZMDGJ_Times <= 0;
    }
    
    protected onGetKeyBtn()  
    {
        if (this._ad_ZMDGJ_ing)
            return;//看视频中点击无效
        if(this._getKey_ZMDGJ_Times <= 0) 
            return;//获取钥匙机会用完
        this._ad_ZMDGJ_ing = true;
        let self = this;
        TT_ZMDGJ_API.show_ZMDGJ_Rewarded_ZMDGJ_VideoAd((ok) =>  
        {
            if (ok)  {
                //todo:看视频成功
                --self._getKey_ZMDGJ_Times;
                self._key_ZMDGJ_Count = 3;
                self.refreshKeyState();
                self._ad_ZMDGJ_ing = false;
            }
            else  {
                //todo:未完整观看视频
                self._ad_ZMDGJ_ing = false;
            }
        }, 
        () =>  
        {
            //todo:看视屏失败
            self._ad_ZMDGJ_ing = false;
        })
    }

    protected onAdToggle()
    {
        if (this._ad_ZMDGJ_ing)
            return;//看视频中点击无效
        this._ad_ZMDGJ_ToggleTag.visible = !this._ad_ZMDGJ_ToggleTag.visible;
        this.on_ZMDGJ_AdToggle_ZMDGJ_StateChange(this._ad_ZMDGJ_ToggleTag.visible);
    }

    protected onSkipText()
    {
        if (this._ad_ZMDGJ_ing)
            return;//看视频中点击无效
        this._ad_ZMDGJ_ing = true;
        let self = this;
        if (this._ad_ZMDGJ_ToggleTag.visible && this._getKey_ZMDGJ_Times > 0) {
            TT_ZMDGJ_API.show_ZMDGJ_Rewarded_ZMDGJ_VideoAd((ok) =>  {
                if (ok)  {
                    //todo:看视频成功
                    --self._getKey_ZMDGJ_Times;
                    self._key_ZMDGJ_Count = 3;
                    self.refreshKeyState();
                    self._ad_ZMDGJ_ing = false;
                }
                else  {
                    //todo:未完整观看视频
                    self._ad_ZMDGJ_ing = false;
                }
            }, () =>  {
                    //todo:看视屏失败
                    self._ad_ZMDGJ_ing = false;
                })
        }
        else  {
            //todo:跳过
        }
    }
    
    protected on_ZMDGJ_AdToggle_ZMDGJ_StateChange(visible : boolean)
    {
        if(visible)
        {
            this._skip_ZMDGJ_OkTag.visible = true;
            this._skip_ZMDGJ_NoTag.visible = false;
        }
        else
        {
            this._skip_ZMDGJ_OkTag.visible = false;
            this._skip_ZMDGJ_NoTag.visible = true;
        }
    }
}