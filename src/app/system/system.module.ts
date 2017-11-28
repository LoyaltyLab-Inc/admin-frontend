import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { ShopsPageComponent } from './shops-page/shops-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
  declarations: [SystemComponent,
    StatisticPageComponent,
    ShopsPageComponent,
    ProductsPageComponent,
    ManagementPageComponent,
    FeedbackPageComponent,
    ProfilePageComponent]
})
export class SystemModule { }
