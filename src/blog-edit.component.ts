import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'blog-edit',
    template: `
        <div class="panel panel-primary">
            <div class="panel-heading">Blog CRUD</div>
            <div class="panel-body">
                    <input type="text" [(ngModel)]="blog.title"
                        placeholder="Title" style="width: 25%"/>
                    <input type="text" [(ngModel)]="blog.body"
                        placeholder="Description" style="width: 50%">
                    <button (click)="onSave()" class="btn btn-primary">
                        <span class="glyphicon glyphicon-check"></span>
                        <span class="hidden-xs">Save</span>
                    </button>
                    <button (click)="onClear()" class="btn btn-warning">
                        <span class="glyphicon glyphicon-erase"></span>
                        <span class="hidden-xs">Clear</span>
                    </button>
            </div>
        </div>
  `,
})
export class BlogEditComponent {

    @Input() blog = {};
    @Output() save = new EventEmitter();
    @Output() clear = new EventEmitter();

    onSave() {
        this.save.emit(this.blog);
    }

    onClear() {
        this.clear.emit();
    }

}
