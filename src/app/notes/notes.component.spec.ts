import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotesComponent} from './notes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {not} from "rxjs/internal-compatibility";

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let titleInput;
  let statusInput;
  let addButton;
  let notesList;
  let compiled;

  const pushValue = async (value, input) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input'));
    addButton.click();
    await fixture.whenStable();
  };

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  const getTableRows = () : string[][] => {
    // @ts-ignore
    return Array.from(getByTestId('notesList').children)
      .map((tableRow: HTMLElement) => {
        return Array.from(tableRow.children).map((node) => {
          return node.innerHTML
        });
      });
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    titleInput = getByTestId('input-note-title');
    statusInput = getByTestId('input-note-status');
    addButton = getByTestId('submit-button');
    notesList = getByTestId('notesList');
    fixture.detectChanges();
  });

  it('Should render the initial UI as expected', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(titleInput.value).toBeFalsy();
    expect(statusInput.value).toBeFalsy();
    expect(addButton.innerHTML.trim()).toEqual('Add Note');
    expect(getByTestId('allButton').innerHTML.trim()).toEqual('All');
    expect(getByTestId('activeButton').innerHTML.trim()).toEqual('Active');
    expect(getByTestId('completedButton').innerHTML.trim()).toEqual('Completed');
    expect(notesList.children.length).toEqual(0);
  });


  it('Should add note when Add Button is clicked', () => {
    pushValue('Study', titleInput);
    pushValue('progress', statusInput);
    fixture.detectChanges();
    const notes = getTableRows();
    expect(notes.length).toEqual(1);
    expect(notes[0][0].trim()).toEqual('Study');
  });

  it('Should be able to add multiple notes', () =>{
    pushValue('Study', titleInput);
    pushValue('progress', statusInput);
    addButton.click();

    pushValue('Movie', titleInput);
    pushValue('Active', statusInput);
    addButton.click();

    pushValue('Stock', titleInput);
    pushValue('completed', statusInput);
    addButton.click();

    fixture.detectChanges();
    const notes = getTableRows();
    expect(notes.length).toEqual(3);

    expect(notes[0][0].trim()).toEqual('Movie');
    expect(notes[1][0].trim()).toEqual('Stock');
    expect(notes[2][0].trim()).toEqual('Study');
  });


  it('Should switch between buttons', () => {
    let notes;
    pushValue('Study', titleInput);
    pushValue('progress', statusInput);
    addButton.click();

    pushValue('Cooking', titleInput);
    pushValue('pending', statusInput);
    addButton.click();

    pushValue('Movie', titleInput);
    pushValue('active', statusInput);
    addButton.click();

    pushValue('Fill form', titleInput);
    pushValue('active', statusInput);
    addButton.click();

    pushValue('Stocks investing', titleInput);
    pushValue('completed', statusInput);
    addButton.click();

    pushValue('Complete code', titleInput);
    pushValue('completed', statusInput);
    addButton.click();

    fixture.detectChanges();

    notes = getTableRows();
    expect(notes[0][0]).toEqual('Movie');
    expect(notes[1][0]).toEqual('Fill form');
    expect(notes[2][0]).toEqual('Stocks investing');
    expect(notes[3][0]).toEqual('Complete code');
    expect(notes[4][0]).toEqual('Study');
    expect(notes[5][0]).toEqual('Cooking');

    getByTestId('activeButton').click();
    fixture.detectChanges();
    notes = getTableRows();
    expect(notes[0][0]).toEqual('Movie');
    expect(notes[1][0]).toEqual('Fill form');

    getByTestId('completedButton').click();
    fixture.detectChanges();
    notes = getTableRows();
    expect(notes[0][0]).toEqual('Stocks investing');
    expect(notes[1][0]).toEqual('Complete code');

    getByTestId('allButton').click();
    fixture.detectChanges();
    notes = getTableRows();
    expect(notes[0][0]).toEqual('Movie');
    expect(notes[1][0]).toEqual('Fill form');
    expect(notes[2][0]).toEqual('Stocks investing');
    expect(notes[3][0]).toEqual('Complete code');
    expect(notes[4][0]).toEqual('Study');
    expect(notes[5][0]).toEqual('Cooking');
  });

  it('should not show completed notes in active tab',  () => {
    let notes;
    pushValue('Movie', titleInput);
    pushValue('active', statusInput);
    addButton.click();

    pushValue('Fill form', titleInput);
    pushValue('active', statusInput);
    addButton.click();

    pushValue('Stocks investing', titleInput);
    pushValue('completed', statusInput);
    addButton.click();
    fixture.detectChanges();

    notes = getTableRows();
    expect(notes[0][0]).toEqual('Movie');
    expect(notes[1][0]).toEqual('Fill form');
    getByTestId('completedButton').click();

    fixture.detectChanges();
    notes = getTableRows();
    expect(notes.length).toEqual(1);
    expect(notes[0][0]).toEqual('Stocks investing');
  });
});
