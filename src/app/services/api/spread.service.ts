import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, 
         Headers, 
         RequestOptions, 
         Response,
         URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import { BaseService } from './base.service';
import { ENVIRONMENT_CONFIG, 
         __ } from '../../modules/primary/misc/tokens';         
import { SpreadAddRequest } from './request/spread/spread_add.request';
import { SpreadEditRequest } from './request/spread/spread_edit.request';
import { SpreadAddResponse } from './response/spread/spread_add.response';
import { SpreadEditResponse } from './response/spread/spread_edit.response';
import { SpreadFetchResponse } from './response/spread/spread_fetch.response';
import { SpreadListResponse } from './response/spread/spread_list.response';
import { Spread } from '../../domain/model/spread';


@Injectable()
export class SpreadService extends BaseService {

    constructor(@Inject(ENVIRONMENT_CONFIG) protected environmentConfig,
                @Inject(__) protected __,
                private http: Http) {
        super();        
    }

    list(): Observable<SpreadListResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + '/spreadresource';

        let params: URLSearchParams = new URLSearchParams();

        let headers = new Headers({ 'Content-Type': 'application/json',        
            'Accept': 'application/json' });

        return this.http.get(url, {
            search: params,
            headers: headers,
            body: ''
        })
        .map((response: Response) => {           
            let json = response.json();
            let list = [];
            for (let value of json) {
                let spread = new Spread(value.id, value.name);
                list.push(spread);
            }            
            return new SpreadListResponse(list);
        });
    }

    fetch(id : number): Observable<SpreadFetchResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + '/spreadresource/' + id;

        let params: URLSearchParams = new URLSearchParams();

        let headers = new Headers({ 'Content-Type': 'application/json',
            'Accept': 'application/json' });

        return this.http.get(url, {
            search: params,
            headers: headers,
            body: ''
        })
        .map((response: Response) => {            
            let json = response.json();                
            let spreadReturned = new Spread(
                json.id,
                json.name
            );
            return new SpreadFetchResponse(spreadReturned);
        });
    }

    add(spreadModel: Spread): Observable<SpreadAddResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + '/spreadresource';
        let self = this;
        
        let request: SpreadAddRequest = new SpreadAddRequest(spreadModel.name);
        
        let body = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(url, body, options)
            .map((response: Response) => {
                let json = response.json();                
                let spreadReturned = new Spread(
                    json.id,
                    json.name
                );
                return new SpreadAddResponse(spreadReturned, true);
            })
            .do((data) => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    edit(spreadModel: Spread) : Observable<SpreadEditResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + '/spreadresource/' + spreadModel.id;
        let self = this;

        let request: SpreadEditRequest = new SpreadEditRequest(spreadModel.id,
            spreadModel.name);
        
        let body = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.put(url, body, options)
            .map((response: Response) => {
                let json = response.json();                
                let spreadReturned = new Spread(
                    json.id,
                    json.name
                );
                return new SpreadEditResponse(spreadReturned);
            })
            .do((data) => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    delete(id : number) : Observable<boolean> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + '/spreadresource/' + id;

        let self = this;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, body: '' });

        return Observable.create(observer => {
            self.http.delete(url, options)
                .map((response: Response) => {                   
                    if (response.status == 204) {
                        observer.next(true);
                    }
                })
                .subscribe();               
        })
        .catch(this.handleError);
    }
}