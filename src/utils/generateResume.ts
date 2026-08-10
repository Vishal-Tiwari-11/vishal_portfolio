import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { mentorshipProjects } from '@/data/mentorship';
import { education } from '@/data/education';
import { skillCategories } from '@/data/skills';

export function generateResume() {

  const experienceHTML = experience.map((e) => `
    <div class="block">
      <div class="block-header">
        <div>
          <div class="block-title">${e.role}</div>
          <div class="block-sub">${e.company}</div>
        </div>
        <div class="period">${e.period}</div>
      </div>
      <ul>
        ${e.achievements.map((a) => `<li>${a}</li>`).join('')}
      </ul>
      <div class="tags">${e.stack.join(' · ')}</div>
    </div>
  `).join('');

  const projectsHTML = projects.map((p) => `
    <div class="proj-item">
      <div class="proj-head">
        <span class="proj-name">${p.title}</span>
        <span class="badge">${p.category}</span>
        ${p.liveUrl ? `<a class="proj-url" href="${p.liveUrl}">${p.liveUrl}</a>` : ''}
      </div>
      <div class="proj-desc">${p.description}</div>
      <ul>${p.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
      <div class="tags">${p.stack.join(' · ')}</div>
    </div>
  `).join('');

  const mentorshipHTML = mentorshipProjects.map((m) => `
    <div class="proj-item">
      <div class="proj-head">
        <span class="proj-name">${m.title}</span>
        <span class="badge mentor">Mentorship</span>
        ${m.liveUrl ? `<a class="proj-url" href="${m.liveUrl}">${m.liveUrl}</a>` : ''}
      </div>
      <div class="proj-desc">${m.description}</div>
      <ul>${m.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
      <div class="tags">${m.tags.join(' · ')}</div>
    </div>
  `).join('');

  const educationHTML = education.map((e) => `
    <div class="edu-block">
      <div class="edu-header">
        <div>
          <div class="edu-degree">${e.degree}</div>
          <div class="edu-inst">${e.institution}</div>
        </div>
        <div class="period">${e.period}</div>
      </div>
      ${e.grade ? `<div class="edu-detail">Grade: ${e.grade}</div>` : ''}
    </div>
  `).join('');

  const skillsHTML = skillCategories.map((c) => `
    <div class="skill-row">
      <span class="skill-label">${c.title}:</span>
      <span class="skill-val">${c.tags.join(', ')}</span>
    </div>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Vishal Tiwari — Resume</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }

    body {
      font-family: 'Segoe UI', system-ui, Arial, sans-serif;
      font-size: 10.5px;
      color: #1e293b;
      background: #fff;
      line-height: 1.55;
      padding: 24px 32px;
      max-width: 850px;
      margin: 0 auto;
    }

    /* ── HEADER ── */
    .hd {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 2.5px solid #3D6BFD;
    }
    .hd-name { font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
    .hd-role { font-size: 12px; font-weight: 600; color: #3D6BFD; margin-top: 3px; }
    .hd-loc  { font-size: 10.5px; color: #64748b; margin-top: 2px; }
    .hd-contact { text-align: right; font-size: 10px; color: #475569; line-height: 1.8; }
    .hd-contact a { color: #3D6BFD; text-decoration: none; }

    /* ── TAGLINE ── */
    .tagline {
      font-size: 10.5px; font-style: italic; color: #475569;
      padding: 7px 12px; border-left: 3px solid #3D6BFD;
      margin-bottom: 16px; background: #f8faff;
      border-radius: 0 4px 4px 0;
    }

    /* ── SECTION ── */
    .sec { margin-bottom: 16px; }
    .sec:last-child { margin-bottom: 0; }
    .sec-title {
      font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: #3D6BFD;
      border-bottom: 1px solid #dde5f4;
      padding-bottom: 4px; margin-bottom: 10px;
    }

    /* ── EXPERIENCE BLOCKS ── */
    .block { margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px dashed #e8edf5; }
    .block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .block-header {
      display: flex; justify-content: space-between;
      align-items: flex-start; gap: 10px; margin-bottom: 4px;
    }
    .block-title { font-size: 11.5px; font-weight: 700; color: #0f172a; }
    .block-sub   { font-size: 10.5px; font-weight: 600; color: #3D6BFD; margin-top: 1px; }
    .period      { font-size: 9.5px; color: #64748b; white-space: nowrap; flex-shrink: 0; padding-top: 1px; }
    ul { padding-left: 14px; margin-bottom: 5px; }
    ul li { font-size: 10px; color: #334155; margin-bottom: 2px; line-height: 1.5; }
    .tags { font-size: 9.5px; color: #64748b; }

    /* ── PROJECTS GRID ── */
    .proj-grid {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .proj-item { 
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 7px 9px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .proj-head { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
    .proj-name { font-size: 10.5px; font-weight: 700; color: #0f172a; }
    .badge {
      font-size: 8.5px; color: #fff; background: #3D6BFD;
      border-radius: 999px; padding: 1px 6px; font-weight: 600; flex-shrink: 0;
    }
    .badge.mentor { background: #10b981; }
    .proj-url { font-size: 8.5px; color: #3D6BFD; margin-left: auto; text-decoration: none; }
    .proj-desc { font-size: 9.5px; color: #475569; margin-top: 2px; line-height: 1.5; }

    /* ── EDUCATION ── */
    .edu-block { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed #e8edf5; }
    .edu-block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .edu-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 2px; }
    .edu-degree { font-size: 11px; font-weight: 700; color: #0f172a; }
    .edu-inst   { font-size: 10px; font-weight: 600; color: #3D6BFD; margin-top: 1px; }
    .edu-detail { font-size: 9.5px; color: #475569; margin-top: 2px; }

    /* ── SKILLS ── */
    .skill-row { display: flex; gap: 6px; margin-bottom: 4px; align-items: flex-start; }
    .skill-row:last-child { margin-bottom: 0; }
    .skill-label { font-size: 10px; font-weight: 700; color: #0f172a; white-space: nowrap; min-width: 145px; flex-shrink: 0; }
    .skill-val   { font-size: 10px; color: #334155; line-height: 1.55; }

    /* ── PRINT ── */
    @media print {
      body { padding: 20px 28px; max-width: 100%; }
      @page { size: A4; margin: 16px 0; }
      .block, .proj-item, .edu-block { page-break-inside: avoid; }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="hd">
    <div>
      <div class="hd-name">Vishal Tiwari</div>
      <div class="hd-role">Web Developer</div>
      <div class="hd-loc">Jaipur, Rajasthan, India</div>
    </div>
    <div class="hd-contact">
      <div>vishaltiwari642@gmail.com</div>
      <div>+91 85320 14119</div>
      <div><a href="https://linkedin.com/in/vishaltiwari642">linkedin.com/in/vishaltiwari642</a></div>
      <div><a href="https://github.com/Vishal-Tiwari-11">github.com/Vishal-Tiwari-11</a></div>
    </div>
  </div>

  <!-- Tagline -->
  <div class="tagline">
    I build reliable, payment-integrated web platforms — from university convocations to international conferences — where downtime isn't an option.
  </div>

  <!-- Experience -->
  <div class="sec">
    <div class="sec-title">Experience</div>
    ${experienceHTML}
  </div>

  <!-- Projects -->
  <div class="sec">
    <div class="sec-title">Projects</div>
    <div class="proj-grid">
      ${projectsHTML}
    </div>
  </div>

  <!-- Mentorship -->
  <div class="sec">
    <div class="sec-title">Mentorship</div>
    <div class="proj-grid">
      ${mentorshipHTML}
    </div>
  </div>

  <!-- Education -->
  <div class="sec">
    <div class="sec-title">Education</div>
    ${educationHTML}
  </div>

  <!-- Skills -->
  <div class="sec">
    <div class="sec-title">Skills</div>
    ${skillsHTML}
  </div>

  <script>window.onload = function(){ window.print(); };</script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) win.onafterprint = () => URL.revokeObjectURL(url);
}
