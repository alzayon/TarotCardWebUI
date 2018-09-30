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
import { CardAddRequest } from "./request/card/card_add.request";
import { CardEditRequest } from "./request/card/card_edit.request";
import { CardAddResponse } from "./response/card/card_add.response";
import { CardEditResponse } from "./response/card/card_edit.response";
import { CardFetchResponse } from "./response/card/card_fetch.response";
import { CardListResponse } from "./response/card/card_list.response";
import { Card } from "../../domain/model/card";


@Injectable()
export class CardService extends BaseService {

    constructor(@Inject(ENVIRONMENT_CONFIG) protected environmentConfig,
                @Inject(__) protected __,
                private http: Http) {
        super();
    }

    list(): Observable<CardListResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/cardresource";

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
                let card = new Card(value.id, value.name, value.type);
                list.push(card);
            }
            return new CardListResponse(list);
        });
    }

    fetch(id: number): Observable<CardFetchResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/cardresource/" + id;

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
            let cardReturned = new Card(
                json.id,
                json.name,
                json.type // https://stackoverflow.com/questions/42299257/cast-int-to-enum-strings-in-typescript
            );
            return new CardFetchResponse(cardReturned);
        });
    }

    add(cardModel: Card): Observable<CardAddResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/cardresource";

        let request: CardAddRequest = new CardAddRequest(cardModel.name,
            cardModel.type);

        let body = JSON.stringify(request);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .map((response: Response) => {
                let json = response.json();
                let cardReturned = new Card(
                    json.id,
                    json.name,
                    json.type // https://stackoverflow.com/questions/42299257/cast-int-to-enum-strings-in-typescript
                );
                return new CardAddResponse(cardReturned, true);
            })
            .do((data) => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    edit(cardModel: Card): Observable<CardEditResponse> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/cardresource/" + cardModel.id;

        const self = this;

        let request: CardEditRequest = new CardEditRequest(cardModel.id,
            cardModel.name,
            cardModel.type);

        let body = JSON.stringify(request);
        const headers = new Headers({ "Content-Type": "application/json" });
        const options = new RequestOptions({ headers });

        return this.http.put(url, body, options)
            .map((response: Response) => {
                let json = response.json();
                let cardReturned = new Card(
                    json.id,
                    json.name,
                    json.type // https://stackoverflow.com/questions/42299257/cast-int-to-enum-strings-in-typescript
                );
                return new CardEditResponse(cardReturned);
            })
            .do((data) => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    delete(id: number): Observable<boolean> {
        let baseUrl = this.getBaseUrl();
        let url = baseUrl + "/cardresource/" + id;

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