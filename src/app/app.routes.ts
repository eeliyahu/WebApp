import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
    {
        path: 'users', component: UserListComponent,
        children: [
            { path: 'new',      component: UserFormComponent   },     
            { path: 'edit/:id', component: UserFormComponent   },
            { path: ':id',      component: UserDetailComponent }    
        ]
    }
];

