import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  
  private url = 'assets/users.json';
  private _subscription:Subscription;
  chartOption:Object = {};

  constructor(
    private http: HttpClient) {
  }

  ngOnInit() {
    this.getData();
  }
  getUserData(): Observable<any> {
    return this.http.get(this.url);
   }
  getData(){
    this._subscription = this.getUserData().subscribe(response => {
      let series,yearList = [];
      let result = this.getSeries_and_YearList(response.data);
      series = result.series;
      yearList = result.yearList;
      const total = yearList.reduce((a, b)=>a + b);
      const max = yearList.reduce((a, b)=>Math.max(a, b)); 
      const min = yearList.reduce((a, b)=>Math.min(a, b)); 
      const average = (total / yearList.length);
      this.chartOption = this.getChartOptions(series,min,average,max);
    });
  }
  
  getSeries_and_YearList(response){
    let yearList =[];
    let series =[];
    response.forEach((element,index) => {
      if(new Date(element.dob).getFullYear()){
        yearList.push(new Date(element.dob).getFullYear());
        series.push([index+1,new Date(element.dob).getFullYear(),element.name]);
      }
    });
    return { yearList,series }
  }
  getChartOptions(series,min,average,max){
    return {
      xAxis: this.getChartXaxis(series),
      yAxis: this.getChartYaxis(min),
      series: [this.getChartSeriesData(series,min,average,max)]
  }
  }
  getChartXaxis(series){
    return {
      splitLine: { show: false},
      axisLabel: {
        formatter: (function(value){
          const filtredValue = series.filter(item=>item[0] === value);
          if(filtredValue[0])return filtredValue[0][2];
          return "";
        })
      }
    }
  };
  getChartYaxis(min){
    return {
      label:{
        show:true
      },
      min:min - 10,
      splitLine: {
        show: true
      }
    }
  };
  getChartSeriesData(series,min,average,max){
    return {
      tooltip:{show:true},
      symbolSize: 20,
      data: series,
      type: 'scatter',
      markLine: {
          label:{show:true},
          data: [
            {name: 'Minimum', yAxis: min},
            {name: 'Average', yAxis: average},
            {name: 'Maximum', yAxis: max}
          ],
      }
    }
  };
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
