import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  private contestants: string[] = [];
  
  constructor() {

  }
  
  getContestants(): string[] {
    return this.contestants;
  }
  
  addContestant(player: string) {
    if (!player) {
      throw new Error('Player does not exist');
    }
    
    if (this.hasPlayer(player)) {
      throw new Error('Duplicate player');
    }
    
    this.contestants.push(player);
  }
  
  clear() {
    this.contestants = [];
  }
  
  private hasPlayer(player: string): boolean {
    return this.contestants.includes(player);
  }
}
