import { SimpleGrid, Card, Image, Text, Box } from '@mantine/core';

export default function GalleryGrid({ images }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {images.map((item) => (
        <Card key={item.src} radius="lg" padding="sm" className="gallery-card">
          <Box className="gallery-card__image">
            <Image src={item.src} alt={item.alt} height={220} fit="cover" />
          </Box>
          <Text fw={600} mt="sm">
            {item.title}
          </Text>
          {item.description ? (
            <Text size="sm" c="dimmed">
              {item.description}
            </Text>
          ) : null}
        </Card>
      ))}
    </SimpleGrid>
  );
}
