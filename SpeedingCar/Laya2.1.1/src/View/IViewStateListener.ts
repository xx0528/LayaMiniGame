import View_wcjtn_Base from "./ViewBase";

export default interface IView_wcjtn_State_wcjtn_Listener
{
    onViewShow(view : View_wcjtn_Base) : void;
    onViewHide(view : View_wcjtn_Base) : void;
}

export function isIViewStateListener(element : any)
{
    if((null != element.onViewShow && typeof(element.onViewShow) == "function")
        && (null != element.onViewHide && typeof(element.onViewHide) == "function") )
    {
        return true;
    }
    return false;
}

