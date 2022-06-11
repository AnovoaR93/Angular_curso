import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { person } from 'src/app/persona';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent{

  @Input() myPerson!: person;
  @Output()
  updateEvent: EventEmitter<person> = new EventEmitter<person>();
  @Output()
  deleteEvent: EventEmitter<person> = new EventEmitter<person>();

  updatePerson(){
    this.updateEvent.emit(this.myPerson);
  }

  deletePerson(){
    this.deleteEvent.emit(this.myPerson);
  }

}
