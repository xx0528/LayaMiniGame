import ryw_ViewBase from "./ViewBase";

export default interface IViewStateListener
{
    onViewShow(view : ryw_ViewBase) : void;
    onViewHide(view : ryw_ViewBase) : void;
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

