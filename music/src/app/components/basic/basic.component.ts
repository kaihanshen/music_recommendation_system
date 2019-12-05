import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
  providers: [ApiService]
})
export class BasicComponent implements OnInit {
  musics = [{title: 'test'}];
  selectedMusic= {id:-1, title:'s', desc:'s',year:0};
  detailedInfo = {song:'', artist:'', year:0, country:'', awards:''};
  title;
  desc;
  year;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getMusic();
    this.selectedMusic = {id:-1, title:'', desc:'',year:0}
  }
  close = () => {
    this.detailedInfo.year = 0;
  }

  getMusic = () => {
    this.api.getAllMusic().subscribe(
      data => {
        this.musics = data;
      },
      error => {
        console.log(error)
      }
    );
  }

  musicClicked = (music) => {
    this.api.getOneMusic(music.id).subscribe(
      data => {
        // console.log(data[0])
        this.selectedMusic = data[0];
      },
      error => {
        console.log(error)
      }
    );
  }

  updateMusic = () => {
    this.api.updateMusic(this.selectedMusic).subscribe(
      data => {
        this.getMusic();
      },
      error => {
        console.log(error)
      }
    );
  }

  createMusic = () => {
    this.api.createMusic(this.selectedMusic).subscribe(
      data => {
        this.musics.push(data);
        this.getMusic();
      },
      error => {
        console.log(error)
      }
    );
  }

  deleteMusic = () => {
    this.api.deleteMusic(this.selectedMusic.id).subscribe(
      data => {
        this.getMusic();
      },
      error => {
        console.log(error)
      }
    );
  }

  getSinger = () => {
    this.api.getSinger(this.selectedMusic.id).subscribe(
      data => {
        if (data[0])
        this.detailedInfo = {song:data[0].songName, artist:data[0].singerName, year:data[0].birthYear, country:data[0].country, awards:data[0].awards}
        else
        this.detailedInfo.year = 0;
      },
      error => {
        console.log(error)
      }
    );
  }

}
