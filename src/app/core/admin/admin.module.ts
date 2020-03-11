import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule } from "ngx-bootstrap";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxPrintModule } from "ngx-print";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap/modal";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { CoolingSystemComponent } from './cooling-system/cooling-system.component';
import { ElectricalDistributionBoardComponent } from './electrical-distribution-board/electrical-distribution-board.component';
import { FirePanelComponent } from './fire-panel/fire-panel.component';
import { FireSuppressionSystemComponent } from './fire-suppression-system/fire-suppression-system.component';
import { UpsComponent } from './ups/ups.component';
import { DoorAccessSystemComponent } from './door-access-system/door-access-system.component';
import { WaterLeakageComponent } from './water-leakage/water-leakage.component';
import { TemperatureHumidityComponent } from './temperature-humidity/temperature-humidity.component';
import { HealthProtectedEquipmentComponent } from './health-protected-equipment/health-protected-equipment.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HelpdeskComponent,
    CoolingSystemComponent,
    ElectricalDistributionBoardComponent,
    FirePanelComponent,
    FireSuppressionSystemComponent,
    UpsComponent,
    DoorAccessSystemComponent,
    WaterLeakageComponent,
    TemperatureHumidityComponent,
    HealthProtectedEquipmentComponent,
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgxPrintModule,
    PaginationModule.forRoot(),
    NgbModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    LeafletModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
