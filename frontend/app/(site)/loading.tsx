import PageShell from '@/components/PageShell';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <PageShell>
      <div className="skeleton-page" aria-busy="true" aria-label="Loading page">
        <Skeleton className="skeleton-title" />
        <Skeleton className="skeleton-hero" />
        <div className="skeleton-lines">
          <Skeleton className="skeleton-line" />
          <Skeleton className="skeleton-line skeleton-line-short" />
        </div>
        <div className="row g-4">
          <div className="col-md-4"><Skeleton className="skeleton-card" /></div>
          <div className="col-md-4"><Skeleton className="skeleton-card" /></div>
          <div className="col-md-4"><Skeleton className="skeleton-card" /></div>
        </div>
      </div>
    </PageShell>
  );
}
