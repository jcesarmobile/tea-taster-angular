import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Platform } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { createPlatformMock } from '@test/mocks';
import { sessionLocked, sessionRestored } from '@app/store/actions';

describe('SessionVaultService', () => {
  let service: SessionVaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        { provide: Platform, useFactory: createPlatformMock },
      ],
    });
    service = TestBed.inject(SessionVaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('dispatches sessionLocked when the session is locked', () => {
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    service.onVaultLocked(null);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(sessionLocked());
  });

  it('dispatches sessionRestored when the session is restored', () => {
    const session = {
      token: '28843938593',
      user: {
        id: 73,
        firstName: 'Sheldon',
        lastName: 'Cooper',
        email: 'physics@science.net',
      },
    };
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    service.onSessionRestored(session);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(sessionRestored({ session }));
  });
});
