import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChatComponent } from "./components/chat/chat.component";
import { ContactsListComponent } from "./components/contacts-list/contacts-list.component";
import { MessagesViewComponent } from "./components/messages-view/messages-view.component";
import { MessageComponent } from "./components/message/message.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SortPipe } from './shared/pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ContactsListComponent,
    MessagesViewComponent,
    MessageComponent,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
