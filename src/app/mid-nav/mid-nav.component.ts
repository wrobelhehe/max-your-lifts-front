import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mid-nav',
  templateUrl: './mid-nav.component.html',
  styleUrls: ['./mid-nav.component.scss']
})
export class MidNavComponent {

  @Input() section: any;
  

  @Input() addIndicator:boolean = false


activeLink (check: number) :void {
  this.addIndicator = true
  if (check == 1) {
    this.section = 'home';
  } else if (check == 2) {
    this.section = 'about';
  } else if (check == 3) {
    this.section = 'faq';
  }else if (check == 4) {
    this.section = 'contact';
  }else if (check == 5) {
    this.section = 'signup';
  }else if (check == 6) {
    this.section = 'login';
  }
}


}



