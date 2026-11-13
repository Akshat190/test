import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/facilities.css';

export const metadata: Metadata = pageMetadata({
  title: 'Facilities - Kapadia High School',
  description:
    'Facilities across Kapadia High School campuses: classrooms, science laboratories, library, sports grounds and transport.',
  path: '/facilities/',
});

export default function Page() {
  return (
    <PageShell>
      <div className="facilities-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="page-title">Facilities</h1>
              <div className="title-underline"></div>
              <p className="lead">Classrooms, laboratories, library, sports grounds and transport.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="intro-content">
                <p>At Kapadia High School, we believe that a conducive learning environment plays a crucial role in a student&apos;s educational journey. Our campuses are equipped with modern facilities and infrastructure designed to support academic excellence, physical development, and creative expression.</p>
                <p>We continuously invest in upgrading our facilities to ensure that our students have access to the best resources for their holistic development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="facilities-section academic-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Academic Facilities</h2>
              <div className="section-underline"></div>
              <p className="section-description">Modern classrooms and learning spaces designed for effective education</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="desktop" />
                </div>
                <h3>Smart Classrooms</h3>
                <p>Our classrooms are equipped with interactive smartboards, digital projectors, and audio systems to facilitate engaging and interactive learning experiences.</p>
                <ul className="facility-features">
                  <li>Interactive digital boards</li>
                  <li>Comfortable seating arrangements</li>
                  <li>Proper lighting and ventilation</li>
                  <li>Wi-Fi connectivity</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="flask" />
                </div>
                <h3>Science Laboratories</h3>
                <p>Our well-equipped science laboratories provide students with hands-on experience in physics, chemistry, and biology experiments.</p>
                <ul className="facility-features">
                  <li>Separate labs for Physics, Chemistry, and Biology</li>
                  <li>Modern lab equipment and apparatus</li>
                  <li>Safety gear and protocols</li>
                  <li>Qualified lab assistants</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="laptop" />
                </div>
                <h3>Computer Labs</h3>
                <p>Our computer laboratories are equipped with the latest hardware and software to ensure students develop essential digital literacy skills.</p>
                <ul className="facility-features">
                  <li>High-speed internet connectivity</li>
                  <li>Latest software applications</li>
                  <li>One computer per student policy</li>
                  <li>Regular upgrades and maintenance</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="book" />
                </div>
                <h3>Library &amp; Resource Center</h3>
                <p>Our extensive library houses a vast collection of books, journals, and digital resources to support academic research and foster a love for reading.</p>
                <ul className="facility-features">
                  <li>Over 10,000 books across various subjects</li>
                  <li>Digital catalog and e-resources</li>
                  <li>Comfortable reading spaces</li>
                  <li>Regular book exhibitions and reading events</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="comments" />
                </div>
                <h3>Language Laboratory</h3>
                <p>Our language lab is designed to enhance students&apos; communication skills in various languages through interactive audio-visual tools.</p>
                <ul className="facility-features">
                  <li>Audio-visual learning stations</li>
                  <li>Language learning software</li>
                  <li>Recording and playback facilities</li>
                  <li>Group discussion areas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="facilities-section sports-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Sports Facilities</h2>
              <div className="section-underline"></div>
              <p className="section-description">World-class sports infrastructure for physical fitness and competitive sports</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="table-tennis" />
                </div>
                <h3>Table Tennis</h3>
                <p>Our dedicated table tennis facilities provide students with professional-grade tables and equipment for practice and competition.</p>
                <ul className="facility-features">
                  <li>Multiple professional-grade tables</li>
                  <li>Quality paddles and balls</li>
                  <li>Tournament space</li>
                  <li>Professional coaching available</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="futbol" />
                </div>
                <h3>Football Ground</h3>
                <p>Our well-maintained football field provides ample space for practice sessions and matches, nurturing future football stars.</p>
                <ul className="facility-features">
                  <li>Standard size football field</li>
                  <li>Goal posts and equipment</li>
                  <li>Changing rooms and showers</li>
                  <li>Professional coaching staff</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="basketball-ball" />
                </div>
                <h3>Basketball Courts</h3>
                <p>Our basketball courts are equipped with professional-grade hoops and markings for practice and competitive play.</p>
                <ul className="facility-features">
                  <li>Multiple full-size courts</li>
                  <li>Professional-grade hoops</li>
                  <li>Scoreboards and equipment</li>
                  <li>Seasonal tournaments</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="running" />
                </div>
                <h3>Kho-Kho Court</h3>
                <p>Our traditional Indian sport facility includes a regulation-sized kho-kho court with proper markings and safety measures.</p>
                <ul className="facility-features">
                  <li>Regulation-sized kho-kho court</li>
                  <li>Proper safety padding</li>
                  <li>Professional coaching</li>
                  <li>Annual kho-kho tournament</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="child" />
                </div>
                <h3>Playground</h3>
                <p>Our expansive playground provides space for various recreational activities and outdoor games for younger students.</p>
                <ul className="facility-features">
                  <li>Spacious open area</li>
                  <li>Safety equipment and supervision</li>
                  <li>Age-appropriate play equipment</li>
                  <li>Recreational activities space</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="facilities-section cultural-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Arts &amp; Cultural Facilities</h2>
              <div className="section-underline"></div>
              <p className="section-description">Dedicated spaces for nurturing creativity and artistic expression</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="music" />
                </div>
                <h3>Music Room</h3>
                <p>Our dedicated music room is equipped with various musical instruments and recording facilities for students interested in music.</p>
                <ul className="facility-features">
                  <li>Various musical instruments</li>
                  <li>Sound-proof practice rooms</li>
                  <li>Recording equipment</li>
                  <li>Music theory resources</li>
                  <li>Qualified music instructors</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="paint-brush" />
                </div>
                <h3>Art Studio</h3>
                <p>Our art studio provides a creative space for students to explore various art forms and develop their artistic skills.</p>
                <ul className="facility-features">
                  <li>Spacious workstations</li>
                  <li>Art supplies and materials</li>
                  <li>Pottery and sculpture area</li>
                  <li>Exhibition space</li>
                  <li>Natural lighting</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="facility-card">
                <div className="facility-icon">
                  <Icon name="theater-masks" />
                </div>
                <h3>Dance Studio</h3>
                <p>Our dance studio features wooden flooring, mirrors, and sound systems for various dance forms and choreography practice.</p>
                <ul className="facility-features">
                  <li>Sprung wooden flooring</li>
                  <li>Wall-to-wall mirrors</li>
                  <li>Professional sound system</li>
                  <li>Changing rooms</li>
                  <li>Dance props and costumes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empty row the template leaves outside its commented-out "Other Facilities" block; kept for identical spacing. */}
      <div className="row mt-5"></div>
    </PageShell>
  );
}
