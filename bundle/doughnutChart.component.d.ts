import { EventEmitter } from '@angular/core';
export declare class DoughnutChartComponent {
    width: number;
    height: number;
    iconWidth: number;
    iconHeight: number;
    outerRadius: number;
    innerRadius: number;
    data: any;
    centerImage: any;
    spreadSlice: boolean;
    centerImageEvent: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    renderChart(): void;
}
