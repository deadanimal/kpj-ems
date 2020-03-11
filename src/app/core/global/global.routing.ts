import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { QueueUiComponent } from './queue-ui/queue-ui.component';

export const GlobalRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'queue-ui',
                component: QueueUiComponent
            }
        ]
    }
]