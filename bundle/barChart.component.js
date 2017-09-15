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
var BarChartComponent = (function () {
    function BarChartComponent() {
    }
    BarChartComponent.prototype.ngOnInit = function () {
        this.renderChart();
    };
    BarChartComponent.prototype.renderChart = function () {
        var valueArray = [];
        var dataGroup = this.dataGroup ? this.dataGroup + 1 : 2;
        for (var i = 1; i < dataGroup; i++) {
            valueArray.push('value' + i);
        }
        var chartComponent = this;
        var width = this.width ? this.width : 700;
        var height = this.height ? this.height : 400;
        var transitionDuration = this.transitionDuration ? this.transitionDuration : 1000;
        var transitionDelay = this.transitionDelay ? this.transitionDelay : 100;
        var radius = 250;
        var data = this.data;
        var margin = {
            top: 20,
            right: 160,
            bottom: 35,
            left: 0
        };
        var fromLeft = 40;
        var color = this.color ? this.color : 'blue';
        var barWidth = this.barWidth ? this.barWidth : '11px';
        var yAxisd3Format = this.yAxisd3Format ? this.yAxisd3Format : '.1S';
        var svg = d3.select('#barChart')
            .append('svg')
            .attr('width', width + 100)
            .attr('height', height + margin.top + margin.bottom + 2)
            .append('g')
            .attr('transform', 'translate(' + (margin.left + fromLeft) + ',' + margin.top + ')');
        var dataset = d3.layout.stack()(valueArray.map(function (value) {
            return data.map(function (d) {
                return { x: d.label, y: d.value };
            });
        }));
        var x = d3.scale.ordinal()
            .domain(dataset[0].map(function (d) { return d.x; }))
            .rangeBands([0, width], 1);
        var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function (d) {
                return d3.max(d, function (d1) { return d1.y0 + d1.y; });
            })])
            .range([height, 0]);
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(10)
            .tickSize(-width, 0, 0)
            .tickFormat(d3.format(yAxisd3Format));
        var xAxis = d3.svg.axis()
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
        var groups = svg.selectAll('g.cost')
            .data(dataset)
            .enter().append('g')
            .attr('class', 'cost')
            .style('fill', function (d, i) { return color; });
        var rect = groups.selectAll('rect')
            .data(function (d) { return d; })
            .enter()
            .append('rect')
            .attr('x', function (d) { return x(d.x); })
            .attr('y', height - 1)
            .attr('height', 0)
            .attr('width', barWidth)
            .transition()
            .duration(transitionDuration)
            .delay(transitionDelay)
            .attr('y', function (d) { return y(d.y0 + d.y); })
            .attr('height', function (d) { return y(d.y0) - y(d.y0 + d.y); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BarChartComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BarChartComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BarChartComponent.prototype, "margin", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BarChartComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BarChartComponent.prototype, "transitionDuration", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BarChartComponent.prototype, "transitionDelay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BarChartComponent.prototype, "barWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BarChartComponent.prototype, "yAxisd3Format", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BarChartComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BarChartComponent.prototype, "dataGroup", void 0);
    BarChartComponent = __decorate([
        core_1.Component({
            selector: 'angular-d3-bar',
            template: "\n    <div id=\"barChart\">\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], BarChartComponent);
    return BarChartComponent;
}());
exports.BarChartComponent = BarChartComponent;
