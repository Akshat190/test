import SmartImage from '@/components/SmartImage';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import MapTabs from '@/components/MapTabs';
import PageShell from '@/components/PageShell';
import { getCampuses } from '@/lib/api';
import { pageMetadata } from '@/lib/metadata';
import '@/css/contact.css';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us - Kapadia High School',
  description:
    'Contact Kapadia High School. Reach the admissions office, find campus addresses and send us a message about admissions or any school enquiry.',
  path: '/contact/',
});

export default async function ContactPage() {
  const campuses = await getCampuses();

  return (
    <PageShell>
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container position-relative">
          <div className="row">
            <div className="col-12">
              <h1 className="hero-title">Contact us</h1>
              <p className="hero-subtitle">Admissions and general enquiries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container">
          <div className="row">
            <div className="col-12 section-heading-left mb-5">
              <h2 className="section-title">Contact details</h2>
              <div className="section-underline"></div>
              <p className="section-description">Call, email, or send a message. The school office replies on working days.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <Icon name="map-marker" />
                </div>
                <h3>Location</h3>
                <p><strong>Main Campus:</strong><br />Near Chhatral Railway Station, Kalol, Pratappura, Gujarat 382721</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <Icon name="phone" />
                </div>
                <h3>Phone</h3>
                <p><strong>Main Office:</strong><br />+91 6354368335</p>
                <p><strong>Admissions:</strong><br />+91 6354368335</p>
                <p><strong>Student Affairs:</strong><br />+91 6354368335</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <Icon name="envelope" />
                </div>
                <h3>Email</h3>
                <p><strong>General Inquiries:</strong><br /><a href="mailto:info@kapadiahighschool.com">info@kapadiahighschool.com</a></p>
                <p><strong>Admissions:</strong><br /><a href="mailto:admissions@kapadiahighschool.com">admissions@kapadiahighschool.com</a></p>
                <p><strong>Principal&apos;s Office:</strong><br /><a href="mailto:principal@kapadiahighschool.com">principal@kapadiahighschool.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-content">
                <h2 className="form-title">Send a message</h2>
                <div className="form-underline"></div>
                <p className="form-description">Required fields are marked by the form. Include a phone number if you would prefer a call.</p>

                <ContactForm campuses={campuses} />
              </div>
            </div>

            <div className="col-lg-6 d-none d-lg-block">
              <div className="form-image-container">
                <SmartImage src="/static/image/campus_iffco.jpg" alt="Students outside a Kapadia High School campus building" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="row">
            <div className="col-12 section-heading-left mb-5">
              <h2 className="section-title">Campus locations</h2>
              <div className="section-underline"></div>
              <p className="section-description">Each campus runs its own office. The map shows the five locations.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <MapTabs />
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
