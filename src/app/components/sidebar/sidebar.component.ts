import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/interview-list', title: 'Interview List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnChanges {
  menuItems: any[];
@Input() profil;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnchanges sideBar",this.profil)
    
      if(this.profil==="Manager"){
        this.menuItems = this.menuItems.filter(route => 
          
          route.title =='Dashboard' 
          || route.title =='User Profile' 
          || route.title =='Interview List'
          || route.title =='Notifications'
        )
        console.log("menu items==",this.menuItems)
      }

      if(this.profil==="Evaluateur"){
        this.menuItems = this.menuItems.filter(route => 
            
            route.title =='User Profile' 
          || route.title =='Interview List'
          || route.title =='Notifications'
        )
  
      }
console.log("profil dans sidebar",this.profil);
    
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log("ngOnInit sideBar",this.profil)
    console.log("menu items1==",this.menuItems)
    if(this.profil==="Manager"){
      this.menuItems = this.menuItems.filter(route => 
          
        route.title =='Dashboard' 
        || route.title =='User Profile' 
        || route.title =='Interview List'
        || route.title =='Notifications'
      )
    }
    if(this.profil==="Evaluateur"){
      this.menuItems = this.menuItems.filter(route => 
          
          route.title =='User Profile' 
        || route.title =='Interview List'
        || route.title =='Notifications'
      )

    }
      // console.log("menu items==",this.menuItems)
    
   
  }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
