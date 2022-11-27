import { Component } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent {
  isNavMenuOpen: boolean = true;

  toggleNavMenu(): void {
    this.isNavMenuOpen = !this.isNavMenuOpen;
  }

  afterClick(): void {
    this.isNavMenuOpen = true;
  }

  changeStyles() {
    return this.isNavMenuOpen ? '-100%' : '14%';
  }
}
