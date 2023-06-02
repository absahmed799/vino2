import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-admin-statistique',
  templateUrl: './admin-statistique.component.html',
  styleUrls: ['./admin-statistique.component.scss']
})
export class AdminStatistiqueComponent implements OnInit {
  chart1: Chart | null = null;
  chart2: Chart | null = null;

  constructor(private http: HttpClient, private authService:AuthService) { 
    this.authService.setLoading(true);
  }

  ngOnInit() {
    this.retrieveUsersWithCellarInfo();
    this.retrieveUsersWithBouteilleInfo();
  }

  retrieveUsersWithCellarInfo() {
    this.http.get<any>('http://127.0.0.1:8000/api/statistique/cellier').subscribe(users => {
      this.updateChartCellier(users);
      
    });
  }
  
  retrieveUsersWithBouteilleInfo() {
    this.http.get<any>('http://127.0.0.1:8000/api/statistique/bouteille').subscribe(users => {
      console.log(users);
      this.updateChartBouteille(users);
      this.authService.setLoading(false);
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
        }
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

    if (this.chart1) {
      this.chart1.data = chartData;
      this.chart1.update();
    } else {
      this.chart1 = new Chart('myChart1', chartConfig);
    }
  }

  updateChartBouteille(users: any[]) {
    const chartData: ChartData = {
      labels: users.map(user => user.nom),
      datasets: [
        {
          label: 'Number of Bouteilles',
          data: users.map(user => user.total_quantity
            ),
          backgroundColor: '#0196FD',
          borderColor: '#0196FD',
          borderWidth: 1
        }
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

    if (this.chart2) {
      this.chart2.data = chartData;
      this.chart2.update();
    } else {
      this.chart2 = new Chart('myChart2', chartConfig);
    }
  }
}
