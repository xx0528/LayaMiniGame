export default class ryw_PageList extends Laya.Script
{
    public get ryw_List()
    {
        if(null == this.ryw__list)
        {
            this.ryw__list = this.owner.getChildByName("List") as Laya.List;
        }
        return this.ryw__list;
    }
    protected ryw__list : Laya.List = null;

    protected ryw__pageIcon : Array<Laya.Sprite> = new  Array<Laya.Sprite>();
    protected ryw__pageInfo : Laya.Clip = null;
    protected ryw__lastScrollValue : number = 0;
    protected ryw__tweening : boolean = false;
    protected ryw__curPage : number = 0;

    onAwake()
    {
        this.ryw__list = this.owner.getChildByName("List") as Laya.List;
       
        this.ryw__pageInfo = this.owner.getChildByName("PageInfo") as Laya.Clip;
        for(let i=0;i < this.ryw__pageInfo.numChildren;++i)
        {
            let child = this.ryw__pageInfo.getChildAt(i);
            let icon = child.getChildByName("icon") as Laya.Sprite;
            this.ryw__pageIcon.push(icon);
        }
    }

    onUpdate()
    {
        if(!this.ryw__tweening && this.ryw__lastScrollValue != this.ryw__list.scrollBar.value)
        {
            let totalPage = this.ryw__list.array.length / 6 - 1;
            if(this.ryw__lastScrollValue < this.ryw__list.scrollBar.value)
            {
                ++this.ryw__curPage;
                if(this.ryw__curPage >= totalPage)
                {
                    this.ryw__curPage = totalPage;
                }
            }
            else
            {
                --this.ryw__curPage;
                if(this.ryw__curPage <= 0)
                {
                    this.ryw__curPage = 0;
                }
            }
            this.ryw__tweening = true;
            let self = this;
            this.ryw__list.tweenTo(this.ryw__curPage * 6,500,Laya.Handler.create(this,()=>
            {

            }))
            Laya.timer.once(500,this,()=>
            {
                self.ryw__tweening = false;
                self.ryw__lastScrollValue = self.ryw__list.scrollBar.value;
            })
        }
    }


}