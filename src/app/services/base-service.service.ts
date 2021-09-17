import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BaseServiceService {

	private headers: {} = {}
	constructor(public http: HttpClient) {
		this.headers['Access-Control-Allow-Origin'] = '*';
	}

	async readToken(): Promise<string> {
		let val = await localStorage.getItem('token')
		if (val) {
			return val;
		} else {
			return '';
		}
	}

	consumeAPI(url: string, data?: any, verb = 'post', isFile = false) {
		return new Promise(async (resolve, reject) => {
			try {
				let options
				let token = await this.readToken()
				this.headers['Authorization'] = 'Bearer ' + token
				if (isFile) {
					let fd = new FormData()
					fd.append('upload', data)
					data = fd
					delete this.headers['Content-type']
					options = {
						headers: <HttpHeaders> this.headers,
						responseType: 'arraybuffer'
					};
				} else {
					options = {
						headers: <HttpHeaders> this.headers,
						responseType: 'json'
					};
					this.headers['Content-type'] = 'application/json';
				}
				if (verb === 'post') {
					this.http.post(`${environment.url}:${environment.port}${url}`, data, { headers: this.headers }).pipe(take(1))
						.subscribe((response: any) => {
							resolve(response);
						});
				} else if (verb === 'get') {
					this.http.get(`${environment.url}:${environment.port}${url}`,{...options}).pipe(take(1))
					.subscribe((response: any) => {
						resolve(response);
					});
				}
			} catch (err) {
				console.log('An error occurred consumming the api: ', err);
			}
		})
	}
}
