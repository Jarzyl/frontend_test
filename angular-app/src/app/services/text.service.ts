import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { of, Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export class TextService implements OnDestroy {
  private unUsedTexts: string[] = [];
  private usedTexts: string[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private http: HttpClient) {
    this.loadTexts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public resetStorage(): void {
    this.unUsedTexts = [];
    this.usedTexts = [];
    this.clearLocalStorage();
    this.loadTexts();
  }

  private loadTexts(): void {
    const storedUnusedTexts = localStorage.getItem("unusedTexts");
    const storedUsedTexts = localStorage.getItem("usedTexts");

    if (storedUnusedTexts) {
      this.unUsedTexts = JSON.parse(storedUnusedTexts);
    } else {
      const sub = this.http
        .get<{ texts: string[] }>("/assets/texts.json")
        .pipe(
          tap((response) => this.saveUnusedTexts(response.texts)),
          catchError(error => {
            console.error('Error loading texts:', error);
            return of({ texts: [] });
          })
        )
        .subscribe();

        this.subscription.add(sub);
    }
    if (storedUsedTexts) {
      this.usedTexts = JSON.parse(storedUsedTexts);
    }
  }

  private saveUnusedTexts(texts: string[]): void {
    this.unUsedTexts = texts;
    localStorage.setItem("unusedTexts", JSON.stringify(this.unUsedTexts));
  }

  private saveUsedTexts(): void {
    localStorage.setItem("usedTexts", JSON.stringify(this.usedTexts));
  }

  private clearLocalStorage(): void {
    localStorage.removeItem("unusedTexts");
    localStorage.removeItem("usedTexts");
  }

  public getInitialContent(): string {
    const storedUsedTexts = localStorage.getItem("usedTexts");
    return storedUsedTexts ? JSON.parse(storedUsedTexts).join(" ") : "";
  }

  private resetData(): void {
    this.unUsedTexts.push(...this.usedTexts);
    this.usedTexts = [];
    this.saveUnusedTexts(this.unUsedTexts);
    this.saveUsedTexts();
  }

  public getText(index: number, replace: boolean): string {
    if (replace) {
      this.resetData();
    }
    if (this.unUsedTexts.length === 0) {
      alert("No more unique texts available.");
      return "";
    }

    const selectedText = this.unUsedTexts[index];
    this.unUsedTexts = this.unUsedTexts.filter((text) => text !== selectedText);
    this.usedTexts.push(selectedText);

    this.saveUnusedTexts(this.unUsedTexts);
    this.saveUsedTexts();

    return selectedText;
  }

  public getRandomText(currentTexts: string[], replace: boolean): string {
    if (this.unUsedTexts.length === 0 && !replace) {
      alert("No more unique texts available.");
      return "";
    }
    if (replace) {
      this.resetData();
    }

    const randomIndex = Math.floor(Math.random() * this.unUsedTexts.length);
    const selectedText = this.unUsedTexts[randomIndex];

    this.unUsedTexts = this.unUsedTexts.filter((text) => text !== selectedText);
    this.usedTexts.push(selectedText);

    this.saveUnusedTexts(this.unUsedTexts);
    this.saveUsedTexts();

    return selectedText;
  }
}
