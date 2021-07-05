import { Injectable } from "@angular/core";
import { Config, browser } from 'protractor';
import { element, by, By, $, $$, ExpectedConditions } from 'protractor';

@Injectable()
export class HelperService {
  constructor() {
    browser.get('/');
  }

  clickRegistrationLink(): void {
    var registrationLink = browser.findElement(by.partialLinkText('Registration'));
    registrationLink.click();
  }

  clickBracketsLink(): void {
    var bracketsLink = browser.findElement(by.partialLinkText('Brackets'));
    bracketsLink.click();
  }

  clickWelcomeLink(): void {
    var welcomeLink = browser.findElement(by.partialLinkText('Welcome'));
    welcomeLink.click();
  }

  clickRegisterButton(): void {
    var registerButton = element(by.css("button[type = 'submit']"));
    registerButton.click();
  }

  clickCompleteRoundButton(): void {
    var completeButton = element(by.css("button[type = 'button']"));
    completeButton.click();
  }

  clickAutofill2Button(): void {
    var auto2Button = element.all(by.css("button[type = 'button']")).get(0);
    auto2Button.click();
  }

  clickAutofill4Button(): void {
    var auto4Button = element.all(by.css("button[type = 'button']")).get(1);
    auto4Button.click();
  }

  clickAutofill8Button(): void {
    var auto8Button = element.all(by.css("button[type = 'button']")).get(2);
    auto8Button.click();
  }

  assign2Contestants(): void {
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
  }

  assign4Contestants(): void {
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');
    var contestant3 = browser.findElement(by.id('contestant3'));
    contestant3.sendKeys('Dan');
  }

  assign8Contestants(): void {
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
  }

  getPlayer1(matchNumber: number) {
    return element.all(by.css("input[name=match" + matchNumber + "]")).get(0);
  }

  getPlayer2(matchNumber: number) {
    return element.all(by.css("input[name=match" + matchNumber + "]")).get(1);
  }
}
