import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from '@env/environment';

export const applicationName = environment.applicationName;

@Injectable()
export class TitleService {

  constructor(private title: Title) {
    this.title.setTitle(applicationName);
  }

  getTitle(): string {
    return this.title.getTitle();
  }

  setTitle(newTitle: string, suffixAppName: boolean = true): void {
    if (suffixAppName) {
      this.title.setTitle(`${newTitle} :: ${applicationName}`);
      return;
    }

    this.title.setTitle(newTitle);
  }
}
