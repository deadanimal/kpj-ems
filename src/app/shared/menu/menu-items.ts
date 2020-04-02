export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-chart-bar text-default"
  },
  {
    path: "/admin/cooling-system",
    title: "Cooling System",
    type: "link",
    icontype: "fas fa-temperature-low text-default"
  },
  {
    path: "/admin/electrical-distribution-board",
    title: "Electrical Distribution Board",
    type: "link",
    icontype: "fas fa-car-battery text-default"
  },
  {
    path: "/admin/fire-panel",
    title: "Fire Panel",
    type: "link",
    icontype: "fas fa-fire text-default"
  },
  {
    path: "/admin/fire-suppression-system",
    title: "Fire Suppression System",
    type: "link",
    icontype: "fas fa-fire-extinguisher text-default"
  },
  {
    path: "/admin/ups",
    title: "Uninterruptible Power Supply",
    type: "link",
    icontype: "fas fa-car-battery text-default"
  },
  {
    path: "/admin/door-access-system",
    title: "Door Access System",
    type: "link",
    icontype: "fas fa-door-closed text-default"
  },
  {
    path: "/admin/water-leakage",
    title: "Water Leakage",
    type: "link",
    icontype: "fas fa-water text-default"
  },
  {
    path: "/admin/temperature-humidity",
    title: "Temperature & Humidity",
    type: "link",
    icontype: "fas fa-tachometer-alt text-default"
  },
  {
    path: "/admin/health-protected-equipment",
    title: "Health and Protected Equipment",
    type: "link",
    icontype: "fas fa-stethoscope text-default"
  },
  {
    path: '/admin/reporting',
    title: 'Reporting',
    type: 'link',
    icontype: 'fas fa-chart-pie text-default'
  },
  {
    path: "/admin/administration",
    title: "Administration",
    type: "sub",
    icontype: "fas fa-cogs text-default",
    collapse: "administration",
    isCollapsed: true,
    children: [
      { path: "user", title: "User", type: "link" },
      { path: "audit-trail", title: "Audit Trail", type: "link" }
    ]
  },
  {
    path: "/admin/helpdesk",
    title: "Helpdesk",
    type: "link",
    icontype: "fas fa-question text-default"
  }
];
