import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LineChartData } from '../../models/LineChartData';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../constants/baseUrl.const';

@Injectable()
export class StatisticPageService {

  constructor(private http: HttpClient) { }

  getLineGraphData(type: string, id: number) {
    return this.http.get(`${BASE_URL}/api/statistic/get/lineGraph/${type}`, {
      params: new HttpParams().append('id', id.toString())
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

  generateFormObject(labels: string[]) {
    const ans: {[k: string]: any} = {};
    ans.firstDate = [new Date(2017, 0o1, 1)];
    ans.lastDate = [new Date()];
    for (const label of labels) {
      ans[label] = [true];
    }
    return ans;
  }

  getLineGraphLabels(type: string) {
    if (type === 'product') {
      return ['volume of sales'];
    }
    if (type === 'all' || type === 'shop') {
      return [
        'income',
        'expenses',
        'profit'
      ];
    }
    return [];
  }

  getLineGraphColors(type: string) {
    if (type === 'product') {
      return ['brown'];
    }
    if (type === 'all') {
      return [
        'purple',
        'olive',
        'teal'
      ];
    }
    return [
      'blue',
      'orange',
      'green'
    ];
  }

  getLineData(graph: Array<LineChartData[]>, colors: string[], labels: string[]) {
    const ans = [];
    for (let i = 0; i < graph.length; i++) {
      ans.push({color: colors[i],
        label: labels[i],
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
