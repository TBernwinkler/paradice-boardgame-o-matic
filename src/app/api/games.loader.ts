import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import * as credentials from "./authentication.json"
import { ApiGame } from "../models/game";

@Injectable({
    providedIn: 'root'
})
export class GamesApiClient {
    private readonly apiUrl = credentials.apiUrl;
    private readonly http = inject(HttpClient);
    
    private readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        })
    };

    loadGames() {
        return this.http.get<Array<ApiGame>>(this.apiUrl, this.httpOptions)
    }
}
