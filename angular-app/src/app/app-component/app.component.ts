import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ContentComponent } from "../components/content/content.component";
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ContentComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "angular-app";
}
