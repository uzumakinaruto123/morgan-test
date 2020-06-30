import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  statusList: string[] = ['All', 'Active', 'Completed'];
  selectedTab : string = this.statusList[0];

  public noteInput = {
    title: '',
    status: ''
  };

  public allNotes: Note[] = [];

  ngOnInit(): void {
  }

  onNoteAdd() {
    console.log(this.noteInput, this.allNotes)
    if(this.noteInput.status && this.noteInput.title) {
      console.log('add');
      this.allNotes.push(this.noteInput);
      this.selectedTab = this.selectedTab;
      this.resetInputs();
    }
  }

  resetInputs() {
    this.noteInput = {
      title: '',
      status: ''
    };
  }


}

export interface Note {
  title: string;
  status: string
}
