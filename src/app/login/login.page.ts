import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectAuthErrorMessage, State } from '@app/store';
import { login, unlockSession } from '@app/store/actions';
import { SessionVaultService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  canUnlock: boolean;

  errorMessage$: Observable<string>;

  constructor(
    private sessionVault: SessionVaultService,
    private store: Store<State>,
  ) {}

  async ngOnInit(): Promise<void> {
    this.errorMessage$ = this.store.select(selectAuthErrorMessage);
    this.canUnlock = await this.sessionVault.canUnlock();
  }

  signIn() {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }

  unlock() {
    this.store.dispatch(unlockSession());
  }
}
