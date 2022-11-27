import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('0.3s ease-out', 
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 300, opacity: 1 }),
            animate('0.3s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  section: string = "";

  addIndicator: boolean = false

  scrolled = 0;

  @HostListener('window:scroll')
  onWindowScroll() {
    const numb = window.scrollY;
    if (numb >= 50){
    
      this.addIndicator=true

      this.scrolled = 1;
      console.log(numb)

      if (numb <550) {
        this.section ="home"
      }else if(numb>=550 && numb < 1650) {
        this.section = 'about'
        this.addIndicator=true


      } else if(numb>=1650 && numb < 2650){
        this.section ='faq'

      } else if(numb>=2650 && numb < 2970) {
        this.section ='contact'

      } else {
        this.scrolled = 0;

      }
      
    }
    else {
      this.scrolled = 0;
      this.section=''
      this.addIndicator=true
    }
  }
  
  
}
