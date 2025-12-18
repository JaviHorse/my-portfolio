'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const PillNav = dynamic(() => import('./PillNav'), { ssr: false });

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'About me' },
    { href: '/contacts', label: 'Contacts' },
  ];

  return (
    <PillNav
      logo="/pose.jpg"
      items={navItems}
      activeHref={pathname}
      baseColor="transparent"
      pillTextColor="#ffffff"
      onMobileMenuClick={() => {}}
    />
  );
};

export default Header;