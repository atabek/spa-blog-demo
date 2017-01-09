import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post.component';

export const routing = RouterModule.forRoot([
    {
        path: 'blogs',
        component: BlogComponent
    },
    {
        path: 'blogs/:blogId',
        component: PostComponent
    },
    {
        path: "",
        redirectTo: '/blogs',
        pathMatch: 'full'
    }
]);
