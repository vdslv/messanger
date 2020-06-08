import {Injectable} from "@angular/core";
import {ContactModel} from "../models/contact.model";
import {contacts} from "../../../db/database";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {debounceTime, map} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ContactsService {
  private contacts = contacts;
  private selectedContactId$ = new BehaviorSubject<number>(null);
  private contactsSubject$ = new BehaviorSubject<ContactModel[]>(this.contacts);
  private searchValue$ = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<ContactModel[]> {
    return combineLatest(
      this.contactsSubject$,
      this.searchValue$.pipe(debounceTime(200))
    ).pipe(
      map(([listContacts, searchVal]) => {
        return listContacts.filter((el) =>
          el.name.toLowerCase().includes(searchVal.toLowerCase())
        );
      })
    );
  }

  updateSearchValue(str: string) {
    this.searchValue$.next(str);
  }

  getCurrentContact(): Observable<ContactModel> {
    return combineLatest(this.selectedContactId$, this.contactsSubject$).pipe(
      map(([userId, listOfContacts]) => {
        if (userId !== null) {
          return listOfContacts.find((el) => el.id === userId);
        }
        return listOfContacts[0];
      })
    );
  }

  updateContactHistory(id: number, message: string, senderId: number): void {
    const index = this.contacts.findIndex((el) => el.id === id);
    this.contacts[index].history.push({
      id: senderId,
      date: Date.now(),
      message,
    });
    this.contactsSubject$.next(this.contacts);
  }

  changeContact(id): void {
    this.selectedContactId$.next(id);
  }

  getAnswer() {
    return this.http.get("https://api.chucknorris.io/jokes/random");
  }
}
