import PageBand from '@/components/PageBand';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/institutional_goals.css';

export const metadata: Metadata = pageMetadata({
  title: 'Institutional Goals - Kapadia High School',
  description:
    'The institutional goals that guide teaching and learning at Kapadia High School, founded in 1956.',
  path: '/institutional-goals/',
});

export default function Page() {
  return (
    <PageShell>
      <PageBand title="Institutional goals" lead="The principles that guide teaching and learning." />

      <section className="goals-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="goals-intro">
                <p>
                  At Kapadia High School, we are committed to providing a holistic education that
                  prepares students for success in all aspects of life. Our institutional goals
                  guide our educational approach and shape our learning environment.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 mb-4">
              <div className="goal-card">
                <div className="goal-icon">
                  <Icon name="graduation-cap" />
                </div>
                <h3>Academic Excellence</h3>
                <div className="card-underline"></div>
                <p>
                  To foster a culture of academic excellence by providing rigorous curriculum,
                  innovative teaching methodologies, and continuous assessment that challenges
                  students to reach their highest potential.
                </p>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="goal-card">
                <div className="goal-icon">
                  <Icon name="heart" />
                </div>
                <h3>Character Development</h3>
                <div className="card-underline"></div>
                <p>
                  To nurture ethical values, integrity, respect, and responsibility in our
                  students, preparing them to be conscientious citizens who contribute positively to
                  society.
                </p>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="goal-card">
                <div className="goal-icon">
                  <Icon name="globe" />
                </div>
                <h3>Global Perspective</h3>
                <div className="card-underline"></div>
                <p>
                  To develop students with a global mindset who understand and appreciate diverse
                  cultures, perspectives, and ideas in our interconnected world.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="goal-card">
                <div className="goal-icon">
                  <Icon name="lightbulb-o" />
                </div>
                <h3>Critical Thinking</h3>
                <div className="card-underline"></div>
                <p>
                  To cultivate analytical and critical thinking skills that enable students to
                  evaluate information, solve complex problems, and make informed decisions.
                </p>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="goal-card">
                <div className="goal-icon">
                  <Icon name="balance-scale" />
                </div>
                <h3>Holistic Development</h3>
                <div className="card-underline"></div>
                <p>
                  To provide a balanced education that nurtures intellectual, physical, emotional,
                  and social growth, allowing students to discover and develop their unique talents
                  and interests.
                </p>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="goal-card">
                <div className="goal-icon">
                  <Icon name="users" />
                </div>
                <h3>Community Engagement</h3>
                <div className="card-underline"></div>
                <p>
                  To foster a strong sense of community involvement and service, encouraging
                  students to actively participate in initiatives that address social challenges
                  and contribute to the greater good.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="objectives-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Our Strategic Objectives</h2>
              <div className="title-underline"></div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6">
              <div className="objective-item">
                <div className="objective-number">01</div>
                <div className="objective-content">
                  <h4>Innovative Curriculum</h4>
                  <p>
                    Continuously update and enhance our curriculum to incorporate the latest
                    educational research, technological advancements, and industry requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="objective-item">
                <div className="objective-number">02</div>
                <div className="objective-content">
                  <h4>Faculty Development</h4>
                  <p>
                    Invest in ongoing professional development for our faculty to ensure they
                    remain at the forefront of educational practices and subject expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6">
              <div className="objective-item">
                <div className="objective-number">03</div>
                <div className="objective-content">
                  <h4>Technology Integration</h4>
                  <p>
                    Integrate cutting-edge technology into our teaching and learning processes to
                    prepare students for the digital age.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="objective-item">
                <div className="objective-number">04</div>
                <div className="objective-content">
                  <h4>Student Support Systems</h4>
                  <p>
                    Develop comprehensive support systems that address the academic, emotional, and
                    social needs of all students.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6">
              <div className="objective-item">
                <div className="objective-number">05</div>
                <div className="objective-content">
                  <h4>Infrastructure Enhancement</h4>
                  <p>
                    Continuously improve our physical and digital infrastructure to create an
                    optimal learning environment.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="objective-item">
                <div className="objective-number">06</div>
                <div className="objective-content">
                  <h4>Community Partnerships</h4>
                  <p>
                    Forge strong partnerships with parents, alumni, local businesses, and community
                    organizations to enrich the educational experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
