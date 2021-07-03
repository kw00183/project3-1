import { AppPage } from './app.po';
import {Config, browser} from 'protractor';
import {element, by, By, $, $$, ExpectedConditions} from 'protractor';
import protractor = require('protractor');
import { HelperService } from '../../src/app/services/helper.service';

describe('Brackets App', () => {
  var page: AppPage;
  var helperService: HelperService;

  beforeEach(() => {
    page = new AppPage();
    helperService = new HelperService();
    helperService.loadBrowser();
  });

  it('should load the app to the hello page with h2 tag that contains text Brackets App', function() {
    expect(element(by.id('subpageTitle')).getText()).toEqual('Brackets App');
  });

  it('should navigate to the registration page', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
  });

  it('should navigate to the brackets page', function() {
    helperService.clickBracketsLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');
  });

  it('should navigate to the welcome page via the registration and the brackets page', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    helperService.clickBracketsLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');
    helperService.clickWelcomeLink();
    expect(element(by.id('subpageTitle')).getText()).toEqual('Brackets App');
  });

//success scenarios - number of contestants 2,4,8
  it('should choose winner from input of 2 unique contestants', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben');

    helperService.clickBracketsLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    //Round 1 :: match1 - Sally,Ben - winner Sally
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Sally');
    expect(player2.getAttribute('value')).toEqual('Ben');

    player1.click();

    helperService.clickCompleteRoundButton();
    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: Sally');
  });

  it('should choose winner from input of 4 unique contestants', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');
    var contestant3 = browser.findElement(by.id('contestant3'));
    contestant3.sendKeys('Dan');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan');

    helperService.clickBracketsLink();
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

    helperService.clickCompleteRoundButton();

    //Round2 :: match1 - Sally,Dan - winner Dan
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Sally');
    expect(player2.getAttribute('value')).toEqual('Dan');

    player2.click();

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: Dan');
  });

  it('should choose winner from input of 8 unique contestants', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan,Rick,Morty,Jerry,Beth');

    helperService.clickBracketsLink();
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

    helperService.clickCompleteRoundButton();

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

    helperService.clickCompleteRoundButton();

    //Round3 :: match2 - Kim,Beth - winner Kim
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Kim');
    expect(player2.getAttribute('value')).toEqual('Beth');

    player1.click();

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: Kim');
  });

  //success scenarios - autofills 2,4,8
  it('should choose winner from autofill input Zoe/Kaylee', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var auto2Button = element.all(by.css("button[type = 'button']")).get(0);
    auto2Button.click();

    var contestant0 = browser.findElement(by.id('contestant0'));
    expect(contestant0.getAttribute('value')).toEqual('Zoe');
    var contestant1 = browser.findElement(by.id('contestant1'));
    expect(contestant1.getAttribute('value')).toEqual('Kaylee');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Zoe,Kaylee');

    helperService.clickBracketsLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    //Round 1 :: match1 - Zoe,Kaylee - winner Zoe
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Zoe');
    expect(player2.getAttribute('value')).toEqual('Kaylee');

    player1.click();

    helperService.clickCompleteRoundButton();
    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: Zoe');
  });

  it('should choose winner from autofill input John/Paul/George/Ringo', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var auto4Button = element.all(by.css("button[type = 'button']")).get(1);
    auto4Button.click();

    var contestant0 = browser.findElement(by.id('contestant0'));
    expect(contestant0.getAttribute('value')).toEqual('John');
    var contestant1 = browser.findElement(by.id('contestant1'));
    expect(contestant1.getAttribute('value')).toEqual('Paul');
    var contestant2 = browser.findElement(by.id('contestant2'));
    expect(contestant2.getAttribute('value')).toEqual('George');
    var contestant3 = browser.findElement(by.id('contestant3'));
    expect(contestant3.getAttribute('value')).toEqual('Ringo');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('John,Paul,George,Ringo');

    helperService.clickBracketsLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    //Round1 :: match1 - John,Paul - winner John
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('John');
    expect(player2.getAttribute('value')).toEqual('Paul');

    player1.click();

    //Round 1 :: match2 - George,Ringo - winner Ringo
    var player1 = element.all(by.css("input[name=match2]")).get(0);
    var player2 = element.all(by.css("input[name=match2]")).get(1);
    expect(player1.getAttribute('value')).toEqual('George');
    expect(player2.getAttribute('value')).toEqual('Ringo');

    player2.click();

    helperService.clickCompleteRoundButton();

    //Round2 :: match1 - John,Ringo - winner John
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('John');
    expect(player2.getAttribute('value')).toEqual('Ringo');

    player1.click();

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: John');
  });

  it('should choose winner from autofill input Leia/Luke/Lando/Han/Chewy/R2D2/C3P0/Vader', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var auto8Button = element.all(by.css("button[type = 'button']")).get(2);
    auto8Button.click();

    var contestant0 = browser.findElement(by.id('contestant0'));
    expect(contestant0.getAttribute('value')).toEqual('Leia');
    var contestant1 = browser.findElement(by.id('contestant1'));
    expect(contestant1.getAttribute('value')).toEqual('Luke');
    var contestant2 = browser.findElement(by.id('contestant2'));
    expect(contestant2.getAttribute('value')).toEqual('Lando');
    var contestant3 = browser.findElement(by.id('contestant3'));
    expect(contestant3.getAttribute('value')).toEqual('Han');
    var contestant4 = browser.findElement(by.id('contestant4'));
    expect(contestant4.getAttribute('value')).toEqual('Chewy');
    var contestant5 = browser.findElement(by.id('contestant5'));
    expect(contestant5.getAttribute('value')).toEqual('R2D2');
    var contestant6 = browser.findElement(by.id('contestant6'));
    expect(contestant6.getAttribute('value')).toEqual('C3P0');
    var contestant7 = browser.findElement(by.id('contestant7'));
    expect(contestant7.getAttribute('value')).toEqual('Vader');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Leia,Luke,Lando,Han,Chewy,R2D2,C3P0,Vader');

    helperService.clickBracketsLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    //Round1 :: match1 - Leia,Luke - winner Leia
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Leia');
    expect(player2.getAttribute('value')).toEqual('Luke');

    player1.click();

    //Round1 :: match2 - Lando,Han - winner Han
    var player1 = element.all(by.css("input[name=match2]")).get(0);
    var player2 = element.all(by.css("input[name=match2]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Lando');
    expect(player2.getAttribute('value')).toEqual('Han');

    player2.click();

    //Round1 :: match3 - Chewy,R2D2 - winner Chewy
    var player1 = element.all(by.css("input[name=match3]")).get(0);
    var player2 = element.all(by.css("input[name=match3]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Chewy');
    expect(player2.getAttribute('value')).toEqual('R2D2');

    player1.click();

    //Round1 :: match4 - C3P0,Vader - winner Vader
    var player1 = element.all(by.css("input[name=match4]")).get(0);
    var player2 = element.all(by.css("input[name=match4]")).get(1);
    expect(player1.getAttribute('value')).toEqual('C3P0');
    expect(player2.getAttribute('value')).toEqual('Vader');

    player2.click();

    helperService.clickCompleteRoundButton();

    //Round2 :: match1 - Leia,Han - winner Han
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Leia');
    expect(player2.getAttribute('value')).toEqual('Han');

    player2.click();

    //Round2 :: match2 - Chewy,Vader - winner Chewy
    var player1 = element.all(by.css("input[name=match2]")).get(0);
    var player2 = element.all(by.css("input[name=match2]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Chewy');
    expect(player2.getAttribute('value')).toEqual('Vader');

    player1.click();

    helperService.clickCompleteRoundButton();

    //Round3 :: match2 - Han,Chewy - winner Chewy
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Han');
    expect(player2.getAttribute('value')).toEqual('Chewy');

    player2.click();

    helperService.clickCompleteRoundButton();

    //Let the Wookie Win!
    expect(element.all(by.tagName('h4')).getText()).toContain('Winner: Chewy');
  });

  //odd entries allowed
  it('should navigate to the registration page, input 2 identical contestants different case, reflect 2 names', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('salLy');
    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,salLy');
  });

  it('should navigate to the registration page, input 2 identical contestants extra space on 1, reflect 2 names', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys(' Sally');
    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally, Sally');
  });

  it('should navigate to the registration page, input 2 unique contestants only spaces, reflect 2 ghost names', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys(' ');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('  ');
    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain(',');
  });

  //error scenarios - registration errors
  it('should navigate to the registration page, input 0 contestant, trigger error message', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 1 contestant, trigger error message', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 3 unique contestants, trigger error message', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 5 unique contestants, trigger error message', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 6 unique contestants, trigger error message', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 7 unique contestants, trigger error message', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).getText()).toContain('Should be 2, 4, or 8 contestants');
  });

  it('should navigate to the registration page, input 2 identical contestants same case, trigger error message', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');
    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('sally');
    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).getText()).toContain('Duplicate player');
  });

  //error scenarios - brackets errors
  it('should throw error if no winner selected (round1-match1) on "Complete Round"', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben');

    helperService.clickBracketsLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Brackets');

    //Round 1 :: match1 - Sally,Ben - winner Sally
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Sally');
    expect(player2.getAttribute('value')).toEqual('Ben');

    helperService.clickCompleteRoundButton();
    expect(element.all(by.tagName('h4')).getText()).toContain('Please complete all matches');
  });

  it('should throw error if no winner selected (round1-match2) on "Complete Round"', function() {
    helperService.clickRegistrationLink();
    expect(element(by.tagName('h2')).getText()).toEqual('Register Players');

    var contestant0 = browser.findElement(by.id('contestant0'));
    contestant0.sendKeys('Sally');
    var contestant1 = browser.findElement(by.id('contestant1'));
    contestant1.sendKeys('Ben');
    var contestant2 = browser.findElement(by.id('contestant2'));
    contestant2.sendKeys('Kim');
    var contestant3 = browser.findElement(by.id('contestant3'));
    contestant3.sendKeys('Dan');

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan');

    helperService.clickBracketsLink();
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

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Please complete all matches');
  });

  it('should throw error if no winner selected (round1-match3) on "Complete Round"', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan,Rick,Morty,Jerry,Beth');

    helperService.clickBracketsLink();
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

    //Round1 :: match4 - Jerry,Beth - winner Beth
    var player1 = element.all(by.css("input[name=match4]")).get(0);
    var player2 = element.all(by.css("input[name=match4]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Jerry');
    expect(player2.getAttribute('value')).toEqual('Beth');

    player2.click();

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Please complete all matches');
  });

  it('should throw error if no winner selected (round1-match4) on "Complete Round"', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan,Rick,Morty,Jerry,Beth');

    helperService.clickBracketsLink();
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

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Please complete all matches');
  });

  it('should throw error if no winner selected (round2-match1) on "Complete Round"', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan,Rick,Morty,Jerry,Beth');

    helperService.clickBracketsLink();
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

    helperService.clickCompleteRoundButton();

    //Round2 :: match1 - Ben,Kim - winner Kim
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Ben');
    expect(player2.getAttribute('value')).toEqual('Kim');

    //Round2 :: match2 - Morty,Beth - winner Beth
    var player1 = element.all(by.css("input[name=match2]")).get(0);
    var player2 = element.all(by.css("input[name=match2]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Morty');
    expect(player2.getAttribute('value')).toEqual('Beth');

    player2.click();

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Please complete all matches');
  });

  it('should throw error if no winner selected (round2-match2) on "Complete Round"', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan,Rick,Morty,Jerry,Beth');

    helperService.clickBracketsLink();
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

    helperService.clickCompleteRoundButton();

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

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Please complete all matches');
  });

  it('should throw error if no winner selected (round3-match1) on "Complete Round"', function() {
    helperService.clickRegistrationLink();
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

    helperService.clickRegisterButton();
    expect(element.all(by.tagName('div')).get(2).getText()).toContain('Sally,Ben,Kim,Dan,Rick,Morty,Jerry,Beth');

    helperService.clickBracketsLink();
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

    helperService.clickCompleteRoundButton();

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

    helperService.clickCompleteRoundButton();

    //Round3 :: match2 - Kim,Beth - winner Kim
    var player1 = element.all(by.css("input[name=match1]")).get(0);
    var player2 = element.all(by.css("input[name=match1]")).get(1);
    expect(player1.getAttribute('value')).toEqual('Kim');
    expect(player2.getAttribute('value')).toEqual('Beth');

    helperService.clickCompleteRoundButton();

    expect(element.all(by.tagName('h4')).getText()).toContain('Please complete all matches');
  });
});
