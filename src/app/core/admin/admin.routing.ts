import { Routes } from '@angular/router';
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
import { ReportingComponent } from './reporting/reporting.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'cooling-system',
                component: CoolingSystemComponent
            },
            {
                path: 'electrical-distribution-board',
                component: ElectricalDistributionBoardComponent
            },
            {
                path: 'fire-panel',
                component: FirePanelComponent
            },
            {
                path: 'fire-suppression-system',
                component: FireSuppressionSystemComponent
            },
            {
                path: 'ups',
                component: UpsComponent
            },
            {
                path: 'door-access-system',
                component: DoorAccessSystemComponent
            },
            {
                path: 'water-leakage',
                component: WaterLeakageComponent
            },
            {
                path: 'temperature-humidity',
                component: TemperatureHumidityComponent
            },
            {
                path: 'health-protected-equipment',
                component: HealthProtectedEquipmentComponent
            },
            {
                path: 'administration',
                loadChildren: './administration/administration.module#AdministrationModule'
            },
            {
                path: 'helpdesk',
                component: HelpdeskComponent
            },
            {
                path: 'reporting',
                component: ReportingComponent
            }
        ]
    }
]
