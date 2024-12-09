import { Routes } from '@angular/router';
import { SearchTableComponent } from './search-table/search-table.component';

export const routes: Routes = [
    {path: 'list-rescues', component: SearchTableComponent},
    { path: '', component: SearchTableComponent, pathMatch: 'full'}
];