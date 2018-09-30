import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Http,
         Headers,
         RequestOptions,
         Response,
         URLSearchParams } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/filter";

import { BaseService } from "./base.service";
import { ENVIRONMENT_CONFIG,
         __ } from "../../modules/primary/misc/tokens";
import { CategoryAddRequest } from "./request/category/category_add.request";
import { CategoryEditRequest } from "./request/category/category_edit.request";
import { CategoryAddResponse } from "./response/category/category_add.response";
import { CategoryEditResponse } from "./response/category/category_edit.response";
import { CategoryFetchResponse } from "./response/category/category_fetch.response";
import { CategoryListResponse } from "./response/category/category_list.response";
import { Category } from "../../domain/model/category";


@Injectable()
export class CategoryService extends BaseService {

    constructor(@Inject(ENVIRONMENT_CONFIG) protected environmentConfig,
                @Inject(__) protected __,
                private http: Http) {
        super();
    }

    list(): Observable<CategoryListResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/categoryresource";

        let params: URLSearchParams = new URLSearchParams();

        let headers = new Headers({ "Content-Type": "application/json",
            "Accept": "application/json" });

        return this.http.get(url, {
            search: params,
            headers: headers,
            body: ""
        })
        .map((response: Response) => {
            let json = response.json();
            let list = [];
            for (let value of json) {
                let category = new Category(value.id, value.name);
                list.push(category);
            }
            return new CategoryListResponse(list);
        });
    }

    fetch(id: number): Observable<CategoryFetchResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/categoryresource/" + id;

        let params: URLSearchParams = new URLSearchParams();

        let headers = new Headers({ "Content-Type": "application/json",
            "Accept": "application/json" });

        return this.http.get(url, {
            search: params,
            headers: headers,
            body: ""
        })
        .map((response: Response) => {
            let json = response.json();
            let categoryReturned = new Category(
                json.id,
                json.name
            );
            return new CategoryFetchResponse(categoryReturned);
        });
    }

    add(categoryModel: Category): Observable<CategoryAddResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/categoryresource";

        let request: CategoryAddRequest = new CategoryAddRequest(categoryModel.name);

        let body = JSON.stringify(request);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .map((response: Response) => {
                let json = response.json();
                let categoryReturned = new Category(
                    json.id,
                    json.name
                );
                return new CategoryAddResponse(categoryReturned, true);
            })
            .do((data) => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    edit(categoryModel: Category): Observable<CategoryEditResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/categoryresource/" + categoryModel.id;

        const self = this;

        let request: CategoryEditRequest = new CategoryEditRequest(categoryModel.id,
            categoryModel.name);

        let body = JSON.stringify(request);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
            .map((response: Response) => {
                let json = response.json();
                let categoryReturned = new Category(
                    json.id,
                    json.name
                );
                return new CategoryEditResponse(categoryReturned);
            })
            .do((data) => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    delete(id: number): Observable<boolean> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/categoryresource/" + id;

        const self = this;

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers, body: "" });

        return Observable.create(observer => {
            self.http.delete(url, options)
                .map((response: Response) => {
                    if (response.status === 204) {
                        observer.next(true);
                    }
                })
                .subscribe();
        })
        .catch(this.handleError);
    }
}