import { useMemo, useState } from "react";

type Page = "home" | "jobs";

type Job = {
  company: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  career: string;
  deadline: string;
  tags: string[];
  featured?: boolean;
};

const jobs: Job[] = [
  {
    company: "노바랩스",
    title: "프론트엔드 엔지니어",
    location: "서울 강남구",
    type: "정규직",
    salary: "5,500-7,000만원",
    career: "3년 이상",
    deadline: "D-12",
    tags: ["React", "TypeScript", "웹 서비스"],
    featured: true
  },
  {
    company: "하이어웨이",
    title: "프로덕트 디자이너",
    location: "원격",
    type: "계약직",
    salary: "4,800-6,200만원",
    career: "2년 이상",
    deadline: "상시채용",
    tags: ["UX", "Figma", "채용 플랫폼"],
    featured: true
  },
  {
    company: "데이터플로우",
    title: "백엔드 개발자",
    location: "경기 성남시",
    type: "정규직",
    salary: "6,000-8,500만원",
    career: "5년 이상",
    deadline: "D-7",
    tags: ["Node.js", "API", "데이터"],
    featured: true
  },
  {
    company: "커리어링크",
    title: "채용 운영 매니저",
    location: "서울 마포구",
    type: "정규직",
    salary: "4,200-5,600만원",
    career: "1년 이상",
    deadline: "D-20",
    tags: ["채용 운영", "면접 관리", "커뮤니케이션"]
  },
  {
    company: "핀테크랩",
    title: "서비스 기획자",
    location: "서울 영등포구",
    type: "정규직",
    salary: "5,000-6,800만원",
    career: "3년 이상",
    deadline: "D-5",
    tags: ["서비스 기획", "핀테크", "데이터 분석"]
  },
  {
    company: "클라우드베이스",
    title: "DevOps 엔지니어",
    location: "부산 해운대구",
    type: "정규직",
    salary: "6,500-9,000만원",
    career: "4년 이상",
    deadline: "D-15",
    tags: ["AWS", "Kubernetes", "CI/CD"]
  }
];

const stats = [
  ["1,248", "진행 중인 공고"],
  ["320", "채용 중인 팀"],
  ["72시간", "평균 응답 시간"]
];

