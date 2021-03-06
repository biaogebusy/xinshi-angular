import { Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppState } from './AppState';
@Injectable()
export class BrandingState {
  @observable private content: any;
  private _READDY = true;
  constructor(private http: HttpClient, private appState: AppState) {
    this.initBranding();
  }

  @computed get ready(): any {
    return this._READDY && this.content;
  }

  @computed get header(): any {
    return this.content && this.content.header;
  }

  @computed get footer(): any {
    return this.content && this.content.footer;
  }

  @action
  initBranding(): any {
    if (environment.production) {
      this.http
        .get(`${environment.apiUrl}/api/v1/config?content=/core/branding`)
        .subscribe((branding) => {
          this.content = branding;
        });
    } else {
      this.http
        .get(`${environment.apiUrl}/assets/app/core/branding.json`)
        .subscribe((branding) => {
          this.content = branding;
        });
    }
  }
}
