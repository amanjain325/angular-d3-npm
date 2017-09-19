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
var PieChartComponent = (function () {
    function PieChartComponent() {
    }
    PieChartComponent.prototype.ngOnInit = function () {
        this.renderChart();
    };
    PieChartComponent.prototype.renderChart = function () {
        var chartComponent = this;
        var imageWidth = this.iconWidth ? this.iconWidth : 40;
        var imageHeight = this.iconHeight ? this.iconHeight : 40;
        var width = this.width ? this.width : 400;
        var height = this.height ? this.height : 400;
        var radius = 250;
        var piedata = this.data;
        this.outerRadius = this.outerRadius ? this.outerRadius : 150;
        var chartID = this.chartID ? this.chartID : 'pieChart';
        var pie = d3.layout.pie()
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI * 2 + Math.PI / 2)
            .value(function (d) {
            return d.value;
        }).sort(null);
        var arc = d3.svg.arc()
            .outerRadius(this.outerRadius);
        var arcNew = d3.svg.arc()
            .outerRadius(this.outerRadius + 10);
        var svg = d3.select('#' + chartID).append('svg')
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
            return [d.data.color];
        })
            .attr('id', function (d) {
            return 'iconId' + d.data.event;
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
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PieChartComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PieChartComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PieChartComponent.prototype, "iconWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PieChartComponent.prototype, "iconHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PieChartComponent.prototype, "spreadSlice", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PieChartComponent.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PieChartComponent.prototype, "chartID", void 0);
    PieChartComponent = __decorate([
        core_1.Component({
            selector: 'angular-d3-pie',
            template: "\n    <div id=\"pieChart\">\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], PieChartComponent);
    return PieChartComponent;
}());
exports.PieChartComponent = PieChartComponent;
