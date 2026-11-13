import Link from 'next/link';
import Icon from '@/components/Icon';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <Link className="footer-logo" aria-label="Kapadia High School home page" href="/">
                <img src="/static/image/khes.svg" alt="Kapadia High School" width={180} height={60} loading="lazy" />
              </Link>
              <p className="school-details">Classes from K-12 (Science, Commerce &amp; Humanities Stream). Excellent infrastructure, sound organisational support and ample opportunity for students.</p>
              <div className="social-links">
                <a href="https://www.facebook.com/kapadiahighschool" target="_blank" rel="noopener">Facebook</a>
                <a href="https://x.com/kapadiahighschool" target="_blank" rel="noopener">X</a>
                <a href="https://www.instagram.com/kapadiahighschool" target="_blank" rel="noopener">Instagram</a>
                <a href="https://chat.whatsapp.com/DjRwLEhzaqy5BjutusOsl6" target="_blank" rel="noopener">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h4>Quick links</h4>
            <ul className="footer-links">
              <li><Link href="/"><Icon name="chevron-right" /> Home</Link></li>
              <li><Link href="/aboutSchool/"><Icon name="chevron-right" /> About the school</Link></li>
              <li><Link href="/team/"><Icon name="chevron-right" /> Our Faculty</Link></li>
              <li><Link href="/activities/"><Icon name="chevron-right" /> Activities</Link></li>
              <li><Link href="/contact/"><Icon name="chevron-right" /> Contact</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4>Academics</h4>
            <ul className="footer-links">
              <li><Link href="/facilities/"><Icon name="chevron-right" /> Facilities</Link></li>
              <li><Link href="/achievements/"><Icon name="chevron-right" /> Achievements</Link></li>
              <li><Link href="/success-stories/"><Icon name="chevron-right" /> Success Stories</Link></li>
              <li><Link href="/institutional-goals/"><Icon name="chevron-right" /> Institutional Goals</Link></li>
              <li><Link href="/brief/"><Icon name="chevron-right" /> Executive Brief</Link></li>
              <li><Link href="/disclosures/"><Icon name="chevron-right" /> Mandatory Disclosure</Link></li>
              <li><Link href="/gallery/"><Icon name="chevron-right" /> Gallery</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>
                <Icon name="phone" />
                <a href="tel:+916354368335">+91 6354368335</a>
              </li>
              <li>
                <Icon name="map-marker-alt" />
                <span>Near Chhatral Railway Station,<br />Kalol, Pratappura, Gujarat 382721</span>
              </li>
              <li>
                <Icon name="envelope" />
                <a href="mailto:info@kapadiahighschool.com">info@kapadiahighschool.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; {new Date().getFullYear()} Kapadia High School. All Rights Reserved.</p>
          <div className="footer-meta">
            <a href="https://forms.gle/sDftg7osPaxvGKAD8" target="_blank" rel="noopener">Admissions</a>
            <Link href="/contact/">Contact</Link>
            <Link href="/gallery/">Gallery</Link>
            <button type="button" className="footer-top" data-scroll-top aria-label="Back to top"><Icon name="arrow-up" /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
