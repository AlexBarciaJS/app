import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base_url: string = 'http://[::1]:3000'

  constructor(private http: HttpClient) { }
  
  get_users() {
    return this.http.get(this.base_url + '/users')
  }

  getAllPost(){
    return this.http.get(this.base_url + '/products')
  }

  delete_user(id) {
    return this.http.delete(this.base_url + '/users/' + id)
  }

  search_users(name) {
    return this.http.get(this.base_url + '/github/users/' + name)
  }

  save_users(users) {

    let requests = []
    users.forEach(user => {
      let new_user = { login: user.login, avatar_url: user.avatar_url, html_url: user.html_url, repos_url: user.repos_url, }
      requests.push(this.http.post(this.base_url + '/users/', new_user))
    });

    return forkJoin(requests)
  }

  save_user(user) {
    return this.http.post(this.base_url + '/users', user)
  }

  update_user(user) {
    return this.http.put(this.base_url + '/users/' + user.id, user)
  }

}