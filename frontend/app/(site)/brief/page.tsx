import PageBand from '@/components/PageBand';
import SmartImage from '@/components/SmartImage';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/brief.css';

export const metadata: Metadata = pageMetadata({
  title: 'Executive Brief - Kapadia High School',
  description:
    'An executive summary of Kapadia High School: our founding in 1956, academic approach, five campuses and the boards we are affiliated to.',
  path: '/brief/',
});

export default function Page() {
  return (
    <PageShell>
      <PageBand title="Management&apos;s message" lead="From the managing trustee" />
      <div className="container brief-content">
        <div className="row">
          <div className="col-lg-5 brief-image-container">
            <SmartImage src="/static/image/kapadia.jpg" alt="Mr. Shashwat Kapadia" className="brief-image img-fluid" />
            <div className="management-name">Mr. Shashwat Kapadia</div>
          </div>
          <div className="col-lg-7 brief-text-content">
            <p>
              We are dedicated to creating a nurturing and dynamic environment where students
              excel academically and grow personally. Our school is more than just a place of
              learning; it&apos;s a community where curiosity is encouraged,
              creativity is celebrated, and lifelong friendships are formed.
            </p>
            <p>
              From innovative classroom experiences to diverse extracurricular activities,
              we offer a balanced education that fosters both intellectual and personal growth.
              We are proud of our tradition of excellence and our commitment to helping
              each student achieve their full potential.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
