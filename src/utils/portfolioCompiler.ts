import { ResumeData } from "../types";

export interface EditablePortfolioData {
  fullName: string;
  tagline: string;
  about: string;
  skills: string[];
  experiences: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  projects: {
    id: string;
    name: string;
    technologies: string;
    description: string;
    githubUrl?: string;
    liveUrl?: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    issueDate?: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    specialization?: string;
    startYear?: string;
    endYear?: string;
    cgpa?: string;
  }[];
  contact: {
    id?: string;
    email: string;
    phone: string;
    linkedinUrl: string;
    githubUrl: string;
  };
  profilePhoto: string; // Base64 representation or default SVG placeholder
  resumeFileName?: string;
  activities?: string[];
}

export const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="%234F46E5"/><path d="M50 30a15 15 0 1 0 0 30 15 15 0 0 0 0-30Zm0 35c-18 0-30 10-30 15v5h60v-5c0-5-12-15-30-15Z" fill="%23A5B4FC"/></svg>`;

/**
 * Creates an EditablePortfolioData structure from standard ResumeData
 */
export function extractPortfolioFromResume(resume: ResumeData): EditablePortfolioData {
  const experiences = (resume.experiences || []).map((exp, idx) => ({
    id: exp.id || `exp-${idx}-${Date.now()}`,
    company: exp.company || "Company",
    role: exp.role || "Software Developer",
    startDate: exp.startDate || "",
    endDate: exp.endDate || "Present",
    description: exp.description || "",
  }));

  const projects = (resume.projects || []).map((p, idx) => ({
    id: p.id || `proj-${idx}-${Date.now()}`,
    name: p.name || `Project ${idx + 1}`,
    technologies: p.technologies || "React, TypeScript",
    description: p.description || "",
    githubUrl: p.githubUrl || "",
    liveUrl: p.liveUrl || "",
  }));

  const certifications = (resume.certifications || []).map((c, idx) => ({
    id: c.id || `cert-${idx}-${Date.now()}`,
    name: c.name || "",
    issuer: c.issuer || "",
    issueDate: c.issueDate || "",
  }));

  const education = (resume.education || []).map((edu, idx) => ({
    id: edu.id || `edu-${idx}-${Date.now()}`,
    institution: edu.institution || "",
    degree: edu.degree || "",
    specialization: edu.specialization || "",
    startYear: edu.startYear || "",
    endYear: edu.endYear || "",
    cgpa: edu.cgpa || "",
  })).sort((a, b) => {
    // Reverse chronological order sort
    const yearA = parseInt(a.endYear || "0", 10);
    const yearB = parseInt(b.endYear || "0", 10);
    return yearB - yearA;
  });

  return {
    fullName: resume.personalInfo?.fullName || "Aspirant Developer",
    tagline: resume.selectedGoal ? `Specializing in ${resume.selectedGoal}` : "Passionate Full-Stack Software Developer",
    about: resume.summary || "Highly motivated software engineering candidate. Dedicated to building efficient user interfaces, scalable API integrations, and robust application environments.",
    skills: resume.skills && resume.skills.length > 0 ? [...resume.skills] : ["React", "TypeScript", "Node.js", "Tailwind CSS", "HTML/CSS", "Git", "SQL"],
    experiences,
    projects,
    certifications,
    education,
    contact: {
      email: resume.personalInfo?.email || "developer@example.com",
      phone: resume.personalInfo?.phone || "",
      linkedinUrl: resume.personalInfo?.linkedinUrl || "",
      githubUrl: resume.personalInfo?.githubUrl || "",
    },
    profilePhoto: resume.personalInfo?.profilePhoto || DEFAULT_AVATAR,
    resumeFileName: "resume.pdf",
    activities: (resume.activities || []).map(act => {
      const roleName = act.role || act.title || "Member";
      const orgName = act.organization ? ` at ${act.organization}` : "";
      return `${roleName}${orgName}`;
    })
  };
}

/**
 * Returns CSS styles matching chosen template
 */
export function getTemplateCss(templateId: string): string {
  if (templateId === "sunrise") {
    return `
/* START SUNRISE STYLES */
:root {
  --bg-primary: #100f13;
  --bg-secondary: #17151c;
  --text-main: #f3f2f5;
  --text-muted: #9f9da4;
  --accent: #F59E0B;
  --accent-glow: rgba(245, 158, 11, 0.15);
  --border-light: rgba(255, 255, 255, 0.05);
  --card-bg: rgba(23, 21, 28, 0.6);
  --font-family: 'Space Grotesk', system-ui, sans-serif;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
  line-height: 1.6;
  scroll-behavior: smooth;
}

