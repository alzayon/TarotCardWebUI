import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

export abstract class BaseService {

    protected environmentConfig;
    
    getBaseUrl() {
        return this.environmentConfig.apiBaseUrl;
    }

    protected handleError(error: Response): Observable<any> {
        return Observable.throw(error.json().message || 'Server error');
    }
}