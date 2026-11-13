import PageBand from '@/components/PageBand';
import Icon from '@/components/Icon';
import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/metadata';
import '@/css/testimonials.css';

export const metadata: Metadata = pageMetadata({
  title: 'Testimonials - Kapadia High School',
  description:
    'What students, parents, alumni and teachers say about their experience at Kapadia High School.',
  path: '/testimonials/',
});

export default function Page() {
  return (
    <PageShell>
      <PageBand title="Testimonials" lead="Students, parents, alumni and teachers." />

      <section className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="intro-content">
                <p>
                  At Kapadia High School, we take pride in the positive impact we have on our
                  students' lives. Here are some testimonials from our students, parents, and alumni
                  that reflect our commitment to excellence in education.
                </p>
                <p>
                  These testimonials are a testament to our dedication to providing a nurturing
                  environment where students can grow academically, socially, and emotionally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section student-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Student Testimonials</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Hear from our current students about their experiences at Kapadia High School.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    RP
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    Being a student at Kapadia High School has been a transformative experience. The
                    teachers are supportive and the extracurricular activities have helped me
                    discover my passion for science.
                  </p>
                  <div className="testimonial-author">
                    <h4>Rahul Patel</h4>
                    <p>Class 10 Student</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    PS
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    The teachers at Kapadia High School are not just educators but mentors who guide
                    us in every aspect of our development. I've grown so much as a person since
                    joining this school.
                  </p>
                  <div className="testimonial-author">
                    <h4>Priya Sharma</h4>
                    <p>Class 12 Student</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    AM
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    The diverse range of activities at Kapadia High School has helped me discover my
                    talents in music and dance. I'm grateful for the opportunities provided by the
                    school.
                  </p>
                  <div className="testimonial-author">
                    <h4>Arjun Mehta</h4>
                    <p>Class 11 Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section parent-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Parent Testimonials</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Parents share their thoughts on how Kapadia High School has impacted their
                children's lives.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    MD
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    As parents, we are extremely satisfied with the quality of education and the
                    values instilled in our child at Kapadia High School. The teachers are dedicated
                    and the administration is responsive.
                  </p>
                  <div className="testimonial-author">
                    <h4>Mr. &amp; Mrs. Desai</h4>
                    <p>Parents of Riya Desai, Class 9</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    SP
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    The holistic approach to education at Kapadia High School has helped our son
                    develop not just academically but also as a confident and responsible
                    individual.
                  </p>
                  <div className="testimonial-author">
                    <h4>Dr. Suresh Patel</h4>
                    <p>Parent of Vikram Patel, Class 12</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    AS
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    We appreciate the emphasis on both academics and extracurricular activities at
                    Kapadia High School. Our daughter has blossomed into a well-rounded individual
                    under the guidance of her teachers.
                  </p>
                  <div className="testimonial-author">
                    <h4>Mrs. Anjali Shah</h4>
                    <p>Parent of Meera Shah, Class 10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section alumni-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Alumni Testimonials</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Our alumni reflect on how their education at Kapadia High School has shaped their
                careers and lives.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    AJ
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    The foundation I received at Kapadia High School has been instrumental in my
                    success as a software engineer. The emphasis on critical thinking and
                    problem-solving has served me well in my career.
                  </p>
                  <div className="testimonial-author">
                    <h4>Amit Joshi</h4>
                    <p>Software Engineer, Google (Batch of 2010)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    NM
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    My years at Kapadia High School were transformative. The values of integrity,
                    perseverance, and excellence that were instilled in me have guided me throughout
                    my medical career.
                  </p>
                  <div className="testimonial-author">
                    <h4>Dr. Neha Mehta</h4>
                    <p>Cardiologist (Batch of 2005)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    RK
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    The leadership opportunities I had at Kapadia High School prepared me for the
                    challenges of entrepreneurship. I'm grateful for the mentorship and guidance I
                    received during my school years.
                  </p>
                  <div className="testimonial-author">
                    <h4>Rajiv Kumar</h4>
                    <p>Entrepreneur (Batch of 2008)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section teacher-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Teacher Testimonials</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Our dedicated teachers share their experiences of being part of the Kapadia High
                School family.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    SS
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    Teaching at Kapadia High School has been a rewarding experience. The supportive
                    administration and the enthusiasm of the students make it a joy to come to work
                    every day.
                  </p>
                  <div className="testimonial-author">
                    <h4>Mrs. Sunita Sharma</h4>
                    <p>Science Teacher (15 years at KHS)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    RV
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    The collaborative environment at Kapadia High School allows us to innovate in
                    our teaching methods and provide the best education to our students.
                  </p>
                  <div className="testimonial-author">
                    <h4>Mr. Rajesh Verma</h4>
                    <p>Mathematics Teacher (10 years at KHS)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-5">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <div className="avatar-initials" aria-hidden="true">
                    PP
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Icon name="quote-left" />
                  </div>
                  <p>
                    Being a part of Kapadia High School has allowed me to grow as an educator. The
                    professional development opportunities and the supportive community have been
                    invaluable.
                  </p>
                  <div className="testimonial-author">
                    <h4>Ms. Priya Patel</h4>
                    <p>English Teacher (8 years at KHS)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="submit-testimonial-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Share Your Experience</h2>
              <div className="section-underline"></div>
              <p className="section-description">
                We'd love to hear about your experience with Kapadia High School. Please share your
                testimonial with us.
              </p>
            </div>
          </div>

          <div className="row mt-5 justify-content-center">
            <div className="col-lg-8">
              <div className="testimonial-form-container">
                <form className="testimonial-form">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select className="form-select" id="category" required defaultValue="">
                      <option value="" disabled>
                        Select your category
                      </option>
                      <option value="student">Current Student</option>
                      <option value="parent">Parent</option>
                      <option value="alumni">Alumni</option>
                      <option value="teacher">Teacher</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="testimonial" className="form-label">
                      Your Testimonial
                    </label>
                    <textarea
                      className="form-control"
                      id="testimonial"
                      rows={5}
                      placeholder="Share your experience with Kapadia High School"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="photo" className="form-label">
                      Upload Your Photo (Optional)
                    </label>
                    <input type="file" className="form-control" id="photo" />
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary btn-lg submit-btn">
                      Submit Testimonial
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
