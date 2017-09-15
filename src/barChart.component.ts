import { Component, Input, Output, EventEmitter } from '@angular/core';
declare let d3: any;
declare let $: any;

@Component({
    selector: 'angular-d3-bar',
    template: `
    <div id="barChart">
    </div>
  `
})
export class BarChartComponent {
    @Input() public width: number;
    @Input() public height: number;
    @Input() public margin: any;
    @Input() public data: any;
    @Input() public transitionDuration: number;
    @Input() public transitionDelay: number;
    @Input() public barWidth: any;
    @Input() public yAxisd3Format: any;
    @Input() public color: string;
    @Input() public dataGroup: number;

    constructor() {
    }

    public ngOnInit() {
        this.renderChart();
    }

    public renderChart() {
        let valueArray = [];
        let dataGroup = this.dataGroup ? this.dataGroup + 1 : 2;
        for (let i = 1; i < dataGroup; i++) {
            valueArray.push('value' + i);
        }
        let chartComponent = this;
        let width = this.width ? this.width : 700;
        let height = this.height ? this.height : 400;
        let transitionDuration = this.transitionDuration ? this.transitionDuration : 1000;
        let transitionDelay = this.transitionDelay ? this.transitionDelay : 100;
        let radius = 250;
        let data = this.data;
        let margin = {
            top: 20,
            right: 160,
            bottom: 35,
            left: 0
        };
        let fromLeft = 40;
        let color = this.color ? this.color : 'blue';
        let barWidth = this.barWidth ? this.barWidth : '11px';
        let yAxisd3Format = this.yAxisd3Format ? this.yAxisd3Format : '.1S';
        let svg = d3.select('#barChart')
            .append('svg')
            .attr('width', width + 100)
            .attr('height', height + margin.top + margin.bottom + 2)
            .append('g')
            .attr('transform', 'translate(' + (margin.left + fromLeft) + ',' + margin.top + ')');

        let dataset = d3.layout.stack()(valueArray.map((value) => {
            return data.map((d: any) => {
                return { x: d.label, y: d.value };
            });
        }));

        let x = d3.scale.ordinal()
            .domain(dataset[0].map((d) => { return d.x; }))
            .rangeBands([0, width], 1);

        let y = d3.scale.linear()
            .domain([0, d3.max(dataset, (d) => {
                return d3.max(d, (d1) => { return d1.y0 + d1.y; });
            })])
            .range([height, 0]);

        let yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(10)
            .tickSize(-width, 0, 0)
            .tickFormat(d3.format(yAxisd3Format));

        let xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svg.selectAll('.x')
            .selectAll('text');

        svg.selectAll('.y')
            .selectAll('path')
            .style('display', 'none');

        let groups = svg.selectAll('g.cost')
            .data(dataset)
            .enter().append('g')
            .attr('class', 'cost')
            .style('fill', (d, i) => { return color; });
        let rect = groups.selectAll('rect')
            .data((d) => { return d; })
            .enter()
            .append('rect')
            .attr('x', (d) => { return x(d.x); })
            .attr('y', height - 1)
            .attr('height', 0)
            .attr('width', barWidth)
            .transition()
            .duration(transitionDuration)
            .delay(transitionDelay)
            .attr('y', (d) => { return y(d.y0 + d.y); })
            .attr('height', (d) => { return y(d.y0) - y(d.y0 + d.y); });
    }

}