import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketsComponent } from './brackets.component';
import { RosterService } from '../../services/roster.service';
import { Match } from '../../models/match';

describe('BracketsComponent', () => {
  let component: BracketsComponent;
  let fixture: ComponentFixture<BracketsComponent>;
  let service: RosterService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BracketsComponent ],
      providers: [ RosterService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketsComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RosterService);
    fixture.detectChanges();
  });

  describe('Initial seeding tests', () => {
    it('should seed 2 contestants', () => {
      service.addContestant('player1');
      service.addContestant('player2');
      expect(component.seeds).toEqual([]);
      component.ngOnInit();
      expect(component.seeds).toEqual([new Match('player1', 'player2', 1)]);
    });
    
    it('should seed 4 contestants', () => {
      service.addContestant('player1');
      service.addContestant('player2');
      service.addContestant('player3');
      service.addContestant('player4');
      expect(component.seeds).toEqual([]);
      component.ngOnInit();
      expect(component.seeds).toEqual([new Match('player1', 'player2', 1),
                                       new Match('player3', 'player4', 2)]);
    });
    
    it('should seed 8 contestants', () => {
      service.addContestant('player1');
      service.addContestant('player2');
      service.addContestant('player3');
      service.addContestant('player4');
      service.addContestant('player5');
      service.addContestant('player6');
      service.addContestant('player7');
      service.addContestant('player8');
      expect(component.seeds).toEqual([]);
      component.ngOnInit();
      expect(component.seeds).toEqual([new Match('player1', 'player2', 1),
                                       new Match('player3', 'player4', 2),
                                       new Match('player5', 'player6', 3),
                                       new Match('player7', 'player8', 4)]);
    });
  });
  
  describe('completing a single round', () => {
    
    it('should complete a round with 2 players and player 1 wins', () => {
      expect(component.roundId).toEqual(1);
      service.addContestant('player1');
      service.addContestant('player2');
      component.ngOnInit();
      component.seeds[0].player1Wins();
      component.completeRound();
      expect(component.seeds).toEqual([]);
      expect(component.getChampion()).toEqual('player1');
      expect(component.roundId).toEqual(1);
    });
    
    it('should complete a round with 2 players and player 2 wins', () => {
      service.addContestant('player1');
      service.addContestant('player2');
      component.ngOnInit();
      component.seeds[0].player2Wins();
      component.completeRound();
      expect(component.seeds).toEqual([]);
      expect(component.getChampion()).toEqual('player2');
    });
    
    it('should complete 2 rounds with 4 players', () => {
      service.addContestant('player1');
      service.addContestant('player2');
      service.addContestant('player3');
      service.addContestant('player4');
      component.ngOnInit();
      component.seeds[0].player1Wins(); // player 1
      component.seeds[1].player2Wins(); // player 4
      component.completeRound();
      expect(component.roundId).toEqual(2);
      component.seeds[0].player2Wins(); // player 4
      component.completeRound();
      expect(component.seeds).toEqual([]);
      expect(component.getChampion()).toEqual('player4');
    });
    
    it('should complete 3 rounds with 8 players', () => {
      service.addContestant('player1');
      service.addContestant('player2');
      service.addContestant('player3');
      service.addContestant('player4');
      service.addContestant('player5');
      service.addContestant('player6');
      service.addContestant('player7');
      service.addContestant('player8');
      component.ngOnInit();
      
      component.seeds[0].player1Wins(); // player 1
      component.seeds[1].player2Wins(); // player 4
      component.seeds[2].player1Wins(); // player 5
      component.seeds[3].player2Wins(); // player 8
      component.completeRound();
      expect(component.roundId).toEqual(2);
      
      component.seeds[0].player2Wins(); // player 4
      component.seeds[1].player1Wins(); // player 5
      component.completeRound();
      expect(component.roundId).toEqual(3);
      
      component.seeds[0].player2Wins(); // player 5
      component.completeRound();
      
      expect(component.seeds).toEqual([]);
      expect(component.getChampion()).toEqual('player5');
    });
  });
});
