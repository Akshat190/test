export default function PageBand({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="page-band">
      <div className="container">
        <h1 className="page-title">{title}</h1>
        <div className="title-underline"></div>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