header {
  background: rgba(16, 15, 19, 0.85);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-light);
}

.container {
  max-width: 1050px;
  margin: 0 auto;
  padding: 0 24px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

nav .logo {
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.5px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
}

nav .logo span {
  color: var(--accent);
}

nav .links {
  display: flex;
  gap: 24px;
}

nav .links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

nav .links a:hover {
  color: var(--accent);
}

/* Mobile Toggle Styles */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.mobile-menu-toggle .bar {
  width: 100%;
  height: 3px;
  background-color: var(--text-main);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.hero {
  padding: 100px 0 80px;
  border-bottom: 1px solid var(--border-light);
  position: relative;
  overflow: hidden;
}

.hero .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.hero::after {
  content: "";
  position: absolute;
  top: -150px;
  right: -50px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(0,0,0,0) 70%);
  z-index: -1;
  pointer-events: none;
}

.hero-content {
  flex: 1;
}

.hero-tag {
  background: rgba(245, 158, 11, 0.1);
  color: var(--accent);
  border: 1px solid rgba(245, 158, 11, 0.2);
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 16px;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 16px;
  line-height: 1.15;
  letter-spacing: -1px;
}

.hero p {
  font-size: 1.15rem;
  color: var(--text-muted);
  margin: 0 0 32px;
  max-width: 580px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn-primary {
  background: var(--accent);
  color: #100f13;
  padding: 12px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: opacity 0.3s, transform 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  color: var(--text-main);
  padding: 12px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.3s, transform 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.profile-container {
  position: relative;
  flex-shrink: 0;
}

.profile-photo {
  width: 250px;
  height: 250px;
  border-radius: 20px;
  object-fit: cover;
  border: 2px solid var(--accent);
  box-shadow: 0 10px 30px var(--accent-glow);
  background: #25232a;
}

.section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-light);
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 40px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title span {
  width: 30px;
  height: 4px;
  background: var(--accent);
  border-radius: 2px;
}

.about-text {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 800px;
  margin: 0;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: border-color 0.3s, background 0.3s;
}

.skill-tag:hover {
  border-color: var(--accent);
  background: var(--accent-glow);
  color: #fff;
}

.experience-list {
  display: flex;
  flex-col: column;
  flex-direction: column;
  gap: 32px;
}

.experience-item {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  padding: 24px;
  border-radius: 16px;
  transition: transform 0.3s, border-color 0.3s;
}

.experience-item:hover {
  transform: translateY(-4px);
  border-color: rgba(245, 158, 11, 0.3);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.exp-role {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
}

.exp-company {
  color: var(--accent);
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: 4px;
}

.exp-date {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: monospace;
  background: rgba(255, 255, 255, 0.03);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--border-light);
}

.exp-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0;
  white-space: pre-line;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.3s, border-color 0.3s;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(245, 158, 11, 0.3);
}

.project-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.tech-badge {
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
  font-family: monospace;
  color: var(--accent);
  padding: 3px 8px;
  border-radius: 4px;
}

.project-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0 0 24px;
  flex: 1;
}

.project-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.3s;
}

.project-link:hover {
  gap: 10px;
}

.certifications-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.cert-card {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.cert-name {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.cert-issuer {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
}

.cert-date {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 8px;
  font-family: monospace;
}

.contact-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 48px;
}

.contact-info {
  flex: 1;
}

.contact-info p {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 32px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.contact-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.2rem;
}

.contact-details h4 {
  margin: 0 0 4px;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
}

.contact-details a, .contact-details p {
  margin: 0;
  font-size: 0.95rem;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.contact-details a:hover {
  color: var(--accent);
}

footer {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted);
  border-top: 1px solid var(--border-light);
  font-size: 0.85rem;
}

/* Base Safety Settings */
* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
}

