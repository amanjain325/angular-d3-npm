import { Component, Input, Output, EventEmitter } from '@angular/core';
declare let d3: any;
declare let $: any;

@Component({
    selector: 'angular-d3-donut',
    template: `
    <div id="donutChart">
    </div>
  `
})
export class DoughnutChartComponent {
    @Input() public width: number;
    @Input() public height: number;
    @Input() public iconWidth: number;
    @Input() public iconHeight: number;
    @Input() public outerRadius: number;
    @Input() public innerRadius: number;
    @Input() public data: any;
    @Input() public centerImage: any;
    @Input() public spreadSlice: boolean;
    @Output() public centerImageEvent = new EventEmitter();
    constructor() {
    }

    public ngOnInit() {
        this.renderChart();
    }

    public renderChart() {
        let chartComponent = this;
        let imageWidth = this.iconWidth ? this.iconWidth : 40;
        let imageHeight = this.iconHeight ? this.iconHeight : 40;
        let width = this.width ? this.width : 400;
        let height = this.height ? this.height : 400;
        let radius = 250;
        let piedata = this.data;
        this.outerRadius = this.outerRadius ? this.outerRadius : 150;
        this.innerRadius = this.innerRadius ? this.innerRadius : 70;
        this.spreadSlice = this.spreadSlice ? this.spreadSlice : false;
        let pie = d3.layout.pie()
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI * 2 + Math.PI / 2)
            .value((d) => {
                return d.value;
            }).sort(null);

        let arc = d3.svg.arc()
            .outerRadius(this.outerRadius)
            .innerRadius(this.innerRadius);

        let arcNew = d3.svg.arc()
            .outerRadius(this.outerRadius + 10)
            .innerRadius(this.innerRadius);

        let svg = d3.select('#donutChart').append('svg')
            .attr('width', 330)
            .attr('height', 330)
            .append('g')
            .attr('transform', 'translate(' + (width - radius + 10) + ',' + (height - radius + 10) + ')');

        let g = svg.selectAll('.arc')
            .data(pie(piedata))
            .enter().append('g')
            .attr('class', 'arc');

        g.append('path')
            .attr('d', arc)
            .style('stroke', 'white').style('fill', function (d, i) {
                return d.data.color;
            })
            .attr('id', function (d) {
                return 'iconId' + d.data.id;
            })
            .attr('cursor', this.spreadSlice ? 'pointer' : 'default')
            .on('click', function (d) {
                d3.selectAll('path').transition()
                    .duration(50)
                    .attr('d', function (d) {
                        if (this.selectedId === d.data.id) {
                            d.data.expanded = true;
                            this.selectedId = null;
                            return arc(d);
                        } else {
                            d.data.expanded = false;
                            this.selectedId = null;
                            return arc(d);
                        }
                    })
                if (chartComponent.spreadSlice) {
                    d3.select(this).transition()
                        .duration(50)
                        .attr('d', function (d) {
                            if (d.data.expanded) {
                                this.selectedId = null;
                                d.data.expanded = false;
                                return arc(d);
                            } else {
                                d.data.expanded = true;
                                this.selectedId = d.data.id;
                                return arcNew(d);
                            }
                        });
                }
            });

        g.append('g')
            .attr('transform', function (d) {
                return 'translate(' + arc.centroid(d) + ')';
            })
            .append('svg:image')
            .attr('xlink:href', function (d) {
                return d.data.iconImage;
            })
            .attr('id', function (d) {
                return d.data.id;
            })
            .attr('width', imageWidth)
            .attr('height', imageHeight)
            .attr('x', -1 * imageWidth / 2)
            .attr('y', -1 * imageHeight / 2)
            .attr('cursor', this.spreadSlice ? 'pointer' : 'default')
            .on('click', function (d) {
                d3.selectAll('path').transition()
                    .duration(50)
                    .attr('d', function (d) {
                        if (this.selectedId == d.data.id) {
                            d.data.expanded = true;
                            this.selectedId = null;
                            return arc(d);
                        } else {
                            d.data.expanded = false;
                            this.selectedId = null;
                            return arc(d);
                        }
                    });
                if (chartComponent.spreadSlice) {
                    d3.select('path#iconId' + d.data.id).transition()
                        .duration(50)
                        .attr('d', function (d) {
                            if (d.data.expanded) {
                                this.selectedId = null;
                                d.data.expanded = false;
                                return arc(d);
                            } else {
                                d.data.expanded = true;
                                this.selectedId = d.data.id;
                                return arcNew(d);
                            }
                        });
                }
            });
        if (this.centerImage) {
            svg.append('svg:image')
                .attr('id', 'center_image')
                .attr('x', -60)
                .attr('y', -60)
                .attr('width', 120)
                .attr('height', 120)
                .attr('cursor', 'pointer')
                .attr('xlink:href', this.centerImage)
                .on('click', function click(d) {
                    chartComponent.centerImageEvent.emit()
                });
        }
    }
}