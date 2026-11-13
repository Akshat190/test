import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/activities.css';

export const metadata: Metadata = pageMetadata({
  title: 'Activities | Kapadia High School, Kalol',
  description:
    'Sports, cultural programmes and academic clubs at Kapadia High School — activities that run alongside classroom learning across five campuses.',
  path: '/activities/',
});

export default function Page() {
  return (
    <PageShell>
      <div className="activities-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="page-title">Activities</h1>
              <div className="title-underline"></div>
              <p className="lead">Sports, culture and clubs beyond the classroom.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="intro-content">
                <p>At Kapadia High School, we believe in holistic education that extends beyond the classroom. Our diverse range of activities are designed to nurture talents, build character, and create well-rounded individuals ready to face the challenges of tomorrow.</p>
                <p>Through our carefully curated extracurricular programs, students discover new interests, develop essential life skills, and create lasting memories that shape their educational journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="activities-section sports-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Sports Activities</h2>
              <div className="section-underline"></div>
              <p className="section-description">Physical fitness and sportsmanship are integral parts of our educational philosophy.</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-sport">
                  <Icon name="football-ball" />
                </div>
                <div className="activity-info">
                  <h3>Cricket</h3>
                  <div className="activity-underline"></div>
                  <p>Our cricket team participates in inter-school tournaments and has won several district-level championships.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-sport">
                  <Icon name="basketball-ball" />
                </div>
                <div className="activity-info">
                  <h3>Basketball</h3>
                  <div className="activity-underline"></div>
                  <p>Our state-of-the-art basketball court hosts regular practice sessions and competitive matches.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-sport">
                  <Icon name="running" />
                </div>
                <div className="activity-info">
                  <h3>Athletics</h3>
                  <div className="activity-underline"></div>
                  <p>Our annual sports meet showcases the athletic talents of our students in various track and field events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="activities-section cultural-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Cultural Activities</h2>
              <div className="section-underline"></div>
              <p className="section-description">We encourage students to explore and express their creativity through various cultural programs.</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-cultural">
                  <Icon name="music" />
                </div>
                <div className="activity-info">
                  <h3>Dance</h3>
                  <div className="activity-underline"></div>
                  <p>Our dance troupe performs various classical and contemporary dance forms at school functions and competitions.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-cultural">
                  <Icon name="guitar" />
                </div>
                <div className="activity-info">
                  <h3>Music</h3>
                  <div className="activity-underline"></div>
                  <p>Students learn vocal and instrumental music under the guidance of experienced teachers.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-cultural">
                  <Icon name="theater-masks" />
                </div>
                <div className="activity-info">
                  <h3>Drama</h3>
                  <div className="activity-underline"></div>
                  <p>Our drama club stages plays and skits that showcase the acting talents of our students.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="activities-section academic-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Academic Activities</h2>
              <div className="section-underline"></div>
              <p className="section-description">We organize various academic activities to enhance learning beyond the classroom.</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-academic">
                  <Icon name="atom" />
                </div>
                <div className="activity-info">
                  <h3>Science Club</h3>
                  <div className="activity-underline"></div>
                  <p>Our science club conducts experiments, organizes science fairs, and participates in science competitions.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-academic">
                  <Icon name="comments" />
                </div>
                <div className="activity-info">
                  <h3>Debate Club</h3>
                  <div className="activity-underline"></div>
                  <p>Students develop public speaking skills and critical thinking through regular debate sessions.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-academic">
                  <Icon name="robot" />
                </div>
                <div className="activity-info">
                  <h3>Robotics Club</h3>
                  <div className="activity-underline"></div>
                  <p>Students learn to design, build, and program robots, preparing them for the technological future.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="activities-section events-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Annual Events</h2>
              <div className="section-underline"></div>
              <p className="section-description">Our school calendar is filled with exciting events throughout the academic year.</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-event">
                  <Icon name="star" />
                </div>
                <div className="activity-info">
                  <h3>Annual Day</h3>
                  <div className="activity-underline"></div>
                  <p>A grand celebration showcasing the talents of our students through various cultural performances.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-event">
                  <Icon name="trophy" />
                </div>
                <div className="activity-info">
                  <h3>Sports Day</h3>
                  <div className="activity-underline"></div>
                  <p>A day dedicated to athletic competitions, showcasing the sporting talents of our students.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="activity-card">
                <div className="activity-icon activity-icon-event">
                  <Icon name="flask" />
                </div>
                <div className="activity-info">
                  <h3>Science Exhibition</h3>
                  <div className="activity-underline"></div>
                  <p>Students showcase their scientific knowledge through innovative projects and models.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