const filters = ["전체", "정규직", "계약직", "원격", "서울", "경기"];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [keyword, setKeyword] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesKeyword =
        !trimmedKeyword ||
        [job.company, job.title, job.location, job.type, job.career, ...job.tags]
          .join(" ")
          .toLowerCase()
          .includes(trimmedKeyword);

      const matchesFilter =
        selectedFilter === "전체" ||
        job.type.includes(selectedFilter) ||
        job.location.includes(selectedFilter);

      return matchesKeyword && matchesFilter;
    });
  }, [keyword, selectedFilter]);

  const openJobsPage = () => {
    setPage("jobs");
    setIsModalOpen(false);
  };

  return (
    <main className="job-page">
      <style>
        {`
          @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
          }

          .job-page {
            min-height: 100vh;
            background: #f6f7f9;
            color: #17202a;
            font-family: Pretendard, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          .job-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            max-width: 1120px;
            margin: 0 auto;
            padding: 24px;
          }

          .brand-button,
          .nav-button {
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            cursor: pointer;
          }

          .brand-button {
            padding: 0;
            font-size: 20px;
            font-weight: 800;
          }

          .main-nav {
            display: flex;
            gap: 18px;
            color: #52606d;
            font-size: 14px;
          }

          .nav-button {
            padding: 8px 0;
          }

          .nav-button[aria-current="page"] {
            color: #174ea6;
            font-weight: 700;
          }

          .job-hero,
          .jobs-page {
            max-width: 1120px;
            margin: 0 auto;
            padding: 56px 24px 36px;
          }

          .job-hero {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
            gap: 32px;
            align-items: center;
          }

          .job-search {
            display: grid;
            grid-template-columns: 1fr 160px;
            gap: 10px;
            max-width: 620px;
          }

          .input {
            min-width: 0;
            height: 48px;
            padding: 0 16px;
            border: 1px solid #cfd6df;
            border-radius: 8px;
            background: #ffffff;
            font-size: 15px;
          }

          .primary-button {
            height: 48px;
            border: 0;
            border-radius: 8px;
            background: #174ea6;
            color: #ffffff;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
          }

          .panel,
          .job-card {
            border: 1px solid #d9dee7;
            border-radius: 8px;
            background: #ffffff;
          }

          .panel {
            padding: 20px;
            box-shadow: 0 10px 30px rgba(23, 32, 42, 0.08);
          }

          .job-stats {
            max-width: 1120px;
            margin: 0 auto;
            padding: 12px 24px 56px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .jobs-toolbar {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 14px;
            align-items: center;
            margin: 26px 0 18px;
          }

          .filter-row {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .filter-button {
            height: 36px;
            padding: 0 13px;
            border: 1px solid #cfd6df;
            border-radius: 8px;
            background: #ffffff;
            color: #52606d;
            cursor: pointer;
            font-size: 14px;
          }

          .filter-button.active {
            border-color: #174ea6;
            background: #eaf1ff;
            color: #174ea6;
            font-weight: 700;
          }

          .jobs-layout {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 280px;
            gap: 18px;
            align-items: start;
          }

          .job-list {
            display: grid;
            gap: 12px;
          }

          .job-card {
            padding: 18px;
          }

          .tag-row {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 14px;
          }

          .tag {
            padding: 6px 9px;
            border-radius: 8px;
            background: #eef2f7;
            color: #52606d;
            font-size: 12px;
          }

          .job-modal {
            width: min(100%, 720px);
            max-height: calc(100vh - 64px);
            overflow: auto;
            border-radius: 8px;
            background: #ffffff;
            box-shadow: 0 24px 70px rgba(23, 32, 42, 0.22);
          }

          @media (max-width: 760px) {
            .job-header {
              align-items: flex-start;
              flex-direction: column;
            }

            .job-hero,
            .jobs-layout,
            .jobs-toolbar {
              grid-template-columns: 1fr;
            }

            .job-hero {
              padding-top: 28px;
            }

            .job-search,
            .job-stats {
              grid-template-columns: 1fr;
            }

            .job-modal {
              width: calc(100vw - 32px);
              max-height: calc(100vh - 48px);
            }
          }
        `}
      </style>

      <header className="job-header">
        <button className="brand-button" type="button" onClick={() => setPage("home")}>
          잡브릿지
        </button>
        <nav aria-label="주요 메뉴" className="main-nav">
          <button
            aria-current={page === "jobs" ? "page" : undefined}
            className="nav-button"
            type="button"
            onClick={openJobsPage}
          >
            채용공고
          </button>
          <button className="nav-button" type="button">
            기업
          </button>
          <button className="nav-button" type="button">
            기업회원
          </button>
        </nav>
      </header>

      {page === "home" ? (
        <>
          <section className="job-hero">
            <div>
              <p style={{ margin: "0 0 14px", color: "#0f6b5f", fontSize: "14px", fontWeight: 700 }}>
                검증된 기술 채용 플랫폼
              </p>
              <h1 style={{ margin: "0 0 18px", maxWidth: "680px", fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.05, letterSpacing: 0 }}>
                지금 채용 중인 팀의 핵심 포지션을 찾아보세요.
              </h1>
              <p style={{ margin: "0 0 28px", maxWidth: "620px", color: "#52606d", fontSize: "18px", lineHeight: 1.65 }}>
                검증된 공고를 확인하고, 연봉 범위와 근무 형태를 비교한 뒤 빠르게 지원할 수 있습니다.
              </p>
              <form
                className="job-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsModalOpen(true);
                }}
              >
                <input
                  aria-label="채용공고 검색"
                  className="input"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="직무, 회사, 기술을 검색하세요"
                />
                <button className="primary-button" type="submit">
                  채용공고 검색
                </button>
              </form>
            </div>

            <aside className="panel">
              <h2 style={{ margin: "0 0 16px", fontSize: "20px" }}>추천 채용공고</h2>
              <div style={{ display: "grid", gap: "12px" }}>
                {jobs.slice(0, 3).map((job) => (
                  <JobCard job={job} compact key={`${job.company}-${job.title}`} />
                ))}
              </div>
            </aside>
          </section>

          <section className="job-stats">
            {stats.map(([value, label]) => (
              <div key={label} style={{ borderTop: "1px solid #d9dee7", paddingTop: "18px" }}>
                <strong style={{ display: "block", fontSize: "28px" }}>{value}</strong>
                <span style={{ color: "#52606d", fontSize: "14px" }}>{label}</span>
              </div>
            ))}
          </section>
        </>
      ) : (
        <section className="jobs-page">
          <p style={{ margin: "0 0 10px", color: "#0f6b5f", fontSize: "14px", fontWeight: 700 }}>
            채용공고
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.15, letterSpacing: 0 }}>
            한국형 채용공고 목록
          </h1>
          <p style={{ margin: "14px 0 0", maxWidth: "720px", color: "#52606d", fontSize: "16px", lineHeight: 1.65 }}>
            회사명, 경력, 근무지, 고용형태, 마감일을 한 화면에서 비교할 수 있는 채용 플랫폼 스타일의 목업 페이지입니다.
          </p>

          <div className="jobs-toolbar">
            <input
              aria-label="채용공고 목록 검색"
              className="input"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="직무, 회사, 기술, 지역 검색"
            />
            <strong style={{ color: "#52606d", fontSize: "14px" }}>
              총 {filteredJobs.length}개 공고
            </strong>
          </div>

          <div className="filter-row" aria-label="채용공고 필터">
            {filters.map((filter) => (
              <button
                className={`filter-button${selectedFilter === filter ? " active" : ""}`}
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="jobs-layout" style={{ marginTop: "18px" }}>
            <div className="job-list">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard job={job} key={`${job.company}-${job.title}`} />)
              ) : (
                <div className="panel" style={{ color: "#52606d", lineHeight: 1.6 }}>
                  일치하는 채용공고가 없습니다. 다른 직무, 회사, 기술로 검색해보세요.
                </div>
              )}
            </div>

            <aside className="panel">
              <h2 style={{ margin: "0 0 14px", fontSize: "18px" }}>공고 요약</h2>
              <div style={{ display: "grid", gap: "14px" }}>
                <SummaryItem label="오늘 새 공고" value="36건" />
                <SummaryItem label="평균 연봉" value="6,450만원" />
                <SummaryItem label="원격 가능" value="18%" />
              </div>
            </aside>
          </div>
        </section>
      )}

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
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", padding: "22px 22px 14px", borderBottom: "1px solid #e3e7ee" }}>
              <div>
                <p style={{ margin: "0 0 6px", color: "#0f6b5f", fontSize: "13px", fontWeight: 700 }}>
                  검색 결과
                </p>
                <h2 id="job-modal-title" style={{ margin: 0, fontSize: "22px" }}>
                  {keyword.trim() ? `"${keyword.trim()}" 관련 채용공고` : "전체 채용공고"}
                </h2>
              </div>
              <button
                type="button"
                aria-label="모달 닫기"
                onClick={() => setIsModalOpen(false)}
                style={{ width: "36px", height: "36px", border: "1px solid #cfd6df", borderRadius: "8px", background: "#ffffff", color: "#17202a", cursor: "pointer", fontSize: "20px", lineHeight: 1 }}
              >
                x
              </button>
            </div>

            <div style={{ display: "grid", gap: "12px", padding: "18px 22px 22px" }}>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard job={job} key={`${job.company}-${job.title}`} />)
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

function JobCard({ job, compact = false }: { job: Job; compact?: boolean }) {
  return (
    <article className="job-card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: "0 0 6px", color: "#52606d", fontSize: "13px" }}>{job.company}</p>
          <h3 style={{ margin: "0 0 8px", fontSize: compact ? "17px" : "19px" }}>{job.title}</h3>
          <p style={{ margin: 0, color: "#52606d", fontSize: "14px" }}>
            {job.location} / {job.type} / {job.career}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <strong style={{ color: "#0f6b5f", fontSize: "14px" }}>연봉 {job.salary}</strong>
          <p style={{ margin: "8px 0 0", color: "#174ea6", fontSize: "13px", fontWeight: 700 }}>
            {job.deadline}
          </p>
        </div>
      </div>
      {!compact && (
        <div className="tag-row">
          {job.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderTop: "1px solid #e3e7ee", paddingTop: "12px" }}>
      <strong style={{ display: "block", fontSize: "22px" }}>{value}</strong>
      <span style={{ color: "#52606d", fontSize: "13px" }}>{label}</span>
    </div>
  );
}
