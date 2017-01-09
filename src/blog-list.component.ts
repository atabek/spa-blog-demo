import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostListComponent} from './post-list.component';

@Component({
    selector: 'blog-list',
    template: `
        <!-- <post-list></post-list> -->
        <div *ngFor="let blog of blogs" class="panel panel-default">
          <!-- Default panel contents -->
          <div class="panel-heading">{{blog.title}}</div>
          <div class="panel-body">
            <p>{{blog.body}}</p>
          </div>
          <div class="panel-footer">
            <a [routerLink]="['/blogs', blog.id]" class="btn btn-info" role="button">
                <span class="glyphicon glyphicon-eye-open"></span>
                <span class="hidden-xs">View</span>
            </a>
            <button (click)="onEdit(blog)" class="btn btn-warning">
                <span class="glyphicon glyphicon-pencil"></span>
                <span class="hidden-xs">Edit</span>
            </button>
            <button (click)="onRemove(blog)" class="btn btn-danger">
                <span class="glyphicon glyphicon-trash"></span>
                <span class="hidden-xs">Delete</span>
            </button>
            <span class="pull-right">{{blog.created_at | date:'medium'}}</span>
          </div>
        </div>
  `,
})
export class BlogListComponent {

    @Input() blogs = [];

    @Output() remove = new EventEmitter();
    @Output() edit = new EventEmitter();

    onRemove(blog) {
        this.remove.emit(blog);
    }

    onEdit(blog) {
        this.edit.emit(blog);
    }

}
