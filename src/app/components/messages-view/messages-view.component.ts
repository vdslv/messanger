import {Component, OnDestroy, OnInit} from "@angular/core";
import {ContactsService} from "../../shared/services/contacts.service";
import {ContactModel} from "../../shared/models/contact.model";
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: "app-messages-view",
  templateUrl: "./messages-view.component.html",
  styleUrls: ["./messages-view.component.scss"],
})
export class MessagesViewComponent implements OnInit, OnDestroy {
  contact: ContactModel;
  private contactSub: Subscription;
  private answerSub: Subscription;
  sendMessageForm;

  constructor(
    private contactsService: ContactsService,
    private fb: FormBuilder
  ) {
  }

  sendMessage() {
    if (!this.sendMessageForm.valid) {
      return;
    }
    this.contactsService.updateContactHistory(
      this.contact.id,
      this.sendMessageForm.value.message,
      null
    );
    this.contactsService.getAnswer().subscribe((data) => {
      this.contactsService.updateContactHistory(
        this.contact.id,
        data['value'],
        this.contact.id
      );
      this.sendMessageForm.reset();
    });
  }

  ngOnInit(): void {
    this.contactSub = this.contactsService.getCurrentContact().subscribe((val) => {
      this.contact = val;
    });
    this.sendMessageForm = this.fb.group({
      message: ["", Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
    this.answerSub.unsubscribe();
  }
}
