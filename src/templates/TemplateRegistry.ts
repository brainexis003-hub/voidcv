import { ResumeData } from "../types";

export interface TemplateMetadata {
  fontFamily: string;
  accentColor: string;
  headerBorder: string;
  titleSize: string;
  subSize: string;
  padding?: string;
  headerAlign?: "left" | "center" | "right";
  borderStyle?: string;
  sectionSpacing?: string;
  bulletIcon?: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  desc: string;
  atsRating: number; // e.g. 98%
  metadata: TemplateMetadata;
  isPlaceholder?: boolean;
  previewThumbnail?: string; // CSS-based preview color code or URL
}

export const DEFAULT_TEMPLATES: ResumeTemplate[] = [
  {
    id: "ats",
    name: "ATS Professional",
    desc: "Highest bot-reading accuracy with standard clean spacing",
    atsRating: 99,
    previewThumbnail: "linear-gradient(135deg, #0f172a, #334155)",
    metadata: {
      fontFamily: "Arial, sans-serif",
      accentColor: "#000000",
      headerBorder: "1.5px solid #000000",
      titleSize: "22px",
      subSize: "11px",
      padding: "45px",
      headerAlign: "left",
      borderStyle: "1.5px solid #000000",
      sectionSpacing: "20px",
      bulletIcon: "•"
    }
  },
  {
    id: "traditional_academic",
    name: "Traditional Academic",
    desc: "Classic academic layout featuring elegant traditional serif headings and dot highlights",
    atsRating: 97,
    previewThumbnail: "linear-gradient(135deg, #1b2e35, #000000)",
    metadata: {
      fontFamily: "'Times New Roman', Times, serif",
      accentColor: "#1e293b",
      headerBorder: "none",
      titleSize: "26px",
      subSize: "12px",
      padding: "45px",
      headerAlign: "center",
      borderStyle: "1.2px solid #222222",
      sectionSpacing: "18px",
      bulletIcon: "•"
    }
  },
  {
    id: "sleek_indigo",
    name: "Sleek Indigo",
    desc: "A highly readable presentation with modern accents and clear dash bullet points",
    atsRating: 96,
    previewThumbnail: "linear-gradient(135deg, #1e40af, #1e3a8a)",
    metadata: {
      fontFamily: "system-ui, -apple-system, sans-serif",
      accentColor: "#1d4ed8",
      headerBorder: "1.5px solid #1d4ed8",
      titleSize: "24px",
      subSize: "11px",
      padding: "45px",
      headerAlign: "left",
      borderStyle: "1.2px solid #cbd5e1",
      sectionSpacing: "20px",
      bulletIcon: "–"
    }
  },
  {
    id: "premium_executive",
    name: "Premium Executive",
    desc: "Prestigious editorial layout with custom spacing and executive square highlights",
    atsRating: 95,
    previewThumbnail: "linear-gradient(135deg, #78350f, #3b0764)",
    metadata: {
      fontFamily: "'Garamond', 'Georgia', serif",
      accentColor: "#78350f",
      headerBorder: "1.5px solid #78350f",
      titleSize: "28px",
      subSize: "12px",
      padding: "45px",
      headerAlign: "center",
      borderStyle: "2px double #78350f",
      sectionSpacing: "22px",
      bulletIcon: "▪"
    }
  },
  {
    id: "classic_minimalist",
    name: "Classic Minimalist",
    desc: "Sleek, minimalist design with a split dual-alignment standard header layout",
    atsRating: 98,
    previewThumbnail: "linear-gradient(135deg, #0284c7, #0f172a)",
    metadata: {
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      accentColor: "#059669",
      headerBorder: "1.5px solid #000000",
      titleSize: "24px",
      subSize: "12px",
      padding: "45px",
      headerAlign: "left",
      borderStyle: "1.2px solid #222222",
      sectionSpacing: "20px",
      bulletIcon: "•"
    }
  },
  {
    id: "crimson_banner",
    name: "Crimson Banner",
    desc: "Beautiful top banner header card in burgundy/crimson styling",
    atsRating: 94,
    previewThumbnail: "linear-gradient(135deg, #991b1b, #7f1d1d)",
    metadata: {
      fontFamily: "system-ui, sans-serif",
      accentColor: "#991b1b",
      headerBorder: "none",
      titleSize: "26px",
      subSize: "12px",
      padding: "40px",
      headerAlign: "left",
      borderStyle: "2px solid #991b1b",
      sectionSpacing: "20px",
      bulletIcon: "›"
    }
  },
  {
    id: "modern",
    name: "Modern Professional",
    desc: "Clean layout, dynamic subtle highlights, and high readability",
    atsRating: 92,
    previewThumbnail: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    metadata: {
      fontFamily: "'Garamond', 'Georgia', serif",
      accentColor: "#1D4ED8",
      headerBorder: "1px solid #111111",
      titleSize: "30px",
      subSize: "14px",
      padding: "45px",
      headerAlign: "left",
      borderStyle: "1px solid #222222",
      sectionSpacing: "20px",
      bulletIcon: "•"
    }
  },
  {
    id: "fresher",
    name: "Fresher Template",
    desc: "Optimized for entry-level developers with clear education blocks",
    atsRating: 88,
    previewThumbnail: "linear-gradient(135deg, #065f46, #10b981)",
    metadata: {
      fontFamily: "'Courier New', Courier, monospace",
      accentColor: "#047857",
      headerBorder: "1.5px dashed #047857",
      titleSize: "24px",
      subSize: "12px",
      padding: "45px",
      headerAlign: "center",
      borderStyle: "1.5px dashed #047857",
      sectionSpacing: "18px",
      bulletIcon: "•"
    }
  },
  {
    id: "exec",
    name: "Executive Template",
    desc: "Elegant serif typography for senior management candidates",
    atsRating: 95,
    previewThumbnail: "linear-gradient(135deg, #311042, #701a75)",
    metadata: {
      fontFamily: "'Georgia', serif",
      accentColor: "#4C1D95",
      headerBorder: "2px solid #4C1D95",
      titleSize: "26px",
      subSize: "12px",
      padding: "45px",
      headerAlign: "left",
      borderStyle: "1.5px solid #222222",
      sectionSpacing: "22px",
      bulletIcon: "•"
    }
  },
  {
    id: "custom_premium",
    name: "Custom Premium Template",
    desc: "Elegant modern layout with beautiful dynamic amber highlights and left borders on section titles",
    atsRating: 98,
    previewThumbnail: "linear-gradient(135deg, #b45309, #f59e0b)",
    metadata: {
      fontFamily: "'Georgia', serif",
      accentColor: "#b45309",
      headerBorder: "1px solid #b45309",
      titleSize: "26px",
      subSize: "12px",
      padding: "45px",
      headerAlign: "left",
      borderStyle: "1.5px solid #cbd5e1",
      sectionSpacing: "20px",
      bulletIcon: "★"
    }
  }
];

/**
 * Helper to render Module 1 Optional Extra Sections (Interests, Extracurriculars, Certifications)
 */
