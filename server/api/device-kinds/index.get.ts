import { DeviceKindDto, DeviceKindQuery } from '~~/shared/schemas/deviceKind';
import { PaginateDto, toPrismaSort } from '~~/shared/schemas/paginate';

export default defineApi({
  query: DeviceKindQuery,
  response: PaginateDto(DeviceKindDto),
}, (async (event) => {
  const query = event.query;
  const [data, meta] = await db.deviceKind.paginate({
    select: {
      description: true,
      unit: true,
      brand: true,
      manufacturer: true,
      images: true,
      id: true,
      name: true,
      devices: {
        select: { status: true },
        where: { deletedAt: null }
      },
      category: { select: { id: true, name: true } },
    },
    where: {
      categoryId: query.categoryId,
      name: query.search ? {
        contains: query.search,
        mode: 'insensitive'
      } : undefined,
      deletedAt: null
    },
    orderBy: query.sort ? toPrismaSort(query.sort) : undefined,
  }).withPages({ page: query.page, limit: query.limit });

  const deviceKinds: DeviceKindDto[] = data.map((item) => {
    const coverImage = item.images.find(img => img.type === 'COVER');
    const coverImageUrl = coverImage ? getImageUrl(coverImage.imageId) : '';
    const galleryImageUrls = item.images.reduce((acc, img) => {
      if (img.type === 'GALLERY')
        acc.push(getImageUrl(img.imageId));
      return acc;
    }, [] as string[]);

    return {
      id: item.id,
      name: item.name,
      category: item.category,
      brand: item.brand,
      borrowableQuantity: item.devices.reduce((acc, device) => acc + (device.status === 'HEALTHY' ? 1 : 0), 0),
      quantity: item.devices.length,
      unit: item.unit,
      manufacturer: item.manufacturer,
      coverImageUrl,
      galleryImageUrls,
      description: item.description,
    }
  });

  return { data: deviceKinds, meta };
}));
