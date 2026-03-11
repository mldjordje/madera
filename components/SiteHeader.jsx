'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Group, Burger, Drawer, Stack, Button, Image, Text } from '@mantine/core';

const links = [
  { href: '/', label: 'Početna' },
  { href: '/restoran', label: 'Restoran' },
  { href: '/sobe', label: 'Sobe' },
  { href: '/svecanasala', label: 'Svečana sala' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function SiteHeader() {
  const [opened, setOpened] = useState(false);

  return (
    <header className="site-header">
      <Container size="lg" className="site-header__inner">
        <Link href="/" className="site-logo">
          <Image src="/img/ui/madera-logo.png" alt="Hotel-Restoran Madera" height={42} width={140} fit="contain" />
        </Link>

        <Group gap="lg" visibleFrom="md" className="site-nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="site-nav__link">
              {link.label}
            </Link>
          ))}
        </Group>

        <Group gap="sm">
          <Button component={Link} href="/kontakt" radius="xl" size="sm" variant="light" visibleFrom="md">
            Rezervacija
          </Button>
          <Burger opened={opened} onClick={() => setOpened((prev) => !prev)} hiddenFrom="md" size="sm" aria-label="Otvori meni" />
        </Group>
      </Container>

      <Drawer opened={opened} onClose={() => setOpened(false)} position="right" size="xs" title="Madera" className="site-drawer">
        <Stack gap="md">
          {links.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              variant="subtle"
              size="md"
              onClick={() => setOpened(false)}
              className="site-drawer__link"
            >
              {link.label}
            </Button>
          ))}
          <Text size="sm" c="dimmed">
            Okolina Niša, Srbija
          </Text>
        </Stack>
      </Drawer>
    </header>
  );
}
