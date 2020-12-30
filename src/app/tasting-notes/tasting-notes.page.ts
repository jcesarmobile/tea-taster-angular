import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

import { TastingNoteEditorComponent } from './tasting-note-editor/tasting-note-editor.component';
import { TastingNote } from '@app/models';
import { selectNotes, State } from '@app/store';
import { noteDeleted, notesPageLoaded } from '@app/store/actions';

@Component({
  selector: 'app-tasting-notes',
  templateUrl: './tasting-notes.page.html',
  styleUrls: ['./tasting-notes.page.scss'],
})
export class TastingNotesPage implements OnInit {
  notes$: Observable<Array<TastingNote>>;

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.store.dispatch(notesPageLoaded());
    this.notes$ = this.store.select(selectNotes);
  }

  deleteNote(note: TastingNote): void {
    this.store.dispatch(noteDeleted({ note }));
  }

  async newNote(): Promise<void> {
    this.displayEditor();
  }

  async updateNote(note: TastingNote) {
    return this.displayEditor(note);
  }

  private async displayEditor(note?: TastingNote) {
    const opt = {
      component: TastingNoteEditorComponent,
      backdropDismiss: false,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    };

    const modal = await (note
      ? this.modalController.create({ ...opt, componentProps: { note } })
      : this.modalController.create(opt));
    modal.present();
  }
}
