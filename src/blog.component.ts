import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlogListComponent} from './blog-list.component';
import {BlogEditComponent} from './blog-edit.component';
import { BlogService } from './blog.service';
import { BlogDetailComponent} from './blog-detail.component';

@Component({
    selector: 'blog',
    template: `
        <blog-edit [blog]="editableBlog" (save)="save($event)" (clear)="clear()"></blog-edit>
        <blog-list [blogs]="blogs" (remove)="remove($event)" (edit)="edit($event)">
        </blog-list>
  `,
})
export class BlogComponent {

    blogs = [];
    editableBlog = {};

    constructor(private blogService: BlogService) {
        this.blogService.errorHandler = error =>
            alert('Oops! The server request failed.');
        this.reload();
    }

    edit(blog) {
        this.editableBlog = Object.assign({}, blog);
    }

    remove(blog) {
        this.blogService.removeBlog(blog)
            .then(() => this.reload());
    }

    save(blog) {
        if(blog.id) {
            this.blogService.updateBlog(blog)
                .then(() => this.reload());
        } else {
            this.blogService.addBlog(blog)
                .then(() => this.reload());
        }
        this.clear();
    }

    clear() {
        this.editableBlog = {};
    }

    private reload() {
        this.blogService.getBlogs()
            .then(blogs => this.blogs = blogs)
            .catch(error => alert('Oops! The server request failed.'));
    }
}
