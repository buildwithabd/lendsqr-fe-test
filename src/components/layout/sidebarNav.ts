export type NavItem = {
  label: string;
  icon: string;
  path?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const sidebarNav: NavSection[] = [
  {
    title: 'CUSTOMERS',
    items: [
      { label: 'Users', icon: '/layouts/user-friends.svg', path: '/users' },
      { label: 'Guarantors', icon: '/layouts/users.svg', path: '/guarantors' },
      { label: 'Loans', icon: '/layouts/sack.svg', path: '/loans' },
      {
        label: 'Decision Models',
        icon: '/layouts/handshake-regular.svg',
        path: '/decision-models',
      },
      { label: 'Savings', icon: '/layouts/piggy-bank.svg', path: '/savings' },
      { label: 'Loan Requests', icon: '/layouts/hand-sack.svg', path: '/loan-requests' },
      { label: 'Whitelist', icon: '/layouts/user-check.svg', path: '/whitelist' },
      { label: 'Karma', icon: '/layouts/user-times.svg', path: '/karma' },
    ],
  },
  {
    title: 'BUSINESSES',
    items: [
      { label: 'Organization', icon: '/layouts/briefcase.svg', path: '/organization' },
      { label: 'Loan Products', icon: '/layouts/hand-sack.svg', path: '/loan-products' },
      {
        label: 'Savings Products',
        icon: '/layouts/bank.svg',
        path: '/savings-products',
      },
      { label: 'Fees and Charges', icon: '/layouts/coin-solid.svg', path: '/fees' },
      { label: 'Transactions', icon: '/layouts/transactions.svg', path: '/transactions' },
      { label: 'Services', icon: '/layouts/galaxy.svg', path: '/services' },
      { label: 'Service Account', icon: '/layouts/user-cog.svg', path: '/service-account' },
      { label: 'Settlements', icon: '/layouts/scroll.svg', path: '/settlements' },
      { label: 'Reports', icon: '/layouts/chart-bar.svg', path: '/reports' },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { label: 'Preferences', icon: '/layouts/sliders-h.svg', path: '/preferences' },
      { label: 'Fees and Pricing', icon: '/layouts/badge-percent.svg', path: '/fees-pricing' },
      { label: 'Audit Logs', icon: '/layouts/clipboard-list.svg', path: '/audit-logs' },
      { label: 'System Messages', icon: '/layouts/tire.svg', path: '/system-messages' },
    ],
  },
];
