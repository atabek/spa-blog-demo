import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'blog-detail',
    template: `
        <h4>Blog Details</h4>
        <div class="panel panel-default">
          <div class="panel-heading"><strong>Title:</strong> {{blog.title}}</div>
          <div class="panel-body">
            <p [innerHTML]="blog.body"><strong>Details:</strong></p>
            <p class="pull-right"><strong>Date:</strong> {{blog.created_at | date:'medium'}}</p>
          </div>
          <div class="panel-footer">
          </div>
        </div>
  `,
})
export class BlogDetailComponent {

    @Input() blog = {};
}
