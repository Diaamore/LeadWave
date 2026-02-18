import { useState, useEffect, useRef } from "react";

// ---- Logo SVG ----
const LogoSVG = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="100%" stopColor="#ff00d4" />
      </linearGradient>
    </defs>
    <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="none" stroke="url(#logoGradient)" strokeWidth="2" />
    <polygon points="50,20 80,37 80,63 50,80 20,63 20,37" fill="none" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.6" />
    <circle cx="50" cy="50" r="12" fill="url(#logoGradient)" opacity="0.3" />
    <circle cx="50" cy="50" r="6" fill="url(#logoGradient)" />
  </svg>
);

// ---- Section Header (small) ----
const SectionHeaderSmall = () => (
  <div className="section-header-small">
    <div className="small-logo"><LogoSVG size={40} /></div>
    <div className="small-brand">
      <h3>LEADWAVE</h3>
      <p>Digital Excellence</p>
    </div>
  </div>
);

// ---- Loading Screen ----
const LoadingScreen = ({ visible }: { visible: boolean }) => (
  <div className={`loading-screen${visible ? "" : " hidden"}`}>
    <div className="loader-ring" />
    <div className="loading-text">Initializing Experience...</div>
  </div>
);

// ---- Animated Counter ----
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setValue(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="metric-value">
      {value}
      {suffix}
    </span>
  );
};

