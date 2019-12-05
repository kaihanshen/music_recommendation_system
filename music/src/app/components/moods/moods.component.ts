import { Component, OnInit } from '@angular/core';
import { MoodsService } from 'src/app/services/moods.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.css']
})
export class MoodsComponent implements OnInit {
  chart = [];
  moodData = [];
  username = '';
  flag = false;
  flag2 = false;
  checkInfo = {id:-1, username:'', party:0, romance:0, focus:0, throwback:0, fitness:0, sleep:0, chill:0, blue:0, frustrated:0, depressed:0};
  constructor(private moodsService: MoodsService) { }


  ngOnInit() {
    
    
  }

  onKey(value: string) {
    this.username = value ;
    this.checkInfo.username = this.username;
  }

  close = () => {
    this.flag = false;
  }

  draw = () => {
    if (this.flag2){
      this.chart = new Chart('canvas', {
        type: 'radar',
  data: {
      labels: ['Party', 'Romance', 'Focus', 'Throwback', 'Fitness', 'Sleep', 'Chill', 'Blue', 'Frustrated', 'Depressed'],
      datasets: [{
          label: '# of Days',
          data: this.moodData,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
    scale: {
      angleLines: {
          display: false
      },
      ticks: {
          suggestedMin: 5,
          suggestedMax: 15
      }
  }
  }})
    }
  }

  fetch = () => {
    this.flag2 = true;
    this.moodsService.getMoods(this.username).subscribe(
      data => {
        if (data[0]){
          this.moodData = [data[0].p,data[0].r,data[0].fo,data[0].t,data[0].fi,data[0].s,data[0].c,data[0].b,data[0].fr,data[0].d,]
          this.draw();
          // console.log(data[0]);
        }
        else
        this.moodData = [0,0,0,0,0,0,0,0,0,0];
        this.draw();
      },
      error => {
        console.log(error)
      }
    ); 
  }

  checkCheckBoxvalue1(event){
    if (this.checkInfo.party==0){
      this.checkInfo.party = 1;
    }
    else{
      this.checkInfo.party = 0;
    }
  }

  checkCheckBoxvalue2(event){
    if (this.checkInfo.romance==0){
      this.checkInfo.romance = 1;
    }
    else{
      this.checkInfo.romance = 0;
    }
  }
  checkCheckBoxvalue3(event){
    if (this.checkInfo.focus==0){
      this.checkInfo.focus = 1;
    }
    else{
      this.checkInfo.focus = 0;
    }
  }
  checkCheckBoxvalue4(event){
    if (this.checkInfo.throwback==0){
      this.checkInfo.throwback = 1;
    }
    else{
      this.checkInfo.throwback = 0;
    }
  }
  checkCheckBoxvalue5(event){
    if (this.checkInfo.fitness==0){
      this.checkInfo.fitness = 1;
    }
    else{
      this.checkInfo.fitness = 0;
    }
  }
  checkCheckBoxvalue6(event){
    if (this.checkInfo.sleep==0){
      this.checkInfo.sleep = 1;
    }
    else{
      this.checkInfo.sleep = 0;
    }
  }
  checkCheckBoxvalue7(event){
    if (this.checkInfo.chill==0){
      this.checkInfo.chill = 1;
    }
    else{
      this.checkInfo.chill = 0;
    }
  }
  checkCheckBoxvalue8(event){
    if (this.checkInfo.blue==0){
      this.checkInfo.blue = 1;
    }
    else{
      this.checkInfo.blue = 0;
    }
  }
  checkCheckBoxvalue9(event){
    if (this.checkInfo.frustrated==0){
      this.checkInfo.frustrated = 1;
    }
    else{
      this.checkInfo.frustrated = 0;
    }
  }
  checkCheckBoxvalue10(event){
    if (this.checkInfo.depressed==0){
      this.checkInfo.depressed = 1;
      console.log(this.checkInfo.username);
    }
    else{
      this.checkInfo.depressed = 0;
      console.log('asdfafdadfa')
    }
  }

  record = () => {
    this.moodsService.createMoods(this.checkInfo).subscribe(
      data => {
        this.flag = true;
      },
      error => {
        console.log(error)
      }
    );
  }
}
