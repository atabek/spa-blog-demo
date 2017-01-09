import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BlogService {

    errorHandler = error => console.log('BlogService error', error);
    private baseUrl = 'https://blogapp-4573f.firebaseio.com';

    constructor(private http: Http) { }

    getBlogs() {
        return this.http.get(`${this.baseUrl}/blogs.json`)
            .toPromise()
            .then(response => this.convert(response.json()))
            .catch(this.errorHandler);
    }

    getBlog(blogId) {
        return this.http.get(`${this.baseUrl}/blogs/${blogId}.json`)
            .toPromise()
            .then(response => response.json())
            .catch(this.errorHandler);
    }

    addBlog(blog) {
        const json = JSON.stringify({
            title: blog.title,
            body: blog.body,
            created_at: new Date(),
            updated_at: new Date(),
            url: this.convertToSlug(blog.title)
        });
        return this.http.post(`${this.baseUrl}/blogs.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    updateBlog(blog) {
        const json = JSON.stringify({
            title: blog.title,
            body: blog.body,
            updated_at: new Date(),
            url: this.convertToSlug(blog.title)
        });
        return this.http.patch(`${this.baseUrl}/blogs/${blog.id}.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    removeBlog(blog) {
        return this.http.delete(`${this.baseUrl}/blogs/${blog.id}.json`)
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
                url: parsedResponse[id].url
            }));
            //.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }

    private convertBlog(parsedResponse) {
        return Object.keys(parsedResponse)
            .map(id => ({
                id: id,
                title: parsedResponse[id].title,
                body: parsedResponse[id].body,
                created_at: parsedResponse[id].created_at,
                updated_at: parsedResponse[id].updated_at,
                url: parsedResponse[id].url
            }));
            //.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }

    private convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
            ;
    }
}
