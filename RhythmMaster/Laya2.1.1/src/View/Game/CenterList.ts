export default class CenterList extends Laya.Script {

    private _list: Laya.List = null;
    private _cellWidth: number = 20;

    private _inDrag: boolean = false;
    private _startOffset: number = 0;
    private _hasChange: boolean = false;
    private _centerIndex: number = -1;
    private _targetCenterIndex: number = 0;

    /** @prop {name:sensitivity,tips:"切换页面的灵敏度",type:sNumber,min:0,max:1,default=0.5,} */
    public sensitivity: number = 0.5;

    /** @prop {name:rollRatio,tips:"滑动衰变 越小衰变越快",type:sNumber,min:0.3,max:0.96,default=0.96,}*/
    public rollRatio: number = 0.95;

    /** @prop {name:moveSpeed,tips:"回正中心时的移动速度",type:Number,default=10,} */
    public moveSpeed: number = 10;

    /** @prop {name:enabledMove,tips:"是否可以连续滑动",type:Bool,default=false}*/
    public enabledMove: boolean = false;

    public cellStateChange: Laya.Handler = null;
    public centerCellChange: Laya.Handler = null;

    public get isVertical(): boolean { return this.listBar.isVertical; }
    public get listBar(): Laya.ScrollBar { return this._list.scrollBar; }
    public get CenterIndex(): number {return this._centerIndex; }

    onAwake(): void {
        this._list = this.owner as Laya.List;
        this._list.on(Laya.Event.RENDER, this, this.onListRenderHandler);

        this._list.on(Laya.Event.MOUSE_DOWN, this, this.onListMouseDown);
        this._list.on(Laya.Event.MOUSE_UP, this, this.onListMouseUp);
        this._list.on(Laya.Event.MOUSE_OUT, this, this.onListMouseUp);

        this.changeCells();
    }

    onEnable(): void {
        Laya.timer.callLater(this, () => {
            this.UpdateCenterCell(this.AuteGetCenterIndex());
        });
    }

    private onListRenderHandler(cell: Laya.Box, index: number): void {
        this.changeCells();
        this.UpdateChildState(cell);
    }

    private changeCells(): void {
        let cell = this._list.cells[0];
        var cellWidth = (cell.width + this._list.spaceX) || 1;
        var cellHeight = (cell.height + this._list.spaceY) || 1;
        this._cellWidth = this.isVertical ? cellHeight : cellWidth;
        //this.listBar.rollRatio = this.rollRatio;
        this._targetCenterIndex = this.GetCenterTargetIndex(this.listBar.value);
    }

    private onListMouseDown(): void {
        this._inDrag = true;
        this._startOffset = this.listBar.value;
        this._targetCenterIndex = this.GetCenterTargetIndex(this._startOffset);
        Laya.timer.frameLoop(1, this, this.onListCenterLoop, null, true);
    }

    private onListMouseUp(): void {
        this._inDrag = false;
        let offset = this.listBar.value;
        offset += (offset - this._startOffset) * this.sensitivity;
        this._targetCenterIndex = this.GetCenterTargetIndex(offset);

        if (Math.abs(offset) > 1) { this._hasChange = true; }

        if (!this.enabledMove) { this.StopListMove(); }
    }

    private UpdateChildState(cell: Laya.Box): void {
        cell.scale(1, 1);//归零矩阵
        let orgPoint = new Laya.Point(0, 0);
        let globalPoint = cell.localToGlobal(orgPoint, false, this._list);

        let distance = 0;
        if (this.isVertical) {
            distance = globalPoint.distance(globalPoint.x, 0);
        } else {
            distance = globalPoint.distance(0, globalPoint.y);
        }

        let scale = 1 - Math.min(1, (Math.abs(distance) / this._list.width));
        if (this.cellStateChange) { this.cellStateChange.runWith([cell, scale]); }
    }

    private GetCenterTargetIndex(offset): number {
        let index = Math.floor(offset / this._cellWidth);

        if (index >= this._list.length) {
            return index
        }

        let curOffset = Math.abs(offset - index * this._cellWidth);
        let nextOffset = Math.abs(offset - (index + 1) * this._cellWidth);
        if (curOffset > nextOffset) {
            index++;
        }

        return index;
    }

    private AuteGetCenterIndex(): number {
        if (!this.enabledMove) {
            return this._targetCenterIndex;
        }

        return this.GetCenterTargetIndex(this.listBar.value);
    }

    private StopListMove(): void {
        this._list.stopDrag();
        this.listBar.stopScroll();
        this.listBar.startTweenMoveForce(0);
    }

    private onListCenterLoop(): void {
        let cells = this._list.cells;
        for (let i = 0; i < cells.length; i++) {
            this.UpdateChildState(cells[i])
        }

        let lastOffest = this.listBar.lastOffset;
        let targetIndex = this.AuteGetCenterIndex();
        let targetOffset = targetIndex * this._cellWidth;
        if (!this._inDrag && this._hasChange == true && Math.abs(lastOffest) < Math.sqrt(this.moveSpeed)) {
            let value = this.listBar.value;
            value = this.Lerp(value, targetOffset, this.moveSpeed * 1 / 60);

            if (Math.abs(targetOffset - value) < 2) {
                this._hasChange = false;
                this.StopListMove();
                this.listBar.value = targetOffset;
                this.UpdateCenterCell(targetIndex);
                this._targetCenterIndex = targetIndex;
                Laya.timer.clear(this, this.onListCenterLoop);
                return;
            }

            this.listBar.value = value;
        }
    }

    private UpdateCenterCell(centerIndex): void {
        if (this._centerIndex == centerIndex){
            return;
        }

        this._centerIndex = centerIndex;
        let cell = this._list.getCell(this._centerIndex);
        if (this.centerCellChange) { this.centerCellChange.runWith([cell, this._centerIndex]); }
    }

    public MoveTo(index): void {
        if (index > this._list.array.length - 1) {
            return;
        }

        this._targetCenterIndex = index;
        this._list.scrollTo(index);
        Laya.timer.frameOnce(5, this, () => {
            this.UpdateCenterCell(index);
            for (let i = 0; i < this._list.cells.length; i++) {
                this.UpdateChildState(this._list.cells[i]);
            }
        });
    }

    private Lerp(num1, num2, t): number { return num1 + t * (num2 - num1); }
}