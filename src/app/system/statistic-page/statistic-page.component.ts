import { Component, Input, OnInit, Output } from '@angular/core';
import { LineChartData } from '../../models/LineChartData';
import { StatisticPageService } from './statistic-page.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'af-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.less'],
  providers: [StatisticPageService]
})
export class StatisticPageComponent implements OnInit {
  private lineGraphData: Array<LineChartData[]> = [];
  private filteredData: Array<LineChartData[]> = [];
  private filteredColors: string[] = [];
  private filteredLabels: string[] = [];
  private lineData: {color: string, label: string, sum: number}[];

  statisticForm: FormGroup;

  private lineGraphColors: string[] = [];

  private lineGraphLabels: string[] = [];

  constructor(private staticService: StatisticPageService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.lineGraphLabels = this.staticService.getLineGraphLabels();
    this.filteredLabels = this.staticService.getLineGraphLabels();

    this.lineGraphColors = this.staticService.getLineGraphColors();
    this.filteredColors = this.staticService.getLineGraphColors();

    this.staticService.getLineGraphData().subscribe(
      lineGraphData => {
        this.lineGraphData = lineGraphData;
        this.filteredData = lineGraphData;
        this.lineData = this.staticService.getLineData(this.filteredData);
      },
      error => console.log(error)
    );

    this.statisticForm = this.formBuilder.group(
      // Для удобного добавления дополнительных графиков на плоскость
      this.staticService.generateFormObject()
    );
  }

  onFilterButton() {
    const graphsToFilter = [];
    function checkGraph(numb: number, toAdd: boolean) {
      if (toAdd) {
        graphsToFilter.push(numb);
      }
    }
    let firstDate;
    if (this.statisticForm.value.firstDate === null) {
      firstDate = new Date(2017, 0o1, 1);
    } else {
      firstDate = this.statisticForm.value.firstDate;
    }

    let lastDate;
    if (this.statisticForm.value.lastDate === null) {
      lastDate = new Date();
    } else {
      lastDate = this.statisticForm.value.lastDate;
    }

    for (let i = 0; i < this.lineGraphLabels.length; i++) {
      checkGraph(i, this.statisticForm.value[this.lineGraphLabels[i]]);
    }

    const filterOutside = (index) => graphsToFilter.indexOf(index) !== -1;
    const filterInside = (date: Date) => date >= firstDate && date <= lastDate;
    this.filteredData = this.staticService.filterGraph(this.lineGraphData, filterInside, filterOutside);
    this.filteredLabels = this.staticService.filterLabel(this.lineGraphLabels, filterOutside);
    this.filteredColors = this.staticService.filterColors(this.lineGraphColors, filterOutside);
    this.lineData = this.staticService.getLineData(this.filteredData);
  }
}
