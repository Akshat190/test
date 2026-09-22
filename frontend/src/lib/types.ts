// Shapes returned by the Django read-only list APIs (see khschool/views.py).

export interface CampusDocument {
  title: string;
  get_file_url: string | null;
}

export interface Campus {
  slug: string;
  name: string;
  board: string;
  affiliation_number: string;
  timings: string;
  get_photo_url: string | null;
  documents: CampusDocument[];
}
