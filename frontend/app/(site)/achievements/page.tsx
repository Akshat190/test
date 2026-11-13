import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/achievements.css';

export const metadata: Metadata = pageMetadata({
  title: 'Achievements - Kapadia High School',
  description:
    'Academic, sporting and cultural achievements of Kapadia High School students across our CBSE and GSEB campuses.',
  path: '/achievements/',
});

export default function Page() {
  return (
    <PageShell>
      <div className="achievements-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="page-title">Achievements</h1>
              <div className="title-underline"></div>
              <p className="lead">Results and recognition from across the campuses.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="intro-content">
                <p>At Kapadia High School, we take immense pride in the accomplishments of our students, faculty, and institution as a whole. Our achievements reflect our commitment to excellence in education and holistic development.</p>
                <p>From academic honors to sporting victories, cultural accolades to community service recognition, our school community continues to excel in various fields, embodying our motto of &quot;Excellence in All Endeavors.&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements-section academic-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Academic Achievements</h2>
              <div className="section-underline"></div>
              <p className="section-description">Our students consistently excel in academics, securing top positions in board examinations and competitive tests.</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="graduation-cap" />
                </div>
                <div className="achievement-content">
                  <h3>100% Pass Rate</h3>
                  <p>Our school has maintained a 100% pass rate in the State Board Examinations for the past 10 consecutive years.</p>
                  <div className="achievement-year">2013-2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="star" />
                </div>
                <div className="achievement-content">
                  <h3>State Toppers</h3>
                  <p>Our students have secured positions in the top 10 ranks at the state level board examinations for 5 consecutive years.</p>
                  <div className="achievement-year">2019-2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="university" />
                </div>
                <div className="achievement-content">
                  <h3>College Admissions</h3>
                  <p>Over 85% of our graduates secure admissions in prestigious universities and colleges across the country and abroad.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="book" />
                </div>
                <div className="achievement-content">
                  <h3>National Science Olympiad</h3>
                  <p>Our students have won gold medals in the National Science Olympiad for three consecutive years.</p>
                  <div className="achievement-year">2021-2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="calculator" />
                </div>
                <div className="achievement-content">
                  <h3>Mathematics Competition</h3>
                  <p>Our school team secured first place in the State Mathematics Competition, demonstrating exceptional problem-solving skills.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="flask" />
                </div>
                <div className="achievement-content">
                  <h3>Science Exhibition</h3>
                  <p>Our students won the Best Innovation Award at the National Level Science Exhibition for their project on renewable energy.</p>
                  <div className="achievement-year">2022</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements-section sports-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Sports Achievements</h2>
              <div className="section-underline"></div>
              <p className="section-description">Our students have excelled in various sports at district, state, and national levels.</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="futbol" />
                </div>
                <div className="achievement-content">
                  <h3>District Cricket Champions</h3>
                  <p>Our cricket team won the District Championship for three consecutive years, showcasing exceptional teamwork and skill.</p>
                  <div className="achievement-year">2021-2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="basketball-ball" />
                </div>
                <div className="achievement-content">
                  <h3>State Basketball Runners-up</h3>
                  <p>Our girls&apos; basketball team secured the second position in the State Basketball Championship.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="running" />
                </div>
                <div className="achievement-content">
                  <h3>National Athletics</h3>
                  <p>Our student, Rahul Patel, won a gold medal in the 400m race at the National School Games.</p>
                  <div className="achievement-year">2022</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="table-tennis" />
                </div>
                <div className="achievement-content">
                  <h3>Table Tennis Champion</h3>
                  <p>Priya Sharma won the individual championship in table tennis at the state level competition.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="chess" />
                </div>
                <div className="achievement-content">
                  <h3>Chess Tournament</h3>
                  <p>Our chess team secured the first position in the Inter-School Chess Tournament at the district level.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="volleyball-ball" />
                </div>
                <div className="achievement-content">
                  <h3>Volleyball Champions</h3>
                  <p>Our boys&apos; volleyball team won the District Championship and represented the district at the state level.</p>
                  <div className="achievement-year">2022</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements-section cultural-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Cultural Achievements</h2>
              <div className="section-underline"></div>
              <p className="section-description">Our students have showcased their talents in various cultural competitions and events.</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="music" />
                </div>
                <div className="achievement-content">
                  <h3>Music Competition</h3>
                  <p>Our school choir won the first prize in the State Level Music Competition with their mesmerizing performance.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="paint-brush" />
                </div>
                <div className="achievement-content">
                  <h3>Art Exhibition</h3>
                  <p>Our students&apos; artwork was displayed at the National Art Gallery, receiving appreciation from renowned artists.</p>
                  <div className="achievement-year">2022</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="theater-masks" />
                </div>
                <div className="achievement-content">
                  <h3>Drama Competition</h3>
                  <p>Our drama team won the Best Play Award at the Inter-School Drama Competition with their performance of &quot;The Glass Menagerie.&quot;</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="microphone-alt" />
                </div>
                <div className="achievement-content">
                  <h3>Debate Competition</h3>
                  <p>Our debate team secured the first position in the State Level Debate Competition, demonstrating exceptional oratory skills.</p>
                  <div className="achievement-year">2022</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="camera" />
                </div>
                <div className="achievement-content">
                  <h3>Photography Contest</h3>
                  <p>Our student, Amit Shah, won the first prize in the National Photography Contest with his captivating photograph.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="pen-alt" />
                </div>
                <div className="achievement-content">
                  <h3>Essay Writing Competition</h3>
                  <p>Our students secured the top three positions in the District Level Essay Writing Competition, showcasing their literary prowess.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements-section institutional-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Institutional Achievements</h2>
              <div className="section-underline"></div>
              <p className="section-description">Our school has been recognized for its excellence in education and infrastructure.</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="award" />
                </div>
                <div className="achievement-content">
                  <h3>Best School Award</h3>
                  <p>Kapadia High School was awarded the &quot;Best School in the District&quot; by the Education Department for its outstanding academic performance.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="leaf" />
                </div>
                <div className="achievement-content">
                  <h3>Green School Award</h3>
                  <p>Our school received the &quot;Green School Award&quot; for its eco-friendly initiatives and sustainable practices.</p>
                  <div className="achievement-year">2022</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="laptop" />
                </div>
                <div className="achievement-content">
                  <h3>Digital Innovation Award</h3>
                  <p>Kapadia High School was recognized for its innovative use of technology in education with the &quot;Digital Innovation Award.&quot;</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="users" />
                </div>
                <div className="achievement-content">
                  <h3>Community Service Recognition</h3>
                  <p>Our school was honored for its community service initiatives and social responsibility programs.</p>
                  <div className="achievement-year">2022</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="book-open" />
                </div>
                <div className="achievement-content">
                  <h3>Library Excellence Award</h3>
                  <p>Our school library was recognized as one of the best in the state for its extensive collection and digital resources.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="achievement-card">
                <div className="achievement-icon">
                  <Icon name="chalkboard-teacher" />
                </div>
                <div className="achievement-content">
                  <h3>Teaching Excellence Award</h3>
                  <p>Our faculty was recognized for their innovative teaching methodologies and dedication to student success.</p>
                  <div className="achievement-year">2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
