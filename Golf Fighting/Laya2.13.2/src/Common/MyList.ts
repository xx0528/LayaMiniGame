import MyBagItem from "./MyBagItem";
import Event_sdlyg_Mgr from "../Event/EventMgr";
import { Event_sdlyg_Def } from "../Event/EventDef";

export default class MyList extends Laya.Script {

    //=============================================
    //目前需要自己写单位对象的脚本
    //==============================================
    /** @prop {name:page_item, tips:"页面对象", type:Node, default:0}*/
    public page_item: Laya.Sprite;
    /** @prop {name:x_page_space, tips:"页面之间x方向的间隔", type:Number, default:0}*/
    public x_page_space: number = 0;
    /** @prop {name:x_repeat, tips:"每个页面里x方向的数量", type:Int, default:0}*/
    public x_repeat: number = 0;
    /** @prop {name:y_repeat, tips:"每个页面里y方向的数量", type:Int, default:0}*/
    public y_repeat: number = 0;
    /** @prop {name:render_item, tips:"单位对象", type:Prefab, default:0}*/
    public render_item: Laya.Prefab;
    /** @prop {name:x_item_space, tips:"单位之间x方向的间隔", type:Number, default:0}*/
    public x_item_space: number = 0;
    /** @prop {name:y_item_space, tips:"单位之间x方向的间隔", type:Number, default:0}*/
    public y_item_space: number = 0;
    /** @prop {name:repeat_amount, tips:"单位对象克隆总量", type:Int, default:0}*/
    public repeat_amount: number = 0;
    /** @prop {name:type_name, tips:"所属类型名称", type:String, default:0}*/
    public type_name: string = "所属类型名称";
    
    

    private m_owner:Laya.Box;
    private start_x:number = 0;

    private page_List :Laya.Sprite[] = new Array();
    private in_move:boolean = false;
    private current_index:number = 0;       //当前在哪个页面
    private last_mouse_x:number=0;
    private pageNum:number = 0;     //需要生成的页数
    private start_click_x:number = 0;
    private prop_id:number = 0;

    constructor() { super(); }
    
    onAwake(){
        this.m_owner =  this.owner as Laya.Box;
        this.page_item.visible = false;
        this.start_x = this.m_owner.x;
        this.pageNum = Math.ceil(this.repeat_amount/(this.x_repeat*this.y_repeat))
    }

    onStart(){
        for(let i = 0; i<this.pageNum ; i++){
            this.createPage(i);
        }
        this.m_owner.width = this.page_item.width*this.pageNum+this.x_page_space*(this.pageNum-1);
    }



    createPage(id:number){
        let page:Laya.Sprite = new Laya.Sprite();
        page.height = this.page_item.height;
        page.width = this.page_item.width;
        page.texture = this.page_item.texture;
        page.pos(this.page_item.x+id*(this.page_item.width+this.x_page_space),this.page_item.y);
        for(let y_id = 0; y_id<this.y_repeat; y_id++){
            for(let x_id = 0 ; x_id<this.x_repeat; x_id++){
                if(this.prop_id<this.repeat_amount){
                    let item = this.createItem(this.prop_id,x_id,y_id,page);
                    this.prop_id++;
                }
            }
        }
        this.m_owner.addChild(page);
        this.page_List.push(page);
    }

    createItem(id:number,x_id:number,y_id:number,parent:Laya.Sprite){
        let item:Laya.Sprite = Laya.Pool.getItemByCreateFun("render_item", this.render_item.create, this.render_item);
        let x:number = x_id*item.width + this.x_item_space*(x_id+1);
        let y:number = y_id*item.width + this.y_item_space*(y_id+1);
        item.pos(x,y);
        item.name = this.type_name+id;
        this.addItemComponent(item);
        parent.addChild(item);
    }
/**
 * 展示指定的页数
 * @param index 页数 
 */
    toPageByIndex(index:number){
        this.current_index = index;
        let move_x = this.start_x-index*(this.page_item.width+this.x_page_space);
        Laya.Tween.to(this.m_owner,{x:move_x},50);
    }
/**
 * 通过Id跳转到指定的页数
 * @param id 道具id
 */
    toPageByID(id:number){
        let index = Math.floor(id/(this.x_repeat*this.y_repeat));
        this.toPageByIndex(index);
    }

    getCurrentIndex():number{
        return this.current_index;
    }

    addItemComponent(item:Laya.Sprite){
        //这里给单位对象添加需要的脚本

        item.addComponent(MyBagItem);
    }

    onMouseDown(e:Laya.Event){
        this.in_move = true;
        this.last_mouse_x = e.stageX;
        this.start_click_x = e.stageX;
    }

    onMouseMove(e:Laya.Event){
        if(this.in_move){
            let dis = e.stageX-this.last_mouse_x;
            this.m_owner.x +=dis;
            this.last_mouse_x = e.stageX;
        }
    }

    onMouseUp(e:Laya.Event){
        this.in_move = false;
        if((this.start_click_x-e.stageX>this.page_item.width/3)){
            this.current_index++;
        }else if((this.start_click_x-e.stageX)<-this.page_item.width/3){
            this.current_index--;
        }
        if(this.current_index<=0)this.current_index=0;
        if(this.current_index>=this.pageNum-1)this.current_index=this.pageNum-1;
        this.toPageByIndex(this.current_index);
        //------------------   广播翻页事件 -----------------------
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ChangePage,this.current_index);

    }
    
    
}