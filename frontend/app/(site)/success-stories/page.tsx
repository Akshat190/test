import PageBand from '@/components/PageBand';
import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/success_stories.css';

export const metadata: Metadata = pageMetadata({
  title: 'Success Stories - Kapadia High School',
  description:
    'Success stories and notable achievements of Kapadia High School alumni and students.',
  path: '/success-stories/',
});

export default function Page() {
  return (
    <PageShell>
      <PageBand title="Success stories" lead="Students and alumni from Kapadia High School." />

      <section className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="intro-content">
                <p>
                  At Kapadia High School, we take immense pride in the accomplishments of our
                  students and alumni. Their success stories reflect our commitment to providing
                  quality education and nurturing well-rounded individuals who excel in various
                  fields.
                </p>
                <p>
                  From academic achievements to professional accomplishments, our students continue
                  to make their mark in the world, embodying the values and skills they developed
                  during their time at Kapadia High School.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="alumni-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Alumni Spotlight</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Our graduates have gone on to achieve remarkable success in various fields.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-6 mb-5">
              <div className="alumni-card">
                <div className="row">
                  <div className="col-md-4">
                    <div className="alumni-image">
                      <div className="avatar-initials" aria-hidden="true">
                        VP
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="alumni-info">
                      <h3>Dr. Vikram Patel</h3>
                      <div className="alumni-year">Class of 2005</div>
                      <div className="alumni-profession">Neurosurgeon at Apollo Hospitals</div>
                      <div className="alumni-underline"></div>
                      <p>
                        Dr. Patel graduated from Kapadia High School in 2005 and went on to pursue
                        medicine at AIIMS, Delhi. After completing his specialization in
                        neurosurgery, he now serves as a leading neurosurgeon at Apollo Hospitals.
                      </p>
                      <div className="alumni-quote">
                        <Icon name="quote-left" />
                        <span>
                          The foundation of critical thinking and perseverance I developed at
                          Kapadia High School has been instrumental in my medical career.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5">
              <div className="alumni-card">
                <div className="row">
                  <div className="col-md-4">
                    <div className="alumni-image">
                      <div className="avatar-initials" aria-hidden="true">
                        PM
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="alumni-info">
                      <h3>Priya Mehta</h3>
                      <div className="alumni-year">Class of 2008</div>
                      <div className="alumni-profession">Tech Entrepreneur &amp; CEO</div>
                      <div className="alumni-underline"></div>
                      <p>
                        After graduating from Kapadia High School, Priya pursued Computer Science at
                        IIT Bombay. She later founded her own tech startup which has now grown into a
                        successful company with international clients.
                      </p>
                      <div className="alumni-quote">
                        <Icon name="quote-left" />
                        <span>
                          My teachers at Kapadia encouraged me to think innovatively and pursue my
                          passion for technology.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5">
              <div className="alumni-card">
                <div className="row">
                  <div className="col-md-4">
                    <div className="alumni-image">
                      <div className="avatar-initials" aria-hidden="true">
                        RS
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="alumni-info">
                      <h3>Rahul Sharma</h3>
                      <div className="alumni-year">Class of 2010</div>
                      <div className="alumni-profession">International Civil Servant at UN</div>
                      <div className="alumni-underline"></div>
                      <p>
                        Rahul graduated from Kapadia High School and went on to study International
                        Relations at JNU, Delhi. After completing his Master's from LSE, he now works
                        with the United Nations on sustainable development projects.
                      </p>
                      <div className="alumni-quote">
                        <Icon name="quote-left" />
                        <span>
                          The diverse cultural exposure and emphasis on social responsibility at
                          Kapadia shaped my worldview and career path.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5">
              <div className="alumni-card">
                <div className="row">
                  <div className="col-md-4">
                    <div className="alumni-image">
                      <div className="avatar-initials" aria-hidden="true">
                        AD
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="alumni-info">
                      <h3>Anjali Desai</h3>
                      <div className="alumni-year">Class of 2012</div>
                      <div className="alumni-profession">Award-winning Scientist</div>
                      <div className="alumni-underline"></div>
                      <p>
                        Anjali's passion for science was nurtured at Kapadia High School. She pursued
                        research in Biotechnology and has received national recognition for her work
                        on sustainable agricultural practices.
                      </p>
                      <div className="alumni-quote">
                        <Icon name="quote-left" />
                        <span>
                          The hands-on science labs and encouraging teachers at Kapadia sparked my
                          curiosity and love for scientific research.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Recent Student Achievements</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Our current students continue to excel in academics, sports, arts, and other fields.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-6 mb-4">
              <div className="achievement-card">
                <div className="achievement-header">
                  <div className="achievement-icon">
                    <Icon name="graduation-cap" />
                  </div>
                  <h3>Academic Excellence</h3>
                </div>
                <div className="achievement-content">
                  <ul className="achievement-list">
                    <li>
                      <div className="achievement-title">National Science Olympiad</div>
                      <div className="achievement-details">
                        Arjun Singh (Class 10) secured 3rd rank at the national level
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">International Mathematics Competition</div>
                      <div className="achievement-details">
                        Our school team ranked among the top 10 in the international finals
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">CBSE Board Examinations</div>
                      <div className="achievement-details">
                        5 students from our school ranked in the top 100 nationally
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">National Debate Championship</div>
                      <div className="achievement-details">
                        Meera Patel (Class 12) won the Best Speaker award
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="achievement-card">
                <div className="achievement-header">
                  <div className="achievement-icon">
                    <Icon name="futbol-o" />
                  </div>
                  <h3>Sports Excellence</h3>
                </div>
                <div className="achievement-content">
                  <ul className="achievement-list">
                    <li>
                      <div className="achievement-title">State Cricket Championship</div>
                      <div className="achievement-details">
                        Our school team won the state championship for the third consecutive year
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">National Swimming Competition</div>
                      <div className="achievement-details">
                        Riya Shah (Class 9) won gold medals in 100m and 200m freestyle
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">District Athletics Meet</div>
                      <div className="achievement-details">
                        Our students won a total of 12 medals including 5 gold
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">Chess Tournament</div>
                      <div className="achievement-details">
                        Aditya Kumar (Class 8) qualified for the national level championship
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="achievement-card">
                <div className="achievement-header">
                  <div className="achievement-icon">
                    <Icon name="paint-brush" />
                  </div>
                  <h3>Arts &amp; Cultural Achievements</h3>
                </div>
                <div className="achievement-content">
                  <ul className="achievement-list">
                    <li>
                      <div className="achievement-title">National Painting Competition</div>
                      <div className="achievement-details">
                        Neha Joshi (Class 11) won first prize for her artwork on environmental
                        conservation
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">Inter-School Dance Festival</div>
                      <div className="achievement-details">
                        Our classical dance team won the championship trophy
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">State Music Competition</div>
                      <div className="achievement-details">
                        School choir received special recognition for their performance
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">Drama Festival</div>
                      <div className="achievement-details">
                        Our drama team's production on social issues received critical acclaim
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="achievement-card">
                <div className="achievement-header">
                  <div className="achievement-icon">
                    <Icon name="lightbulb-o" />
                  </div>
                  <h3>Innovation &amp; Technology</h3>
                </div>
                <div className="achievement-content">
                  <ul className="achievement-list">
                    <li>
                      <div className="achievement-title">National Science Project Competition</div>
                      <div className="achievement-details">
                        Team of Class 12 students developed an eco-friendly water filtration system
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">Robotics Challenge</div>
                      <div className="achievement-details">
                        Our robotics team qualified for the international finals
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">Coding Championship</div>
                      <div className="achievement-details">
                        Rohan Mehta (Class 10) won the junior category in app development
                      </div>
                    </li>
                    <li>
                      <div className="achievement-title">Innovation Challenge</div>
                      <div className="achievement-details">
                        Student project on smart waste management received funding for prototype
                        development
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="share-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2>Share Your Success Story</h2>
              <p>
                Are you a former student of Kapadia High School with an inspiring journey to share?
                We'd love to hear from you and feature your story on our website. Your experiences
                can motivate current students and showcase the impact of a Kapadia education.
              </p>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <Link className="btn btn-primary share-btn" href="/contact/">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
