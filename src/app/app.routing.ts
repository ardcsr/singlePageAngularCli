import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageInformationComponent } from './manage-information/manage-information.component';
import { InformationComponent } from './information/information.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './shared/login/login.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'manageUser', component: ManageUserComponent },
    { path: 'manageInformation', component: ManageInformationComponent },
    { path: 'information', component: InformationComponent },
    { path: 'login', component: LoginComponent },
];

// เรา export ตัวแปรประเภทค่าคงที่ (const) ชื่อ routing ออกไป
// routing นี้เป็นผลลัพธ์จากการเรียก RouterModule.forRoot(appRoutes)
// โดย routing ของเราเป็น ModuleWithProviders
// เพื่อนๆคนไหนไม่เข้าใจว่าทำไมเราต้องเขียน routing: ModuleWithProviders
// แนะนำให้อ่าน ชุดบทความสอนใช้งาน TypeScript ที่ https://www.babelcoder.com/blog/series/typescript ครับ
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);