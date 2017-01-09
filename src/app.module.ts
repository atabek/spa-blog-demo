import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {BlogService} from "./blog.service";
import {BlogListComponent} from "./blog-list.component";
import {BlogEditComponent} from "./blog-edit.component";
import {PostListComponent} from "./post-list.component";
import {routing} from './app.routing';
import {BlogComponent} from './blog.component';
import {PostEditComponent} from './post-edit.component';
import {PostService} from './post.service';
import {PostComponent} from './post.component';
import {BlogDetailComponent} from './blog-detail.component';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing],
    declarations: [AppComponent, BlogListComponent, BlogEditComponent,
                PostListComponent, BlogComponent, PostEditComponent,
                PostComponent, BlogDetailComponent],
    providers: [BlogService, PostService,{
        provide: LocationStrategy, useClass: HashLocationStrategy
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
