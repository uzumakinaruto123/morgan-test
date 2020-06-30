import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  statusList: string[] = ['All', 'Active', 'Completed'];
  selectedTab : string;

  ngOnInit(): void {
  }

}

export interface Note {
  title: string;
  status: string
}
