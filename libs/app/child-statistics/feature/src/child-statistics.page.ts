import { Component, AfterViewInit, ElementRef  } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'word-wizard-child-statistics',
  templateUrl: './child-statistics.page.html',
  styleUrls: ['./child-statistics.page.scss'],
})
export class ChildStatisticsPage implements AfterViewInit{

  ngAfterViewInit(): void {
    // this.renderChart();
    this.rednerPieChart();
  }
  renderChart() {
    const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    const ctx = document.getElementById('bar-chart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
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
