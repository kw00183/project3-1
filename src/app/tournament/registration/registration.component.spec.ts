import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { RosterService } from '../../services/roster.service';
import { FormsModule } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let service: RosterService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RegistrationComponent ],
      providers: [ RosterService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RosterService);
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });

  it('should set error message if no contestants', () => {
    component.registerContestants();
    expect(component.message).toBe('Should be 2, 4, or 8 contestants');
    expect(service.getContestants()).toEqual([]);
  });
  
  
  it('should set error message if only one contestant', () => {
    component.players = ['player1'];
    component.registerContestants();
    expect(component.message).toBe('Should be 2, 4, or 8 contestants');
    expect(service.getContestants()).toEqual([]);
  });
  
  it('should set error message if 7 contestants', () => {
    component.players = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7'];
    component.registerContestants();
    expect(component.message).toBe('Should be 2, 4, or 8 contestants');
    expect(service.getContestants()).toEqual([]);
  });
  
  
  it('should register 2 contestants', () => {
    component.players = ['player1', 'player2'];
    component.registerContestants();
    expect(service.getContestants()).toEqual(['player1', 'player2']);
  });
  
  it('should register 2 contestants, with blanks in-between', () => {
    component.players = ['player1', '', '', 'player2'];
    component.registerContestants();
    expect(service.getContestants()).toEqual(['player1', 'player2']);
  });
  
  it('should not register 2 identical contestants', () => {
    component.players = ['player1', 'player1'];
    component.registerContestants();
    expect(service.getContestants()).toEqual([]);
    expect(component.message).toBe('Duplicate player');
  });
  
  it('should register 4 contestants', () => {
    component.players = ['player1', 'player2', 'player3', 'player4'];
    component.registerContestants();
    expect(service.getContestants()).toEqual(['player1', 'player2', 'player3', 'player4']);
  });
  
  it('should register 8 contestants', () => {
    component.players = ['player1', 'player2', 'player3', 'player4',
                         'player5', 'player6', 'player7', 'player8'];
    component.registerContestants();
    expect(service.getContestants()).toEqual(['player1', 'player2', 'player3', 'player4',
                                              'player5', 'player6', 'player7', 'player8']);
  });
});
