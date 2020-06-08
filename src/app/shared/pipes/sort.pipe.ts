import { Pipe, PipeTransform } from "@angular/core";
import { ContactModel } from "../models/contact.model";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(arr: ContactModel[]) {
    return arr.sort((a, b) => {
      const lastElementA = a.history.slice(-1)[0];
      const lastElementB = b.history.slice(-1)[0];
      if (lastElementA && lastElementB) {
        if (lastElementA.date === lastElementB.date) {
          return 0;
        }
        return lastElementA.date > lastElementB.date ? -1 : 1
      }
    });
  }
}
