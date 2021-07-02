import { Component, OnInit } from '@angular/core';
import { RosterService } from '../../services/roster.service';
import { Match } from '../../models/match';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit {

  public seeds: Match[] = [];
  private champion: string;
  public roundId: number = 1;
  public message: string;
  
  constructor(private rosterService: RosterService) {}
  
  private seedBracket(players: string[]) {
    let matchId = 1;
    for (var i=0; i < players.length; i+=2) {
      let p1 = players[i];
      let p2 = players[i+1];
      let m = new Match(p1, p2, matchId);
      matchId++;
      this.seeds.push(m);
    }
  }


  private hasIncompleteMatches(): boolean {
    for (let m of this.seeds) {
      if (!m.hasWinner()) {
        return true;
      }
    }
    return false;
  }
  
  public completeRound() {
    this.message = undefined;
    if (this.hasIncompleteMatches()) {
      this.message = 'Please complete all matches';
      return;
    } 
    let nextRoundsPlayers: string[] = [];
    this.seeds.forEach((m) => {
      nextRoundsPlayers.push(m.getWinner());
    });
    this.clearSeeds();
    if (nextRoundsPlayers.length == 1) {
      this.champion = nextRoundsPlayers[0];
      return;
    }
    this.seedBracket(nextRoundsPlayers);
    this.roundId++;
  }
  
  getChampion(): string {
    return this.champion;
  }
  
  ngOnInit() {
    this.seedBracket(this.rosterService.getContestants());
  }

  private clearSeeds() {
    this.seeds.length = 0;
  }
}
