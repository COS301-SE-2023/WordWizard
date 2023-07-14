import { Component, AfterViewInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChildStatisticsService } from '@word-wizard/app/child-statistics/data-access';
import { Statistics, levelStats } from '@word-wizard/app/child-statistics/data-access';
import { 
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'word-wizard-child-statistics',
  templateUrl: './child-statistics.page.html',
  styleUrls: ['./child-statistics.page.scss'],
})
export class ChildStatisticsPage implements AfterViewInit{

  @Select(ChildState.currentChild) currentChild$!: Observable<Child>; 

  constructor(private readonly childStatisticsService: ChildStatisticsService, private store: Store) {
    
  }

  childStats!: Statistics;
  averageScore!: number;
  lessonCount!: number;
  incorrectCount!: number;
  wordsLearned!: number;
  chartData! : levelStats[];
  highestScore!: number;




  ngAfterViewInit(): void {
    
    this.currentChild$.subscribe((data) => {
      this.childStatisticsService.getStats("64aea0695102acb3adb889ad").subscribe((res) => {
        this.childStats = res;
        this.averageScore = res.average_score;
        this.incorrectCount = res.incorrect_words_by_level;
        this.lessonCount = res.progress_history.length;
        this.wordsLearned = res.total_words;
        this.chartData = res.progress_history;
        this.highestScore = res.highest_score;
        console.table(this.chartData);
        this.renderChart();
      });
    });

  }
  renderChart() {
    const labels: string[] = [];
    const dataset: number[] = [];

    console.log(this.chartData);
    for (let i = 0; i < this.chartData.length; i++) {
      labels.push("");
      dataset.push(this.chartData[i].score);

    }

    labels[0] = this.chartData[0].date;
    labels[this.chartData.length-1] = this.chartData[this.chartData.length-1].date;



    const data = {
      labels: labels,
      datasets: [{
        label: 'Lesson Progress',
        data: dataset,
        borderColor: 'rgb(134, 20, 134)',
        borderWidth: 3
      }]
    };
    const ctx = document.getElementById('bar-chart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true
          }
        }
      },
    });
  }

  rednerPieChart() {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0)',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const ctx = document.getElementById('pie-chart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: data,
    });
  }
}
