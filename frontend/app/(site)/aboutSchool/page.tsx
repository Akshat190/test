import PageBand from '@/components/PageBand';
import SmartImage from '@/components/SmartImage';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/aboutSchool.css';

export const metadata: Metadata = pageMetadata({
  title: 'About Our School - Kapadia High School',
  description:
    'About Kapadia High School, founded in 1956 in Kalol, Gujarat: our history, educational philosophy and approach to co-educational English medium schooling.',
  path: '/aboutSchool/',
});

export default function Page() {
  return (
    <PageShell>
      <PageBand title="About the school" lead="Founded in 1956 in Kalol, Gujarat. Five campuses, CBSE and GSEB." />

      <section className="about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 about-content">
              <h2>About HB Kapadia School</h2>
              <div className="section-underline"></div>
              <p>
                Founded in 1952 by the visionary educationist Mr. Haribhai Kalyandas Kapadia, our
                school has grown from humble beginnings to become one of Gujarat&apos;s premier
                educational institutions. With over seven decades of excellence, we continue to
                nurture young minds and shape future leaders.
              </p>

              <p>
                Our institution stands as a testament to Mr. Kapadia&apos;s vision of holistic
                education that combines academic rigor with character development. Today, we serve
                students across multiple campuses, maintaining the highest standards of education
                while staying true to our founding principles.
              </p>

              <p>
                We believe in fostering an environment where students can explore their talents,
                develop critical thinking skills, and grow into responsible citizens. Our dedicated
                faculty and staff work tirelessly to ensure each student receives personalized
                attention and guidance.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="about-image-container">
                <SmartImage
                  src="/static/image/campus_chhatral.jpg"
                  alt="The Chhatral campus building and grounds"
                  className="about-image img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-vision-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="mission-card">
                <div className="mission-icon">
                  <Icon name="bullseye" />
                </div>
                <h3>Our Mission</h3>
                <div className="card-underline"></div>
                <p>
                  To provide quality education that empowers students with knowledge, skills, and
                  values necessary to become responsible global citizens and lifelong learners.
                </p>

                <ul className="mission-points">
                  <li>
                    <Icon name="check-circle" /> Foster intellectual curiosity and
                    critical thinking
                  </li>
                  <li>
                    <Icon name="check-circle" /> Promote ethical values and social
                    responsibility
                  </li>
                  <li>
                    <Icon name="check-circle" /> Encourage creativity and innovation
                  </li>
                  <li>
                    <Icon name="check-circle" /> Develop leadership qualities and
                    teamwork skills
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="vision-card">
                <div className="vision-icon">
                  <Icon name="eye" />
                </div>
                <h3>Our Vision</h3>
                <div className="card-underline"></div>
                <p>
                  To be a beacon of educational excellence that inspires generations of learners to
                  achieve their full potential and contribute meaningfully to society.
                </p>

                <ul className="vision-points">
                  <li>
                    <Icon name="star" /> Academic excellence through innovative teaching
                    methods
                  </li>
                  <li>
                    <Icon name="star" /> Holistic development of mind, body, and spirit
                  </li>
                  <li>
                    <Icon name="star" /> Inclusive environment that celebrates diversity
                  </li>
                  <li>
                    <Icon name="star" /> Sustainable practices for environmental
                    stewardship
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2>Our Educational Approach</h2>
              <div className="section-underline mx-auto"></div>
              <p className="lead">
                We combine traditional values with modern pedagogy to create a unique learning
                experience
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="approach-card">
                <div className="approach-icon">
                  <Icon name="book-open" />
                </div>
                <h3>Academic Excellence</h3>
                <p>
                  Rigorous curriculum designed to challenge students intellectually while nurturing
                  their individual strengths and interests.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="approach-card">
                <div className="approach-icon">
                  <Icon name="users" />
                </div>
                <h3>Character Building</h3>
                <p>
                  Emphasis on moral values, ethics, and social responsibility to develop
                  well-rounded individuals.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="approach-card">
                <div className="approach-icon">
                  <Icon name="flask" />
                </div>
                <h3>Innovation &amp; Creativity</h3>
                <p>
                  Encouraging creative thinking, scientific inquiry, and technological literacy for
                  the modern world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="legacy-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto">
              <h2>Our founder&apos;s legacy</h2>
              <div className="section-underline"></div>
              <p>
                Mr. Haribhai Kalyandas Kapadia established our school with a vision to provide
                quality education rooted in Indian values while embracing global perspectives. His
                philosophy continues to guide our educational approach today.
              </p>

              <p>
                The founder believed that education should not merely impart knowledge but also
                shape character. This principle remains at the heart of our institution, influencing
                everything from our curriculum design to our extracurricular activities.
              </p>

              <p>
                Under his leadership, the school laid strong foundations that have enabled
                successive generations to build upon his vision. Today, we honor his legacy by
                continuing to strive for excellence in all our endeavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="campuses" className="campus-section">
        <div className="container">
          <h2 className="section-title text-center">Our Campuses</h2>
          <div className="section-divider mx-auto"></div>

          <div className="campus-layout">
            <div className="campus-row campus-row-top">
              <div className="campus-item">
                <div className="campus-pin">
                  <Icon name="map-marker-alt" />
                </div>
                <div className="campus-card">
                  <h3>Chandkheda</h3>
                  <span>Primary Campus</span>
                </div>
              </div>

              <div className="campus-item">
                <div className="campus-pin">
                  <Icon name="map-marker-alt" />
                </div>
                <div className="campus-card">
                  <h3>Chhatral</h3>
                  <span>Secondary Campus</span>
                </div>
              </div>

              <div className="campus-item">
                <div className="campus-pin">
                  <Icon name="map-marker-alt" />
                </div>
                <div className="campus-card">
                  <h3>IFFCO Township</h3>
                  <span>Special Programs</span>
                </div>
              </div>
            </div>

            <div className="campus-row campus-row-bottom">
              <div className="campus-item">
                <div className="campus-pin">
                  <Icon name="map-marker-alt" />
                </div>
                <div className="campus-card">
                  <h3>Kadi</h3>
                  <span>Branch Campus</span>
                </div>
              </div>

              <div className="campus-item">
                <div className="campus-pin">
                  <Icon name="map-marker-alt" />
                </div>
                <div className="campus-card">
                  <h3>Shela</h3>
                  <span>New Campus</span>
                </div>
              </div>
            </div>

            <div className="campus-connector-vertical"></div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
