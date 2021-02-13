import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';

import { Tea } from '@app/models';
import { environment } from '@env/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeaService {
  private images: Array<string> = [
    'green',
    'black',
    'herbal',
    'oolong',
    'dark',
    'puer',
    'white',
    'yellow',
  ];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Tea>> {
    return this.http
      .get(`${environment.dataService}/tea-categories`)
      .pipe(
        mergeMap((teas: Array<any>) =>
          Promise.all(teas.map(t => this.convert(t))),
        ),
      );
  }

  save(tea: Tea): Promise<void> {
    /* eslint-disable @typescript-eslint/naming-convention */
    const { Storage } = Plugins;
    return Storage.set({
      key: `rating${tea.id}`,
      value: tea.rating.toString(),
    });
  }

  private async convert(res: any): Promise<Tea> {
    /* eslint-disable @typescript-eslint/naming-convention */
    const { Storage } = Plugins;
    const rating = await Storage.get({ key: `rating${res.id}` });
    return {
      ...res,
      image: `assets/img/${this.images[res.id - 1]}.jpg`,
      rating: parseInt((rating && rating.value) || '0', 10),
    };
  }
}
