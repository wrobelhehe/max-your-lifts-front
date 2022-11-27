import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  scrolled = 0;

  @HostListener('window:scroll')
  onWindowScroll() {
    const numb = window.scrollY;
    if (numb >= 50){
      this.scrolled = 1;
    }
    else {
      this.scrolled = 0;
    }
  }
  
  
}
