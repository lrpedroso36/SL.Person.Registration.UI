import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PersonRoutes } from "./person";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'person/list',
        pathMatch: 'full'
    },
    ...PersonRoutes    
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}