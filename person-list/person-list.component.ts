import { Component } from '@angular/core';
import { book } from 'src/app/book';
import { person } from 'src/app/persona';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent{
  createOrder = "CREATE";
  updateOrder = "UPDATE";

  personsOnUpdate: Array<boolean>;
  book:book;
  persons: Array<person>;

  constructor() {
    this.book = new book()
    this.persons = this.book.getPersons();
    this.personsOnUpdate = new Array<boolean>();
  }

  handleFormSubmit(submitOperation: {"index": number, "operation": string, "data": {"name": string, "surename": string, "dni": string, "date": number,
  "birthday": string, "favColour": string, "sex": string, "notes": string}}) {
    if(submitOperation['operation'] == this.createOrder)
      this.createUser(submitOperation['data']);
    else if(submitOperation['operation'] == this.updateOrder)
    this.updateUser(submitOperation['data'], submitOperation['index']);
  }

  createUser(pData: {"name": string, "surename": string, "dni": string, "date": number,
  "birthday": string, "favColour": string, "sex": string, "notes": string}) {
    let newPerson = new person(
      pData['name'],
      pData['surename'],
      pData['dni'],
      pData['date'],
      pData['birthday'],
      pData['favColour'],
      pData['sex'],
      pData['notes'],
    )
    this.book.addPerson(newPerson);
    this.personsOnUpdate.push(false);
    this.persons = this.book.getPersons();
  }

  deleteUser(PToDelete: person) {
    let deletedIndex = this.book.deletePerson(PToDelete);
    this.persons = this.book.getPersons();
    this.personsOnUpdate.splice(deletedIndex, 1);
  }

  updateUser(PData: {"name": string, "surename": string, "dni": string, "date": number,
  "birthday": string, "favColour": string, "sex": string, "notes": string}, index: number) {
    let pToUpdate = this.book.getPerson(index);
    pToUpdate.setName(PData.name);
    pToUpdate.setSurname(PData.surename);
    pToUpdate.setDni(PData.dni);
    pToUpdate.setDate(PData.date);
    pToUpdate.setBirthday(PData.birthday);
    pToUpdate.setFavouriteColor(PData.favColour);
    pToUpdate.setSex(PData.sex);
    pToUpdate.setNotes(PData.notes);
    this.personsOnUpdate[index] = false;

  }

  loadUpdateForm(PToUpdate: person){
    let updateIndex = this.book.getIndex(PToUpdate);
    this.personsOnUpdate[updateIndex] = true;
  }

  getDefVals(index: number): {"name": string, "surename": string, "dni": string, "date": string,
  "birthday": string, "favColour": string, "sex": string, "notes": string} {
    let p = this.persons[index];
    let pData = {"name": p.getName(), "surename": p.getSurname(), "dni": p.getDni(), "date": String(p.getDate()),
    "birthday": p.getBirthday(), "favColour": p.getFavouriteColor(), "sex": p.getSex(), "notes": p.getNotes()}
    return pData;
     }

}
