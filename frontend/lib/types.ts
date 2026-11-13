export type CampusRef = {
  slug: string;
  name: string;
};

export type CarouselImage = {
  id: number;
  title: string;
  subtitle: string;
  image: string | null;
  button_text: string;
  button_link: string;
  order: number;
};

export type CelebrationPhoto = {
  id: number;
  photo: string | null;
  caption: string;
  order: number;
};

export type Celebration = {
  id: number;
  festivalname: string;
  description: string;
  celebration_type: string;
  image: string | null;
  date: string;
  is_featured: boolean;
  campus: CampusRef | null;
  photo_count: number;
  photos: CelebrationPhoto[];
};

export type GalleryImage = {
  id: number;
  title: string;
  image: string | null;
  caption: string;
  description: string;
  date_added: string;
  order: number;
};

export type Gallery = {
  id: number;
  name: string;
  description: string;
  category: string;
  thumbnail: string | null;
  thumbnail_url: string | null;
  date_created: string;
  is_featured: boolean;
  image_count: number;
  images: GalleryImage[];
};

export type CampusDocument = {
  id: number;
  title: string;
  file: string | null;
  order: number;
};

export type Campus = {
  id: number;
  slug: string;
  name: string;
  board: string;
  affiliation_number: string;
  timings: string;
  address: string;
  photo: string | null;
  is_active: boolean;
  documents: CampusDocument[];
};

export type Option = {
  value: string;
  label: string;
};

export type SiteConfig = {
  gallery_categories: Option[];
  celebration_types: Option[];
};

// Merged campus content from /api/campus/<slug>/ (admin values + fallbacks).
export type CampusInfo = {
  slug: string;
  name: string;
  board: string;
  timings: string;
  affiliation_label: string;
  affiliation_number: string;
  address: string;
  hero_image: string;
  photo_url: string | null;
  documents: CampusDocument[];
};