function renderModule1ExtraOptionalSections(
  templateId: string,
  resume: ResumeData,
  accentColor: string,
  borderStyle: string,
  fontFamily: string,
  bulletIcon: string = "•"
): string {
  const sortedCerts = [...(resume.certifications || [])].sort((a, b) => {
    if (!a.issueDate) return 1;
    if (!b.issueDate) return -1;
    return b.issueDate.localeCompare(a.issueDate);
  });

  const hasCerts = sortedCerts.length > 0;
  const hasActivities = resume.activities && resume.activities.length > 0;
  const hasInterests = resume.interests && resume.interests.length > 0;

  if (!hasCerts && !hasActivities && !hasInterests) return "";

  const makeHeader = (title: string) => {
    if (templateId === "custom_premium") {
      return `
        <table width="100%" style="border-collapse: collapse; margin-top: 15px; margin-bottom: 8px;">
          <tr>
            <td style="width: 4px; background-color: ${accentColor};"></td>
            <td style="padding-left: 8px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin: 0; font-family: ${fontFamily};">${title}</h2>
            </td>
          </tr>
        </table>
      `;
    }
    const color = (templateId === "classic_minimalist" || templateId === "traditional_academic") ? "#000000" : accentColor;
    const letterSpacing = templateId === "premium_executive" ? "3px" : "1.2px";
    const paddingBottom = templateId === "premium_executive" ? "4px" : "3px";
    const textAlign = templateId === "traditional_academic" ? "center" : "left";

    return `
      <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${color}; letter-spacing: ${letterSpacing}; margin-top: 15px; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: ${paddingBottom}; text-align: ${textAlign}; font-family: ${fontFamily};">${title}</h2>
    `;
  };

  let certsHtml = "";
  if (hasCerts) {
    const items = sortedCerts.map(cert => `
      <div style="margin-bottom: 10px; page-break-inside: avoid; break-inside: avoid; font-size: 11px; font-family: ${fontFamily};">
        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
          <span style="font-weight: bold; color: #000000;">
            ${cert.name} &mdash; <span style="font-weight: bold; color: #111111;">${cert.issuer}</span>
          </span>
          <span style="color: #000000; font-family: monospace; font-weight: bold;">
            ${cert.issueDate || ""} ${cert.expiryDate ? ` &ndash; ${cert.expiryDate}` : ""}
          </span>
        </div>
        ${cert.credentialId || cert.credentialUrl ? `
          <div style="font-size: 10px; color: #4b5563; font-weight: 500;">
            ${cert.credentialId ? `Credential ID: <strong>${cert.credentialId}</strong>` : ""}
            ${cert.credentialId && cert.credentialUrl ? " &nbsp;|&nbsp; " : ""}
            ${cert.credentialUrl ? `Link: <a href="${cert.credentialUrl}" target="_blank" style="color: ${accentColor}; font-weight: bold; text-decoration: none;">${cert.credentialUrl}</a>` : ""}
          </div>
        ` : ""}
      </div>
    `).join("");

    certsHtml = `
      <div style="margin-bottom: 18px; text-align: left;">
        ${makeHeader("Certifications")}
        ${items}
      </div>
    `;
  }

  let activitiesHtml = "";
  if (hasActivities) {
    const items = resume.activities.map(act => {
      const actTitle = act.title || act.role || "Activity";
      const actOrg = act.organization || "";
      const actRole = act.title ? act.role : "";
      const dateStr = act.startDate ? `${act.startDate}${act.endDate ? ` &ndash; ${act.endDate}` : " &ndash; Present"}` : "";

      return `
        <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid; font-size: 11px; font-family: ${fontFamily};">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: bold; color: #000000;">
              ${actTitle} 
              ${actOrg ? ` &mdash; <span style="font-weight: bold; color: #111111;">${actOrg}</span>` : ""}
              ${actRole ? ` (${actRole})` : ""}
            </span>
            ${dateStr ? `<span style="color: #000000; font-family: monospace; font-weight: bold;">${dateStr}</span>` : ""}
          </div>
          <p style="font-size: 10.5px; color: #111111; margin: 0; line-height: 1.5; font-weight: 500;">
            ${bulletIcon} ${act.description}
          </p>
        </div>
      `;
    }).join("");

    activitiesHtml = `
      <div style="margin-bottom: 18px; text-align: left;">
        ${makeHeader("Extracurricular Activities")}
        ${items}
      </div>
    `;
  }

  let interestsHtml = "";
  if (hasInterests) {
    const itemStr = templateId === "traditional_academic" 
      ? resume.interests.join(" &nbsp;•&nbsp; ") 
      : resume.interests.join(" &nbsp;&bull;&nbsp; ");
    
    const textAlign = templateId === "traditional_academic" ? "center" : "left";

    interestsHtml = `
      <div style="margin-bottom: 18px; text-align: ${textAlign};">
        ${makeHeader("Interests & Hobbies")}
        <p style="font-size: 11px; color: #000000; margin: 0; line-height: 1.5; font-weight: 500; font-family: ${fontFamily};">
          ${itemStr}
        </p>
      </div>
    `;
  }

  return `
    ${certsHtml}
    ${activitiesHtml}
    ${interestsHtml}
  `;
}

function renderProjectLink(githubUrl?: string): string {
  if (!githubUrl || !githubUrl.trim()) return "";
  const cleanUrl = githubUrl.trim();
  
  const isGithub = cleanUrl.toLowerCase().includes("github.com");
  const label = isGithub ? "GitHub" : "Live";
  
  let display = cleanUrl.replace(/^(https?:\/\/)?(www\.)?/, "");
  if (display.endsWith("/")) {
    display = display.slice(0, -1);
  }
  if (display.length > 40) {
    display = display.substring(0, 37) + "...";
  }
  
  return `
    <div style="font-size: 10px; margin-top: 3px; font-weight: 500;">
      <strong style="color: #4b5563;">${label}:</strong> 
      <a href="${cleanUrl}" target="_blank" style="color: #2563eb; text-decoration: none; word-break: break-all;">${display}</a>
    </div>
  `;
}

export function getDisplayRole(resume: ResumeData | null | undefined): string {
  if (!resume) return "";
  if (resume.selectedGoal === "Other") {
    return resume.customGoal || "";
  }
  return resume.selectedGoal || "";
}

/**
 * Robust Template Rendering Engine (Resume Data * Selected Template = Generated Resume)
 * Works interchangeably for high-fidelity Live HTML rendering and HTML-to-PDF compilation.
 */
