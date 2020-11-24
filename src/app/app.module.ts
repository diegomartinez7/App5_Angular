import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

//Importar RouterModule de @angular/router
import { RouterModule } from '@angular/router';

//Importar la constante creada en el archivo app.routes
import { routes } from './app.routes';

//Para trabajar con formularios
import { FormsModule } from '@angular/forms';

//Para trabajar con formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';

//Para hacer peticiones HTTP es necesario importar ClientModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
