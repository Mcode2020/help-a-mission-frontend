export interface NavItem {
  name: string;
  path: string;
}

export const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Work', path: '/our-work' },
  { name: 'Campaigns', path: '/campaigns' },
  { name: 'Contact', path: '/contact' },
];
