import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LineChartData } from '../../models/LineChartData';

@Injectable()
export class StatisticPageService {

  constructor(private http: Http) { }

  getLineGraphData() {
    return this.http.get('http://localhost:8080/api/statistic/lineGraph')
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw('Сервер недоступен');
      })
      .map(res => {
        return res.map(oneGraph => {
          return oneGraph.map(data => {
            const newData = {
              date: new Date(JSON.parse(data.date)),
              value: data.value
            };
            return newData;
          });
        });
      });
  }

  generateFormObject() {
    const ans: {[k: string]: any} = {};
    ans.firstDate = [new Date(2017, 0o1, 1)];
    ans.lastDate = [new Date()];
    for (const label of this.getLineGraphLabels()) {
      ans[label] = [true];
    }
    return ans;
  }

  getLineGraphLabels() {
    return [
      'income',
      'expenses',
      'profit'
    ];
  }

  getLineGraphColors() {
    return [
      'blue',
      'orange',
      'green'
    ];
  }

  getLineData(graph: Array<LineChartData[]>) {
    const ans = [];
    for (let i = 0; i < graph.length; i++) {
      ans.push({color: this.getLineGraphColors()[i],
        label: this.getLineGraphLabels()[i],
        sum: this.countFilteredSum(graph[i])});
    }
    return ans;
  }

  filterGraph(graph: Array<LineChartData[]>, insidePredict: any, outsidePredict: any) {
    const ans = [];
    for (let i = 0; i < graph.length; i++) {
      if (outsidePredict(i)) {
        const toPush = graph[i].filter(data => insidePredict(data.date));
        ans.push(toPush);
      } else {
        ans.push([]);
      }
    }
    return ans;
  }

  filterLabel(labels: string[], outsidePredict: any) {
    const ans = [];
    for (let i = 0; i < labels.length; i++) {
      if (outsidePredict(i)) {
        ans.push(labels[i]);
      } else {
        ans.push('');
      }
    }
    return ans;
  }

  filterColors(colors: string[], outsidePredict: any) {
    const ans = [];
    for (let i = 0; i < colors.length; i++) {
      if (outsidePredict(i)) {
        ans.push(colors[i]);
      } else {
        ans.push('');
      }
    }
    return ans;
  }

  countFilteredSum(line: LineChartData[]) {
    const ans = line.reduce((total, {value}) => total += value, 0);
    return ans;
  }
}
