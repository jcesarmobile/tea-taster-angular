import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthMode,
  IonicIdentityVaultUser,
  IonicNativeAuthPlugin,
} from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

import { Session } from '@app/models';
import { sessionRestored } from '@app/store/actions';
import { State } from '@app/store';
import { BrowserVaultPlugin } from '../browser-vault/browser-vault.plugin';

@Injectable({
  providedIn: 'root',
})
export class SessionVaultService extends IonicIdentityVaultUser<Session> {
  constructor(
    private browserVaultPlugin: BrowserVaultPlugin,
    platform: Platform,
    private store: Store<State>,
  ) {
    super(platform, { authMode: AuthMode.SecureStorage });
  }

  async restoreSession(): Promise<Session> {
    const session = await super.restoreSession();

    if (session) {
      this.store.dispatch(sessionRestored({ session }));
    }

    return session;
  }

  getPlugin(): IonicNativeAuthPlugin {
    if ((this.platform as Platform).is('hybrid')) {
      return super.getPlugin();
    }
    return this.browserVaultPlugin;
  }
}
