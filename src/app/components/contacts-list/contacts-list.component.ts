import {Component, Input} from "@angular/core";
import {ContactModel} from "../../shared/models/contact.model";
import {ContactsService} from "../../shared/services/contacts.service";

@Component({
  selector: "app-contacts-list",
  templateUrl: "./contacts-list.component.html",
  styleUrls: ["./contacts-list.component.scss"],
})
export class ContactsListComponent {
  @Input() contacts: ContactModel[];

  constructor(private contactsService: ContactsService) {
  }

  openChat(contact: ContactModel): void {
    this.contactsService.changeContact(contact.id);
  }
}
