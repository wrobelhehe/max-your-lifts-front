import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../dialog/signup/signup.component';


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
export class HomeComponent implements OnInit {

  section: string = "";



  scrolled = 0;



  @HostListener('window:scroll')
  onWindowScroll() {
    const numb = window.scrollY;
    if (numb >= 160) {

      this.scrolled = 1;

    }
    else {
      this.scrolled = 0;

    }
  }

  constructor(private dialog: MatDialog,
    private router: Router,
    private userService: UserService) {



  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken') != null) {
      this.userService.checkToken().subscribe((res: any) => {
        this.router.navigate(['/max-your-lifts/plans'])
      }, (error: any) => {
      })
    }
  }
  signUp() {
    const dialogConfig = new MatDialogConfig()
    if (window.innerWidth >= 768) {
      dialogConfig.width = '650px';

    } else {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh'
    }
    this.dialog.open(SignupComponent, dialogConfig)
  }
}
