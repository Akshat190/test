// Shared site content for the Astro frontend.
// Static copy (DB-driven sections come from lib/api instead).

export const SITE = {
  name: "Kapadia High School",
  shortName: "KHS",
  tagline: "Excellence in Education Since 1956",
  founded: "1956",
  phone: "+91 6354368335",
  email: "info@kapadiahighschool.com",
  address: {
    street: "Near Chhatral Railway Station",
    area: "Kalol",
    state: "Gujarat",
    pincode: "382721",
  },
  admissionsUrl: "https://forms.gle/sDftg7osPaxvGKAD8",
} as const;

export interface NavChild {
  label: string;
  path: string;
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Our Premises",
    path: "/campuses",
    children: [
      { label: "Chandkheda", path: "/campuses/chandkheda" },
      { label: "Chhatral", path: "/campuses/chhatral" },
      { label: "IFFCO Township", path: "/campuses/iffco" },
      { label: "Kadi", path: "/campuses/kadi" },
      { label: "Shela", path: "/campuses/shela" },
    ],
  },
  {
    label: "Development",
    path: "/activities",
    children: [
      { label: "Activities", path: "/activities" },
      { label: "Facilities", path: "/facilities" },
    ],
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

export const SOCIAL_LINKS = [
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/kapadiahighschool" },
  { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/kapadiahighschool" },
  { icon: "whatsapp", label: "WhatsApp", href: "https://wa.me/916354368335" },
];

export const STATS = [
  { number: "1956", label: "Established" },
  { number: "5", label: "Campuses" },
  { number: "K-12", label: "Classes" },
  { number: "CBSE & GSEB", label: "Boards" },
];

export const VALUES = [
  { icon: "book", title: "Academic Excellence", desc: "Rigorous academics across Science, Commerce and Humanities streams." },
  { icon: "users", title: "Character First", desc: "Discipline, integrity and respect woven into everyday school life." },
  { icon: "star", title: "Holistic Growth", desc: "Sports, arts and cultural activities alongside classroom learning." },
];

export const FACILITIES = [
  { icon: "book", title: "Smart Classrooms", desc: "Well-ventilated classrooms built for focused learning." },
  { icon: "flask", title: "Science Laboratories", desc: "Practical-first labs for physics, chemistry and biology." },
  { icon: "ball", title: "Sports Grounds", desc: "Outdoor fields and indoor games for every age group." },
  { icon: "library", title: "Library", desc: "A growing collection of books, journals and references." },
  { icon: "bus", title: "Transport", desc: "Bus routes connecting nearby towns and villages." },
  { icon: "shield", title: "Safe Campus", desc: "Secure premises with attentive staff and supervision." },
];

export const ACTIVITIES_SECTIONS = [
  {
    title: "Sports",
    desc: "Annual sports day, inter-school tournaments and daily physical training.",
    items: ["Athletics", "Cricket", "Football", "Indoor games"],
  },
  {
    title: "Cultural",
    desc: "Festivals, annual day celebrations and art competitions through the year.",
    items: ["Music & Dance", "Drama", "Art & Craft", "Festivals"],
  },
  {
    title: "Academic Clubs",
    desc: "Clubs and olympiads that stretch curious minds beyond the syllabus.",
    items: ["Science club", "Maths olympiad", "Quiz competitions", "Debates"],
  },
];

export const ACHIEVEMENTS = [
  { year: "2024", title: "Board Results", desc: "Consistently strong pass percentages across CBSE and GSEB batches." },
  { year: "2024", title: "Sports Honours", desc: "Students representing the school at district-level athletics." },
  { year: "2023", title: "Cultural Prizes", desc: "Top placements in inter-school music and dance competitions." },
];

export const SUCCESS_STORIES = [
  {
    name: "Alumni Network",
    batch: "Since 1956",
    achievement: "Doctors, engineers & educators",
    story: "Generations of Kapadia students serve across Gujarat and beyond — in medicine, engineering, teaching and public service.",
  },
];

export const TEAM_MEMBERS = [
  { name: "School Leadership", role: "Management", desc: "Guided by the founding trust's vision of accessible, quality education." },
  { name: "Principal Office", role: "Administration", desc: "Day-to-day academic leadership across all five campuses." },
];

export const FACULTY_DEPARTMENTS = [
  { dept: "Science", teachers: "Physics, Chemistry, Biology and Mathematics educators." },
  { dept: "Languages", teachers: "English, Hindi, Gujarati and Sanskrit faculty." },
  { dept: "Humanities", teachers: "Social science, Commerce and Arts educators." },
];

export const TESTIMONIALS = [
  { quote: "The teachers know every child by name and push them to do their best.", name: "Parent", role: "Chhatral Campus" },
  { quote: "Festivals, sports and studies — school life here is full and joyful.", name: "Student", role: "Kadi Campus" },
];
