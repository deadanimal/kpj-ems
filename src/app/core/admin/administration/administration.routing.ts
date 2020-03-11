import { Routes } from '@angular/router';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { UserComponent } from './user/user.component';

export const AdministrationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'audit-trail',
                component: AuditTrailComponent
            }
        ]
    }
]
