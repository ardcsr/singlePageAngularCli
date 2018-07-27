import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PageService } from './pages/shared/page.service';
import { MatIconModule, MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

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
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ServiceService } from './service/service.service';
import { DialogMachineComponent } from './dialog-machine/dialog-machine.component';
import { DialogOcrComponent } from './dialog-ocr/dialog-ocr.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogTopicComponent } from './dialog-topic/dialog-topic.component';

const appRoutes: Routes = [];


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
    LoginComponent,
    DashboardComponent,
    DialogMachineComponent,
    DialogOcrComponent,
    DialogDeleteComponent,
    DialogTopicComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [PageService],
  bootstrap: [AppComponent],
  exports: [MatButtonModule],
  // entryComponents: [DialogTopicComponent]
})
export class AppModule { }
