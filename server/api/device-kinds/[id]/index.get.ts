import { Type } from '@sinclair/typebox';
import { DeviceKindDto } from '~~/shared/schemas/deviceKind';

export default defineApi({
  query: Type.Object({ labId: Type.Optional(Type.String()) }),
  params: Type.Object({ id: Type.String() }),
  response: DeviceKindDto,
}, async (event) => {
  const deviceKind = await db.deviceKind.findUniqueOrThrow({
    where: { id: event.routerParams.id, deletedAt: null },
    select: {
      description: true,
      unit: true,
      brand: true,
      manufacturer: true,
      images: { select: { imageId: true, type: true } },
      id: true,
      name: true,
      devices: {
        select: { status: true },
        where: { deletedAt: null, labId: event.query.labId },
      },
      category: { select: { id: true, name: true } },
    },
  });
  const coverImage = deviceKind.images.find(img => img.type === 'COVER');
  const coverImageUrl = coverImage ? getImageUrl(coverImage.imageId) : '';
  const galleryImageUrls = deviceKind.images.reduce((acc, img) => {
    if (img.type === 'GALLERY')
      acc.push(getImageUrl(img.imageId));
    return acc;
  }, [] as string[]);

  const deviceKindDto: DeviceKindDto = {
    id: deviceKind.id,
    name: deviceKind.name,
    category: deviceKind.category,
    brand: deviceKind.brand,
    borrowableQuantity: deviceKind.devices.reduce((acc, device) => acc + (device.status === 'HEALTHY' ? 1 : 0), 0),
    quantity: deviceKind.devices.length,
    unit: deviceKind.unit,
    manufacturer: deviceKind.manufacturer,
    coverImageUrl,
    galleryImageUrls,
    description: deviceKind.description,
  };
  return deviceKindDto;
});
