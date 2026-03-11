import Link from 'next/link';
import { Container, Group, Stack, Text, Anchor, Divider } from '@mantine/core';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container size="lg">
        <Group justify="space-between" align="flex-start" className="site-footer__top">
          <Stack gap={6}>
            <Text size="lg" fw={600}>Hotel-Restoran Madera</Text>
            <Text size="sm" c="dimmed">Okolina Niša, Srbija</Text>
            <Anchor href="tel:+381607180659" size="sm">+381 60 718 06 59</Anchor>
            <Anchor href="tel:+381183100971" size="sm">+381 18 310 09 71</Anchor>
            <Anchor href="mailto:info@madera.rs" size="sm">info@madera.rs</Anchor>
          </Stack>

          <Stack gap={6}>
            <Text size="sm" fw={600}>Navigacija</Text>
            <Link href="/" className="site-footer__link">Početna</Link>
            <Link href="/restoran" className="site-footer__link">Restoran</Link>
            <Link href="/sobe" className="site-footer__link">Sobe</Link>
            <Link href="/svecanasala" className="site-footer__link">Svečana sala</Link>
            <Link href="/kontakt" className="site-footer__link">Kontakt</Link>
          </Stack>
        </Group>

        <Divider my="lg" />
        <Text size="xs" c="dimmed">© 2026 Hotel-Restoran Madera. Sva prava zadržana.</Text>
      </Container>
    </footer>
  );
}
