import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { DataState, initialState } from '@app/store/reducers/data.reducer';
import { createActivatedRouteMock, createNavControllerMock } from '@test/mocks';
import { selectTea } from '@app/store';
import { SharedModule } from '@app/shared';
import { TeaDetailsPage } from './tea-details.page';
import { teaDetailsChangeRating } from '@app/store/actions';
import { Tea } from '@app/models';

describe('TeaDetailsPage', () => {
  let component: TeaDetailsPage;
  let fixture: ComponentFixture<TeaDetailsPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TeaDetailsPage],
        imports: [FormsModule, IonicModule, SharedModule],
        providers: [
          provideMockStore<{ data: DataState }>({
            initialState: { data: initialState },
          }),
          { provide: ActivatedRoute, useFactory: createActivatedRouteMock },
          { provide: NavController, useFactory: createNavControllerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(TeaDetailsPage);
      component = fixture.componentInstance;
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    let store: MockStore;
    beforeEach(() => {
      const route = TestBed.inject(ActivatedRoute);
      (route.snapshot.paramMap.get as any).withArgs('id').and.returnValue('42');
      store = TestBed.inject(Store) as MockStore;
      store.overrideSelector(selectTea, {
        id: 7,
        name: 'White',
        description: 'Often looks like frosty silver pine needles',
        image: 'imgs/white.png',
        rating: 4,
      });
    });

    it('selects the tea based on the route', () => {
      spyOn(store, 'select').and.callThrough();
      fixture.detectChanges();
      expect(store.select).toHaveBeenCalledTimes(1);
      expect(store.select).toHaveBeenCalledWith(selectTea, { id: 42 });
    });

    it('initializes the rating', () => {
      fixture.detectChanges();
      expect(component.rating).toBe(4);
    });

    it('binds the name', () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('[data-testid="name"]'));
      expect(el.nativeElement.textContent.trim()).toBe('White');
    });

    it('binds the description', () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(
        By.css('[data-testid="description"]'),
      );
      expect(el.nativeElement.textContent.trim()).toBe(
        'Often looks like frosty silver pine needles',
      );
    });
  });

  describe('rating click', () => {
    let store: MockStore;
    let tea: Tea;
    beforeEach(() => {
      tea = {
        id: 7,
        name: 'White',
        description: 'Often looks like frosty silver pine needles',
        image: 'imgs/white.png',
        rating: 4,
      };
      store = TestBed.inject(Store) as MockStore;
      store.overrideSelector(selectTea, tea);
      fixture.detectChanges();
    });

    it('dispatches a rating change action', () => {
      spyOn(store, 'dispatch');
      component.rating = 3;
      component.changeRating(tea);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        teaDetailsChangeRating({ tea, rating: 3 }),
      );
    });
  });
});