@media(max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  nav .links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border-light);
    padding: 24px;
    gap: 16px;
    box-shadow: 0 10px 15px rgba(0,0,0,0.5);
    z-index: 99;
  }
  
  nav .links.active {
    display: flex;
  }
  
  .mobile-menu-toggle.active .bar:nth-child(1) {
    transform: translateY(8.5px) rotate(45deg);
  }
  
  .mobile-menu-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-toggle.active .bar:nth-child(3) {
    transform: translateY(-8.5px) rotate(-45deg);
  }

  .hero {
    padding: 60px 0 40px;
  }

  .hero .container {
    flex-direction: column-reverse;
    text-align: center;
    gap: 32px;
  }
  
  .hero h1 {
    font-size: 2.25rem;
  }
  
  .hero p {
    margin: 0 auto 24px;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .profile-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .profile-photo {
    width: 200px;
    height: 200px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .certifications-list {
    grid-template-columns: 1fr;
  }
  
  .contact-section {
    flex-direction: column;
  }
  
  .exp-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .exp-date {
    margin-top: 6px;
  }
}
/* END SUNRISE STYLES */
    `;
  } else if (templateId === "retro" || templateId === "minimal") {
    const isRetro = templateId === "retro";
    return `
/* START MINIMAL / RETRO BRUTALIST STYLES */
:root {
  --bg-primary: ${isRetro ? "#FAF8F2" : "#fcfbf9"};
  --bg-secondary: ${isRetro ? "#EFECE0" : "#f4f3f0"};
  --text-main: #1c1917;
  --text-muted: ${isRetro ? "#4b5563" : "#625c58"};
  --accent: ${isRetro ? "#111827" : "#000000"};
  --border-light: ${isRetro ? "#111827" : "#e7e5e4"};
  --card-bg: #ffffff;
  --font-family: ${isRetro ? "'Space Grotesk', 'Fira Code', 'Courier New', Courier, monospace" : "'Garamond', 'Georgia', serif"};
  --font-mono: 'Fira Code', 'Courier New', Courier, monospace;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
  line-height: 1.5;
  scroll-behavior: smooth;
  font-size: 17px;
}

header {
  background: var(--bg-primary);
  border-bottom: ${isRetro ? "3px" : "1px"} solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 950px;
  margin: 0 auto;
  padding: 0 32px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

nav .logo {
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: -0.5px;
  color: var(--text-main);
  text-transform: uppercase;
}

nav .logo span {
  font-weight: 400;
}

nav .links {
  display: flex;
  gap: 24px;
}

nav .links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: sans-serif;
  transition: color 0.2s;
}

nav .links a:hover {
  color: var(--accent);
}

/* Mobile Toggle Styles */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.mobile-menu-toggle .bar {
  width: 100%;
  height: 2px;
  background-color: var(--accent);
  transition: all 0.25s ease-in-out;
}

.hero {
  padding: 80px 0;
  border-bottom: ${isRetro ? "3px" : "2px"} solid var(--border-light);
}

.hero .container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
}

.hero-content {
  flex: 1;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 400;
  margin: 0 0 16px;
  line-height: 1.1;
  letter-spacing: -1px;
}

