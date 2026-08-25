import { fetchPhotoGalleryEntries, type PhotoGalleryEntry } from "@/lib/contentful";

export interface GalleryPhoto {
  id: string;
  image: string;
}

// Each entry can hold several photos (the field is an array of assets), but
// the gallery itself has no albums — every photo from every entry is shown
// mixed together in one flat grid.
function mapEntry(entry: PhotoGalleryEntry): GalleryPhoto[] {
  const photos = entry.fields.photoGallery ?? [];

  return photos
    .map((photo, i): GalleryPhoto | null => {
      const asset = photo && "fields" in photo ? photo : undefined;
      const fileUrl = asset?.fields?.file?.url;
      if (!fileUrl) return null;

      return {
        id: `${entry.sys.id}-${i}`,
        image: fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl,
      };
    })
    .filter((p): p is GalleryPhoto => p !== null);
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const entries = await fetchPhotoGalleryEntries();
  return entries.flatMap(mapEntry);
}
