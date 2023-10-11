export default class PageList extends Laya.Script
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

    protected _pageIcon : Array<Laya.Sprite> = new  Array<Laya.Sprite>();
    protected _pageInfo : Laya.Clip = null;
    protected _lastScrollValue : number = 0;
    protected _tweening : boolean = false;
    protected _curPage : number = 0;

    onAwake()
    {
        this._list = this.owner.getChildByName("List") as Laya.List;
       
        this._pageInfo = this.owner.getChildByName("PageInfo") as Laya.Clip;
        for(let i=0;i < this._pageInfo.numChildren;++i)
        {
            let child = this._pageInfo.getChildAt(i);
            let icon = child.getChildByName("icon") as Laya.Sprite;
            this._pageIcon.push(icon);
        }
    }

    onUpdate()
    {
        if(!this._tweening && this._lastScrollValue != this._list.scrollBar.value)
        {
            let totalPage = this._list.array.length / 6 - 1;
            if(this._lastScrollValue < this._list.scrollBar.value)
            {
                ++this._curPage;
                if(this._curPage >= totalPage)
                {
                    this._curPage = totalPage;
                }
            }
            else
            {
                --this._curPage;
                if(this._curPage <= 0)
                {
                    this._curPage = 0;
                }
            }
            this._tweening = true;
            let self = this;
            this._list.tweenTo(this._curPage * 6,500,Laya.Handler.create(this,()=>
            {

            }))
            Laya.timer.once(500,this,()=>
            {
                self._tweening = false;
                self._lastScrollValue = self._list.scrollBar.value;
            })
        }
    }


}