import { Injectable } from '@angular/core';
import { BaseRequestOptions,
         RequestOptionsArgs,
         RequestOptions } from '@angular/http';

@Injectable()
//https://blog.alex-miller.co/angular/2017/05/13/default-headers-in-angular.html
export class DefaultRequestOptionsService extends BaseRequestOptions {
  constructor() {
    super();
    this.headers.set('Content-Type', 'application/vnd.api+json');
    this.headers.set('Accept', 'application/json');
  }
  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    //newOptions.headers.set('Authorization',
    //                       `Beaer ${localStorage.getItem('app-token')}`);
    return newOptions;
  }
}