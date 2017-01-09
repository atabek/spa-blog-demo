import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class PostService {

    errorHandler = error => console.log('PostService error', error);
    private baseUrl = 'https://blogapp-4573f.firebaseio.com';

    constructor(private http: Http,
                private route: ActivatedRoute) {
        const blogId = this.route.snapshot.params['blogId'];
    }

    // getPosts(blogId) {
    //     console.log(`${this.baseUrl}/blogs/${blogId}/posts.json`);
    //     return this.http.get(`${this.baseUrl}/blogs/${blogId}/posts.json`)
    //         .toPromise()
    //         .then(response => this.convert(response.json()))
    //         .catch(this.errorHandler);
    // }

    addPost(post, blogId) {
        console.log('add post blogid', blogId);
        const json = JSON.stringify({
            title: post.title,
            body: post.body,
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log('post url', `${this.baseUrl}/blogs/${blogId}/posts.json`);
        return this.http.post(`${this.baseUrl}/blogs/${blogId}/posts.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    updatePost(post, blogId) {
        console.log('update post blogid', blogId);
        const json = JSON.stringify({
            title: post.title,
            body: post.body,
            updated_at: new Date()
        });
        console.log('update url', `${this.baseUrl}/blogs/${blogId}/posts/${post.id}.json`);
        return this.http.patch(`${this.baseUrl}/blogs/${blogId}/posts/${post.id}.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    removePost(post, blogId) {
        return this.http.delete(`${this.baseUrl}/blogs/${blogId}/posts/${post.id}.json`)
            .toPromise()
            .catch(this.errorHandler);
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
}
