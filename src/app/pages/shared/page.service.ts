import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class PageService {
  BASE = 'http://dev.baeslab.com:38302';
  // BASE = 'http://localhost :38302';
  constructor(public http: Http) { }
  // add link BASE with api
  cbase(url, arr) {
    let entry, i, len;
    url = this.BASE + '/' + url;
    for (i = 0, len = arr.length; i < len; i++) {
      entry = arr[i];
      url += '/' + entry;
    }
    return url;
  }

  private get(url, params, options) {
    return this.http.get(this.cbase(url, params), options).map(res => res.json());
  }
  private post(url, params, options) {
    return this.http.post(this.BASE + '/' + url, params, options).map(res => res.json());
  }

  private getWithAuthen(url, params) {

    return this.get(url, params, { headers: { 'Authorization': this.getToken() } });
  }
  private postWithAuthen(url, params) {
    return this.post(url, params, { headers: { 'Authorization': this.getToken() } });
  }

  // set token to localStorage
  createToken(data) {
    localStorage.setItem('token', data);
    return true;
  }
  // read token
  getToken(): string {
    return localStorage.getItem('token');
  }
  // read userInfo from localStorage
  getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) { return userInfo; } else { return false; }
  }
  // list drug form manage
  listDrug(sch) {
    return this.getWithAuthen('api/drug/list', [sch]); // (part,params, options)
  }
  // show drug for Id
  showDrug(_id) {
    return this.get('api/drug/show', [_id], []); // (part,params, options)
  }

  // make,create drug
  createDrug(drugform) {

    return this.postWithAuthen('api/drug/create', drugform);
  }
  // update drug for id
  updateDrug(drugform) {
    return this.postWithAuthen('api/drug/update', drugform);
  }
  // list user for manage
  listUser(search) {
    return this.getWithAuthen('api/user/list', [search]);

  }
  // show user for edit
  showUser(userId) {
    return this.getWithAuthen('api/user/show', [userId]);
  }
  // update user
  updateUser(userForm) {
    return this.postWithAuthen('api/user/update', userForm);
  }
  // make,create new drug
  createUser(userform) {
    return this.postWithAuthen('api/user/create', userform);
  }
  // search drug for homepage
  searchDrug(drugform) {
    return this.postWithAuthen('api/drug/search', drugform);
  }
  // login
  signIn(user) {
    return this.post('api/signin', user, []);
  }

  // updateImg(formData:formData) {
  //   return this.http.post('http://dev.baeslab.com:38302/api/document/upload', formData)
  // }
  // list image
  listImg(img) {
    return this.get('api/document/list', [img], []);
  }

}
