import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Tea } from '@app/models';
import { Storage } from '@capacitor/storage';
import { environment } from '@env/environment';
import { TeaService } from './tea.service';

describe('TeaService', () => {
  let httpTestingController: HttpTestingController;
  let expectedTeas: Array<Tea>;
  let resultTeas: Array<Tea>;
  let service: TeaService;

  beforeEach(() => {
    spyOn(Storage, 'get').and.returnValue(Promise.resolve({ value: null }));
    initializeTestData();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    (Storage.get as any)
      .withArgs({ key: 'rating1' })
      .and.returnValue(Promise.resolve({ value: '4' }));
    (Storage.get as any)
      .withArgs({ key: 'rating3' })
      .and.returnValue(Promise.resolve({ value: '2' }));
    (Storage.get as any)
      .withArgs({ key: 'rating4' })
      .and.returnValue(Promise.resolve({ value: '4' }));
    (Storage.get as any)
      .withArgs({ key: 'rating6' })
      .and.returnValue(Promise.resolve({ value: '5' }));
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TeaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get all', () => {
    it('gets the tea categories', () => {
      service.getAll().subscribe();
      const req = httpTestingController.expectOne(
        `${environment.dataService}/tea-categories`,
      );
      expect(req.request.method).toEqual('GET');
      httpTestingController.verify();
    });

    it('transforms each tea', fakeAsync(() => {
      let teas: Array<Tea>;
      service.getAll().subscribe(t => (teas = t));
      const req = httpTestingController.expectOne(
        `${environment.dataService}/tea-categories`,
      );
      req.flush(resultTeas);
      tick();
      httpTestingController.verify();
      expect(teas).toEqual(expectedTeas);
    }));
  });

  describe('save', () => {
    it('saves the value', () => {
      spyOn(Storage, 'set').and.returnValue(Promise.resolve());
      const tea = { ...expectedTeas[4] };
      tea.rating = 4;
      service.save(tea);
      expect(Storage.set).toHaveBeenCalledTimes(1);
      expect(Storage.set).toHaveBeenCalledWith({
        key: 'rating5',
        value: '4',
      });
    });
  });

  const initializeTestData = () => {
    expectedTeas = [
      {
        id: 1,
        name: 'Green',
        image: 'assets/img/green.jpg',
        description: 'Green tea description.',
        rating: 4,
      },
      {
        id: 2,
        name: 'Black',
        image: 'assets/img/black.jpg',
        description: 'Black tea description.',
        rating: 0,
      },
      {
        id: 3,
        name: 'Herbal',
        image: 'assets/img/herbal.jpg',
        description: 'Herbal Infusion description.',
        rating: 2,
      },
      {
        id: 4,
        name: 'Oolong',
        image: 'assets/img/oolong.jpg',
        description: 'Oolong tea description.',
        rating: 4,
      },
      {
        id: 5,
        name: 'Dark',
        image: 'assets/img/dark.jpg',
        description: 'Dark tea description.',
        rating: 0,
      },
      {
        id: 6,
        name: 'Puer',
        image: 'assets/img/puer.jpg',
        description: 'Puer tea description.',
        rating: 5,
      },
      {
        id: 7,
        name: 'White',
        image: 'assets/img/white.jpg',
        description: 'White tea description.',
        rating: 0,
      },
      {
        id: 8,
        name: 'Yellow',
        image: 'assets/img/yellow.jpg',
        description: 'Yellow tea description.',
        rating: 0,
      },
    ];
    resultTeas = expectedTeas.map((t: Tea) => {
      const tea = { ...t };
      delete tea.image;
      delete tea.rating;
      return tea;
    });
  };
});
