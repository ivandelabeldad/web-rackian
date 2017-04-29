import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'rackian-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  private loading = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loading = false;
      }, 100);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

}
