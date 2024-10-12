import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from '../../../angular18tutorial/src/app/components/menubar/menubar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
