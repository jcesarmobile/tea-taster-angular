import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { createPlatformMock } from '@test/mocks';
import { SessionVaultService } from './session-vault.service';

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
});
