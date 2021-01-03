import { ApplicationService } from './application.service';

export function createApplicationServiceMock() {
  return jasmine.createSpyObj<ApplicationService>('AppicationService', [
    'registerForUpdates',
  ]);
}
