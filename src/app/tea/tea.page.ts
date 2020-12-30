import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tea } from '@app/models';
import { State } from '@app/store';
import { logout } from '@app/store/actions';
import { selectTeas } from '@app/store/selectors';

@Component({
  selector: 'app-tea',
  templateUrl: './tea.page.html',
  styleUrls: ['./tea.page.scss'],
})
export class TeaPage implements OnInit {
  teas$: Observable<Array<Array<Tea>>>;

  private teaMatrix(teas: Array<Tea>): Array<Array<Tea>> {
    const matrix: Array<Array<Tea>> = [];
    let row = [];
    teas.forEach(t => {
      row.push(t);
      if (row.length === 4) {
        matrix.push(row);
        row = [];
      }
    });

    if (row.length) {
      matrix.push(row);
    }

    return matrix;
  }

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.teas$ = this.store
      .select(selectTeas)
      .pipe(map(teas => this.teaMatrix(teas)));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
