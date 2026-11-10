import { useState } from "react";

const defaultProfile = {
  name: "Alex Morgan",
  title: "Full-Stack Developer & UI/UX Designer",
  skills: "React, Node.js, Python, PostgreSQL, Figma, REST APIs, GraphQL",
  experience:
    "5 years building scalable web applications for startups and enterprises. Led teams of 3-8 engineers, delivered 20+ projects on time. Strong background in e-commerce, SaaS dashboards, and mobile-first design.",
  rate: "$65/hr",
  portfolio: "github.com/alexmorgan | alexmorgan.dev",
  tone: "professional",
};

export default function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [jobDesc, setJobDesc] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("generate");
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const generateLetter = async () => {
    if (!jobDesc.trim()) return;

    setLoading(true);
    setCoverLetter("");

    // Mock response for testing (replace with a real API call when ready).
    const mockCoverLetters = {
      professional: `Hi there! I'm ${profile.name}, a ${profile.title} with ${profile.experience.split(" ")[0]} years of experience building scalable applications. Your project caught my attention because it aligns perfectly with my expertise in the exact technologies you need.\n\nI've successfully delivered 20+ projects for startups and enterprises, consistently shipping on time and exceeding expectations. Most recently, I led a team that built a SaaS dashboard handling 100K+ daily users—a project strikingly similar to what you're describing.\n\nWhat sets me apart: I don't just write code; I write solutions. I take time to understand your business goals, ask the right questions, and deliver polished, maintainable work that scales.\n\nMy rate is ${profile.rate}, and I'm available to start immediately. Let's hop on a quick call to discuss how I can deliver your vision.\n\nLooking forward to collaborating!\n\n${profile.name}`,
      friendly: `Hey! I'm ${profile.name}, and I'm genuinely excited about what you're building. Your project sounds like exactly the kind of work I love—challenging, impactful, and perfectly aligned with my skills.\n\nI'm a ${profile.title} who's spent the last ${profile.experience.split(" ")[0]} years helping startups and enterprises bring ambitious ideas to life. I've worked with teams of all sizes and absolutely love the problem-solving that comes with projects like yours.\n\nHere's what I bring: deep technical expertise, a collaborative attitude, and a genuine passion for building things that work beautifully. I've delivered 20+ projects on time, and my clients consistently come back because they trust my work.\n\nI'm available at ${profile.rate} and ready to dive in whenever you need me. Let's chat about your project—I'd love to hear more!\n\nCheers,\n${profile.name}`,
      concise: `${profile.name} here—${profile.title} with direct experience in your project requirements. Delivered 20+ projects for startups and enterprises. Available at ${profile.rate}.\n\nKey strengths: ${profile.skills}. Track record: on-time delivery, clean code, scalable solutions.\n\nReady to start immediately. Let's discuss your project details.`,
      enthusiastic: `I'm absolutely thrilled about your project! As a ${profile.title}, I've spent the last ${profile.experience.split(" ")[0]} years obsessively crafting solutions that truly matter. Your requirements are RIGHT in my sweet spot.\n\nWhat excites me: I don't just code—I build products that users love. I've successfully launched 20+ projects, each one pushing me to grow and innovate. Every project is a chance to deliver something exceptional.\n\nWhat you get with me: unrelenting attention to quality, proactive communication, and the enthusiasm of someone who genuinely loves what they do. At ${profile.rate}, I'm committed to being your best hire for this.\n\nLet's create something amazing together!\n\n${profile.name}`,
    };

    try {
      // Simulate API delay.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockText =
        mockCoverLetters[profile.tone] || mockCoverLetters.professional;

      setCoverLetter(mockText);
      setCharCount(mockText.length);
    } catch (error) {
      setCoverLetter("Failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#e8e6f0",
        fontFamily: "'Georgia', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        className="app-header"
        style={{
          padding: "28px 40px",
          borderBottom: "1px solid #1e1e2e",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "linear-gradient(90deg, #0a0a0f 0%, #10101c 100%)",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            flexShrink: 0,
            background: "linear-gradient(135deg, #6c63ff, #3ecf8e)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          ✦
        </div>

        <div>
          <div
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            ProposalCraft
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#6b6b8a",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            AI-Powered Upwork Cover Letters
          </div>
        </div>

        <div
          className="header-nav"
          style={{ marginLeft: "auto", display: "flex", gap: 8 }}
        >
          {["generate", "profile"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "7px 18px",
                borderRadius: 8,
                border: tab === t ? "none" : "1px solid #2a2a3e",
                background:
                  tab === t
                    ? "linear-gradient(135deg, #6c63ff, #5a54e0)"
                    : "transparent",
                color: tab === t ? "#fff" : "#6b6b8a",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                textTransform: "capitalize",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main
        className="app-main"
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "32px clamp(20px, 4vw, 56px)",
          boxSizing: "border-box",
          minWidth: 0,
        }}
      >
        {tab === "generate" ? (
          <div
            className="generator-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 24,
              width: "100%",
              minWidth: 0,
            }}
          >
            {/* Left: Input */}
            <div
              className="generator-column"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                minWidth: 0,
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6b6b8a",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Job Description
                </label>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the Upwork job description here..."
                  style={{
                    width: "100%",
                    height: 320,
                    background: "#10101c",
                    border: "1px solid #2a2a3e",
                    borderRadius: 12,
                    color: "#e8e6f0",
                    fontSize: 14,
                    padding: 16,
                    resize: "vertical",
                    fontFamily: "Georgia, serif",
                    lineHeight: 1.6,
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <label
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#6b6b8a",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Tone
                  </label>
                  <select
                    value={profile.tone}
                    onChange={(e) =>
                      setProfile({ ...profile, tone: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "#10101c",
                      border: "1px solid #2a2a3e",
                      borderRadius: 8,
                      color: "#e8e6f0",
                      fontSize: 13,
                      fontFamily: "Georgia, serif",
                      outline: "none",
                    }}
                  >
                    <option value="professional">
                      Professional &amp; Confident
                    </option>
                    <option value="friendly">Friendly &amp; Approachable</option>
                    <option value="concise">Concise &amp; Direct</option>
                    <option value="enthusiastic">
                      Enthusiastic &amp; Energetic
                    </option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateLetter}
                disabled={loading || !jobDesc.trim()}
                style={{
                  padding: "14px 24px",
                  background:
                    loading || !jobDesc.trim()
                      ? "#2a2a3e"
                      : "linear-gradient(135deg, #6c63ff, #3ecf8e)",
                  border: "none",
                  borderRadius: 10,
                  color:
                    loading || !jobDesc.trim() ? "#4a4a6a" : "#fff",
                  fontSize: 15,
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  cursor:
                    loading || !jobDesc.trim() ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s",
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        animation: "spin 1s linear infinite",
                        display: "inline-block",
                      }}
                    >
                      ◌
                    </span>
                    Crafting your proposal...
                  </>
                ) : (
                  "✦ Generate Cover Letter"
                )}
              </button>

              {/* Profile Summary */}
              <div
                style={{
                  background: "#10101c",
                  border: "1px solid #2a2a3e",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6b6b8a",
                    marginBottom: 12,
                  }}
                >
                  Your Profile
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>
                  {profile.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#3ecf8e",
                    marginBottom: 8,
                  }}
                >
                  {profile.title}
                </div>
                <div style={{ fontSize: 12, color: "#6b6b8a" }}>
                  {profile.rate} · {profile.portfolio}
                </div>
              </div>
            </div>

            {/* Right: Output */}
            <div
              className="generator-column"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <label
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6b6b8a",
                  }}
                >
                  Generated Cover Letter
                </label>

                {coverLetter && (
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 11, color: "#6b6b8a" }}>
                      {charCount} chars
                    </span>
                    <button
                      onClick={copyToClipboard}
                      style={{
                        padding: "5px 14px",
                        background: copied ? "#3ecf8e22" : "#1e1e2e",
                        border: `1px solid ${
                          copied ? "#3ecf8e" : "#2a2a3e"
                        }`,
                        borderRadius: 6,
                        color: copied ? "#3ecf8e" : "#e8e6f0",
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {copied ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                )}
              </div>

              <div
                style={{
                  flex: 1,
                  background: "#10101c",
                  border: `1px solid ${
                    coverLetter ? "#2a2a5e" : "#2a2a3e"
                  }`,
                  borderRadius: 12,
                  padding: 20,
                  minHeight: 400,
                  position: "relative",
                  overflow: "auto",
                  boxSizing: "border-box",
                }}
              >
                {!coverLetter && !loading && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      color: "#3a3a5a",
                      textAlign: "center",
                      padding: 20,
                    }}
                  >
                    <div style={{ fontSize: 48, opacity: 0.3 }}>✦</div>
                    <div style={{ fontSize: 14 }}>
                      Paste a job description
                      <br />
                      and click Generate
                    </div>
                  </div>
                )}

                {loading && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ textAlign: "center", color: "#6b6b8a" }}>
                      <div
                        style={{
                          fontSize: 32,
                          marginBottom: 12,
                          animation: "pulse 1.5s ease-in-out infinite",
                        }}
                      >
                        ✦
                      </div>
                      <div style={{ fontSize: 13 }}>
                        Analyzing job requirements...
                      </div>
                    </div>
                  </div>
                )}

                {coverLetter && (
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.8,
                      color: "#d4d2e8",
                      whiteSpace: "pre-wrap",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {coverLetter}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Profile Tab */
          <div style={{ width: "100%", maxWidth: 600 }}>
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Your Freelancer Profile
              </div>
              <div style={{ fontSize: 13, color: "#6b6b8a" }}>
                This information is used to personalize your cover letters.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {[
                {
                  key: "name",
                  label: "Full Name",
                  placeholder: "Alex Morgan",
                },
                {
                  key: "title",
                  label: "Professional Title",
                  placeholder: "Full-Stack Developer & UI/UX Designer",
                },
                {
                  key: "rate",
                  label: "Hourly Rate",
                  placeholder: "$65/hr",
                },
                {
                  key: "portfolio",
                  label: "Portfolio / GitHub URL",
                  placeholder: "github.com/you | yoursite.com",
                },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#6b6b8a",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    {label}
                  </label>
                  <input
                    value={profile[key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                    placeholder={placeholder}
                    style={{
                      width: "100%",
                      padding: "11px 16px",
                      background: "#10101c",
                      border: "1px solid #2a2a3e",
                      borderRadius: 8,
                      color: "#e8e6f0",
                      fontSize: 14,
                      fontFamily: "Georgia, serif",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}

              {[
                {
                  key: "skills",
                  label: "Key Skills",
                  placeholder: "React, Node.js, Python...",
                  rows: 3,
                },
                {
                  key: "experience",
                  label: "Experience Summary",
                  placeholder:
                    "Describe your background, achievements, industries...",
                  rows: 5,
                },
              ].map(({ key, label, placeholder, rows }) => (
                <div key={key}>
                  <label
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#6b6b8a",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    {label}
                  </label>
                  <textarea
                    value={profile[key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                    placeholder={placeholder}
                    rows={rows}
                    style={{
                      width: "100%",
                      padding: "11px 16px",
                      background: "#10101c",
                      border: "1px solid #2a2a3e",
                      borderRadius: 8,
                      color: "#e8e6f0",
                      fontSize: 14,
                      fontFamily: "Georgia, serif",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                      lineHeight: 1.6,
                    }}
                  />
                </div>
              ))}

              <div
                style={{
                  padding: "12px 16px",
                  background: "#3ecf8e11",
                  border: "1px solid #3ecf8e33",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#3ecf8e",
                }}
              >
                ✓ Profile saved — used for all future cover letter generations
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        textarea:focus,
        input:focus,
        select:focus {
          border-color: #6c63ff !important;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0f;
        }

        ::-webkit-scrollbar-thumb {
          background: #2a2a3e;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
