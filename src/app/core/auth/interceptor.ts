import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let isAuthenticated = false;
        const headerBrowser: any = {
            'Content-Type': 'application/json'
        };
        const apiKey = localStorage.getItem('apikey');
        if (apiKey) {
            headerBrowser.Authorization = `bearer ` + apiKey;
            isAuthenticated = true;
        }
        const requestAdded = headerBrowser;

        if (isAuthenticated) {
            request = request.clone({
                setHeaders: requestAdded
            });
        }
        return next.handle(request);
    }
}
