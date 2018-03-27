import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PageService } from './pages/shared/page.service';
import { MatButtonModule,MatIconModule} from '@angular/material';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageInformationComponent } from './manage-information/manage-information.component';
import { InformationComponent } from './information/information.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './shared/login/login.component';

const appRoutes: Routes = []


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageListComponent,
    ManageUserComponent,
    ManageInformationComponent,
    InformationComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),MatButtonModule,MatIconModule
  ],
  providers: [PageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
