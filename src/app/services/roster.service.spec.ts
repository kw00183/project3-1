import { TestBed, inject } from '@angular/core/testing';

import { RosterService } from './roster.service';

describe('RosterService', () => {
  var rosterService: RosterService;
  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RosterService]
  }));
  
  beforeEach(inject([RosterService], (service: RosterService) => {
    rosterService = service;
  }));
  
  it('should have no contestants when first created', () => {
    expect(rosterService.getContestants().length).toEqual(0);
  });
  
  it('should add one contestant', () => {
    rosterService.addContestant("Sally");
    let results = rosterService.getContestants();
    expect(results.length).toEqual(1);
    expect(results[0]).toEqual("Sally");
  });
  
  it('should add several contestants', () => {
    rosterService.addContestant("Sally");
    rosterService.addContestant("Joe");
    rosterService.addContestant("Cindy");
    let results = rosterService.getContestants();
    expect(results.length).toEqual(3);
    expect(results[0]).toEqual("Sally");
    expect(results[1]).toEqual("Joe");
    expect(results[2]).toEqual("Cindy");
  });
  
  it('should not allow empty string names', () => {
    expect(() => rosterService.addContestant(''))
      .toThrowError();
  });
  
  it('should not allow null names', () => {
    expect(() => rosterService.addContestant(null))
      .toThrowError();
  });
  
  it('should not allow duplicate names', () => {
    rosterService.addContestant('Sally');
    expect(() => rosterService.addContestant('Sally'))
      .toThrowError();
  });
  
  
});
