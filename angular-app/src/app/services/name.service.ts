import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NameService {
  public nameVisibilityChange: EventEmitter<boolean> = new EventEmitter();

  public toggleName(): void {
    this.nameVisibilityChange.emit(true);
  }
}
