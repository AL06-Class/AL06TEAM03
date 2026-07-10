import { useMemo, useState } from "react";

const jobs = [
  {
    company: "노바랩스",
    title: "프론트엔드 엔지니어",
    location: "서울",
    type: "정규직",
    salary: "5,500-7,000만원",
    tags: ["React", "TypeScript", "웹 서비스"]
  },
  {
    company: "하이어웨이",
    title: "프로덕트 디자이너",
    location: "원격",
    type: "계약직",
    salary: "4,800-6,200만원",
    tags: ["UX", "Figma", "채용 플랫폼"]
  },
  {
    company: "데이터플로우",
    title: "백엔드 개발자",
    location: "판교",
    type: "정규직",
    salary: "6,000-8,500만원",
    tags: ["Node.js", "API", "데이터"]
  },
  {
    company: "커리어링크",
    title: "채용 운영 매니저",
    location: "서울",
    type: "정규직",
    salary: "4,200-5,600만원",
    tags: ["채용 운영", "면접 관리", "커뮤니케이션"]
  }
];

const stats = [
  ["1,248", "진행 중인 공고"],
  ["320", "채용 중인 팀"],
  ["72시간", "평균 응답 시간"]
];

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();

    if (!trimmedKeyword) {
      return jobs;
    }

    return jobs.filter((job) =>
      [job.company, job.title, job.location, job.type, ...job.tags]
        .join(" ")
        .toLowerCase()
        .includes(trimmedKeyword)
    );
  }, [keyword]);

  return (
    <main
      className="job-page"
      style={{
        minHeight: "100vh",
        background: "#f6f7f9",
        color: "#17202a",
        fontFamily:
          "Pretendard, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      <style>
        {`
          @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

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

            .job-modal {
              width: calc(100vw - 32px) !important;
              max-height: calc(100vh - 48px) !important;
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
        <strong style={{ fontSize: "20px" }}>잡브릿지</strong>
        <nav
          aria-label="주요 메뉴"
          style={{
            display: "flex",
            gap: "18px",
            color: "#52606d",
            fontSize: "14px"
          }}
        >
          <span>채용공고</span>
          <span>기업</span>
          <span>기업회원</span>
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
            검증된 기술 채용 플랫폼
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
            지금 채용 중인 팀의 핵심 포지션을 찾아보세요.
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
            검증된 공고를 확인하고, 연봉 범위와 근무 형태를 비교한 뒤 빠르게
            지원할 수 있습니다.
          </p>
          <form
            className="job-search"
            onSubmit={(event) => {
              event.preventDefault();
              setIsModalOpen(true);
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 160px",
              gap: "10px",
              maxWidth: "620px"
            }}
          >
            <input
              aria-label="채용공고 검색"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="직무, 회사, 기술을 검색하세요"
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
              채용공고 검색
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
            추천 채용공고
          </h2>
          <div style={{ display: "grid", gap: "12px" }}>
            {jobs.slice(0, 3).map((job) => (
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
                  {job.location} / {job.type}
                </p>
                <strong style={{ color: "#0f6b5f", fontSize: "14px" }}>
                  연봉 {job.salary}
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

      {isModalOpen && (
        <div
          role="presentation"
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "rgba(23, 32, 42, 0.48)"
          }}
        >
          <section
            aria-modal="true"
            className="job-modal"
            role="dialog"
            aria-labelledby="job-modal-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(100%, 720px)",
              maxHeight: "calc(100vh - 64px)",
              overflow: "auto",
              borderRadius: "8px",
              background: "#ffffff",
              boxShadow: "0 24px 70px rgba(23, 32, 42, 0.22)"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
                padding: "22px 22px 14px",
                borderBottom: "1px solid #e3e7ee"
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 6px",
                    color: "#0f6b5f",
                    fontSize: "13px",
                    fontWeight: 700
                  }}
                >
                  검색 결과
                </p>
                <h2 id="job-modal-title" style={{ margin: 0, fontSize: "22px" }}>
                  {keyword.trim()
                    ? `"${keyword.trim()}" 관련 채용공고`
                    : "전체 채용공고"}
                </h2>
              </div>
              <button
                type="button"
                aria-label="모달 닫기"
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid #cfd6df",
                  borderRadius: "8px",
                  background: "#ffffff",
                  color: "#17202a",
                  cursor: "pointer",
                  fontSize: "20px",
                  lineHeight: 1
                }}
              >
                x
              </button>
            </div>

            <div style={{ display: "grid", gap: "12px", padding: "18px 22px 22px" }}>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <article
                    key={`${job.company}-${job.title}`}
                    style={{
                      border: "1px solid #e3e7ee",
                      borderRadius: "8px",
                      padding: "16px"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        flexWrap: "wrap"
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: "0 0 6px",
                            color: "#52606d",
                            fontSize: "13px"
                          }}
                        >
                          {job.company}
                        </p>
                        <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>
                          {job.title}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            color: "#52606d",
                            fontSize: "14px"
                          }}
                        >
                          {job.location} / {job.type}
                        </p>
                      </div>
                      <strong style={{ color: "#0f6b5f", fontSize: "14px" }}>
                        연봉 {job.salary}
                      </strong>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginTop: "14px"
                      }}
                    >
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "6px 9px",
                            borderRadius: "8px",
                            background: "#eef2f7",
                            color: "#52606d",
                            fontSize: "12px"
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              ) : (
                <p style={{ margin: 0, color: "#52606d", lineHeight: 1.6 }}>
                  일치하는 채용공고가 없습니다. 다른 직무, 회사, 기술로 검색해보세요.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
