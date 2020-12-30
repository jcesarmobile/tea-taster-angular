import { EMPTY } from 'rxjs';
import { TeaService } from './tea.service';

export function createTeaServiceMock() {
  return jasmine.createSpyObj<TeaService>('TeaService', {
    getAll: EMPTY,
    save: Promise.resolve(),
  });
}
