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

//success scenarios
  it('should navigate to the registration page and input 2 contestants', function() {
    browser.get('/');
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Sally');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Ben');
    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
    expect(element.all(by.tagName('div')).getText()).toContain('Sally,Ben');
  });
});
