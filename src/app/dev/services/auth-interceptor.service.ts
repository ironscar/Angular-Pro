import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler) {
		console.log('http request intercepted');
		const modifiedRequest = request.clone({ headers: request.headers.append('common-auth-key', 'abc123') });
		return next.handle(modifiedRequest).pipe(
			tap(event => {
				// event.type is of type HttpEventType discussed in backend-api-service
				console.log('response intercept tap', event);
			})
		);
	}
}

/**
 * executes some code using the request object right before the request is sent for every request
 * next is a function to be called to let the request continue
 * must be added to module in different way, multi specifies that there are multiple interceptors
 * request is immutable so clone it, modify it howsoever and then pass it to next
 * response can also be accessed as observable to transform it but it will happen for all api calls
 * multiple interceptors can be added by repeating the object in module
 * the order of the interceptors in providers[] specifies the order in which they execute their code
 */
