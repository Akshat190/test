import type { Metadata } from 'next';
import Link from 'next/link';

import Icon from '@/components/Icon';
import PageBand from '@/components/PageBand';
import PageShell from '@/components/PageShell';
import { getCampuses } from '@/lib/api';
import { pageMetadata } from '@/lib/metadata';
import '@/css/disclosures.css';

export const metadata: Metadata = pageMetadata({
  title: 'Mandatory Disclosure | Kapadia High School',
  description:
    'Mandatory disclosure documents for each Kapadia High School campus: affiliation, recognition and compliance certificates, kept in one place.',
  path: '/disclosures/',
});

export default async function Page() {
  const campuses = await getCampuses();
  const withDocuments = campuses.filter((campus) => campus.documents.length > 0);

  return (
    <PageShell>
      <PageBand
        title="Mandatory Disclosure"
        lead="Affiliation, recognition and compliance documents for each campus."
      />

      <section className="disclosures-body">
        <div className="container">
          {withDocuments.length === 0 ? (
            <div className="disclosures-empty">
              <Icon name="file-pdf" />
              <h2>Documents are being updated</h2>
              <p>
                Disclosure documents are not published here yet. Please call the school office on{' '}
                <a href="tel:+916354368335">+91 6354368335</a> or use the{' '}
                <Link href="/contact/">contact form</Link> and we will send them to you.
              </p>
            </div>
          ) : (
            <>
              <p className="disclosures-intro">
                Every document below is published by the campus it belongs to. If a file does not
                open, contact that campus office and ask for the latest copy.
              </p>

              {withDocuments.map((campus) => (
                <section key={campus.slug} className="disclosure-group" aria-labelledby={`disclosure-${campus.slug}`}>
                  <div className="disclosure-group-head">
                    <h2 id={`disclosure-${campus.slug}`}>{campus.name}</h2>
                    {campus.board && <span className="disclosure-board">{campus.board}</span>}
                    <Link className="disclosure-campus-link" href={`/${campus.slug}/`}>
                      Campus page <Icon name="chevron-right" />
                    </Link>
                  </div>

                  {campus.affiliation_number && (
                    <p className="disclosure-meta">Affiliation number: {campus.affiliation_number}</p>
                  )}

                  <ul className="disclosure-list">
                    {campus.documents.map((document) => (
                      <li key={document.id}>
                        {document.file ? (
                          <a href={document.file} target="_blank" rel="noopener">
                            <Icon name="file-pdf" />
                            <span>{document.title}</span>
                            <span className="disclosure-open" aria-hidden="true">Open</span>
                          </a>
                        ) : (
                          <span className="disclosure-missing">
                            <Icon name="file-pdf" />
                            <span>{document.title}</span>
                            <span className="disclosure-open">Unavailable</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
