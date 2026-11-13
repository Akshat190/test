import PageBand from '@/components/PageBand';
import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/our_team.css';

export const metadata: Metadata = pageMetadata({
  title: 'Leadership Team | Kapadia High School',
  description:
    "The leadership team guiding Kapadia High School: the Principal's office and academic department heads across our five Gujarat campuses.",
  path: '/our-team/',
});

export default function Page() {
  return (
    <PageShell>
      <PageBand title="Leadership team" lead="The principal and department heads." />

      <section className="leadership-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Leadership</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Our school is led by experienced educators committed to excellence in education.
              </p>
            </div>
          </div>

          <div className="row mt-5 justify-content-center">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="team-card">
                <div className="team-image">
                  <div className="avatar-initials avatar-initials--tall" aria-hidden="true">
                    RK
                  </div>
                </div>
                <div className="team-info">
                  <h3>Dr. Rajesh Kapadia</h3>
                  <div className="team-position">Principal</div>
                  <div className="team-underline"></div>
                  <p>
                    With over 25 years of experience in education, Dr. Kapadia leads our institution
                    with vision and dedication to academic excellence.
                  </p>
                  <div className="team-contact">
                    <a href="mailto:principal@kapadiahighschool.com">
                      <Icon name="envelope" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="team-card">
                <div className="team-image">
                  <div className="avatar-initials avatar-initials--tall" aria-hidden="true">
                    PS
                  </div>
                </div>
                <div className="team-info">
                  <h3>Mrs. Priya Sharma</h3>
                  <div className="team-position">Vice Principal</div>
                  <div className="team-underline"></div>
                  <p>
                    Mrs. Sharma oversees academic programs and student development initiatives with
                    her expertise in educational psychology.
                  </p>
                  <div className="team-contact">
                    <a href="mailto:vp@kapadiahighschool.com">
                      <Icon name="envelope" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="team-card">
                <div className="team-image">
                  <div className="avatar-initials avatar-initials--tall" aria-hidden="true">
                    AP
                  </div>
                </div>
                <div className="team-info">
                  <h3>Mr. Anand Patel</h3>
                  <div className="team-position">Administrative Director</div>
                  <div className="team-underline"></div>
                  <p>
                    Mr. Patel manages the operational aspects of our school, ensuring smooth
                    functioning of all administrative processes.
                  </p>
                  <div className="team-contact">
                    <a href="mailto:admin@kapadiahighschool.com">
                      <Icon name="envelope" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="department-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Department Heads</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Our academic departments are led by experienced educators who bring expertise and
                passion to their subjects.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dept-card">
                <div className="dept-icon">
                  <Icon name="flask" />
                </div>
                <h4>Science Department</h4>
                <div className="dept-underline"></div>
                <h5>Dr. Meera Joshi</h5>
                <p>Ph.D. in Physics with 15 years of teaching experience</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dept-card">
                <div className="dept-icon">
                  <Icon name="calculator" />
                </div>
                <h4>Mathematics Department</h4>
                <div className="dept-underline"></div>
                <h5>Prof. Sunil Mehta</h5>
                <p>M.Sc. in Mathematics with specialization in Applied Mathematics</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dept-card">
                <div className="dept-icon">
                  <Icon name="book" />
                </div>
                <h4>Languages Department</h4>
                <div className="dept-underline"></div>
                <h5>Mrs. Anjali Desai</h5>
                <p>M.A. in English Literature and certified language instructor</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dept-card">
                <div className="dept-icon">
                  <Icon name="globe" />
                </div>
                <h4>Social Sciences Department</h4>
                <div className="dept-underline"></div>
                <h5>Mr. Vikram Singh</h5>
                <p>M.A. in History with research focus on Indian cultural heritage</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dept-card">
                <div className="dept-icon">
                  <Icon name="laptop" />
                </div>
                <h4>Computer Science Department</h4>
                <div className="dept-underline"></div>
                <h5>Mr. Rahul Verma</h5>
                <p>M.Tech in Computer Science with industry experience</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dept-card">
                <div className="dept-icon">
                  <Icon name="paint-brush" />
                </div>
                <h4>Arts Department</h4>
                <div className="dept-underline"></div>
                <h5>Ms. Kavita Rao</h5>
                <p>Fine Arts graduate with expertise in multiple artistic mediums</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dept-card">
                <div className="dept-icon">
                  <Icon name="futbol-o" />
                </div>
                <h4>Physical Education Department</h4>
                <div className="dept-underline"></div>
                <h5>Mr. Sanjay Kumar</h5>
                <p>Former state-level athlete with specialization in sports coaching</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dept-card">
                <div className="dept-icon">
                  <Icon name="comments" />
                </div>
                <h4>Counseling Department</h4>
                <div className="dept-underline"></div>
                <h5>Dr. Neha Gupta</h5>
                <p>Licensed psychologist specializing in adolescent development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Support Staff</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Our dedicated support staff ensures the smooth operation of all school functions.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="staff-card">
                <h4>Administrative Office</h4>
                <p>
                  Our administrative team handles admissions, records, and day-to-day operations.
                </p>
                <div className="staff-count">5 members</div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="staff-card">
                <h4>Library Staff</h4>
                <p>
                  Our librarians maintain our extensive collection and assist students with
                  research.
                </p>
                <div className="staff-count">3 members</div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="staff-card">
                <h4>IT Support</h4>
                <p>
                  Our IT team ensures all technology infrastructure runs smoothly for uninterrupted
                  learning.
                </p>
                <div className="staff-count">2 members</div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="staff-card">
                <h4>Maintenance Staff</h4>
                <p>Our maintenance team keeps our campus clean, safe, and well-maintained for all.</p>
                <div className="staff-count">8 members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2>Join Our Team</h2>
              <p>
                We're always looking for passionate educators and support staff to join our school
                community. If you're interested in making a difference in students' lives, we'd love
                to hear from you.
              </p>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <Link className="btn btn-primary join-btn" href="/contact/">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
