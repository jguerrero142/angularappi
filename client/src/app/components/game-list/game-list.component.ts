import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  games: any = [];

  constructor(
      private gamesService: GamesService, private route: Router, public auth: AuthService) { }
      
  ngOnInit(): void {
    this.getGames();
  }
  getGames(){
    this.gamesService.getGames().subscribe(
      res=> {
        this.games = res;
      },
      err=> console.error(err) 
    )
  }
  // editGame(id: string){
  //   console.log(id);
  // }
  deleteGame(id: string){
    this.gamesService.deleteGame(id).subscribe(
      res => {
        console.log(res);
        this.getGames();
      },
      err => console.log(err)
    )
  }
}
