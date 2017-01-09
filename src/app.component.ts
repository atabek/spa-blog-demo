import {Component} from '@angular/core';
import {BlogComponent } from './blog.component';

@Component({
    selector: 'blog-app',
    template: `
        <router-outlet><router-outlet>
  `,
})
export class AppComponent {
    constructor() { }
}
