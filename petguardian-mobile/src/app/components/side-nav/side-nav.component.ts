import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  changeIcon(iconToAct: string) {
    // Disable profile icon
    const profile = document.getElementById("profileIcon") as HTMLImageElement;
    profile.src = "/assets/menuIcons/userOff.svg";

    switch (iconToAct) {
      case "dashboardIcon":
        // Enable menu
        const iconElement = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement.src = "/assets/menuIcons/homeOn.svg";

        // Disable others
        this.disableIcon("petsIcon", "dog");
        this.disableIcon("mapIcon", "map");
        this.disableIcon("chatIcon", "chat");
        this.disableIcon("qrIcon", "qr");
        break;
      case "petsIcon":
        // Enable menu
        const iconElement1 = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement1.src = "/assets/menuIcons/dogOn.svg";

        // Disable others
        this.disableIcon("dashboardIcon", "home");
        this.disableIcon("mapIcon", "map");
        this.disableIcon("chatIcon", "chat");
        this.disableIcon("qrIcon", "qr");
        break;
      case "mapIcon":
        // Enable menu
        const iconElement2 = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement2.src = "/assets/menuIcons/mapOn.svg";

        // Disable others
        this.disableIcon("petsIcon", "dog");
        this.disableIcon("dashboardIcon", "home");
        this.disableIcon("chatIcon", "chat");
        this.disableIcon("qrIcon", "qr");
        break;
      case "chatIcon":
        // Enable menu
        const iconElement3 = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement3.src = "/assets/menuIcons/chatOn.svg";

        // Disable others
        this.disableIcon("petsIcon", "dog");
        this.disableIcon("mapIcon", "map");
        this.disableIcon("dashboardIcon", "home");
        this.disableIcon("qrIcon", "qr");
        break;
      case "qrIcon":
        // Enable menu
        const iconElement4 = document.getElementById(iconToAct) as HTMLImageElement;
        iconElement4.src = "/assets/menuIcons/qrOn.svg";

        // Disable others
        this.disableIcon("petsIcon", "dog");
        this.disableIcon("mapIcon", "map");
        this.disableIcon("chatIcon", "chat");
        this.disableIcon("dashboardIcon", "home");
        break;
    }
  }

  disableIcon(imageId: string, iconName: string) {
    const iconElement = document.getElementById(imageId) as HTMLImageElement;
    iconElement.src = "/assets/menuIcons/" + iconName + "Off.svg";
  }
}
