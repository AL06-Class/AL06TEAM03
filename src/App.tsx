const featuredJobs = [
  {
    company: "Nova Labs",
    title: "Frontend Engineer",
    meta: "Seoul / Full-time",
    pay: "5,500-7,000"
  },
  {
    company: "Hireway",
    title: "Product Designer",
    meta: "Remote / Contract",
    pay: "4,800-6,200"
  },
  {
    company: "Dataflow",
    title: "Backend Developer",
    meta: "Pangyo / Full-time",
    pay: "6,000-8,500"
  }
];

const stats = [
  ["1,248", "active jobs"],
  ["320", "hiring teams"],
  ["72h", "avg. reply time"]
];

export default function App() {
  return (
    <main
      className="job-page"
      style={{
        minHeight: "100vh",
        background: "#f6f7f9",
        color: "#17202a",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      <style>
        {`
          @media (max-width: 760px) {
            .job-header {
              align-items: flex-start !important;
              flex-direction: column;
            }

            .job-hero {
              grid-template-columns: 1fr !important;
              padding-top: 28px !important;
            }

            .job-search {
              grid-template-columns: 1fr !important;
            }

            .job-stats {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      <header
        className="job-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "24px"
        }}
      >
        <strong style={{ fontSize: "20px" }}>JobBridge</strong>
        <nav
          aria-label="main navigation"
          style={{
            display: "flex",
            gap: "18px",
            color: "#52606d",
            fontSize: "14px"
          }}
        >
          <span>Jobs</span>
          <span>Companies</span>
          <span>For Teams</span>
        </nav>
      </header>

      <section
        className="job-hero"
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "56px 24px 36px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, 0.9fr)",
          gap: "32px",
          alignItems: "center"
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 14px",
              color: "#0f6b5f",
              fontSize: "14px",
              fontWeight: 700
            }}
          >
            Curated tech hiring platform
          </p>
          <h1
            style={{
              margin: "0 0 18px",
              maxWidth: "680px",
              fontSize: "clamp(36px, 6vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: 0
            }}
          >
            Find focused roles from teams ready to hire.
          </h1>
          <p
            style={{
              margin: "0 0 28px",
              maxWidth: "620px",
              color: "#52606d",
              fontSize: "18px",
              lineHeight: 1.65
            }}
          >
            Browse verified openings, compare salary ranges, and apply with a
            profile built for quick recruiter review.
          </p>
          <form
            className="job-search"
            onSubmit={(event) => event.preventDefault()}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 160px",
              gap: "10px",
              maxWidth: "620px"
            }}
          >
            <input
              aria-label="Search jobs"
              placeholder="Job title, company, or skill"
              style={{
                minWidth: 0,
                height: "48px",
                padding: "0 16px",
                border: "1px solid #cfd6df",
                borderRadius: "8px",
                fontSize: "15px"
              }}
            />
            <button
              type="submit"
              style={{
                height: "48px",
                border: 0,
                borderRadius: "8px",
                background: "#174ea6",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Search jobs
            </button>
          </form>
        </div>

        <aside
          style={{
            border: "1px solid #d9dee7",
            borderRadius: "8px",
            background: "#ffffff",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(23, 32, 42, 0.08)"
          }}
        >
          <h2 style={{ margin: "0 0 16px", fontSize: "20px" }}>
            Featured roles
          </h2>
          <div style={{ display: "grid", gap: "12px" }}>
            {featuredJobs.map((job) => (
              <article
                key={`${job.company}-${job.title}`}
                style={{
                  border: "1px solid #e3e7ee",
                  borderRadius: "8px",
                  padding: "16px"
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px",
                    color: "#52606d",
                    fontSize: "13px"
                  }}
                >
                  {job.company}
                </p>
                <h3 style={{ margin: "0 0 8px", fontSize: "17px" }}>
                  {job.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 12px",
                    color: "#52606d",
                    fontSize: "14px"
                  }}
                >
                  {job.meta}
                </p>
                <strong style={{ color: "#0f6b5f", fontSize: "14px" }}>
                  KRW {job.pay}
                </strong>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section
        className="job-stats"
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "12px 24px 56px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px"
        }}
      >
        {stats.map(([value, label]) => (
          <div
            key={label}
            style={{
              borderTop: "1px solid #d9dee7",
              paddingTop: "18px"
            }}
          >
            <strong style={{ display: "block", fontSize: "28px" }}>
              {value}
            </strong>
            <span style={{ color: "#52606d", fontSize: "14px" }}>{label}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
