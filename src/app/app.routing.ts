import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageInformationComponent } from './manage-information/manage-information.component';
import { InformationComponent } from './information/information.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './shared/login/login.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { DialogMachineComponent } from './dialog-machine/dialog-machine.component';
import { DialogOcrComponent } from './dialog-ocr/dialog-ocr.component'
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'manageUser', component: ManageUserComponent },
    { path: 'manageDrug', component: ManageInformationComponent },
    { path: 'drug', component: InformationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'machine', component: DialogMachineComponent },
    { path: 'ocr', component: DialogOcrComponent },
    { path: 'ocrss', component: DialogDeleteComponent },
    // { path: '***', component: DashboardComponent }
];

// เรา export ตัวแปรประเภทค่าคงที่ (const) ชื่อ routing ออกไป
// routing นี้เป็นผลลัพธ์จากการเรียก RouterModule.forRoot(appRoutes)
// โดย routing ของเราเป็น ModuleWithProviders
// เพื่อนๆคนไหนไม่เข้าใจว่าทำไมเราต้องเขียน routing: ModuleWithProviders
// แนะนำให้อ่าน ชุดบทความสอนใช้งาน TypeScript ที่ https://www.babelcoder.com/blog/series/typescript ครับ
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);