.hero p {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin: 0 0 24px;
  font-style: italic;
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
  padding: 10px 24px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: var(--font-family);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: ${isRetro ? "2.5px" : "1px"} solid var(--border-light);
  box-shadow: ${isRetro ? "4px 4px 0px var(--border-light)" : "none"};
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.btn-primary:hover {
  background: ${isRetro ? "var(--bg-secondary)" : "transparent"};
  color: ${isRetro ? "var(--text-main)" : "var(--accent)"};
  transform: ${isRetro ? "translate(-1px, -1px)" : "none"};
  box-shadow: ${isRetro ? "5px 5px 0px var(--border-light)" : "none"};
}

.btn-secondary {
  background: transparent;
  border: ${isRetro ? "2.5px" : "1px"} solid var(--border-light);
  box-shadow: ${isRetro ? "4px 4px 0px var(--border-light)" : "none"};
  color: var(--text-main);
  padding: 10px 24px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-family: var(--font-family);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.btn-secondary:hover {
  border-color: var(--accent);
  background: var(--bg-secondary);
  transform: ${isRetro ? "translate(-1px, -1px)" : "none"};
  box-shadow: ${isRetro ? "5px 5px 0px var(--border-light)" : "none"};
}

.profile-container {
  flex-shrink: 0;
}

.profile-photo {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: ${isRetro ? "3px" : "1px"} solid var(--border-light);
  box-shadow: ${isRetro ? "6px 6px 0px var(--border-light)" : "none"};
  background: #fff;
}

.section {
  padding: 60px 0;
  border-bottom: 1px solid var(--border-light);
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 32px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: sans-serif;
  border-left: 3px solid var(--accent);
  padding-left: 12px;
}

.about-text {
  font-size: 1.15rem;
  color: var(--text-main);
  line-height: 1.6;
  max-width: 800px;
  margin: 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.skill-tag {
  border: ${isRetro ? "2px" : "1px"} solid var(--border-light);
  padding: 10px 16px;
  font-size: 0.95rem;
  background: var(--card-bg);
  box-shadow: ${isRetro ? "2.5px 2.5px 0px var(--border-light)" : "none"};
  font-weight: 500;
}

.skill-tag::before {
  content: "— ";
  color: var(--text-muted);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.experience-item {
  border-bottom: 1px dashed var(--border-light);
  padding-bottom: 24px;
}

.experience-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.exp-role {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.exp-company {
  color: var(--text-muted);
  font-style: italic;
  font-size: 1.05rem;
  margin-top: 2px;
}

.exp-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.exp-desc {
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
  white-space: pre-line;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

.project-card {
  border: ${isRetro ? "2.5px" : "1px"} solid var(--border-light);
  background: var(--card-bg);
  padding: 24px;
  box-sizing: border-box;
  box-shadow: ${isRetro ? "5px 5px 0px var(--border-light)" : "none"};
  transition: all 0.15s ease-in-out;
}

.project-card:hover {
  transform: ${isRetro ? "translate(-1.5px, -1.5px)" : "none"};
  box-shadow: ${isRetro ? "6.5px 6.5px 0px var(--border-light)" : "none"};
}

.project-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 6px;
}

.project-tech {
  margin-bottom: 12px;
}

.tech-badge {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  border: 1px solid var(--border-light);
  padding: 1px 6px;
  margin-right: 6px;
}

.project-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0 0 16px;
}

.project-link {
  color: var(--accent);
  text-decoration: underline;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: sans-serif;
  text-transform: uppercase;
}

.certifications-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cert-card {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 8px;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.cert-name {
  font-weight: 750;
  font-size: 1.05rem;
}

.cert-issuer {
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.95rem;
  margin-left: 6px;
}

.cert-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact-info p {
  color: var(--text-muted);
  font-size: 1.15rem;
  margin: 0 0 24px;
  font-style: italic;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-light);
  padding: 16px;
  background: var(--card-bg);
}

.contact-details h4 {
  margin: 0 0 6px;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: 600;
}

.contact-details a, .contact-details p {
  margin: 0;
  font-size: 1rem;
  color: var(--text-main);
  text-decoration: none;
  font-weight: 700;
}

.contact-details a:hover {
  text-decoration: underline;
}

footer {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted);
  border-top: 1px solid var(--accent);
  font-size: 0.8rem;
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media(max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  nav .links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--bg-primary);
    border-bottom: 2px solid var(--accent);
    padding: 24px 32px;
    gap: 16px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    z-index: 99;
  }
  
  nav .links.active {
    display: flex;
  }
  
  .mobile-menu-toggle.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .mobile-menu-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-toggle.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .hero {
    padding: 40px 0;
  }

  .hero .container {
    flex-direction: column-reverse;
    text-align: center;
    gap: 32px;
  }
  
  .hero h1 {
    font-size: 2.2rem;
  }

  .profile-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .profile-photo {
    width: 150px;
    height: 150px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
/* END MINIMAL STYLES */
    `;
  }

  // Fallback Modern Template
  return `
/* START MODERN STYLES */
:root {
  --bg-primary: #0b0f19;
  --bg-secondary: #131a2c;
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --accent: #6366f1;
  --accent-glow: rgba(99, 102, 241, 0.15);
  --border-light: rgba(255, 255, 255, 0.06);
  --card-bg: #151c2c;
  --font-family: 'Inter', system-ui, sans-serif;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
  line-height: 1.6;
  scroll-behavior: smooth;
}

header {
  background: rgba(11, 15, 25, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-light);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

nav .logo {
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.5px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
}

nav .logo span {
  color: var(--accent);
}

nav .links {
  display: flex;
  gap: 24px;
}

nav .links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

nav .links a:hover {
  color: var(--accent);
}

/* Mobile Toggle Styles */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.mobile-menu-toggle .bar {
  width: 100%;
  height: 3px;
  background-color: var(--text-main);
  border-radius: 99px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero {
  padding: 120px 0 100px;
  border-bottom: 1px solid var(--border-light);
}

.hero .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 56px;
}

.hero-content {
  flex: 1;
}

.hero-tag {
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent);
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 20px;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 850;
  margin: 0 0 20px;
  line-height: 1.1;
  letter-spacing: -2px;
}

.hero p {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin: 0 0 36px;
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
  padding: 12px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.3s, transform 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-light);
  color: var(--text-main);
  padding: 12px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.3s, transform 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.profile-container {
  position: relative;
  flex-shrink: 0;
}

.profile-photo {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--accent);
  box-shadow: 0 0 40px var(--accent-glow);
  background: #181f32;
}

.section {
  padding: 100px 0;
  border-bottom: 1px solid var(--border-light);
}

.section-title {
  font-size: 1.85rem;
  font-weight: 800;
  margin: 0 0 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: -0.5px;
}

.section-title span {
  width: 32px;
  height: 4px;
  background: var(--accent);
  border-radius: 2px;
}

.about-text {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.75;
  max-width: 850px;
  margin: 0;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  padding: 10px 20px;
  border-radius: 99px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: border-color 0.3s, background 0.3s;
}

.skill-tag:hover {
  border-color: var(--accent);
  background: var(--accent-glow);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.experience-item {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  padding: 28px;
  border-radius: 16px;
  transition: transform 0.3s, border-color 0.3s;
}

.experience-item:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.3);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.exp-role {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
}

.exp-company {
  color: var(--accent);
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: 4px;
}

.exp-date {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: monospace;
  background: rgba(255,255,255,0.03);
  padding: 4px 10px;
  border-radius: 6px;
}

.exp-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0;
  white-space: pre-line;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.3s, border-color 0.3s;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.3);
}

.project-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.tech-badge {
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.75rem;
  font-family: monospace;
  color: var(--accent);
  padding: 3px 8px;
  border-radius: 4px;
}

.project-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0 0 24px;
  flex: 1;
}

