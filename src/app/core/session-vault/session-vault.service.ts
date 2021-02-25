import { Injectable } from '@angular/core';
import { Session } from '@app/models';
import { State } from '@app/store';
import { sessionRestored } from '@app/store/actions';
import { Storage } from '@capacitor/storage';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SessionVaultService {
  private key = 'auth-session';

  constructor(private store: Store<State>) {}

  async login(session: Session): Promise<void> {
    await Storage.set({ key: this.key, value: JSON.stringify(session) });
  }

  async restoreSession(): Promise<Session> {
    const { value } = await Storage.get({ key: this.key });
    const session = JSON.parse(value);

    if (session) {
      this.store.dispatch(sessionRestored({ session }));
    }

    return session;
  }

  async logout(): Promise<void> {
    await Storage.remove({ key: this.key });
  }
}