// ---- INTRODUCTION ----
const Introduction = () => (
  <div className="content-section" id="introduction">
    <SectionHeaderSmall />
    <div className="intro-hero">
      <div className="intro-hero-content">
        <span className="intro-badge">Est. 2020</span>
        <h1 className="intro-headline">
          We Build Digital<br /><span>Experiences</span> That Matter
        </h1>
        <p className="intro-subtext">
          Transforming visionary ideas into powerful digital realities through cutting-edge technology and creative excellence.
        </p>
        <div className="intro-cta-group">
          <button className="intro-cta-primary">Explore Our Work</button>
          <button className="intro-cta-secondary">Watch Showreel</button>
        </div>
      </div>
      <div className="intro-hero-visual">
        <div className="intro-orb" />
        <div className="intro-floating-card card-1"><span className="card-icon">⚡</span><span>Lightning Fast</span></div>
        <div className="intro-floating-card card-2"><span className="card-icon">🎯</span><span>Pixel Perfect</span></div>
        <div className="intro-floating-card card-3"><span className="card-icon">🔒</span><span>Secure &amp; Reliable</span></div>
      </div>
    </div>

    <div className="intro-metrics">
      <div className="metric-item">
        <Counter target={500} />
        <span className="metric-label">Projects Delivered</span>
      </div>
      <div className="metric-divider" />
      <div className="metric-item">
        <Counter target={98} suffix="%" />
        <span className="metric-label">Client Retention</span>
      </div>
      <div className="metric-divider" />
      <div className="metric-item">
        <Counter target={12} />
        <span className="metric-label">Industry Awards</span>
      </div>
      <div className="metric-divider" />
      <div className="metric-item">
        <span className="metric-value">24/7</span>
        <span className="metric-label">Global Support</span>
      </div>
    </div>

    <div className="intro-values">
      {[
        { n: "01", t: "Innovation First", p: "We embrace emerging technologies and push creative boundaries to deliver solutions that set new industry standards." },
        { n: "02", t: "Human-Centered", p: "Every pixel, every interaction is designed with real users in mind. We create experiences people genuinely love." },
        { n: "03", t: "Results Driven", p: "Beautiful design meets measurable impact. We track, iterate, and optimize for outcomes that matter to your business." },
      ].map((v) => (
        <div className="value-card" key={v.n}>
          <div className="value-number">{v.n}</div>
          <h3>{v.t}</h3>
          <p>{v.p}</p>
        </div>
      ))}
    </div>

    <div className="intro-tech">
      <p className="tech-label">Technologies We Master</p>
      <div className="tech-marquee">
        <div className="tech-track">
          {["React", "Next.js", "Node.js", "Python", "TensorFlow", "AWS", "Flutter", "Figma", "C#", "ASP.NET", "Azure Cloud", "TypeScript",
            "React", "Next.js", "Node.js", "Python", "TensorFlow", "AWS", "Flutter", "Figma", "C#", "ASP.NET", "Azure Cloud", "TypeScript"].map((t, i) => (
            <span className="tech-item" key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ---- SERVICES ----
const TABS = ["Development", "Design", "Consulting", "Support"];
const SERVICES: Record<string, { icon: string; title: string; desc: string }[]> = {
  Development: [
    { icon: "🤖", title: "AI Development", desc: "Custom AI solutions powered by machine learning and neural networks for intelligent automation and predictive analytics." },
    { icon: "🌐", title: "Web Applications", desc: "Responsive, scalable web apps built with modern frameworks like React, Vue, and Next.js for optimal performance." },
    { icon: "📱", title: "Mobile Apps", desc: "Native and cross-platform mobile solutions for iOS and Android that deliver seamless user experiences." },
  ],
  Design: [
    { icon: "🎨", title: "UX/UI Design", desc: "Beautiful, intuitive interfaces that delight users and drive engagement through research-backed design principles." },
    { icon: "✏️", title: "Brand Identity", desc: "Complete brand packages including logos, typography, color systems, and comprehensive brand guidelines." },
    { icon: "🎬", title: "Motion Design", desc: "Engaging animations and interactive experiences that bring your digital products to life." },
  ],
  Consulting: [
    { icon: "📊", title: "Digital Strategy", desc: "Strategic planning for digital transformation initiatives that align technology with business objectives." },
    { icon: "🔍", title: "Technology Audit", desc: "Comprehensive assessment of your tech infrastructure to identify opportunities and optimize performance." },
    { icon: "⚙️", title: "Process Optimization", desc: "Streamline workflows with automation and best practices for maximum efficiency and productivity." },
  ],
  Support: [
    { icon: "🛡️", title: "24/7 Support", desc: "Round-the-clock technical assistance and maintenance to keep your systems running smoothly." },
    { icon: "📚", title: "Training & Workshops", desc: "Empower your team with expert-led training sessions tailored to your technology stack." },
    { icon: "☁️", title: "Managed Services", desc: "End-to-end management of your digital infrastructure for worry-free operations." },
  ],
};

const Services = () => {
  const [activeTab, setActiveTab] = useState("Development");
  return (
    <div className="content-section" id="services">
      <SectionHeaderSmall />
      <div className="section-header">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Comprehensive solutions for the digital age</p>
      </div>
      <div className="tabs-container">
        <div className="tab-buttons">
          {TABS.map((t) => (
            <button key={t} className={`tab-btn${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>
        <div className="tab-content">
          {TABS.map((t) => (
            <div key={t} className={`tab-pane${activeTab === t ? " active" : ""}`}>
              <div className="services-list">
                {SERVICES[t].map((s) => (
                  <div className="service-row" key={s.title}>
                    <div className="service-row-icon">{s.icon}</div>
                    <div className="service-row-content">
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                    <div className="service-row-arrow">→</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---- GALLERY ----
const GALLERY_ITEMS = [
  { category: "web", icon: "💻", label: "E-Commerce Platform", sub: "Web Development", color: "rgba(0,240,255,0.15)" },
  { category: "mobile", icon: "📱", label: "Fitness App", sub: "Mobile Development", color: "rgba(255,0,212,0.15)" },
  { category: "branding", icon: "✨", label: "Brand Identity", sub: "Design & Branding", color: "rgba(119,0,255,0.15)" },
  { category: "web", icon: "📊", label: "Analytics Dashboard", sub: "Web Application", color: "rgba(0,240,255,0.12)" },
  { category: "mobile", icon: "🏦", label: "Banking App", sub: "Mobile Development", color: "rgba(255,0,212,0.12)" },
  { category: "branding", icon: "🚀", label: "Startup Branding", sub: "Design & Identity", color: "rgba(119,0,255,0.12)" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter);
  return (
    <div className="content-section" id="gallery">
      <SectionHeaderSmall />
      <div className="section-header">
        <h2 className="section-title">Our Portfolio</h2>
        <p className="section-subtitle">Explore our latest works</p>
      </div>
      <div className="filter-buttons">
        {["all", "web", "mobile", "branding"].map((f) => (
          <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {filtered.map((g, i) => (
          <div className="gallery-item" key={i} style={{ background: g.color }}>
            <div className="gallery-placeholder">
              <span className="icon">{g.icon}</span>
              <span className="label">{g.label}</span>
            </div>
            <div className="gallery-overlay">
              <h4>{g.label}</h4>
              <p>{g.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- TESTIMONIALS ----
const TESTIMONIALS = [
  { text: "Working with Leadwave transformed our digital presence. Their innovative approach and attention to detail exceeded our expectations at every turn.", name: "Michael Chen", role: "CEO, TechVentures", avatar: "👨‍💼" },
  { text: "The team's expertise in UX design helped us create an app that our users absolutely love. Our engagement metrics have increased by 200%.", name: "Sarah Johnson", role: "Product Director, InnovateCo", avatar: "👩‍💼" },
  { text: "From strategy to execution, Leadwave delivered exceptional results. Their commitment to quality is unmatched in the industry.", name: "David Park", role: "Founder, StartupHub", avatar: "👨‍💻" },
  { text: "The AI solutions they built for us have revolutionized our operations. We've seen a 40% increase in efficiency since implementation.", name: "Emily Zhang", role: "COO, DataFlow Inc", avatar: "👩‍💻" },
];

const Testimonials = () => (
  <div className="content-section" id="testimonials">
    <SectionHeaderSmall />
    <div className="section-header">
      <h2 className="section-title">Client Stories</h2>
      <p className="section-subtitle">What our clients say about us</p>
    </div>
    <div className="testimonials-grid">
      {TESTIMONIALS.map((t) => (
        <div className="testimonial-card" key={t.name}>
          <div className="stars">{[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}</div>
          <p className="testimonial-text">{t.text}</p>
          <div className="testimonial-author">
            <div className="author-avatar">{t.avatar}</div>
            <div className="author-info">
              <h5>{t.name}</h5>
              <p>{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---- ABOUT ----
const TEAM = [
  { avatar: "👨‍💼", name: "Alex Carter", role: "CEO" },
  { avatar: "👩‍💻", name: "Mia Lee", role: "Lead Dev" },
  { avatar: "🧑‍🎨", name: "Sam Rivera", role: "Design" },
  { avatar: "👩‍📊", name: "Dana Kim", role: "Strategy" },
  { avatar: "👨‍🔬", name: "Chris Wu", role: "AI/ML" },
  { avatar: "👩‍💼", name: "Lara Ahmed", role: "PM" },
];

const About = () => (
  <div className="content-section" id="about">
    <SectionHeaderSmall />
    <div className="section-header">
      <h2 className="section-title">About Us</h2>
      <p className="section-subtitle">Our story, mission, and values</p>
    </div>
    <div className="about-content">
      <div className="about-text">
        <h3>Pioneering Digital Innovation</h3>
        <p>Founded in 2020, Leadwave has grown from a small team of passionate developers into a leading digital agency. We believe in pushing boundaries and creating solutions that make a real difference.</p>
        <p>Our diverse team brings together expertise from design, development, AI, and strategy to deliver holistic solutions that drive business growth and user engagement.</p>
        <p>We're not just building products – we're shaping the future of digital experiences.</p>
      </div>
      <div className="about-image-box">
        <div className="about-team-grid">
          {TEAM.map((m) => (
            <div className="team-cell" key={m.name}>
              <div className="team-avatar">{m.avatar}</div>
              <span className="team-name">{m.name}</span>
              <span className="team-role">{m.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ---- CONTACT ----
type FormState = { company: string; email: string; budget: string; goal: string };
type SubmitStatus = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState<FormState>({ company: "", email: "", budget: "$50,000–$100,000", goal: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("https://formspree.io/f/mqedbnzd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message || "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="content-section" id="contact">
      <SectionHeaderSmall />
      <div className="section-header">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">Let's create something amazing together</p>
      </div>
      <div className="contact-grid">
        <div className="contact-form-box">
          <h3>Start Your Project</h3>
          {status === "success" ? (
            <div className="form-success">
              <span className="check">✅</span>
              <h4>Message Sent!</h4>
              <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              <button className="submit-btn" style={{ marginTop: "1rem" }} onClick={() => { setStatus("idle"); setForm({ company: "", email: "", budget: "$50,000–$100,000", goal: "" }); }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Company Name *</label>
                <input name="company" placeholder="Your company name" value={form.company} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Project Budget</label>
                <select name="budget" value={form.budget} onChange={handleChange}>
                  <option>$50,000–$100,000</option>
                  <option>$100,000–$200,000</option>
                  <option>$300,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label>Campaign Goal / Project Details *</label>
                <textarea name="goal" placeholder="Tell us about your project, goals, and vision..." value={form.goal} onChange={handleChange} required />
              </div>
              {status === "error" && (
                <div style={{ marginBottom: "1rem", padding: "0.75rem 1rem", background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.3)", borderRadius: "8px", fontSize: "0.82rem", color: "#ff6b6b" }}>
                  ⚠️ {errorMsg}
                </div>
              )}
              <button type="submit" className="submit-btn" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </div>

        <div className="contact-info-box">
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div className="contact-details">
              <h4>Locations</h4>
              <p>Dubai · Abu Dhabi · Riyadh · Mecca · Doha · Amman · Manama · Palestine · Istanbul · Algiers · Bahrain · Cairo</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div className="contact-details">
              <h4>Email</h4>
              <p><a href="mailto:solutiondeveloper911@gmail.com">solutiondeveloper911@gmail.com</a></p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">💬</div>
            <div className="contact-details">
              <h4>WhatsApp / Telegram</h4>
              <p><a href="https://wa.me/201001187911" target="_blank" rel="noreferrer">+2 01001187911</a></p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">⏰</div>
            <div className="contact-details">
              <h4>Response Time</h4>
              <p>We typically respond within 24 hours on business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- MENU ----
const MENU_ITEMS = [
  { badge: "IN", title: "Introduction", section: "introduction" },
  { badge: "SV", title: "Services", section: "services" },
  { badge: "GL", title: "Gallery", section: "gallery" },
  { badge: "TM", title: "Testimonials", section: "testimonials" },
  { badge: "AB", title: "About", section: "about" },
  { badge: "CT", title: "Contact", section: "contact" },
];

type Section = "introduction" | "services" | "gallery" | "testimonials" | "about" | "contact" | null;

// ---- APP ----
export function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const openSection = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToMenu = () => {
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <LoadingScreen visible={loading} />

      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grid-overlay" />

      <div className="main-container">
        {/* Header — always show on menu */}
        {!activeSection && (
          <div className="header">
            <LogoSVG size={80} />
            <h1 className="brand-name">Leadwave</h1>
            <p className="tagline">Digital Excellence Redefined</p>
          </div>
        )}

        {/* Menu Grid */}
        {!activeSection && (
          <div className="menu-grid">
            {MENU_ITEMS.map((item) => (
              <div className="menu-item" key={item.section} onClick={() => openSection(item.section as Section)}>
                <div className="menu-badge">{item.badge}</div>
                <div className="menu-title">{item.title}</div>
              </div>
            ))}
          </div>
        )}

        {/* Content Sections */}
        {activeSection && (
          <div>
            <button className="back-btn" onClick={backToMenu}>← Back to Menu</button>
            {activeSection === "introduction" && <Introduction />}
            {activeSection === "services" && <Services />}
            {activeSection === "gallery" && <Gallery />}
            {activeSection === "testimonials" && <Testimonials />}
            {activeSection === "about" && <About />}
            {activeSection === "contact" && <Contact />}
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 <span>Leadwave</span>. Crafted with passion. Design by Certified Professionals.</p>
        </footer>
      </div>
    </>
  );
}
