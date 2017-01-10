import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'post-list',
    template: `
    <div *ngFor="let post of posts" class="panel panel-default">
      <!-- Default panel contents -->
      <div class="panel-heading">{{post.title}}</div>
      <div class="panel-body">
        <p [innerHTML]="post.body"></p>
      </div>
      <div class="panel-footer">
        <button (click)="onEdit(post)" class="btn btn-warning">
            <span class="glyphicon glyphicon-pencil"></span>
            <span class="hidden-xs">Edit</span>
        </button>
        <button (click)="onRemove(post)" class="btn btn-danger">
            <span class="glyphicon glyphicon-trash"></span>
            <span class="hidden-xs">Delete</span>
        </button>
        <!-- <span class="pull-right">{{post.created_at}}</span> -->
      </div>
    </div>
  `,
})
export class PostListComponent {

    @Input() posts = [];

    @Output() remove = new EventEmitter();
    @Output() edit = new EventEmitter();

    onRemove(post) {
        this.remove.emit(post);
    }

    onEdit(post) {
        this.edit.emit(post);
    }
}
