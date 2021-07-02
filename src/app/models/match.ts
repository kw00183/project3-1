export class Match {

  private winner: string = '';
    
  constructor(public player1: string, public player2: string, public id: number) { }
  
  hasWinner(): boolean {
    return (this.winner == this.player1)|| (this.winner == this.player2);
  }
  
  getWinner(): string {
    return this.winner;
  }
  
  player1Wins() {
    this.winner = this.player1;
  }
  
  player2Wins() {
    this.winner = this.player2;
  }
}
