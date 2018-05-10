import {Component, Input, OnInit, Output} from '@angular/core';
import { LineChartData } from '../../models/LineChartData';
import { StatisticPageService } from './statistic-page.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

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
  private cardData: {color: string, label: string, sum: number}[];
  private typeOfGraph: string;
  private graphId = 0;
  private filterButtonEnable = true;

  statisticForm: FormGroup;

  private lineGraphColors: string[] = [];

  private lineGraphLabels: string[] = [];

  constructor(private staticService: StatisticPageService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.params.subscribe((params: Params) => {
      this.typeOfGraph = params['type'];
      this.refreshPage();
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.graphId = parseInt(params.id, 10);
      }
      this.refreshPage();
    });

    this.refreshPage();

    this.statisticForm.valueChanges
      .subscribe(() => {

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

        let count = 0;

        for (let i = 0; i < this.lineGraphLabels.length; i++) {
          count += this.statisticForm.value[this.lineGraphLabels[i]];
        }

        if (firstDate >= lastDate || count === 0) {
          this.filterButtonEnable = false;
        } else {
          this.filterButtonEnable = true;
        }
      });
  }

  refreshPage() {
    this.lineGraphLabels = this.staticService.getLineGraphLabels(this.typeOfGraph);
    this.filteredLabels = this.staticService.getLineGraphLabels(this.typeOfGraph);

    this.lineGraphColors = this.staticService.getLineGraphColors(this.typeOfGraph);
    this.filteredColors = this.staticService.getLineGraphColors(this.typeOfGraph);

    this.staticService.getLineGraphData(this.typeOfGraph, this.graphId).subscribe(
      lineGraphData => {
        this.lineGraphData = lineGraphData;
        this.filteredData = lineGraphData;
        this.lineData = this.staticService.getLineData(this.filteredData, this.lineGraphColors, this.lineGraphLabels);
        this.cardData = this.staticService.getLineData(this.filteredData, this.lineGraphColors, this.lineGraphLabels);
      },
      error => console.log(error)
    );

    this.statisticForm = this.formBuilder.group(
      // Для удобного добавления дополнительных графиков на плоскость
      this.staticService.generateFormObject(this.lineGraphLabels)
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
    this.lineData = this.staticService.getLineData(this.filteredData, this.lineGraphColors, this.lineGraphLabels);
    this.cardData = this.filterCards(this.lineData);
  }

  styleOfCards() {
    if (this.cardData && this.cardData.length === 3) {
      return 'space-between';
    } else {
      return 'space-around';
    }
  }

  filterCards(data: any) {
    const ans = [];
    for (const obj of data) {
      if (obj.sum !== 0) {
        ans.push(obj);
      }
    }

    return ans;
  }
}
