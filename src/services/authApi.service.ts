import { Observable, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { User } from "../interfaces/user";
import { RegistrationUser } from "../interfaces/registrationUser";
import { LoginUser } from "../interfaces/loginUser";
import { AuthService } from "./auth.service";
import { AuthResponse } from "../interfaces/authResponse";


@Injectable({ providedIn: 'root' })
export class AuthApiService {
    http = inject(HttpClient);
    auth = inject(AuthService);
    private apiUrl = 'http://localhost:3000/api/auth';

    register(dto: RegistrationUser): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, dto);
    }

    login(dto: LoginUser): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto);
    }

    logout(): Observable<void> {
        const token = this.auth.getToken();
            
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.post<void>(
        `${this.apiUrl}/logout`,
        {},             // body vuoto
        { headers }
        ).pipe(
        tap(() => {
            // rimuovo il token in locale solo se la chiamata ha avuto successo
            this.auth.logout();
        })
        );
    }

}