export function generateTemplateHtml(template: ResumeTemplate, resume: ResumeData): string {
  const displayRole = getDisplayRole(resume);
  const globalStyles = `
    <style>
      * {
        box-sizing: border-box !important;
      }
      p, span, div, td, a, h1, h2, h3, h4, h5, h6, li {
        max-width: 100% !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        word-break: break-word !important;
      }
      a, [href], .word-break-all {
        word-break: break-all !important;
      }
      table {
        table-layout: fixed !important;
        width: 100% !important;
        max-width: 100% !important;
        border-collapse: collapse !important;
      }
      td[align="right"] {
        text-align: right !important;
      }
      td[align="left"] {
        text-align: left !important;
      }
    </style>
  `;

  // A. CUSTOM PREMIUM TEMPLATE RENDERER (Active implementation)
  if (template.id === "custom_premium") {
    const {
      fontFamily = "'Georgia', serif",
      accentColor = "#b45309",
      titleSize = "26px",
      subSize = "12px",
      borderStyle = "1.5px solid #cbd5e1",
      bulletIcon = "★",
      padding = "45px"
    } = template.metadata;

    return `
      ${globalStyles}
      <div style="font-family: ${fontFamily}; line-height: 1.6; text-align: left; background-color: #ffffff; color: #111827; padding: ${padding}; box-sizing: border-box;">
        <!-- Premium Dual Column Header or Sleek Centered Header -->
        <div style="border-bottom: 2px solid ${accentColor}; padding-bottom: 12px; margin-bottom: 18px;">
          <table width="100%" style="border-collapse: collapse; table-layout: fixed; width: 100%;">
            <tr>
              <td align="left" valign="middle" style="width: 55%; word-break: break-word; overflow-wrap: break-word;">
                <h1 style="font-size: ${titleSize}; font-weight: 850; color: #111827; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; font-family: ${fontFamily};">
                  ${resume.personalInfo.fullName || "Your Full Name"}
                </h1>
                ${displayRole ? `
                <p style="font-size: 12px; font-weight: 700; color: ${accentColor}; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px; font-family: ${fontFamily};">
                  ${displayRole}
                </p>
                ` : ""}
              </td>
              <td align="right" valign="top" style="text-align: right; font-size: 10px; color: #4b5563; line-height: 1.4; font-weight: 500; font-family: ${fontFamily}; width: 45%; word-break: break-all; overflow-wrap: break-word;">
                ${resume.personalInfo.city ? `<div>${resume.personalInfo.city}, ${resume.personalInfo.country}</div>` : ""}
                ${resume.personalInfo.phone ? `<div>${resume.personalInfo.phone}</div>` : ""}
                ${resume.personalInfo.email ? `<div style="word-break: break-all;">${resume.personalInfo.email}</div>` : ""}
                ${resume.personalInfo.linkedinUrl ? `<div style="word-break: break-all;">${resume.personalInfo.linkedinUrl}</div>` : ""}
                ${resume.personalInfo.githubUrl ? `<div style="word-break: break-all;">${resume.personalInfo.githubUrl}</div>` : ""}
              </td>
            </tr>
          </table>
        </div>

        <!-- Professional Summary -->
        ${resume.summary ? `
          <div style="margin-bottom: 18px;">
            <table width="100%" style="border-collapse: collapse; margin-bottom: 6px; table-layout: fixed; width: 100%;">
              <tr>
                <td style="width: 4px; background-color: ${accentColor};"></td>
                <td style="padding-left: 8px;">
                  <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin: 0; font-family: ${fontFamily};">Professional Summary</h2>
                </td>
              </tr>
            </table>
            <p style="font-size: 10.5px; color: #374151; margin: 0; text-align: justify; line-height: 1.55; font-weight: 500; padding-left: 12px; font-family: ${fontFamily};">
              ${resume.summary}
            </p>
          </div>
        ` : ""}

        <!-- Core Skills -->
        ${resume.skills.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <table width="100%" style="border-collapse: collapse; margin-bottom: 8px; table-layout: fixed; width: 100%;">
              <tr>
                <td style="width: 4px; background-color: ${accentColor};"></td>
                <td style="padding-left: 8px;">
                  <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin: 0; font-family: ${fontFamily};">Core Skills</h2>
                </td>
              </tr>
            </table>
            <div style="padding-left: 12px; font-size: 10.5px; color: #111827; line-height: 1.5; font-weight: bold; font-family: ${fontFamily};">
              ${resume.skills.join(" &nbsp;&bull;&nbsp; ")}
            </div>
          </div>
        ` : ""}

        <!-- Experience -->
        ${resume.experiences.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <table width="100%" style="border-collapse: collapse; margin-bottom: 8px; table-layout: fixed; width: 100%;">
              <tr>
                <td style="width: 4px; background-color: ${accentColor};"></td>
                <td style="padding-left: 8px;">
                  <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin: 0; font-family: ${fontFamily};">Professional Experience</h2>
                </td>
              </tr>
            </table>
            <div style="padding-left: 12px;">
              ${resume.experiences.map(exp => `
                <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                  <table width="100%" style="border-collapse: collapse; margin-bottom: 4px; table-layout: fixed; width: 100%;">
                    <tr>
                      <td align="left" style="font-size: 11px; font-weight: bold; color: #111827; font-family: ${fontFamily}; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                        ${exp.role} <span style="font-weight: normal; color: #4b5563;">&mdash; ${exp.company}</span>
                      </td>
                      <td align="right" style="font-size: 10.5px; color: #6b7280; text-align: right; font-weight: bold; font-family: ${fontFamily}; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                        ${exp.startDate || "N/A"} &ndash; ${exp.endDate || "Present"}
                      </td>
                    </tr>
                  </table>
                  <p style="font-size: 10.5px; color: #374151; margin: 0; line-height: 1.5; font-weight: 500; white-space: pre-wrap; font-family: ${fontFamily};">${bulletIcon} ${exp.description}</p>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Education -->
        ${resume.education.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <table width="100%" style="border-collapse: collapse; margin-bottom: 8px; table-layout: fixed; width: 100%;">
              <tr>
                <td style="width: 4px; background-color: ${accentColor};"></td>
                <td style="padding-left: 8px;">
                  <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin: 0; font-family: ${fontFamily};">Education & Credentials</h2>
                </td>
              </tr>
            </table>
            <div style="padding-left: 12px;">
              ${resume.education.map(edu => `
                <div style="margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid; font-size: 10.5px; font-family: ${fontFamily};">
                  <table width="100%" style="border-collapse: collapse; margin-bottom: 2px; table-layout: fixed; width: 100%;">
                    <tr>
                      <td align="left" style="font-weight: bold; color: #111827; font-family: ${fontFamily}; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                        ${edu.degree} ${(edu.specialization) ? `in ${edu.specialization}` : ""}
                      </td>
                      <td align="right" style="color: #6b7280; text-align: right; font-weight: bold; font-family: ${fontFamily}; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                        ${edu.startYear || ""} &ndash; ${edu.endYear || ""}
                      </td>
                    </tr>
                  </table>
                  <div style="font-size: 10px; color: #4b5563; font-weight: 500; font-family: ${fontFamily};">
                    ${edu.institution} &nbsp;|&nbsp; Cumulative CGPA/Score: <strong style="color: #111827;">${edu.cgpa || "N/A"}</strong>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Projects -->
        ${resume.projects.length > 0 ? `
          <div style="margin-bottom: 15px;">
            <table width="100%" style="border-collapse: collapse; margin-bottom: 8px; table-layout: fixed; width: 100%;">
              <tr>
                <td style="width: 4px; background-color: ${accentColor};"></td>
                <td style="padding-left: 8px;">
                  <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin: 0; font-family: ${fontFamily};">Engineering Projects</h2>
                </td>
              </tr>
            </table>
            <div style="padding-left: 12px;">
              ${resume.projects.map(p => `
                <div style="margin-bottom: 10px; page-break-inside: avoid; break-inside: avoid; font-family: ${fontFamily};">
                  <div style="font-size: 11px; font-weight: bold; color: #111827; margin-bottom: 2px; font-family: ${fontFamily};">
                    ${p.name} <span style="font-size: 9.5px; font-weight: bold; color: ${accentColor}; font-family: monospace;">[${p.technologies}]</span>
                  </div>
                  <p style="font-size: 10.5px; color: #374151; margin: 0; line-height: 1.45; font-weight: 500; font-family: ${fontFamily};">${p.description}</p>
                  ${renderProjectLink(p.githubUrl)}
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}
        ${renderModule1ExtraOptionalSections("custom_premium", resume, accentColor, borderStyle, fontFamily, bulletIcon)}
      </div>
    `;
  }

  if (template.isPlaceholder) {
    return `
      <div style="font-family: ${template.metadata.fontFamily}; text-align: center; padding: 60px 45px; background-color: #ffffff; color: #1f2937; border: 2px dashed #b45309; border-radius: 12px; max-width: 550px; margin: 40px auto;">
        <div style="font-size: 50px; margin-bottom: 20px;">🎨</div>
        <h2 style="font-size: 22px; font-weight: bold; color: #b45309; margin: 0 0 10px 0; text-transform: uppercase;">Custom Premium Template</h2>
        <p style="font-size: 15px; font-weight: 600; color: #4b5563; margin-bottom: 25px;">[ Coming Soon / Under Configuration ]</p>
        <div style="text-align: left; background-color: #fef3c7; border: 1px solid #f59e0b; padding: 18px; border-radius: 8px; font-size: 12px; line-height: 1.6; color: #78350f;">
          <strong>Developer Alert:</strong> This premium boilerplate slot is pre-configured and ready! To connect your custom Figma, PDF, HTML, or DOCX layout:
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>Fill the template metadata configuration panel in the builder.</li>
            <li>Use the integrated <strong>Template Upload and Styles Simulator</strong>.</li>
            <li>Your customized layout styles will bind directly to standard fields (experiences, projects, certifications).</li>
          </ul>
        </div>
        <p style="font-size: 11px; color: #9ca3af; margin-top: 30px;">Resume Data is safe. Feel free to switch to another active template above.</p>
      </div>
    `;
  }

  // A. CUSTOM HIGH-FIDELITY IMPLEMENTATION: CLASSIC MINIMALIST
  if (template.id === "classic_minimalist") {
    const {
      fontFamily,
      accentColor,
      headerBorder,
      titleSize,
      subSize,
      borderStyle = "1.2px solid #222222",
      bulletIcon = "•"
    } = template.metadata;

    return `
      ${globalStyles}
      <div style="font-family: ${fontFamily}; line-height: 1.5; text-align: left; background-color: #ffffff; color: #000000; padding: 5px;">
        <!-- Dual-alignment Split Header Section -->
        <table width="100%" style="border-collapse: collapse; margin-bottom: 20px; border-bottom: ${headerBorder}; padding-bottom: 12px; table-layout: fixed; width: 100%;">
          <tr>
            <td align="left" valign="top" style="padding-bottom: 10px; width: 60%; word-break: break-word; overflow-wrap: break-word;">
              <h1 style="font-size: ${titleSize}; font-weight: 800; color: #000000; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.1;">${resume.personalInfo.fullName || "Your Full Name"}</h1>
              ${displayRole ? `
              <p style="font-size: ${subSize}; font-weight: 700; color: ${accentColor}; margin-top: 5px; margin-bottom: 4px; text-transform: uppercase;">${displayRole}</p>
              ` : ""}
              <p style="font-size: 11px; color: #4b5563; margin: 0; font-weight: 500;">${resume.personalInfo.city || ""}${(resume.personalInfo.city && resume.personalInfo.country) ? ", " : ""}${resume.personalInfo.country || ""}</p>
            </td>
            <td align="right" valign="top" style="font-size: 11px; color: #111111; line-height: 1.5; text-align: right; padding-bottom: 10px; width: 40%; word-break: break-all; overflow-wrap: break-word;">
              ${resume.personalInfo.email ? `<div style="word-break: break-all;">${resume.personalInfo.email}</div>` : ""}
              ${resume.personalInfo.phone ? `<div>${resume.personalInfo.phone}</div>` : ""}
              ${resume.personalInfo.linkedinUrl ? `<div style="word-break: break-all;">${resume.personalInfo.linkedinUrl}</div>` : ""}
              ${resume.personalInfo.githubUrl ? `<div style="word-break: break-all;">${resume.personalInfo.githubUrl}</div>` : ""}
            </td>
          </tr>
        </table>

        <!-- Summary -->
        ${resume.summary ? `
          <div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 3px;">SUMMARY</h2>
            <p style="font-size: 11px; color: #111111; margin: 0; text-align: justify; line-height: 1.55; font-weight: 500;">${resume.summary}</p>
          </div>
        ` : ""}

        <!-- Skills -->
        ${resume.skills.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 3px;">SKILLS</h2>
            <p style="font-size: 11px; color: #111111; margin: 0; line-height: 1.5; font-weight: bold;">${resume.skills.join(" &nbsp;·&nbsp; ")}</p>
          </div>
        ` : ""}

        <!-- Work Experience -->
        ${resume.experiences.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">EXPERIENCE</h2>
            ${resume.experiences.map(exp => `
              <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                <table width="100%" style="border-collapse: collapse; margin-bottom: 4px; table-layout: fixed; width: 100%;">
                  <tr>
                    <td align="left" style="font-size: 11px; font-weight: bold; color: ${accentColor}; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                      ${exp.role} <span style="color: #000000; font-weight: normal;">&mdash; ${exp.company}</span>
                    </td>
                    <td align="right" style="font-size: 11px; color: #111111; font-style: italic; text-align: right; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                      ${exp.startDate || "N/A"} &ndash; ${exp.endDate || "Present"}
                    </td>
                  </tr>
                </table>
                <p style="font-size: 10.5px; color: #111111; margin: 0 0 0 5px; line-height: 1.5; font-weight: 500; white-space: pre-wrap;">${bulletIcon} ${exp.description}</p>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Education -->
        ${resume.education.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">EDUCATION</h2>
            ${resume.education.map(edu => `
              <div style="margin-bottom: 10px; page-break-inside: avoid; break-inside: avoid; font-size: 11px;">
                <table width="100%" style="border-collapse: collapse; margin-bottom: 3px; table-layout: fixed; width: 100%;">
                  <tr>
                    <td align="left" style="font-weight: bold; color: #000000; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                      ${edu.degree} ${(edu.specialization) ? `in ${edu.specialization}` : ""}
                    </td>
                    <td align="right" style="color: #111111; text-align: right; font-style: italic; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                      ${edu.startYear || ""} &ndash; ${edu.endYear || ""}
                    </td>
                  </tr>
                </table>
                <div style="font-size: 10px; color: #4b5563; font-weight: 500; margin-top: 2px;">
                  ${edu.institution} &nbsp;|&nbsp; CGPA/Score: <span style="font-weight: bold; color: #000000;">${edu.cgpa || "N/A"}</span>
                </div>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Projects -->
        ${resume.projects.length > 0 ? `
          <div style="margin-bottom: 15px;">
            <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">PROJECTS</h2>
            ${resume.projects.map(p => `
              <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                <div style="font-size: 11px; font-weight: bold; color: #000000; margin-bottom: 3px;">
                  ${p.name} <span style="font-size: 9.5px; font-weight: bold; color: ${accentColor}; font-family: monospace;">[${p.technologies}]</span>
                </div>
                <p style="font-size: 10.5px; color: #111111; margin: 0; line-height: 1.45; font-weight: 500;">${p.description}</p>
                ${renderProjectLink(p.githubUrl)}
              </div>
            `).join("")}
          </div>
        ` : ""}
        ${renderModule1ExtraOptionalSections("classic_minimalist", resume, accentColor, borderStyle, fontFamily, bulletIcon)}
      </div>
    `;
  }

  // B. CUSTOM HIGH-FIDELITY IMPLEMENTATION: CRIMSON BANNER
  if (template.id === "crimson_banner") {
    const {
      fontFamily,
      accentColor,
      titleSize,
      subSize,
      borderStyle = "2px solid #991b1b",
      bulletIcon = "›"
    } = template.metadata;

    return `
      ${globalStyles}
      <div style="font-family: ${fontFamily}; line-height: 1.5; text-align: left; background-color: #ffffff; color: #000000;">
        <!-- Header Banner Block with Crimson Background -->
        <div style="background-color: ${accentColor}; color: #ffffff; padding: 22px 24px; text-align: left; margin-bottom: 24px; word-wrap: break-word; overflow-wrap: break-word;">
          <h1 style="font-size: ${titleSize}; font-weight: 800; color: #ffffff; margin: 0; text-transform: uppercase; letter-spacing: 0.8px; line-height: 1.2; word-break: break-word;">
            ${resume.personalInfo.fullName || "YOUR FULL NAME"}
          </h1>
          <div style="font-size: 11px; color: #ffffff; opacity: 0.95; margin-top: 8px; font-weight: 500; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
            ${displayRole ? `
            <span style="font-weight: bold; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.4); padding-right: 10px; margin-right: 10px; word-break: break-word;">
              ${displayRole}
            </span>
            ` : ""}
            ${resume.personalInfo.city ? `<span style="border-right: 1px solid rgba(255,255,255,0.3); padding-right: 10px; margin-right: 10px; word-break: break-word;">${resume.personalInfo.city}, ${resume.personalInfo.country}</span>` : ""}
            ${resume.personalInfo.phone ? `<span style="border-right: 1px solid rgba(255,255,255,0.3); padding-right: 10px; margin-right: 10px; word-break: break-word;">${resume.personalInfo.phone}</span>` : ""}
            ${resume.personalInfo.email ? `<span style="word-break: break-all;">${resume.personalInfo.email}</span>` : ""}
          </div>
          ${(resume.personalInfo.linkedinUrl || resume.personalInfo.githubUrl) ? `
            <div style="font-size: 10.5px; opacity: 0.9; margin-top: 6px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 6px;">
              ${resume.personalInfo.linkedinUrl ? `<span style="margin-right: 12px; word-break: break-all;">LinkedIn: <strong>${resume.personalInfo.linkedinUrl}</strong></span>` : ""}
              ${resume.personalInfo.githubUrl ? `<span style="word-break: break-all;">GitHub: <strong>${resume.personalInfo.githubUrl}</strong></span>` : ""}
            </div>
          ` : ""}
        </div>

        <div style="padding: 0 10px;">
          <!-- Profile/Summary -->
          ${resume.summary ? `
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 4px;">PROFILE</h2>
              <p style="font-size: 11.5px; color: #111111; margin: 0; text-align: justify; line-height: 1.6; font-weight: 500;">${resume.summary}</p>
            </div>
          ` : ""}

          <!-- Key Skills -->
          ${resume.skills.length > 0 ? `
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 4px;">KEY SKILLS</h2>
              <p style="font-size: 11.5px; color: #111111; margin: 0; line-height: 1.5; font-weight: 600; font-family: sans-serif; letter-spacing: 0.3px;">
                ${resume.skills.join(" &nbsp;|&nbsp; ")}
              </p>
            </div>
          ` : ""}

          <!-- Work Experience -->
          ${resume.experiences.length > 0 ? `
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 4px;">WORK EXPERIENCE</h2>
              ${resume.experiences.map(exp => `
                <div style="margin-bottom: 15px; page-break-inside: avoid; break-inside: avoid;">
                  <table width="100%" style="border-collapse: collapse; margin-bottom: 4px; table-layout: fixed; width: 100%;">
                    <tr>
                      <td align="left" style="font-size: 11.5px; font-weight: 800; color: #000000; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                        ${exp.role} <span style="font-weight: bold; color: #374151;">&middot; ${exp.company}</span>
                      </td>
                      <td align="right" style="font-size: 11px; color: #4b5563; text-align: right; font-weight: bold; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                        ${exp.startDate || "N/A"} &ndash; ${exp.endDate || "Present"}
                      </td>
                    </tr>
                  </table>
                  <p style="font-size: 11px; color: #111111; margin: 0 0 0 5px; line-height: 1.5; font-weight: 500; white-space: pre-wrap;">${bulletIcon} ${exp.description}</p>
                </div>
              `).join("")}
            </div>
          ` : ""}

          <!-- Education -->
          ${resume.education.length > 0 ? `
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 4px;">EDUCATION</h2>
              ${resume.education.map(edu => `
                <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid; font-size: 11px;">
                  <table width="100%" style="border-collapse: collapse; margin-bottom: 3px; table-layout: fixed; width: 100%;">
                    <tr>
                      <td align="left" style="font-weight: 800; color: #010101; font-size: 11.5px; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                        ${edu.degree} ${(edu.specialization) ? `in ${edu.specialization}` : ""}
                      </td>
                      <td align="right" style="color: #4b5563; text-align: right; font-weight: bold; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                        ${edu.startYear || ""} &ndash; ${edu.endYear || ""}
                      </td>
                    </tr>
                  </table>
                  <div style="font-size: 10.5px; color: #374151; font-weight: 500; margin-top: 2px;">
                    ${edu.institution} &nbsp;|&nbsp; Cumulative CGPA/Score: <span style="font-weight: bold; color: #000000;">${edu.cgpa || "N/A"}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          ` : ""}

          <!-- Projects -->
          ${resume.projects.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 4px;">PROJECTS</h2>
              ${resume.projects.map(p => `
                <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                  <div style="font-size: 11.5px; font-weight: bold; color: #000000; margin-bottom: 3px;">
                    ${p.name} <span style="font-size: 10px; font-weight: bold; color: ${accentColor}; font-family: monospace;">[${p.technologies}]</span>
                  </div>
                  <p style="font-size: 11px; color: #111111; margin: 0; line-height: 1.5; font-weight: 500;">${p.description}</p>
                  ${renderProjectLink(p.githubUrl)}
                </div>
              `).join("")}
            </div>
          ` : ""}
          ${renderModule1ExtraOptionalSections("crimson_banner", resume, accentColor, borderStyle, fontFamily, bulletIcon)}
        </div>
      </div>
    `;
  }

  // C. HIGHER FIDELITY IMPLEMENTATION: TRADITIONAL ACADEMIC (PDF 1)
  if (template.id === "traditional_academic") {
    const {
      fontFamily,
      accentColor,
      titleSize,
      subSize,
      borderStyle = "1.2px solid #222222",
      bulletIcon = "•"
    } = template.metadata;

    return `
      ${globalStyles}
      <div style="font-family: ${fontFamily}; line-height: 1.6; text-align: center; background-color: #ffffff; color: #000000; padding: 10px;">
        <!-- Centered Header Section -->
        <h1 style="font-size: ${titleSize}; font-weight: bold; color: #000000; margin: 0; text-transform: uppercase; letter-spacing: 0.8px;">
          ${resume.personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        ${displayRole ? `
        <p style="font-size: ${subSize}; font-style: italic; color: #374151; margin-top: 4px; margin-bottom: 6px; font-weight: bold; text-transform: uppercase;">
          ${displayRole}
        </p>
        ` : ""}
        <div style="font-size: 11px; color: #111111; margin-bottom: 18px; display: inline-flex; flex-wrap: wrap; gap: 8px; justify-content: center; font-weight: 500;">
          ${resume.personalInfo.city ? `<span style="word-break: break-word;">${resume.personalInfo.city}, ${resume.personalInfo.country}</span>` : ""}
          ${(resume.personalInfo.city && resume.personalInfo.phone) ? `<span>|</span>` : ""}
          ${resume.personalInfo.phone ? `<span>${resume.personalInfo.phone}</span>` : ""}
          ${(resume.personalInfo.phone && resume.personalInfo.email) ? `<span>|</span>` : ""}
          ${resume.personalInfo.email ? `<span style="word-break: break-all;">${resume.personalInfo.email}</span>` : ""}
          ${(resume.personalInfo.email && resume.personalInfo.linkedinUrl) ? `<span>|</span>` : ""}
          ${resume.personalInfo.linkedinUrl ? `<span style="word-break: break-all;">${resume.personalInfo.linkedinUrl}</span>` : ""}
        </div>

        <div style="text-align: left;">
          <!-- Summary Section -->
          ${resume.summary ? `
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 3px;">PROFESSIONAL SUMMARY</h2>
              <p style="font-size: 11px; color: #111111; margin: 0; text-align: justify; line-height: 1.5; font-weight: 500;">${resume.summary}</p>
            </div>
          ` : ""}

          <!-- Key Skills Section -->
          ${resume.skills.length > 0 ? `
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 3px;">CORE SKILLS</h2>
              <p style="font-size: 11px; color: #111111; margin: 0; line-height: 1.5; text-align: center; font-weight: bold; letter-spacing: 0.2px;">
                ${resume.skills.join(" &nbsp;•&nbsp; ")}
              </p>
            </div>
          ` : ""}

          <!-- Professional Experience Section -->
          ${resume.experiences.length > 0 ? `
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">PROFESSIONAL EXPERIENCE</h2>
              ${resume.experiences.map(exp => `
                <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                  <table width="100%" style="border-collapse: collapse; margin-bottom: 4px; table-layout: fixed; width: 100%;">
                    <tr>
                      <td align="left" style="font-size: 11px; font-weight: bold; color: #000000; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                        ${exp.role} <span style="font-weight: normal; color: #111111;">&mdash; ${exp.company}</span>
                      </td>
                      <td align="right" style="font-size: 11px; color: #111111; font-style: italic; text-align: right; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                        ${exp.startDate || "N/A"} &ndash; ${exp.endDate || "Present"}
                      </td>
                    </tr>
                  </table>
                  <p style="font-size: 10.5px; color: #111111; margin: 0 0 0 5px; line-height: 1.45; font-weight: 500; white-space: pre-wrap;">${bulletIcon} ${exp.description}</p>
                </div>
              `).join("")}
            </div>
          ` : ""}

          <!-- Education Section -->
          ${resume.education.length > 0 ? `
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">EDUCATION</h2>
              ${resume.education.map(edu => `
                <div style="margin-bottom: 10px; page-break-inside: avoid; break-inside: avoid; font-size: 11px;">
                  <table width="100%" style="border-collapse: collapse; margin-bottom: 3px; table-layout: fixed; width: 100%;">
                    <tr>
                      <td align="left" style="font-weight: bold; color: #000000; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                        ${edu.degree} ${(edu.specialization) ? `in ${edu.specialization}` : ""}
                      </td>
                      <td align="right" style="color: #111111; text-align: right; font-style: italic; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                        ${edu.startYear || ""} &ndash; ${edu.endYear || ""}
                      </td>
                    </tr>
                  </table>
                  <div style="font-size: 10.5px; color: #4b5563; font-weight: 500; margin-top: 1px;">
                    ${edu.institution} &nbsp;|&nbsp; Cumulative CGPA / Metric: <span style="font-weight: bold; color: #000000;">${edu.cgpa || "N/A"}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          ` : ""}

          <!-- Projects Session -->
          ${resume.projects.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #000000; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">ENGINEERING PROJECTS</h2>
              ${resume.projects.map(p => `
                <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                  <div style="font-size: 11px; font-weight: bold; color: #000000; margin-bottom: 3px;">
                    ${p.name} <span style="font-size: 9.5px; font-weight: bold; color: #374151; font-family: monospace;">[${p.technologies}]</span>
                  </div>
                  <p style="font-size: 10.5px; color: #111111; margin: 0; line-height: 1.45; font-weight: 500;">${p.description}</p>
                  ${renderProjectLink(p.githubUrl)}
                </div>
              `).join("")}
            </div>
          ` : ""}
          ${renderModule1ExtraOptionalSections("traditional_academic", resume, accentColor, borderStyle, fontFamily, bulletIcon)}
        </div>
      </div>
    `;
  }

  // D. HIGHER FIDELITY IMPLEMENTATION: SLEEK INDIGO (PDF 2)
  if (template.id === "sleek_indigo") {
    const {
      fontFamily,
      accentColor,
      titleSize,
      subSize,
      borderStyle = "1.2px solid #cbd5e1",
      bulletIcon = "–"
    } = template.metadata;

    return `
      ${globalStyles}
      <div style="font-family: ${fontFamily}; line-height: 1.5; text-align: left; background-color: #ffffff; color: #111827; padding: 10px;">
        <h1 style="font-size: ${titleSize}; font-weight: 850; color: #111827; margin: 0; tracking: -0.5px; line-height: 1.2;">
          ${resume.personalInfo.fullName || "Your Full Name"}
        </h1>
        ${displayRole ? `
        <p style="font-size: 13.5px; font-weight: bold; color: ${accentColor}; margin-top: 4px; margin-bottom: 4px;">
          ${displayRole}
        </p>
        ` : ""}
        <div style="font-size: 10.5px; color: #4b5563; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1.5px solid ${accentColor}; font-weight: 500; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
          ${resume.personalInfo.city ? `<span>${resume.personalInfo.city}, ${resume.personalInfo.country}</span>` : ""}
          ${resume.personalInfo.phone ? `<span>&bull;</span> <span>${resume.personalInfo.phone}</span>` : ""}
          ${resume.personalInfo.email ? `<span>&bull;</span> <span style="word-break: break-all;">${resume.personalInfo.email}</span>` : ""}
          ${resume.personalInfo.linkedinUrl ? `<span>&bull;</span> <span style="word-break: break-all;">${resume.personalInfo.linkedinUrl}</span>` : ""}
        </div>

        <!-- Summary -->
        ${resume.summary ? `
          <div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: 850; text-transform: uppercase; color: ${accentColor}; letter-spacing: 0.5px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 3px;">SUMMARY</h2>
            <p style="font-size: 11px; color: #374151; margin: 0; text-align: justify; line-height: 1.55; font-weight: 500;">${resume.summary}</p>
          </div>
        ` : ""}

        <!-- Skills -->
        ${resume.skills.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: 850; text-transform: uppercase; color: ${accentColor}; letter-spacing: 0.5px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 3px;">SKILLS</h2>
            <p style="font-size: 11px; color: #374151; margin: 0; line-height: 1.5; font-weight: 700; letter-spacing: 0.1px;">
              ${resume.skills.join(" &nbsp;&middot;&nbsp; ")}
            </p>
          </div>
        ` : ""}

        <!-- Experience -->
        ${resume.experiences.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: 850; text-transform: uppercase; color: ${accentColor}; letter-spacing: 0.5px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">EXPERIENCE</h2>
            ${resume.experiences.map(exp => `
              <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                <table width="100%" style="border-collapse: collapse; margin-bottom: 4px; table-layout: fixed; width: 100%;">
                  <tr>
                    <td align="left" style="font-size: 11px; font-weight: bold; color: #111827; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                      ${exp.role} <span style="font-weight: bold; color: #4b5563;">&nbsp;|&nbsp; ${exp.company}</span>
                    </td>
                    <td align="right" style="font-size: 11px; color: #6b7280; text-align: right; font-weight: bold; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                      ${exp.startDate || "N/A"} &ndash; ${exp.endDate || "Present"}
                    </td>
                  </tr>
                </table>
                <p style="font-size: 10.5px; color: #374151; margin: 0 0 0 5px; line-height: 1.5; font-weight: 500; white-space: pre-wrap;">${bulletIcon} ${exp.description}</p>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Education -->
        ${resume.education.length > 0 ? `
          <div style="margin-bottom: 18px;">
            <h2 style="font-size: 11px; font-weight: 850; text-transform: uppercase; color: ${accentColor}; letter-spacing: 0.5px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">EDUCATION</h2>
            ${resume.education.map(edu => `
              <div style="margin-bottom: 10px; page-break-inside: avoid; break-inside: avoid; font-size: 11px;">
                <table width="100%" style="border-collapse: collapse; margin-bottom: 3px; table-layout: fixed; width: 100%;">
                  <tr>
                    <td align="left" style="font-weight: 800; color: #111827; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                      ${edu.degree} ${(edu.specialization) ? `in ${edu.specialization}` : ""}
                    </td>
                    <td align="right" style="color: #6b7280; text-align: right; font-weight: bold; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                      ${edu.startYear || ""} &ndash; ${edu.endYear || ""}
                    </td>
                  </tr>
                </table>
                <div style="font-size: 10px; color: #4b5563; font-weight: 500; margin-top: 2px;">
                  ${edu.institution} &nbsp;|&nbsp; Marks / GPA: <span style="font-weight: bold; color: #111827;">${edu.cgpa || "N/A"}</span>
                </div>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Projects -->
        ${resume.projects.length > 0 ? `
          <div style="margin-bottom: 15px;">
            <h2 style="font-size: 11px; font-weight: 850; text-transform: uppercase; color: ${accentColor}; letter-spacing: 0.5px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">PROJECTS</h2>
            ${resume.projects.map(p => `
              <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                <div style="font-size: 11px; font-weight: bold; color: #111827; margin-bottom: 3px;">
                  ${p.name} <span style="font-size: 9.5px; font-weight: bold; color: ${accentColor}; font-family: monospace;">[${p.technologies}]</span>
                </div>
                <p style="font-size: 10.5px; color: #374151; margin: 0; line-height: 1.45; font-weight: 500;">${p.description}</p>
                ${renderProjectLink(p.githubUrl)}
              </div>
            `).join("")}
          </div>
        ` : ""}
        ${renderModule1ExtraOptionalSections("sleek_indigo", resume, accentColor, borderStyle, fontFamily, bulletIcon)}
      </div>
    `;
  }

  // E. CUSTOM HIGH-FIDELITY IMPLEMENTATION: PREMIUM EXECUTIVE (PDF 3)
  if (template.id === "premium_executive") {
    const {
      fontFamily,
      accentColor,
      titleSize,
      subSize,
      borderStyle = "2px double #78350f",
      bulletIcon = "▪"
    } = template.metadata;

    // Elegant spaced name letter tracking
    const nameStr = (resume.personalInfo.fullName || "YOUR FULL NAME").toUpperCase();
    const spacedName = nameStr.split("").join(" &nbsp;");

    return `
      ${globalStyles}
      <div style="font-family: ${fontFamily}; line-height: 1.6; text-align: center; background-color: #ffffff; color: #000000; padding: 10px;">
        <!-- Dual-Bar Accent Header Block -->
        <div style="border-top: 2px solid ${accentColor}; border-bottom: 2px solid ${accentColor}; padding: 15px 0; margin-bottom: 20px;">
          <h1 style="font-size: ${titleSize}; font-weight: 800; color: #000000; margin: 0; text-transform: uppercase; letter-spacing: 3px; line-height: 1.2; word-break: break-word;">
            ${spacedName}
          </h1>
          ${displayRole ? `
          <p style="font-size: ${subSize}; color: ${accentColor}; font-style: italic; margin-top: 6px; margin-bottom: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; word-break: break-word;">
            ${displayRole}
          </p>
          ` : ""}
        </div>

        <div style="font-size: 11px; color: #111111; margin-bottom: 20px; display: inline-flex; flex-wrap: wrap; gap: 8px; justify-content: center; font-weight: 500; word-wrap: break-word; overflow-wrap: break-word;">
          ${resume.personalInfo.city ? `<span style="word-break: break-word;">${resume.personalInfo.city}, ${resume.personalInfo.country}</span>` : ""}
          ${resume.personalInfo.phone ? `<span>|</span> <span>${resume.personalInfo.phone}</span>` : ""}
          ${resume.personalInfo.email ? `<span>|</span> <span style="word-break: break-all;">${resume.personalInfo.email}</span>` : ""}
          ${resume.personalInfo.linkedinUrl ? `<span>|</span> <span style="word-break: break-all;">${resume.personalInfo.linkedinUrl}</span>` : ""}
        </div>

        <div style="text-align: left;">
          <!-- Profile -->
          ${resume.summary ? `
            <div style="margin-bottom: 20px; text-align: center;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 3px; margin-top: 0; margin-bottom: 8px; text-align: center;">E X E C U T I V E &nbsp; S U M M A R Y</h2>
              <p style="font-size: 11.5px; color: #111111; margin: 0 auto; text-align: justify; line-height: 1.6; font-weight: 500; max-width: 95%;">
                ${resume.summary}
              </p>
            </div>
          ` : ""}

          <!-- Areas of Expertise -->
          ${resume.skills.length > 0 ? `
            <div style="margin-bottom: 20px; text-align: center;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 3px; margin-top: 0; margin-bottom: 8px; text-align: center;">A R E A S &nbsp; O F &nbsp; E X P E R T I S E</h2>
              <p style="font-size: 11px; color: #111111; margin: 0 auto; line-height: 1.6; font-weight: bold; max-width: 90%; letter-spacing: 0.5px;">
                ${resume.skills.join(" &nbsp;|&nbsp; ")}
              </p>
            </div>
          ` : ""}

          <!-- Experience -->
          ${resume.experiences.length > 0 ? `
            <div style="margin-bottom: 22px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 3px; margin-top: 0; margin-bottom: 10px; text-align: center; border-bottom: ${borderStyle}; padding-bottom: 4px;">P R O F E S S I O N A L &nbsp; E X P E R I E N C E</h2>
              ${resume.experiences.map(exp => `
                <div style="margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid;">
                  <table width="100%" style="border-collapse: collapse; margin-bottom: 4px; table-layout: fixed; width: 100%;">
                    <tr>
                      <td align="left" style="font-size: 11.5px; font-weight: bold; color: #000000; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                        ${exp.role} <span style="font-weight: normal; font-style: italic; color: #374151;">&mdash; ${exp.company}</span>
                      </td>
                      <td align="right" style="font-size: 11px; color: #4b5563; text-align: right; font-weight: bold; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                        ${exp.startDate || "N/A"} &ndash; ${exp.endDate || "Present"}
                      </td>
                    </tr>
                  </table>
                  <p style="font-size: 11px; color: #111111; margin: 0 0 0 6px; line-height: 1.55; font-weight: 500; white-space: pre-wrap;">${bulletIcon} ${exp.description}</p>
                </div>
              `).join("")}
            </div>
          ` : ""}

          <!-- Education -->
          ${resume.education.length > 0 ? `
            <div style="margin-bottom: 22px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 3px; margin-top: 0; margin-bottom: 10px; text-align: center; border-bottom: ${borderStyle}; padding-bottom: 4px;">E D U C A T I O N &nbsp; &amp; &nbsp; C R E D E N T I A L S</h2>
              ${resume.education.map(edu => `
                <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid; text-align: center; font-size: 11.5px;">
                  <div style="font-weight: bold; color: #000000; margin-bottom: 3px; word-break: break-word;">
                    ${edu.degree} ${(edu.specialization) ? `in ${edu.specialization}` : ""} &mdash; <span style="font-weight: normal; color: #374151;">${edu.institution}</span>
                  </div>
                  <div style="font-size: 10.5px; color: #4b5563; font-weight: 500;">
                    Graduation Year: <strong style="color:#000">${edu.endYear || "N/A"}</strong> &nbsp;|&nbsp; Cumulative Performance: <span style="font-weight: bold; color: #000000;">${edu.cgpa || "N/A"}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          ` : ""}

          <!-- Projects -->
          ${resume.projects.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 3px; margin-top: 0; margin-bottom: 10px; text-align: center; border-bottom: ${borderStyle}; padding-bottom: 4px;">E X E C U T I V E &nbsp; I N I T I A T I V E S</h2>
              ${resume.projects.map(p => `
                <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
                  <div style="font-size: 11.5px; font-weight: bold; color: #000000; margin-bottom: 3px; word-break: break-word;">
                    ${p.name} <span style="font-size: 9.5px; font-weight: bold; color: ${accentColor}; font-family: monospace;">[${p.technologies}]</span>
                  </div>
                  <p style="font-size: 11px; color: #111111; margin: 0; line-height: 1.5; font-weight: 500;">${p.description}</p>
                  ${renderProjectLink(p.githubUrl)}
                </div>
              `).join("")}
            </div>
          ` : ""}
          ${renderModule1ExtraOptionalSections("premium_executive", resume, accentColor, borderStyle, fontFamily, bulletIcon)}
        </div>
      </div>
    `;
  }

  // F. FALLBACK / GENERAL PURPOSE RENDERER (ATS, MODERN, EXECUTIVE, FRESHER, CUSTOM CONFIGS)
  const {
    fontFamily,
    accentColor,
    headerBorder,
    titleSize,
    subSize,
    headerAlign = "left",
    borderStyle = "1.5px solid #222222",
    bulletIcon = "•"
  } = template.metadata;

  return `
    ${globalStyles}
    <div style="font-family: ${fontFamily}; line-height: 1.5; text-align: left; background-color: #ffffff; color: #000000;">
      <!-- Header Section -->
      <div style="border-bottom: ${headerBorder}; padding-bottom: 12px; margin-bottom: 22px; text-align: ${headerAlign};">
        <h1 style="font-size: ${titleSize}; font-weight: bold; color: #000000; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; word-break: break-word;">${resume.personalInfo.fullName || "Your Full Name"}</h1>
        ${displayRole ? `
        <p style="font-size: ${subSize}; font-weight: bold; color: ${accentColor}; margin-top: 4px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; word-break: break-word;">${displayRole}</p>
        ` : ""}
        
        <div style="font-size: 11px; color: #111111; display: flex; flex-wrap: wrap; gap: 14px; justify-content: ${headerAlign === 'center' ? 'center' : 'flex-start'}; margin-top: 6px; word-wrap: break-word; overflow-wrap: break-word;">
          ${resume.personalInfo.email ? `<span style="word-break: break-all;"><strong>Email:</strong> ${resume.personalInfo.email}</span>` : ""}
          ${resume.personalInfo.phone ? `<span><strong>Phone:</strong> ${resume.personalInfo.phone}</span>` : ""}
          ${resume.personalInfo.city ? `<span style="word-break: break-word;"><strong>Location:</strong> ${resume.personalInfo.city}, ${resume.personalInfo.country}</span>` : ""}
        </div>
        
        <div style="font-size: 11px; color: #000000; display: flex; flex-wrap: wrap; gap: 14px; justify-content: ${headerAlign === 'center' ? 'center' : 'flex-start'}; margin-top: 4px; word-wrap: break-word; overflow-wrap: break-word;">
          ${resume.personalInfo.linkedinUrl ? `<span style="word-break: break-all;"><strong>LinkedIn:</strong> <span style="font-weight: bold; color: ${accentColor};">${resume.personalInfo.linkedinUrl}</span></span>` : ""}
          ${resume.personalInfo.githubUrl ? `<span style="word-break: break-all;"><strong>GitHub:</strong> <span style="font-weight: bold; color: ${accentColor};">${resume.personalInfo.githubUrl}</span></span>` : ""}
        </div>
      </div>

      <!-- Summary -->
      ${resume.summary ? `
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 3px;">Professional Summary</h2>
          <p style="font-size: 11px; color: #000000; margin: 0; text-align: justify; line-height: 1.55; font-weight: 500;">${resume.summary}</p>
        </div>
      ` : ""}

      <!-- Work Experience -->
      ${resume.experiences.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">Experience & Career History</h2>
          ${resume.experiences.map(exp => `
            <div style="margin-bottom: 14px; page-break-inside: avoid; break-inside: avoid;">
              <table width="100%" style="border-collapse: collapse; margin-bottom: 4px; table-layout: fixed; width: 100%;">
                <tr>
                  <td align="left" style="font-size: 11px; font-weight: bold; color: #000000; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                    ${exp.company} &mdash; <span style="font-style: italic; color: #111111;">${exp.role}</span>
                  </td>
                  <td align="right" style="font-size: 11px; color: #000000; text-align: right; font-family: monospace; font-weight: bold; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                    ${exp.startDate || "N/A"} &ndash; ${exp.endDate || "Present"}
                  </td>
                </tr>
              </table>
              <p style="font-size: 10.5px; color: #000000; margin: 0; line-height: 1.5; white-space: pre-wrap; font-weight: 500;">${bulletIcon} ${exp.description}</p>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <!-- Skills -->
      ${resume.skills.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 6px; border-bottom: ${borderStyle}; padding-bottom: 3px;">Core Skillsets &amp; Expertises</h2>
          <p style="font-size: 11px; color: #000000; margin: 0; font-style: italic; line-height: 1.4; font-weight: bold;">${resume.skills.join(", ")}</p>
        </div>
      ` : ""}

      <!-- Education -->
      ${resume.education.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">Academic History</h2>
          ${resume.education.map(edu => `
            <div style="margin-bottom: 10px; page-break-inside: avoid; break-inside: avoid; font-size: 11px;">
              <table width="100%" style="border-collapse: collapse; margin-bottom: 3px; table-layout: fixed; width: 100%;">
                <tr>
                   <td align="left" style="font-size: 11px; font-weight: bold; color: #000000; width: 70%; word-break: break-word; overflow-wrap: break-word;">
                     ${edu.institution} &mdash; <span style="color: #111111; font-weight: bold;">${edu.degree} (${edu.specialization || "N/A"})</span>
                   </td>
                   <td align="right" style="font-size: 11px; color: #000000; text-align: right; font-family: monospace; font-weight: bold; width: 30%; word-break: break-all; overflow-wrap: break-word;">
                     ${edu.startYear || ""} &ndash; ${edu.endYear || ""}
                   </td>
                </tr>
              </table>
              <p style="font-size: 10px; color: #000000; margin: 0; font-weight: 500;">CGPA / Academic Score: <span style="font-weight: bold;">${edu.cgpa || "N/A"}</span></p>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <!-- Projects -->
      ${resume.projects.length > 0 ? `
        <div style="margin-bottom: 15px;">
          <h2 style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: ${accentColor}; letter-spacing: 1.2px; margin-top: 0; margin-bottom: 8px; border-bottom: ${borderStyle}; padding-bottom: 3px;">Personal &amp; Academic Projects</h2>
          ${resume.projects.map(p => `
            <div style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
              <div style="font-size: 11px; font-weight: bold; color: #000000; margin-bottom: 3px; word-break: break-word;">
                ${p.name} <span style="font-size: 9.5px; font-weight: bold; color: #111111; font-family: monospace;">[${p.technologies}]</span>
              </div>
              <p style="font-size: 10.5px; color: #000000; margin: 0; line-height: 1.45; font-weight: 500;">${p.description}</p>
              ${renderProjectLink(p.githubUrl)}
            </div>
          `).join("")}
        </div>
      ` : ""}
      ${renderModule1ExtraOptionalSections("fallback", resume, accentColor, borderStyle, fontFamily, bulletIcon)}
    </div>
  `;
}
