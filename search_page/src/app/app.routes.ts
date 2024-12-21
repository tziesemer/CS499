import { Routes } from '@angular/router';
import { SearchTableComponent } from './search-table/search-table.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddRescueComponent } from './add-rescue/add-rescue.component';
import { EditRescueComponent } from './edit-rescue/edit-rescue.component';

export const routes: Routes = [
    {path: 'list-rescues', component: SearchTableComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'edit-rescue', component: EditRescueComponent},
    { path: 'add-rescue', component: AddRescueComponent},
    { path: '', component: SearchTableComponent, pathMatch: 'full'}
];
