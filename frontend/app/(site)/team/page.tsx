import PageBand from '@/components/PageBand';
import Link from 'next/link';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import TeamScripts from '@/components/TeamScripts';
import { pageMetadata } from '@/lib/metadata';
import '@/css/team.css';

export const metadata: Metadata = pageMetadata({
  title: 'Our Faculty - Kapadia High School',
  description: "Meet the faculty of Kapadia High School: subject teachers across our Chhatral, Kadi and IFFCO Township campuses, with their qualifications and experience.",
  path: '/team/',
});

export default function Page() {
  return (
    <PageShell>
      <PageBand title="Our faculty" lead="Teachers across the Chhatral, Kadi and IFFCO Township campuses." />

      <section className="faculty-directory-section" style={{ background: 'linear-gradient(180deg, #fafaf8 0%, #f5f5f0 100%)', padding: '60px 0' }}>
        <div className="container">
          <div className="faculty-filters">
            <button className="faculty-filter-btn active" data-filter="all">All Branches</button>
            <button className="faculty-filter-btn" data-filter="Chhatral">Chhatral</button>
            <button className="faculty-filter-btn" data-filter="Kadi">Kadi</button>
            <button className="faculty-filter-btn" data-filter="Iffco">IFFCO Township</button>
          </div>

          <div className="faculty-grid">
            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Palak Chetan Dayal</h3>
                <div className="faculty-designation">PRT - Pre-Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.com</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.com</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 3 years 6 months</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 22-03-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Personal skills Art and craft</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Pritilaxmi R Nair</h3>
                <div className="faculty-designation">TGT - Upper Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> M.com B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.com B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 4 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-06-2022</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Successfully completed B.Ed with Distinction (85%)</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">H</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Hetal Hardik Patel</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Sc, D.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.sc, D.ed, PGDIT</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 10 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 21-06-2022</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">1st place in inter college dance competition</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">A</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Alka Bishnoi</h3>
                <div className="faculty-designation">PGT - Secondary/Higher Secondary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> NET Qualified</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> MA, Bed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 7 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 07-04-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">H.W.B. in The Bharat Scouts & Guides</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">U</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Usha Sharma</h3>
                <div className="faculty-designation">TGT - Upper Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> Teaching Hindi Subject Last 10 Years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 06-04-2023</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">10th Board Exam 100% Result</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">A</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Abha Mishra</h3>
                <div className="faculty-designation">PGT - Higher Secondary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> M.Phil Clinical Psychology</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.A, B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 4 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 25-11-2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">A</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Akanksha Ghildiyal</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Masters of science - Microbiology</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> Bsc. ZBC, & Msc. Microbiology</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 2 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 03-12-2024</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Increased student participation through interactive and hands-on activities</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">K</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Kamal Sunilkumar Patel</h3>
                <div className="faculty-designation">Skill Educator</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.sc & level-1 coach (cricket)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.SC. PHYSICS</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 3 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 05-04-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">BCA STATE PLAYER (cricket)</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">A</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Arti Pandita</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Pursuing B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> MSc Microbiology</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 5 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-06-2023</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Research Paper</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">R</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Rashmitkaur Manikkath</h3>
                <div className="faculty-designation">PGT - Upper Primary/Higher Secondary Commerce</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Bachelor of Education, Master of Administration (MBA)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> Master of Commerce (M.com)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 7 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 24-12-2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">N</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Nikhil Tanwar</h3>
                <div className="faculty-designation">Admin - Primary/Administration</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 1 year</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 12-06-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Played 3 times district in volleyball and kabaddi and 1 time zone level in kabaddi</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">C</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">C Ravikanth Ohal</h3>
                <div className="faculty-designation">Senior Coordinator - Secondary/Higher Secondary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed, M.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.Com, MA English</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 15+ years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 25-03-2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">A</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Alpa Bhaveshbhai Panchal</h3>
                <div className="faculty-designation">Skill Educator</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Intermediate drawing exam of Gujarat State</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.com</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 3 Years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 11-12-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Tally, M.S. Office</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Palak Dave</h3>
                <div className="faculty-designation">PGT - Higher Secondary Commerce/Administration</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> M.com., B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.com., B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 8 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-05-2019</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Prashant Anandkumar Keshwani</h3>
                <div className="faculty-designation">PGT - Higher Secondary Commerce</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> M.com B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.com B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 4 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 18-04-2022</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">CTET Paper 1 clear</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">D</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Dipa Banerjee</h3>
                <div className="faculty-designation">PGT - Higher Secondary General</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B-Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.A - English</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 20 Years Approx</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 04-04-2022</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Assigned as one of the examination incharges</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">K</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Komal Gohil</h3>
                <div className="faculty-designation">Admin - Administration</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Nil</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.Com</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 14 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 21-06-2019</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">M</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Madhuri Yogesh Nagarkar</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> BA D.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> Assistant Teacher</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 16 Years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 08-04-2024</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Intermediate Drawing, CCC</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">V</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Vaibhav Diwakar Yadav</h3>
                <div className="faculty-designation">TGT - Upper Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.Sc. Physics and M.Sc. Physics (In Progress)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 4 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 18-08-2026</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Selected for All India Technical Conference held by ISRO</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">A</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Alpana Sharma</h3>
                <div className="faculty-designation">PRT - Pre-Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Pursuing B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.A, B.com, HDCS</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 5 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 12-06-2024</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">DIPLOMA IN COMPUTER SOFTWARE</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Purvika Samirkumar Patel</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Diploma in computer engineering</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> Diploma in computer engineering</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 8 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 16-03-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Played states competition in hockey and badminton</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">K</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Krunal Vipulkumar Devi</h3>
                <div className="faculty-designation">PGT - Higher Secondary General</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.E, B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> Physics, Maths</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 5 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-06-2024</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">B.E Gold Medalist, Young Scientist IISF Award, District first in Smart Innovation Challenge, All India Rank 1 in RRB JE, Qualified 14+ Competitive Exams</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">S</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Shruti Shrivastava</h3>
                <div className="faculty-designation">PGT - Pre-Primary/Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> M.A, B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.A, B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 2 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 10-03-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">B.Ed</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">S</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Subhashchandra Babulal Bhand</h3>
                <div className="faculty-designation">TGT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.A, B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.A, B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 15 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 06-04-2019</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Second rank in Avantika Essay comp, New Delhi</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">R</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Riddhi Pradeep Kotecha</h3>
                <div className="faculty-designation">PGT - Primary to Higher Secondary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> MCA</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 4 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 06-06-2023</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">K</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Kalpana Prusty</h3>
                <div className="faculty-designation">PGT - Higher Secondary General</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.Sc. Zoology</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 2 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 13-03-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">OSI Best PG Dissertation Award 2023 in Biological Oceanography</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Priya Kundu Podder</h3>
                <div className="faculty-designation">PRT - Pre-Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Pursuing D.El.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.Sc (Botany Honours)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 2 Years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 14-06-2024</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Special Achievements in Drawing</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Pooja Amit Kumar</h3>
                <div className="faculty-designation">PRT - Pre-Primary/Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Post graduate (MA)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> N/A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 8 years (Teacher, Coordinator, Branch Head)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-04-2021</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Awarded 'B' Certificate from NCC. Represented National Level (13 times) in Volleyball, Football, and Hockey. State Level in Handball, Basketball, Kho Kho, Kabaddi, Athletics, Shot Put, Javelin Throw, and Cricket.</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">S</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Sejal Jigneshkumar Mistry</h3>
                <div className="faculty-designation">PGT - Pre-Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> P.T.C, B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 3 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 04-03-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">ART & CRAFT</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">S</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Sanchari Roy</h3>
                <div className="faculty-designation">PGT - Pre-Primary/Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> M.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 4 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 17-08-2022</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Preeti Kaushik</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Teacher</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B. Tech (ECE)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> Atul memorial school, Gurugram</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 12-11-2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Prajapati Mahendrabhai M</h3>
                <div className="faculty-designation">PGT - Higher Secondary General</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.P.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 24 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 15-06-2015</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Yoga trainer, Transport Incharge</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">D</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Deepanjali Ghoshal</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> None</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.A (English)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 15 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-04-2019</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Was co-ordinator for 3 years</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Iffco">
              <div className="faculty-card-header">
                <div className="faculty-avatar">M</div>
                <span className="faculty-branch-badge">IFFCO</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Mallika Swapankumar Das</h3>
                <div className="faculty-designation">TGT - Primary/Administration</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.Sc</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 7 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 29-11-2021</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Silver medal in Sunfeast general knowledge competition in 2012</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">S</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Shaheen Khan</h3>
                <div className="faculty-designation">TGT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> BA</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 23 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-04-2025</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Won various medals in Athletics and Taekwondo</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">A</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Anju Pandey</h3>
                <div className="faculty-designation">PRT - Pre-Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> BA</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> BA</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 7 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 28-06-2022</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Scout guiding for NCC</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Pratiksha Gadakh</h3>
                <div className="faculty-designation">PRT - Pre-Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> Diploma Teacher Education</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> S.Y BA</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 4 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 27-03-2023</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">S</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Sonali Rupesh Sonawane</h3>
                <div className="faculty-designation">Admin - Administration</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.com, GDC&A Diploma, Computer Diploma</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.Com, Computer Diploma</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 10 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 02-09-2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">D</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Dipika Gohil</h3>
                <div className="faculty-designation">PRT - Pre-Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.com</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 13 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-04-2023</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Kadi">
              <div className="faculty-card-header">
                <div className="faculty-avatar">S</div>
                <span className="faculty-branch-badge">Kadi</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Shweta Dinesh Jadhav</h3>
                <div className="faculty-designation">PRT - Pre-Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> M. Sc Micro Bio</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M Sc Micro Bio</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 2 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 08-11-2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">D</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Deepak Pratap Sharma</h3>
                <div className="faculty-designation">PGT - Secondary/Higher Secondary General</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> BCOM, B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> BCOM</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 1 year</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 10-07-2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">N</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Nimisha Divyang Padhya</h3>
                <div className="faculty-designation">PGT - Upper Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.com M.com B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.com M.com B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 10 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 22-12-2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Chhatral">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">Chhatral</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Prabhat Kumar Srivastava</h3>
                <div className="faculty-designation">PGT - Higher Secondary General</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> LLB</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.COM (HONS)</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> Corporate 32 years, Teaching 3 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 04-04-2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Iffco">
              <div className="faculty-card-header">
                <div className="faculty-avatar">U</div>
                <span className="faculty-branch-badge">IFFCO</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Unnati Patel</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.com</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 10 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 26-06-2023</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">CTET, TAT passed</div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Iffco">
              <div className="faculty-card-header">
                <div className="faculty-avatar">T</div>
                <span className="faculty-branch-badge">IFFCO</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Tamanna Mahesh Kumar Makwana</h3>
                <div className="faculty-designation">PRT - Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> B.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 7 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 10-06-2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faculty-card" data-branch="Iffco">
              <div className="faculty-card-header">
                <div className="faculty-avatar">P</div>
                <span className="faculty-branch-badge">IFFCO</span>
              </div>
              <div className="faculty-card-body">
                <h3 className="faculty-name">Patel Kinjalben Nitinkumar</h3>
                <div className="faculty-designation">PRT - Pre-Primary/Primary</div>
                <div className="faculty-details">
                  <div className="faculty-detail-item">
                    <Icon name="graduation-cap" />
                    <span><strong>Professional:</strong> PTC and B.Ed</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="book" />
                    <span><strong>Academic:</strong> M.A</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="briefcase" />
                    <span><strong>Experience:</strong> 13 years</span>
                  </div>
                  <div className="faculty-detail-item">
                    <Icon name="calendar" />
                    <span><strong>Joined:</strong> 01-06-2022</span>
                  </div>
                </div>
                <div className="faculty-achievements">
                  <div className="achievement-label">Special Achievements</div>
                  <div className="achievement-text">Secure Second rank in long jump at State level</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2>Join Our Team</h2>
              <p>We are always looking for passionate educators and support staff to join our team. If you are dedicated to making a difference in students' lives, we would love to hear from you.</p>
              <Link className="btn join-btn mt-3" href="/contact/">View Current Openings</Link>
            </div>
          </div>
        </div>
      </section>
      <TeamScripts />
    </PageShell>
  );
}
