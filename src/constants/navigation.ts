export interface NavItem {
  name: string;
  key: string;
  path: string;
}

export const navItems: NavItem[] = [
  { name: 'Home', key: 'home', path: '/' },
  { name: 'About Us', key: 'about', path: '/about' },
  { name: 'Our Work', key: 'ourWork', path: '/our-work' },
  { name: 'Campaigns', key: 'campaigns', path: '/campaigns' },
  { name: 'Contact', key: 'contact', path: '/contact' },
];
