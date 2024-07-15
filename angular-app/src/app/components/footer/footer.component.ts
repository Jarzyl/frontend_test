import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NameService } from "../../services/name.service";
import { TextService } from "../../services/text.service";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  frameVisible = false;
  buttonActive = false;

  constructor(private nameService: NameService, private textService: TextService) {}

  public resetSettings(): void {
    this.textService.resetStorage();
    window.location.reload();
  }

  public showName(): void {
    this.nameService.toggleName();
  }

  public toggle(): void {
    this.buttonActive = !this.buttonActive;
    this.frameVisible = !this.frameVisible;
  }
}
