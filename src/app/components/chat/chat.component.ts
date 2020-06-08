import {Component, OnInit} from "@angular/core";
import {ContactModel} from "../../shared/models/contact.model";
import {ContactsService} from "../../shared/services/contacts.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  contacts: ContactModel[] = [];

  searchContact = new FormControl();

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
    this.searchContact.valueChanges.subscribe((val) => {
      this.contactsService.updateSearchValue(val);
    });
  }
}
