import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'post-edit',
    template: `
        <div class="panel panel-info">
            <div class="panel-heading">Post CRUD</div>
            <div class="panel-body">
                    <input type="text" [(ngModel)]="post.title"
                        placeholder="Title" style="width: 25%"/>
                    <input type="text" [(ngModel)]="post.body"
                        placeholder="Post body" style="width: 50%">
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
export class PostEditComponent {

    @Input() post = {};
    @Output() save = new EventEmitter();
    @Output() clear = new EventEmitter();

    onSave() {
        this.save.emit(this.post);
    }

    onClear() {
        this.clear.emit();
    }
}
