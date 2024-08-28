import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'app/Services/login.service';
import { NotificationService } from 'app/Services/notification.service';
import { Notification, Role } from 'app/models/notification.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  id: number;
  notifications: Notification[] = [];
  unreadCount: number = 0;

  constructor(
    location: Location, 
    private element: ElementRef, 
    private router: Router, 
    private loginService: LoginService,
    private notificationService: NotificationService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe(() => {
      this.sidebarClose();
      const layer: any = document.getElementsByClassName('close-layer')[0];
      if (layer) {
        layer.remove();
        this.mobile_menu_visible = 0;
      }
    });

    const currentUser = this.loginService.getCurrentUser();
    if (currentUser) {
      this.id = currentUser.id;
      this.loadNotifications();
    } else {
      console.error('No current user found');
    }
  }

  loadNotifications() {
    this.notificationService.getNotifications(this.id).subscribe(
      notifications => {
        this.notifications = notifications;
        this.unreadCount = notifications.length; // Assuming all are unread initially
      },
      error => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  resetUnreadCount() {
    this.unreadCount = 0;
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(() => {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }

    const body = document.getElementsByTagName('body')[0];
    var $layer = document.createElement('div');
    $layer.setAttribute('class', 'close-layer');

    if (body.querySelectorAll('.main-panel')) {
      document.getElementsByClassName('main-panel')[0].appendChild($layer);
    } else if (body.classList.contains('off-canvas-sidebar')) {
      document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
    }

    setTimeout(() => {
      $layer.classList.add('visible');
    }, 100);

    $layer.onclick = () => {
      body.classList.remove('nav-open');
      this.mobile_menu_visible = 0;
      this.sidebarVisible = false;

      $layer.classList.remove('visible');
      setTimeout(() => {
        $layer.remove();
        $toggle.classList.remove('toggled');
      }, 400);
    };

    body.classList.add('nav-open');
    this.mobile_menu_visible = 1;
  }

  getTitle() {
    var title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === title) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
