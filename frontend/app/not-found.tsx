import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - Kapadia High School',
};

export default function NotFound() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body { background: #f8f9fa; font-family: 'Outfit', sans-serif; }
        .error-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .error-code { font-size: 8rem; font-weight: 700; color: #003264; }
        .error-message { color: #6b7280; }
      `,
        }}
      />
      <div className="error-container">
        <div className="text-center">
          <div className="error-code">404</div>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="error-message">Sorry, the page you are looking for does not exist.</p>
          <Link className="btn btn-primary mt-3" href="/">Go Back Home</Link>
        </div>
      </div>
    </>
  );
}
