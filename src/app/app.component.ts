import { Component, OnInit, HostListener, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import * as moment from 'moment';

import { AuthService } from './security/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  private _mobileQueryList: MediaQueryList;
  private _mobileQueryListener: () => void;
  private _showButtonScrollTop = false;

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher
  ) {
    this._mobileQueryList = this.mediaMatcher.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this._mobileQueryList.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    moment.locale('pt-br');
  }

  ngOnDestroy(): void {
    this._mobileQueryList.removeEventListener('change', this._mobileQueryListener);
  }

  get mobileQueryList(): MediaQueryList {
    return this._mobileQueryList;
  }

  get showButtonScrollTop(): boolean {
    return this._showButtonScrollTop;
  }

  hasValidTokens(): boolean {
    return this.authService.isValidAccessToken();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this._showButtonScrollTop = window.scrollY > 100;
  }
}