.project-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.3s;
}

.project-link:hover {
  gap: 10px;
}

.certifications-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.cert-card {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.cert-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
}

.cert-issuer {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
}

.cert-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 10px;
  font-family: monospace;
}

.contact-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 48px;
}

.contact-info {
  flex: 1;
}

.contact-info p {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 36px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.contact-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.25rem;
}

.contact-details h4 {
  margin: 0 0 4px;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
}

.contact-details a, .contact-details p {
  margin: 0;
  font-size: 0.95rem;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.contact-details a:hover {
  color: var(--accent);
}

footer {
  text-align: center;
  padding: 50px 0;
  color: var(--text-muted);
  border-top: 1px solid var(--border-light);
  font-size: 0.85rem;
}

@media(max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  nav .links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border-light);
    padding: 24px;
    gap: 16px;
    box-shadow: 0 10px 15px rgba(0,0,0,0.5);
    z-index: 99;
  }
  
  nav .links.active {
    display: flex;
  }
  
  .mobile-menu-toggle.active .bar:nth-child(1) {
    transform: translateY(8.5px) rotate(45deg);
  }
  
  .mobile-menu-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-toggle.active .bar:nth-child(3) {
    transform: translateY(-8.5px) rotate(-45deg);
  }

  .hero {
    padding: 80px 0 60px;
  }

  .hero .container {
    flex-direction: column-reverse;
    text-align: center;
    gap: 32px;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    margin: 0 auto 32px;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .profile-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .profile-photo {
    width: 200px;
    height: 200px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .certifications-list {
    grid-template-columns: 1fr;
  }
  
  .contact-section {
    flex-direction: column;
  }
  
  .exp-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .exp-date {
    margin-top: 6px;
  }
}
/* END MODERN STYLES */
  `;
}

/**
 * Returns dynamic interactive JS scripts for portfolio navigation
 */
export function getTemplateJs(): string {
  return `
/* Interactive scroll effects and form links */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio content loaded successfully.');

  // Responsive Mobile Navigation Toggles
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    // Menu icon / links collapse toggling
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a navigation link
    const linkItems = navLinks.querySelectorAll('a');
    linkItems.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking anywhere else on page
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Smooth local anchor scrolls
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(l => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = l.getAttribute('href');
      if (targetId && targetId !== '#') {
        const elem = document.querySelector(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
  `;
}

/**
 * Returns the README.md content
 */
export function getReadmeContent(fullName: string): string {
  return `# Professional Portfolio Website – ${fullName}

This personal developer portfolio was custom compiled and optimized using VoidCV.

## Project Structure

\`\`\`
portfolio/
├── index.html     - Primary markup landing and sections layout.
├── style.css      - Modular aesthetic style variables and typography properties.
├── script.js      - Dynamic navigation interaction scripts.
├── README.md      - Step-by-step setup guides and release coordinates.
└── assets/        - Graphic resources and download vectors.
\`\`\`

## Quick Start (How to Use)

1. **Extract ZIP File**: Unpack all files inside a single local workspace folder on your device.
2. **Open In Browser**: Double-click the \`index.html\` file to launch the landing page locally.

## Deploy and Host Online (Free & Fast)

Make your portfolio public to share with recruiters via simple drag-and-drop hosts:

### Option A: Netlify (Fastest)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the complete extracted folder inside the dropzone.
3. Your live portfolio URL will generate instantly for free!

### Option B: GitHub Pages (Recommended)
1. Initialize a new public repository on [GitHub](https://github.com) named \`portfolio\`.
2. Upload all extracted files directly inside the repository.
3. Go to **Settings** > **Pages** > Select branch \`main\` and path \`/\` > click **Save**.
4. Within 1 minute, your portfolio will publish under \`yourusername.github.io/portfolio\`.

### Option C: Vercel
1. Upload folder to GitHub or go to [Vercel](https://vercel.com).
2. Connect your repository to import the project as a Static HTML project.
3. Deploy instantly!
`;
}

/**
 * Compiles a self-contained single-page preview HTML for mounting in iframe srcDoc or exportable ZIP layout
 */
export function compileIframeHtml(templateId: string, data: EditablePortfolioData, forZip: boolean = false): string {
  const css = getTemplateCss(templateId);
  const js = getTemplateJs();

  // Conditional Sections Rendering
  const showExperience = data.experiences && data.experiences.length > 0;
  const showProjects = data.projects && data.projects.length > 0;
  const showCertifications = data.certifications && data.certifications.length > 0;
  const showEducation = data.education && data.education.length > 0;
  const showActivities = data.activities && data.activities.length > 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} | Portfolio</title>
  
  <!-- Modern Font Embeds -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  
  ${forZip ? `
  <!-- External stylesheet for modular customization -->
  <link rel="stylesheet" href="style.css">
  ` : `
  <style>
    ${css}
  </style>
  `}
</head>
<body>

  <!-- Sticky Glassmorphism Navigation Header -->
  <header>
    <div class="container">
      <nav>
        <div class="logo">
          ${data.fullName.split(' ')[0]}<span>.io</span>
        </div>
        <!-- Collapsible Mobile Menu Hamburger Trigger -->
        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle navigation menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        <div class="links" id="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          ${showExperience ? '<a href="#experience">Experience</a>' : ''}
          ${showProjects ? '<a href="#projects">Projects</a>' : ''}
          ${showEducation ? '<a href="#education">Education</a>' : ''}
          ${showCertifications ? '<a href="#certifications">Certificates</a>' : ''}
          ${showActivities ? '<a href="#activities">Activities</a>' : ''}
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </div>
  </header>

  <!-- Hero Splash Container -->
  <section class="hero" id="home">
    <div class="container">
      <div class="hero-content">
        <div class="hero-tag">AI Portfolio Workspace</div>
        <h1>Hi, I'm ${data.fullName}</h1>
        <p>${data.tagline}</p>
        <div class="hero-buttons">
          <a href="#contact" class="btn-primary">Connect With Me</a>
          <a href="assets/resume.pdf" download="resume.pdf" class="btn-secondary" id="btn-resume-download">Download Resume</a>
        </div>
      </div>

    </div>
  </section>

  <!-- About Segment -->
  <section class="section" id="about">
    <div class="container">
      <h2 class="section-title"><span></span>About Me</h2>
      <p class="about-text">${data.about}</p>
    </div>
  </section>

  <!-- Skills segment -->
  <section class="section" id="skills">
    <div class="container">
      <h2 class="section-title"><span></span>Core Expertise</h2>
      <div class="skills-grid">
        ${data.skills.map((skill) => `<div class="skill-tag">${skill}</div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Dynamic Section Rendering: Professional Experience -->
  ${showExperience ? `
  <section class="section" id="experience">
    <div class="container">
      <h2 class="section-title"><span></span>Professional Experience</h2>
      <div class="experience-list">
        ${data.experiences.map((exp) => `
          <div class="experience-item">
            <div class="exp-header">
              <div>
                <div class="exp-role">${exp.role}</div>
                <div class="exp-company">${exp.company}</div>
              </div>
              <div class="exp-date">${exp.startDate || 'N/A'} — ${exp.endDate || 'Present'}</div>
            </div>
            <p class="exp-desc">${exp.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Dynamic Section Rendering: Engineering Projects -->
  ${showProjects ? `
  <section class="section" id="projects">
    <div class="container">
      <h2 class="section-title"><span></span>Featured Projects</h2>
      <div class="projects-grid">
        ${data.projects.map((p) => `
          <div class="project-card">
            <div class="project-name">${p.name}</div>
            <div class="project-tech">
              ${(Array.isArray(p.technologies) ? p.technologies : typeof p.technologies === 'string' ? p.technologies.split(',') : []).map((tech) => `<span class="tech-badge">${String(tech).trim()}</span>`).join('')}
            </div>
            <p class="project-desc">${p.description}</p>
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" target="_blank" class="project-link">
                View Source Repository &rarr;
              </a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Dynamic Section Rendering: Education History -->
  ${showEducation ? `
  <section class="section" id="education">
    <div class="container">
      <h2 class="section-title"><span></span>Education</h2>
      <div class="experience-list">
        ${data.education.map((edu) => `
          <div class="experience-item">
            <div class="exp-header">
              <div>
                <div class="exp-role">${edu.degree} ${edu.specialization ? `in ${edu.specialization}` : ''}</div>
                <div class="exp-company">${edu.institution}</div>
              </div>
              <div class="exp-date">${edu.startYear || 'N/A'} — ${edu.endYear || 'N/A'}</div>
            </div>
            ${edu.cgpa ? `<p class="exp-desc" style="font-size: 0.9rem; font-weight: bold; margin-top: 8px;">Grade/GPA: ${edu.cgpa}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Dynamic Section Rendering: Professional Certifications -->
  ${showCertifications ? `
  <section class="section" id="certifications">
    <div class="container">
      <h2 class="section-title"><span></span>Certifications</h2>
      <div class="certifications-list">
        ${data.certifications.map((cert) => `
          <div class="cert-card">
            <div class="cert-name">${cert.name}</div>
            <div class="cert-issuer">${cert.issuer}</div>
            ${cert.issueDate ? `<div class="cert-date">${cert.issueDate}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Dynamic Section Rendering: Extracurricular Activities -->
  ${showActivities ? `
  <section class="section" id="activities">
    <div class="container">
      <h2 class="section-title"><span></span>Extracurricular Activities</h2>
      <div class="skills-grid">
        ${data.activities?.map((act) => `
          <div class="skill-tag">&#9733; ${act}</div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Contact Corner -->
  <section class="section" id="contact">
    <div class="container">
      <h2 class="section-title"><span></span>Get In Touch</h2>
      <div class="contact-section">
        <div class="contact-info">
          <p>Have an exciting opportunity or project you want to talk about? Contact me directly or check out my profiles below!</p>
          <div class="contact-grid">
            
            <div class="contact-item">
              <div class="contact-icon">✉</div>
              <div class="contact-details">
                <h4>Email Address</h4>
                <a href="mailto:${data.contact.email}">${data.contact.email}</a>
              </div>
            </div>

            ${data.contact.phone ? `
            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div class="contact-details">
                <h4>Contact Number</h4>
                <p>${data.contact.phone}</p>
              </div>
            </div>
            ` : ''}

            ${data.contact.linkedinUrl ? `
            <div class="contact-item">
              <div class="contact-icon">💻</div>
              <div class="contact-details">
                <h4>LinkedIn Profile</h4>
                <a href="${data.contact.linkedinUrl}" target="_blank">LinkedIn Profile</a>
              </div>
            </div>
            ` : ''}

            ${data.contact.githubUrl ? `
            <div class="contact-item">
              <div class="contact-icon">🐙</div>
              <div class="contact-details">
                <h4>GitHub Workspace</h4>
                <a href="${data.contact.githubUrl}" target="_blank">GitHub Profile</a>
              </div>
            </div>
            ` : ''}

          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Compact Human Footnotes -->
  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.fullName}. Powered by VoidCV Portfolio Exporter.</p>
    </div>
  </footer>

  ${forZip ? `
  <!-- External scripts for toggle menu and scrolls -->
  <script src="script.js" defer></script>
  ` : `
  <script>
    ${js}
  </script>
  `}
</body>
</html>`;
}
