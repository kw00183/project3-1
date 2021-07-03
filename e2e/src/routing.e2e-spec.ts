import { AppPage } from './app.po';
import {Config, browser} from 'protractor';
import {element, by, By, $, $$, ExpectedConditions} from 'protractor';
import protractor = require('protractor');

describe('Brackets App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load the app to the hello page with h2 tag that contains text Brackets App', function() {
    browser.get('/');
    expect(element(by.id('subpageTitle')).getText()).toEqual('Brackets App');
  });

  it('should navigate to the registration page', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
  });

  it('should navigate to the brackets page', function() {
    browser.get('/');
    var bracketsLink = browser.findElement(by.partialLinkText('Brackets'));
    bracketsLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');
  });

  it('should navigate to the welcome page via the registration and the brackets page', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var bracketsLink = browser.findElement(by.partialLinkText('Brackets'));
    bracketsLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');
    var welcomeLink = browser.findElement(by.partialLinkText('Welcome'));
    welcomeLink.click();
    expect(element(by.id('subpageTitle')).getText()).toEqual('Brackets App');
  });

//success scenarios - number of contestants 2,4,8
  it('should navigate to the registration page, input 2 unique contestants, reflect 2 names', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben');

    var bracketsLink = browser.findElement(by.partialLinkText('Brackets'));
    bracketsLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    //Round 1 :: match1 - Sally,Ben - winner Sally
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Sally');
    expect(player2.getAttribute('value')).toEqual('Ben');

    player1.click();

    var completeButton = element(by.css("button[type = 'button']"));
    completeButton.click();
    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: Sally');
  });

  it('should navigate to the registration page, input 4 unique contestants, reflect 4 names', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');
    var contestant3 = browser.findElement(by.id('contestant3'));
    contestant3.sendKeys('Dan');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan');

    var bracketsLink = browser.findElement(by.partialLinkText('Brackets'));
    bracketsLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    //Round1 :: match1 - Sally,Ben - winner Sally
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Sally');
    expect(player2.getAttribute('value')).toEqual('Ben');

    player1.click();

    //Round 1 :: match2 - Kim,Dan - winner Dan
    var player1 = element.all(by.css("input[name=match2]")).get(0);
    var player2 = element.all(by.css("input[name=match2]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Kim');
    expect(player2.getAttribute('value')).toEqual('Dan');

    player2.click();

    var completeButton = element(by.css("button[type = 'button']"));
    completeButton.click();

    //Round2 :: match1 - Sally,Dan - winner Dan
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Sally');
    expect(player2.getAttribute('value')).toEqual('Dan');

    player2.click();

    var completeButton = element(by.css("button[type = 'button']"));
    completeButton.click();

    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: Dan');
  });

  it('should navigate to the registration page, input 8 unique contestants, reflect 8 names', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');
    var contestant3 = browser.findElement(by.id('contestant3'));
    contestant3.sendKeys('Dan');
    var contestant4 = browser.findElement(by.id('contestant4'));
    contestant4.sendKeys('Rick');
    var contestant5 = browser.findElement(by.id('contestant5'));
    contestant5.sendKeys('Morty');
    var contestant6 = browser.findElement(by.id('contestant6'));
    contestant6.sendKeys('Jerry');
    var contestant7 = browser.findElement(by.id('contestant7'));
    contestant7.sendKeys('Beth');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan,Rick,Morty,Jerry,Beth');

    var bracketsLink = browser.findElement(by.partialLinkText('Brackets'));
    bracketsLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    //Round1 :: match1 - Sally,Ben - winner Ben
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Sally');
    expect(player2.getAttribute('value')).toEqual('Ben');

    player2.click();

    //Round1 :: match2 - Kim,Dan - winner Kim
    var player1 = element.all(by.css("input[name=match2]")).get(0);
    var player2 = element.all(by.css("input[name=match2]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Kim');
    expect(player2.getAttribute('value')).toEqual('Dan');

    player1.click();

    //Round1 :: match3 - Rick,Morty - winner Morty
    var player1 = element.all(by.css("input[name=match3]")).get(0);
    var player2 = element.all(by.css("input[name=match3]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Rick');
    expect(player2.getAttribute('value')).toEqual('Morty');

    player2.click();

    //Round1 :: match4 - Jerry,Beth - winner Beth
    var player1 = element.all(by.css("input[name=match4]")).get(0);
    var player2 = element.all(by.css("input[name=match4]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Jerry');
    expect(player2.getAttribute('value')).toEqual('Beth');

    player2.click();

    var completeButton = element(by.css("button[type = 'button']"));
    completeButton.click();

    //Round2 :: match1 - Ben,Kim - winner Kim
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Ben');
    expect(player2.getAttribute('value')).toEqual('Kim');

    player2.click();

    //Round2 :: match2 - Morty,Beth - winner Beth
    var player1 = element.all(by.css("input[name=match2]")).get(0);
    var player2 = element.all(by.css("input[name=match2]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Morty');
    expect(player2.getAttribute('value')).toEqual('Beth');

    player2.click();

    var completeButton = element(by.css("button[type = 'button']"));
    completeButton.click();

    //Round3 :: match2 - Kim,Beth - winner Kim
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Kim');
    expect(player2.getAttribute('value')).toEqual('Beth');

    player1.click();

    var completeButton = element(by.css("button[type = 'button']"));
    completeButton.click();

    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: Kim');
  });

  //odd entries allowed
  it('should navigate to the registration page, input 2 identical contestants different case, reflect 2 names', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('salLy');
    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,salLy');
  });

  it('should navigate to the registration page, input 2 identical contestants extra space on 1, reflect 2 names', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys(' Sally');
    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally, Sally');
  });

  it('should navigate to the registration page, input 2 unique contestants only spaces, reflect 2 ghost names', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys(' ');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('  ');
    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain(',');
  });

  //error scenarios - bad number of contestants
  it('should navigate to the registration page, input 0 contestant, trigger error message', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 1 contestant, trigger error message', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 3 unique contestants, trigger error message', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 5 unique contestants, trigger error message', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');
    var contestant3 = browser.findElement(by.id('contestant3'));
    contestant3.sendKeys('Dan');
    var contestant4 = browser.findElement(by.id('contestant4'));
    contestant4.sendKeys('Rick');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 6 unique contestants, trigger error message', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');
    var contestant3 = browser.findElement(by.id('contestant3'));
    contestant3.sendKeys('Dan');
    var contestant4 = browser.findElement(by.id('contestant4'));
    contestant4.sendKeys('Rick');
    var contestant5 = browser.findElement(by.id('contestant5'));
    contestant5.sendKeys('Morty');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 7 unique contestants, trigger error message', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');
    var contestant3 = browser.findElement(by.id('contestant3'));
    contestant3.sendKeys('Dan');
    var contestant4 = browser.findElement(by.id('contestant4'));
    contestant4.sendKeys('Rick');
    var contestant5 = browser.findElement(by.id('contestant5'));
    contestant5.sendKeys('Morty');
    var contestant6 = browser.findElement(by.id('contestant6'));
    contestant6.sendKeys('Jerry');

    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 2 identical contestants same case, trigger error message', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('sally');
    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).getText()).toContain('Duplicate player');
  });
});
