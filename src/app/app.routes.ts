import { Routes } from "@angular/router";
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';

export const routes: Routes = [
    {path: 'template', component: TemplateComponent},
    {path: 'reactive', component: ReactiveComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'reactive'}
]