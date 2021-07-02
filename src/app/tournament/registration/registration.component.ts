import { Component, OnInit } from '@angular/core';
import { RosterService } from '../../services/roster.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public players: string[] = ['', '', '', '', '', '', '', ''];
  public message: string;

  constructor(private rosterService: RosterService) { }

  ngOnInit() {
  }

  registerContestants() {
    let normalized = this.normalizeContestants();
    if (![2, 4, 8].includes(normalized.length)) {
      this.message = 'Should be 2, 4, or 8 contestants';
      return;
    }
    try {
      this.rosterService.clear();
      normalized.forEach((player) => {
        this.rosterService.addContestant(player);
        this.message = this.rosterService.getContestants().toString();
      });
    } catch(err) {
      this.rosterService.clear();
      this.message = err.message;
    }
  }
  
  autofillEightPlayers() {
    this.players = [
      'Leia', 'Luke', 'Lando', 'Han',
      'Chewy', 'R2D2', 'C3P0', 'Vader' 
    ];
  }
  
  autofillFourPlayers() {
    this.players = [
      'John', 'Paul', 'George', 'Ringo', '', '', '', ''
    ];
  }
  
  autofillTwoPlayers() {
    this.players = [ 'Zoe', 'Kaylee', '', '', '', '', '', '' ];
  }
  
  private normalizeContestants(): string[] {
    return this.players.filter((p) => p.length > 0);
  }
  
  trackByFn(index: any, item: any) {
    return index;
  }
}
