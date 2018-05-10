import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { LineChartData } from '../../../models/LineChartData';
import { WindowChangesService } from '../../window-changes.service';

@Component({
  selector: 'af-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LineGraphComponent implements OnInit, OnChanges {
  @ViewChild('graph') graphContainer: ElementRef;
  @Input() private data: Array<LineChartData[]> = [];
  @Input() private colors: string[] = [];
  @Input() private labels: string[] = [];
  private margin: any = { top: 30, bottom: 30, left: 30, right: 50};
  private tooltipBias: any = {top: 15, left: 30};
  private animatedRectBias: any = {bias: 5, height: 10, width: 10};
  private pointsR = 5;
  private graphWidth: any;
  private graphHeight: any;
  private xScale: any;
  private yScale: any;
  private graph: any;
  private xAxis: any;
  private yAxis: any;
  private minValue: number;
  private maxValue: number;
  private maxDate: Date;
  private minDate: Date;
  private notFirstEnter = false;
  private ticsCounter = 8;


  constructor (private windowChanges: WindowChangesService) {
    // Подписка на событие изменения размер страницы
    windowChanges.width$.subscribe((value: any) => {
      if (value < 768) {
        this.ticsCounter = 4;
      } else {
        this.ticsCounter = 10;
      }
      if (this.notFirstEnter && this.isDataFull(this.data)
        && this.graphContainer.nativeElement.offsetWidth > 0) {

        this.updateGraph();
      }
    });
  }

  isDataFull(data) {
    const ans = data.filter(arr => arr.length !== 0);
    return ans.length !== 0;
  }

  ngOnInit() {
    this.notFirstEnter = true;
    if (this.isDataFull(this.data)) {
      this.createGraph();
    }
  }

  ngOnChanges() {
    // Измененеие данных
    if (this.isDataFull(this.data) && this.notFirstEnter) {
      this.updateGraph();
    }

    if (!this.isDataFull(this.data)) {
      this.clearGraph();
    }
  }

  clearGraph() {
    d3.selectAll('.d3-graph svg').remove();
  }

  createGraph() {
    // Функция отрисовки каждого графика на плоскости
    function drawGraphLines() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].length === 0) {
          continue;
        }
        // Отрисовка графика
        const line = d3.line<LineChartData>()
          .x((item) => this.xScale(item.date) + this.margin.left)
          .y((item) => this.yScale(item.value) + this.margin.top);

        const graph = svg.append('g');
        graph.append('path')
          .attr('class', 'line')
          .attr('d', line(this.data[i]))
          .style('stroke', this.colors[i]);

        const handleMouseOver = (data, index) => {
          graph.select('.point-line' + this.labels[i])
            .datum(data)
            .style('display', null)
            .attr('y1', this.graphHeight + this.margin.top)
            .attr('y2', (item: LineChartData) => this.yScale(item.value) + this.margin.top + this.pointsR)
            .attr('x1', (item: LineChartData) => this.xScale(item.date) + this.margin.left)
            .attr('x2', (item: LineChartData) => this.xScale(item.date) + this.margin.left);

          // Добавление текста
          svg.append('text')
            .attr('id', `text${data.date.getTime()}${Math.floor(data.value)}`)
            .attr('y', () => this.yScale(data.value) + this.margin.top - this.tooltipBias.top)
            .attr('x', () => this.xScale(data.date) + this.margin.left - this.tooltipBias.left)
            .text(data.value);
        };

        const handleMouseOut = (data, index) => {
          graph.select('.point-line' + this.labels[i])
            .datum(data)
            .style('display', 'none');

          // Удаление текста
          svg.select(`#text${data.date.getTime()}${Math.floor(data.value)}`).remove();
        };

        // Добавление точек на график
        graph.selectAll('.data-point')
          .data<LineChartData>(this.data[i])
          .enter()
          .append('circle')
          .style('stroke', this.colors[i])
          .style('fill', 'white')
          .attr('class', 'data-point')
          .attr('r', 0)
          .attr('cx', (item) => this.xScale(item.date) + this.margin.left)
          .attr('cy', (item) => this.yScale(item.value) + this.margin.top)
          .on('mouseover', handleMouseOver)
          .on('mouseout', handleMouseOut);

        // Добавление всплывающих пунктиров и текста
        graph.append('line')
          .style('stroke', this.colors[i])
          .style('display', 'none')
          .attr('class', 'point-line point-line' + this.labels[i]);
      }
    }

    // Функция добавления анимации
    function addAnimation() {
      // Добавление 'бесцветного' прямоугольника
      svg.append('rect')
        .attr('class', 'animation-rect')
        .attr('x', -1 * this.graphWidth - this.margin.left - this.animatedRectBias.bias)
        .attr('y', -1 * this.graphHeight - this.margin.top)
        .attr('height', this.graphHeight + this.animatedRectBias.height)
        .attr('width', this.graphWidth + this.animatedRectBias.width)
        .attr('transform', 'rotate(180)')
        .style('fill', 'white');

      const transition = svg.transition()
        .delay(250)
        .duration(1000);

      // Применение анимации
      transition.select('.animation-rect')
        .attr('width', 0);

      transition.selectAll('.data-point')
        .delay(700)
        .attr('r', 3.5);
    }

    // Функция отрисовки плоскоти и осей
    function drawPlane() {
      // Отрисовка оси X
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${this.margin.left}, ${this.graphHeight + this.margin.top})`)
        .call(this.xAxis);

      // Отрисовка оси Y
      svg.append('g')
        .attr('class', 'axis y-axis')
        .attr('transform', `translate(${this.graphWidth + this.margin.left}, ${this.margin.top})`)
        .call(this.yAxis);

      // Добавление горизонтальных линий
      svg.selectAll('.y-axis g.tick')
        .append('line')
        .classed('grid-line', true)
        .attr('x1', -this.graphWidth)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', 0);
    }


    // Функция для отображения массива данных через функцию func
    function minMaxFunc(func, displayFunc) {
      let ans = func(this.data[0], displayFunc);
      for (const graph of this.data) {
        ans = func([func(graph, displayFunc), ans]);
      }
      return ans;
    }

    const wrapper = this.graphContainer.nativeElement;

    // Длина оси X
    this.graphWidth = wrapper.offsetWidth - this.margin.left - this.margin.right;

    // Длина оси Y
    this.graphHeight = wrapper.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(wrapper)
      .append('svg')
      .attr('width', wrapper.offsetWidth)
      .attr('height', wrapper.offsetHeight);

    // Максимальное значение для оси Y
    this.maxValue = minMaxFunc.call(this, d3.max, item => item.value);
    // Минимальное значение для оси Y
    this.minValue = minMaxFunc.call(this, d3.min, item => item.value);

    // Максимальная дата на оси X
    this.maxDate = minMaxFunc.call(this, d3.max, item => item.date);
    // Минимальная дата на оси X
    this.minDate = minMaxFunc.call(this, d3.min, item => item.date);

    // Интерполяция значений на ось X
    this.xScale = d3.scaleTime().domain([this.minDate, this.maxDate]).range([0, this.graphWidth]);

    // Интерполяция значений на ось Y
    this.yScale = d3.scaleLinear().domain([this.maxValue, this.minValue]).range([0, this.graphHeight]);

    // Создаем ось X
    this.xAxis = d3.axisBottom(this.xScale).ticks(this.ticsCounter).tickFormat(d3.timeFormat('%e.%m'));

    // Создаем ось Y
    this.yAxis = d3.axisRight(this.yScale);

    // Рисуем каждый график на плоскости
    drawGraphLines.call(this);

    // Прикручиваем анимацию
    addAnimation.call(this);

    // Рисуем плоскость и оси
    drawPlane.call(this);

  }

  updateGraph() {
    d3.selectAll('.d3-graph svg').remove();
    this.createGraph();
  }

}
