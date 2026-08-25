import { createClient, type EntryFieldTypes, type EntrySkeletonType } from "contentful";
import { cache } from "react";

export interface RealizationEntrySkeleton extends EntrySkeletonType {
  contentTypeId: string;
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    category: EntryFieldTypes.Text;
    fix: EntryFieldTypes.Text;
    photo: EntryFieldTypes.AssetLink;
    realizationDate: EntryFieldTypes.Date;
  };
}

export interface PhotoGalleryEntrySkeleton extends EntrySkeletonType {
  contentTypeId: string;
  fields: {
    // The field holds multiple images per entry (Contentful "Array" of Asset
    // links), not a single photo — confirmed via the Content Types API.
    photoGallery: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
}

const REALIZATION_CONTENT_TYPE =
  process.env.CONTENTFUL_REALIZATION_CONTENT_TYPE || "realization";
// Contentful strips diacritics when auto-generating the content type's API
// ID from its display name ("Zdjęcie" -> "zdjcie") — confirmed via the
// Content Types API rather than guessed.
const PHOTO_GALLERY_CONTENT_TYPE =
  process.env.CONTENTFUL_PHOTO_GALLERY_CONTENT_TYPE || "zdjcie";

let client: ReturnType<typeof createClient> | undefined;

function getClient() {
  if (!client) {
    const space = process.env.CONTENTFUL_SPACE_ID;
    const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
    if (!space || !accessToken) {
      throw new Error(
        "Brak CONTENTFUL_SPACE_ID lub CONTENTFUL_ACCESS_TOKEN — ustaw je w .env.local (patrz .env.local.example).",
      );
    }
    client = createClient({
      space,
      accessToken,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    });
  }
  return client;
}

// cache() dedupes this call within a single render pass — generateMetadata
// and the page component both ask for the same data without a second request.
export const fetchRealizationEntries = cache(async () => {
  const res = await getClient().getEntries<RealizationEntrySkeleton>({
    content_type: REALIZATION_CONTENT_TYPE,
    order: ["-fields.realizationDate"],
  });
  return res.items;
});

// Inferred from the actual (unmodified) client's response shape, rather than
// constructed by hand via Entry<Skeleton> — that form defaults its Modifiers
// generic to the full ChainModifiers union and widens `fields` to include the
// withAllLocales variant, which doesn't match what this client returns.
export type RealizationEntry = Awaited<ReturnType<typeof fetchRealizationEntries>>[number];

// No custom date field on this content type — order by entry creation time,
// which every entry has regardless of its fields.
export const fetchPhotoGalleryEntries = cache(async () => {
  const res = await getClient().getEntries<PhotoGalleryEntrySkeleton>({
    content_type: PHOTO_GALLERY_CONTENT_TYPE,
    order: ["-sys.createdAt"],
  });
  return res.items;
});

export type PhotoGalleryEntry = Awaited<ReturnType<typeof fetchPhotoGalleryEntries>>[number];
