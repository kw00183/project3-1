import {Injectable} from "@angular/core";

@Injectable()
export class HelperService {
  constructor() {}

  loadBrowser(): void {
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
}
