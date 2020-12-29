import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Store } from '@ngrx/store';

import { Session } from '@app/models';
import { sessionRestored } from '@app/store/actions';
import { State } from '@app/store';

@Injectable({
  providedIn: 'root',
})
export class SessionVaultService {
  private key = 'auth-session';

  constructor(private store: Store<State>) {}

  async login(session: Session): Promise<void> {
    const { Storage } = Plugins;
    await Storage.set({ key: this.key, value: JSON.stringify(session) });
  }

  async restoreSession(): Promise<Session> {
    const { Storage } = Plugins;
    const { value } = await Storage.get({ key: this.key });
    const session = JSON.parse(value);

    if (session) {
      this.store.dispatch(sessionRestored({ session }));
    }

    return session;
  }

  async logout(): Promise<void> {
    const { Storage } = Plugins;
    await Storage.remove({ key: this.key });
  }
}
