import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  prevScrollPos = window.pageYOffset;
  showPopup = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset;

    if (this.prevScrollPos > currentScrollPos) {
      document.getElementById('barra')!.style.top = '0';
    } else {
      document.getElementById('barra')!.style.top = '-60px';
      this.showPopup = false; // Oculta el popup al hacer scroll hacia abajo
    }

    this.prevScrollPos = currentScrollPos;
  }
}
