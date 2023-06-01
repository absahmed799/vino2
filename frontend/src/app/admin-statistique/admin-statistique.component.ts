import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-statistique',
  templateUrl: './admin-statistique.component.html',
  styleUrls: ['./admin-statistique.component.scss']
})
export class AdminStatistiqueComponent implements OnInit {
  chart: Chart | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.retrieveUsersWithCellarInfo();
    this.retrieveUsersWithBouteilleInfo();
  }

  retrieveUsersWithCellarInfo() {
    this.http.get<any>('http://127.0.0.1:8000/api/statistique/cellier').subscribe(users => {
      this.updateChartCellier(users);
      console.log(users);
      
    });
    
  }
  retrieveUsersWithBouteilleInfo() {
    this.http.get<any>('http://127.0.0.1:8000/api/statistique/bouteille').subscribe(users => {
     
      console.log(users);
       this.updateChartBouteille(users);
    });
  }

  updateChartCellier(users: any[]) {
    const chartData: ChartData = {
      labels: users.map(user => user.nom),
      datasets: [
        {
          label: 'Number of Celliers',
          data: users.map(user => user.celliers_count),
          backgroundColor: '#0196FD',
          borderColor: '#0196FD',
          borderWidth: 1
        },
      
      ]
    };

    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    if (this.chart) {
      this.chart.data = chartData;
      this.chart.update();
    } else {
      this.chart = new Chart('myChart', chartConfig);
    }
  }

  updateChartBouteille(users: any[]) {
    const chartData: ChartData = {
      labels: users.map(user => user.nom),
      datasets: [
        {
          label: 'Number of Celliers',
          data: users.map(user => user.celliers_count),
          backgroundColor: '#0196FD',
          borderColor: '#0196FD',
          borderWidth: 1
        },
      
      ]
    };

    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    if (this.chart) {
      this.chart.data = chartData;
      this.chart.update();
    } else {
      this.chart = new Chart('myChart1', chartConfig);
    }
  }
}