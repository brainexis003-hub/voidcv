import React, { useState, useEffect } from "react";
import { Sparkles, Trash2, Briefcase } from "lucide-react";
import { JobApplication } from "../../types";

export interface JobTrackerModuleProps {
  onBackToDashboard?: () => void;
}

export function JobTrackerModule({ onBackToDashboard }: JobTrackerModuleProps) {
  // Job tracker local database state
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem("cf_jobs");
    if (saved) return JSON.parse(saved);
    return [
      { id: "job-1", title: "Frontend engineer", company: "Anthropic", status: "Interview Scheduled", appliedDate: "2026-06-16", salaryRange: "$130k - $160k", notes: "Review LLM safety constraints." },
      { id: "job-2", title: "React Specialist", company: "Stripe", status: "Applied", appliedDate: "2026-06-14", salaryRange: "$140k - $180k", notes: "Submitted ATS tailored application." },
      { id: "job-3", title: "Full Stack Lead", company: "Vercel", status: "Saved", appliedDate: "2026-06-18", salaryRange: "$150k - $200k", notes: "Requires superb design polish." }
    ];
  });

  // Jobs persistence
  useEffect(() => {
    localStorage.setItem("cf_jobs", JSON.stringify(jobApplications));
  }, [jobApplications]);

  // Job Tracker status update
  const handleAddTrackerJob = (title: string, company: string, urlStr?: string) => {
    if (!title.trim() || !company.trim()) return;
    const newJob: JobApplication = {
      id: "job-" + Date.now(),
      title,
      company,
      jobLink: urlStr || "",
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Saved"
    };
    setJobApplications([newJob, ...jobApplications]);
  };

  const handleUpdateJobStatus = (id: string, newStatus: JobApplication["status"]) => {
    setJobApplications(prev => prev.map(job => job.id === id ? { ...job, status: newStatus } : job));
  };

  const handleRemoveJob = (id: string) => {
    setJobApplications(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Module Title Banner */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/10 rounded-xl text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
              MODULE 8: JOB APPLICATION TRACKER (ARCHIVED)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Track offers, scheduled screens, and calendar follow-ups.
            </p>
          </div>
        </div>
        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="text-xs text-slate-300 hover:text-white bg-white/5 px-2.5 py-1 rounded border border-white/10"
          >
            Back to Dashboard
          </button>
        )}
      </div>

      {/* Dashboard mini-grid metric banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
          <p className="text-[9px] text-slate-400 font-mono uppercase">Total Tracking</p>
          <p className="text-xl font-bold text-white mt-1">{jobApplications.length}</p>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
          <p className="text-[9px] text-slate-400 font-mono uppercase">Interviews Slot</p>
          <p className="text-xl font-bold text-amber-400 mt-1">
            {jobApplications.filter(j => j.status === "Interview Scheduled").length}
          </p>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
          <p className="text-[9px] text-slate-400 font-mono uppercase">Offers Got</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">
            {jobApplications.filter(j => j.status === "Offer Received").length}
          </p>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
          <p className="text-[9px] text-slate-400 font-mono uppercase">Offers Ratio</p>
          <p className="text-xl font-bold text-white mt-1">
            {jobApplications.length > 0 
              ? ((jobApplications.filter(j => j.status === "Offer Received").length / jobApplications.length) * 100).toFixed(0) + "%"
              : "0%"}
          </p>
        </div>
      </div>

      {/* Add employment tracker form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const title = (form.elements.namedItem("jobTitle") as HTMLInputElement).value;
          const company = (form.elements.namedItem("jobCompany") as HTMLInputElement).value;
          const link = (form.elements.namedItem("jobLink") as HTMLInputElement).value;
          handleAddTrackerJob(title, company, link);
          form.reset();
        }}
        className="p-4 bg-slate-900 border border-white/5 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3 items-end"
      >
        <div>
          <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-450 mb-1">Target Job Title *</label>
          <input
            type="text"
            name="jobTitle"
            required
            placeholder="e.g. Staff React Architect"
            className="w-full bg-slate-950 border border-white/10 rounded-lg p-1.5 text-xs text-white"
          />
        </div>
        <div>
          <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-450 mb-1">Company / Organization *</label>
          <input
            type="text"
            name="jobCompany"
            required
            placeholder="e.g. Google Corporation"
            className="w-full bg-slate-950 border border-white/10 rounded-lg p-1.5 text-xs text-white"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-450 mb-1">Job Post Link (Optional)</label>
            <input
              type="text"
              name="jobLink"
              placeholder="e.g. https://google.com/jobs"
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-1.5 text-xs text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-505 text-white font-bold px-3 py-1.5 rounded-lg text-xs shrink-0 self-end"
          >
            + Add Card
          </button>
        </div>
      </form>

      {/* job row list */}
      <div className="className-jobs cursor-row space-y-2.5">
        {jobApplications.map((job) => (
          <div key={job.id} className="p-3 bg-[#141419] border border-white/5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Title group */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center font-bold text-indigo-400 font-mono">
                {job.company?.[0]?.toUpperCase() || "J"}
              </div>
              <div>
                <p className="font-bold text-white">{job.title}</p>
                <p className="text-[10px] text-slate-450">{job.company} • Joined {job.appliedDate}</p>
              </div>
            </div>

            {/* Status selection and action drop */}
            <div className="flex items-center gap-2">
              <select
                value={job.status}
                onChange={(e) => handleUpdateJobStatus(job.id, e.target.value as any)}
                className="bg-slate-900 border border-white/10 text-[10.5px] px-2 py-1 rounded-lg text-slate-300"
              >
                <option value="Saved">Saved</option>
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interview Scheduled">Interview</option>
                <option value="Final Round">Final Round</option>
                <option value="Offer Received">Offer Received</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                onClick={() => handleRemoveJob(job.id)}
                className="text-slate-500 hover:text-red-400"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
