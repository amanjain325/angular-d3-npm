"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DoughnutChartComponent = (function () {
    function DoughnutChartComponent() {
        this.centerImageEvent = new core_1.EventEmitter();
    }
    DoughnutChartComponent.prototype.ngOnInit = function () {
        this.renderChart();
    };
    DoughnutChartComponent.prototype.renderChart = function () {
        var chartComponent = this;
        var imageWidth = this.iconWidth ? this.iconWidth : 40;
        var imageHeight = this.iconHeight ? this.iconHeight : 40;
        var width = this.width ? this.width : 400;
        var height = this.height ? this.height : 400;
        var radius = 250;
        var piedata = this.data;
        this.outerRadius = this.outerRadius ? this.outerRadius : 150;
        this.innerRadius = this.innerRadius ? this.innerRadius : 70;
        this.spreadSlice = this.spreadSlice ? this.spreadSlice : false;
        var pie = d3.layout.pie()
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI * 2 + Math.PI / 2)
            .value(function (d) {
            return d.value;
        }).sort(null);
        var arc = d3.svg.arc()
            .outerRadius(this.outerRadius)
            .innerRadius(this.innerRadius);
        var arcNew = d3.svg.arc()
            .outerRadius(this.outerRadius + 10)
            .innerRadius(this.innerRadius);
        var svg = d3.select('#donutChart').append('svg')
            .attr('width', 330)
            .attr('height', 330)
            .append('g')
            .attr('transform', 'translate(' + (width - radius + 10) + ',' + (height - radius + 10) + ')');
        var g = svg.selectAll('.arc')
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
                }
                else {
                    d.data.expanded = false;
                    this.selectedId = null;
                    return arc(d);
                }
            });
            if (chartComponent.spreadSlice) {
                d3.select(this).transition()
                    .duration(50)
                    .attr('d', function (d) {
                    if (d.data.expanded) {
                        this.selectedId = null;
                        d.data.expanded = false;
                        return arc(d);
                    }
                    else {
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
                }
                else {
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
                    }
                    else {
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
                chartComponent.centerImageEvent.emit();
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoughnutChartComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoughnutChartComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoughnutChartComponent.prototype, "iconWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoughnutChartComponent.prototype, "iconHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoughnutChartComponent.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoughnutChartComponent.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DoughnutChartComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DoughnutChartComponent.prototype, "centerImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoughnutChartComponent.prototype, "spreadSlice", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DoughnutChartComponent.prototype, "centerImageEvent", void 0);
    DoughnutChartComponent = __decorate([
        core_1.Component({
            selector: 'angular-d3-donut',
            template: "\n    <div id=\"donutChart\">\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], DoughnutChartComponent);
    return DoughnutChartComponent;
}());
exports.DoughnutChartComponent = DoughnutChartComponent;
