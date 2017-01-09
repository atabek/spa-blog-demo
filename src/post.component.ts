import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {PostService} from './post.service';
import {PostListComponent} from './post-list.component';
import {PostEditComponent} from './post-edit.component';
import {BlogDetailComponent} from './blog-detail.component';
import {BlogService} from './blog.service';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'post',
    template: `
        <blog-detail [blog]="blog"></blog-detail>
        <post-edit [post]="editablePost" (save)="save($event)" (clear)="clear()"></post-edit>
        <post-list [posts]="posts" (remove)="remove($event)" (edit)="edit($event)"></post-list>
  `,
})
export class PostComponent implements OnInit, OnDestroy{

    posts = [];
    editablePost = {};
    blog = {};
    paramsSubscription: Subscription;
    blogId: string;

    constructor(private route: ActivatedRoute,
                private postService: PostService,
                private blogService: BlogService) {
    }

    save(post) {
        if(post.id) {
            this.postService.updatePost(post, this.getBlogId())
                .then(() => this.reload());
        } else {
            this.postService.addPost(post, this.getBlogId())
                .then(() => this.reload());
        }
        this.clear();
    }

    edit(post) {
        this.editablePost = Object.assign({}, post);
    }

    remove(post) {
        this.postService.removePost(post, this.getBlogId())
            .then(() => this.reload());
    }

    clear() {
        this.editablePost = {};
    }

    ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(
            params => {
                // this.postService.getPosts(params['blogId'])
                // .then(response => {
                //     //this.posts = response; ???
                //     this.extractPosts(response);
                // })
                // .catch(error => console.log('Oops! The server request failed.'));
                this.blogId = params['blogId'];
                this.blogService.getBlog(params['blogId'])
                .then(response => {
                    this.blog = response;
                    this.blog["id"] = params['blogId'];
                    this.extractBlog(this.blog);
                })
                .catch(error => console.log('Oops! The server request failed.'));
            }
        );
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    private convert(parsedResponse) {
        return Object.keys(parsedResponse)
            .map(id => ({
                id: id,
                title: parsedResponse[id].title,
                body: parsedResponse[id].body,
                created_at: parsedResponse[id].created_at,
                updated_at: parsedResponse[id].updated_at,
            }))
            .sort((a, b) => a.created_at.localeCompare(b.created_at));
    }

    private extractBlog(blog) {
        this.blog = blog;
        let posts = blog['posts'];
        this.posts = Object.keys(posts)
        .map(id => ({
            id: id,
            title: posts[id].title,
            body: posts[id].body,
            created_at: posts[id].created_at,
            updated_at: posts[id].updated_at,
        }));
    }

    private reload() {
        this.blogService.getBlog(this.getBlogId())
            .then(response => {
                this.blog = response;
                this.blog["id"] = this.getBlogId();
                console.log(this.blog);
                this.extractBlog(this.blog);
            })
            .catch(error => console.log('Oops! The server request failed.'));
    }

    private getBlogId() {
        console.log(this.blog['id']);
        return this.blogId;
    }
}
