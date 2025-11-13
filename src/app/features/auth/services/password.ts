import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ValidateTokenResponse,
  VerifyCodeRequest,
} from '../../../core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class Password {
  private readonly baseUrl = environment.apiURl;

  constructor(private http: HttpClient) {}

  forgot(body: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.baseUrl}/auth/password/forgot`,
      body
    );
  }

  verifyCode(body: VerifyCodeRequest): Observable<ValidateTokenResponse> {
    return this.http.post<ValidateTokenResponse>(
      `${this.baseUrl}/auth/password/verify-code`,
      body
    );
  }

  reset(body: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      `${this.baseUrl}/auth/password/reset`,
      body
    );
  }
}
