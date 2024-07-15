import { Component, OnInit } from "@angular/core";
import { TextService } from "../../services/text.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: "app-content",
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: "./content.component.html",
  styleUrl: "./content.component.scss",
})
export class ContentComponent implements OnInit {
  public selectedOption: string | null = null;
  public contentTexts: string[] = [];

  public options: Option[] = [
    { value: 'first', label: 'Opcja pierwsza' },
    { value: 'second', label: 'Opcja druga' },
    { value: 'random', label: 'Opcja losowa' }
  ];

  constructor(private textService: TextService) {}

  ngOnInit(): void {
    this.contentTexts = [this.textService.getInitialContent()];
  }

  public updateContent(action: string): void {
    const newText = this.getTextBySelectedOption(action === "replace");
    if (!newText) return;

    if (action === "replace") {
      this.contentTexts = [newText];
    } else {
      this.contentTexts.push(newText);
      this.contentTexts = [...new Set(this.contentTexts)];
    }
  }

  private getTextBySelectedOption(replace: boolean): string {
    if (this.selectedOption === "first") {
      return this.textService.getText(0, replace);
    } else if (this.selectedOption === "second") {
      return this.textService.getText(1, replace);
    } else if (this.selectedOption === "random") {
      return this.textService.getRandomText(this.contentTexts, replace);
    }
    return '';
  }
}
