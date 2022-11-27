import { Component } from '@angular/core';

@Component({
  selector: 'app-mid-nav',
  templateUrl: './mid-nav.component.html',
  styleUrls: ['./mid-nav.component.scss']
})
export class MidNavComponent {

  tab: any;
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;
  tab6: any;

addIndicator: boolean = false


activeLink (check: number) :void {
  this.addIndicator = true
  if (check == 1) {
    this.tab = 'tab1';
  } else if (check == 2) {
    this.tab = 'tab2';
  } else if (check == 3) {
    this.tab = 'tab3';
  }else if (check == 4) {
    this.tab = 'tab4';
  }else if (check == 5) {
    this.tab = 'tab5';
  }else if (check == 6) {
    this.tab = 'tab6';
  }
}


}



