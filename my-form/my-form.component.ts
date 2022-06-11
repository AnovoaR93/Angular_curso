import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { person } from 'src/app/persona';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})

export class MyFormComponent implements OnInit{

    newPerson = new FormGroup({
      name : new FormControl("", [Validators.required, Validators.minLength(3)]),
      surename : new FormControl("", [Validators.required, Validators.minLength(3)]),
      dni : new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      date : new FormControl("", [Validators.required, Validators.min(0), Validators.max(125)]),
      birthday : new FormControl("", Validators.required),
      notes : new FormControl(""),
      favColour : new FormControl("",Validators.required),
      sex : new FormControl("", [Validators.required, Validators.pattern(/m|w|other|unknown/i)]),
    });
    defaultName!: string;

  @Input() operationOnSubmit!: string;
  @Input() index: number = -1;
  @Input() title!: string;
  @Input() buttonText!: string;
  @Input() defaultValues!: {"name": string, "surename": string,
  "dni": string, "date": string, "birthday": string, "favColour": string, "sex": string, "notes": string};
  @Output()
  submitEvent: EventEmitter<{"index": number,"operation": string, "data": {"name": string, "surename": string,
   "dni": string, "date": number, "birthday": string, "favColour": string, "sex": string, "notes": string}}>
   = new EventEmitter<{"index": number, "operation": string, "data": {"name": string, "surename": string, "dni": string,
    "date": number, "birthday": string, "favColour": string, "sex": string, "notes": string}}>();

  constructor() {
    
  }

  ngOnInit() {
    this.newPerson.setValue(this.defaultValues);
  }


  submit() {
    let data = this.newPerson.value;
    let fixedNotes;
    if((data.notes === null) || (data.notes === undefined)) {
      fixedNotes = "";
    } else{
      fixedNotes = data.notes!;
    }
    this.submitEvent.emit({
      "index": this.index,
      "operation": this.operationOnSubmit,
      "data": {
        "name": data.name!,
        "surename": data.surename!,
        "dni": data.dni!,
        "date": Number(data.date!),
        "birthday": data.birthday!,
        "favColour": data.favColour!,
        "sex": data.sex!,
        "notes": fixedNotes
      }
    });
  }

  get name() { return this.newPerson.get('name'); }
  get surename() { return this.newPerson.get('surename'); }
  get age() { return this.newPerson.get('date'); }
  get sex() { return this.newPerson.get('sex'); }
  get birthday() { return this.newPerson.get('birthday'); }
  get dni() { return this.newPerson.get('dni'); }
  get favColour() { return this.newPerson.get('favColour'); }

}