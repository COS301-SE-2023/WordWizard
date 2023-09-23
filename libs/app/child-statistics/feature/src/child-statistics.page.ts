import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChildStatisticsService } from '@word-wizard/app/child-statistics/data-access';
import {
  Statistics,
  levelStats,
} from '@word-wizard/app/child-statistics/data-access';
import { ChildState, Child } from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'word-wizard-child-statistics',
  templateUrl: './child-statistics.page.html',
  styleUrls: ['./child-statistics.page.scss'],
})
export class ChildStatisticsPage implements AfterViewInit {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;
  chart!: Chart;

  helpText: string[] = ["Here you can see your child's progress over time.","The graph shows the score of each lesson your child has completed."];
  audioSources: string[] = ['assets/mp3/stats1.mp3', 'assets/mp3/stats2.mp3'];

  constructor(
    private readonly childStatisticsService: ChildStatisticsService,
    private store: Store,
  ) {}

  childStats!: Statistics;
  averageScore!: number;
  lessonCount!: number;
  incorrectCount!: number;
  wordsLearned!: number;
  chartData!: levelStats[];
  highestScore!: number;

  ngAfterViewInit(): void {
    this.currentChild$.subscribe((data) => {
      this.childStatisticsService.getStats(data._id).subscribe((res) => {
        if (res.progress_history.length !== 0) {
          this.childStats = res;
          this.averageScore = res.average_score;
          this.incorrectCount = res.incorrect_words_by_level;
          this.lessonCount = res.progress_history.length;
          this.wordsLearned = res.total_words;
          this.chartData = res.progress_history;
          this.highestScore = res.highest_score;
        } else {
          this.childStats = res;
          this.averageScore = 0;
          this.incorrectCount = 0;
          this.lessonCount = res.progress_history.length;
          this.wordsLearned = 0;
          this.chartData = res.progress_history;
          this.highestScore = 0;
        }
        this.renderChart();
      });
    });
  }
  renderChart() {
    const ctx: CanvasRenderingContext2D =
      this.chartCanvas.nativeElement.getContext('2d');
    // const canvas: HTMLCanvasElement = document.getElementById('bar-chart') as HTMLCanvasElement;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    const labels: string[] = [];
    const dataset: number[] = [];
    for (let i = 0; i < this.chartData.length; i++) {
      labels.push('');
      dataset.push(this.chartData[i].score);
    }

    if (this.chartData.length > 0) {
      labels[0] = this.chartData[0].date;
      labels[this.chartData.length - 1] =
        this.chartData[this.chartData.length - 1].date;
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Lesson Progress',
          data: dataset,
          borderColor: 'rgb(134, 20, 134)',
          borderWidth: 3,
        },
      ],
    };
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // height: 50,
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });
  }
}
