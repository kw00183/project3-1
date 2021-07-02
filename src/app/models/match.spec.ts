import { Match } from './match';

describe('Match', () => {
  it('should create an instance', () => {
    let m = new Match('joe', 'sally', 5);
    expect(m).toBeTruthy();
    expect(m.player1).toEqual('joe');
    expect(m.player2).toEqual('sally');
    expect(m.hasWinner()).toBeFalsy();
  });
  
  it('should make player1 win', () => {
    let m = new Match('joe', 'sally', 5);
    expect(m).toBeTruthy();
    m.player1Wins();
    expect(m.hasWinner()).toBeTruthy();
    expect(m.getWinner()).toEqual('joe');
  });
  
  it('should make player12win', () => {
    let m = new Match('joe', 'sally', 5);
    expect(m).toBeTruthy();
    m.player2Wins();
    expect(m.hasWinner()).toBeTruthy();
    expect(m.getWinner()).toEqual('sally');
  });
});
