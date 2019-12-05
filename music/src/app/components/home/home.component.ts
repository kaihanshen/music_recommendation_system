import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  chart = [];
  firstN = 'asfss';
  currentUser: any;
  users = [];
  searchName = '';
  musicInfo = {id:-1, title:'s', desc:'s',year:0};

    constructor(
        private loginService: LoginService,
        private userService: UserService,
        private api: ApiService
    ) {
      this.currentUser = this.loginService.currentUserValue;
      this.firstN = this.loginService.nameValue;
    }

    onKey(value: string) {
      this.searchName = value ;
    }

    ngOnInit() {
      this.firstN = this.loginService.nameValue;
      console.log(this.firstN);
        
    }
    close = () => {
      this.musicInfo.id = -1;
    }

    findMusic = (searchName) => {
      this.api.searchMusic(searchName).subscribe(
        data => {
          this.musicInfo = data[0];
          console.log(data[0]);
          if (!data[0]) this.musicInfo = {id:0, title:'Not found', desc:'Not found',year:0};
        },
        error => {
          console.log(error)
        }
      );
    }


  //   private loadAllUsers() {
  //     this.userService.getAll()
  //         .pipe(first())
  //         .subscribe(users => this.users = users);
  // }

}
