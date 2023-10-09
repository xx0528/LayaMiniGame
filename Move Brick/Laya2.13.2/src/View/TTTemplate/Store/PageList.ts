export default class Page_ZMDGJ_List extends Laya.Script
{
    public get List()
    {
        if(null == this._list)
        {
            this._list = this.owner.getChildByName("List") as Laya.List;
        }
        return this._list;
    }
    protected _list : Laya.List = null;

    protected _page_ZMDGJ_Icon : Array<Laya.Sprite> = new  Array<Laya.Sprite>();
    protected _page_ZMDGJ_Info : Laya.Clip = null;
    protected _last_ZMDGJ_Scroll_ZMDGJ_Value : number = 0;
    protected _tween_ZMDGJ_ing : boolean = false;
    protected _cur_ZMDGJ_Page : number = 0;

    onAwake()
    {
        super.onAwake();
        this._list = this.owner.getChildByName("List") as Laya.List;
       
        this._page_ZMDGJ_Info = this.owner.getChildByName("PageInfo") as Laya.Clip;
        for(let i=0;i < this._page_ZMDGJ_Info.numChildren;++i)
        {
            let child = this._page_ZMDGJ_Info.getChildAt(i);
            let icon = child.getChildByName("icon") as Laya.Sprite;
            this._page_ZMDGJ_Icon.push(icon);
        }
    }

    onUpdate()
    {
        super.onUpdate();
        if(!this._tween_ZMDGJ_ing && this._last_ZMDGJ_Scroll_ZMDGJ_Value != this._list.scrollBar.value)
        {
            let totalPage = this._list.array.length / 6 - 1;
            if(this._last_ZMDGJ_Scroll_ZMDGJ_Value < this._list.scrollBar.value)
            {
                ++this._cur_ZMDGJ_Page;
                if(this._cur_ZMDGJ_Page >= totalPage)
                {
                    this._cur_ZMDGJ_Page = totalPage;
                }
            }
            else
            {
                --this._cur_ZMDGJ_Page;
                if(this._cur_ZMDGJ_Page <= 0)
                {
                    this._cur_ZMDGJ_Page = 0;
                }
            }
            this._tween_ZMDGJ_ing = true;
            let self = this;
            this._list.tweenTo(this._cur_ZMDGJ_Page * 6,500,Laya.Handler.create(this,()=>
            {

            }))
            Laya.timer.once(500,this,()=>
            {
                self._tween_ZMDGJ_ing = false;
                self._last_ZMDGJ_Scroll_ZMDGJ_Value = self._list.scrollBar.value;
            })
        }
    }


}