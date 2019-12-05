import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  username = '';
  friends = [];
  selectedUsername = '';
  music = [];
  singers = [];
  flag = false;
  flag2 = true;

  constructor(private friendsService: FriendsService) { }

  ngOnInit() {
    // this.getFriends();
  }


  onKey(value: string) {
    this.username = value ;
  }

  close = () => {
    this.selectedUsername = '';
  }

  fetch = () => {
    this.flag = true;
    this.friendsService.getOneFriend(this.username).subscribe(
      data => {
        // console.log(data[0])
        if (data[0])
        this.friends = data[0].friends_list;
        else
        this.friends = []
      },
      error => {
        console.log(error)
      }
    );
  }

  getFriends = () => {
    this.friendsService.getAllFriends().subscribe(
      data => {
        this.friends = data;
        // console.log(data);
      },
      error => {
        console.log(error)
      }
    );
  }


  friendClicked = (friend) => {
    this.friendsService.getOneFriend(friend).subscribe(
      data => {
        this.music = data[0].favourite_music;
        this.singers = data[0].favourite_singers;
        this.selectedUsername = data[0].username;
        // console.log(this.username);
      },
      error => {
        console.log(error)
      }
    );
  }
}
