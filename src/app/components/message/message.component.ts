import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import {ContactModel} from "../../shared/models/contact.model";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent implements AfterViewChecked {
  @Input() contactData: ContactModel;
  @ViewChild("messages") private scrollContainer: ElementRef;

  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
