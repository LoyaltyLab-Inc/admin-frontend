import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { ShopsPageComponent } from './shops-page/shops-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphsModule } from '../shared/graphs/graphs.module';
import {
  DateAdapter, MAT_DATE_FORMATS,
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatInputModule,
  MatNativeDateModule, MatPaginatorModule, MatRadioModule, MatSlideToggleModule
} from '@angular/material';
import { ExtendedDatepicker, MY_DATE_FORMATS } from './extendedDatepicker';
import { ProfileService } from './profile.service';
import { PersonalDataComponent } from './hr/personalData/personalData.component';
import { DreamWorkComponent } from './hr/dreamWork/dreamWork.component';
import { LastWorkComponent } from './hr/lastWork/lastWork.component';
import { EducationComponent } from './hr/education/education.component';
import { ResultComponent } from './hr/result/result.component';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GraphsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  declarations: [
    SystemComponent,
    /*StatisticPageComponent,
    ShopsPageComponent,
    ProductsPageComponent,
    ManagementPageComponent,
    FeedbackPageComponent,
    ProfilePageComponent*/
    PersonalDataComponent,
    DreamWorkComponent,
    LastWorkComponent,
    EducationComponent,
    ResultComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: ExtendedDatepicker},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class SystemModule { }
