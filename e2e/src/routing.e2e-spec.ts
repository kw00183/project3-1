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
    expect(element.all(by.tagName('div')).getText()).toContain('Sally,Ben');

    var bracketsLink = browser.findElement(by.partialLinkText('Brackets'));
    bracketsLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Sally');
    expect(player2.getAttribute('value')).toEqual('Ben');


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
    expect(element.all(by.tagName('div')).getText()).toContain('Sally,Ben,Kim,Dan');
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
    expect(element.all(by.tagName('div')).getText()).toContain('Sally,Ben,Kim,Dan,Rick,Morty,Jerry,Beth');
  });

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
    expect(element.all(by.tagName('div')).getText()).toContain('Sally,salLy');
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
    expect(element.all(by.tagName('div')).getText()).toContain('Sally, Sally');
  });

  //error scenarios - bad number of contestants
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
