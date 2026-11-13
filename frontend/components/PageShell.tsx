export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="flex-grow-1">
      <div className="content-wrapper">{children}</div>
    </main>
  );
}
