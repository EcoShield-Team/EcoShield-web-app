import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../../features/auth/services/auth';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private readonly url = `${environment.apiURl}/users/heartbeat`;

  constructor() {
    setInterval(() => {
      if (this.auth.isLoggedIn()) {
        this.http.post(this.url, {}).subscribe();
      }
    }, 30000);
  }
}
