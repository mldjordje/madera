'use client';

import Link from 'next/link';
import { Button } from '@mantine/core';

export default function LinkButton({ href, children, ...props }) {
  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
