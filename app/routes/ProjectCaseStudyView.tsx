import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Hash } from "lucide-react";
import { GlassCard } from "../components/magicui/GlassCard";
import Seo from "../components/Seo";
import { articleRegistry, PROJECTS } from "../constants";
import { canonicalUrl } from "../site";
import { projectPath } from "../slugs";

const ProjectCaseStudyView: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = PROJECTS.find((item) => item.slug === projectId);

  if (!project) {
    return (
      <div className="max-w-4xl w-full py-12 px-4">
        <GlassCard solid className="!p-10 border-slate-100">
          <button
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-[10px] mb-8"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Case study not found</h1>
          <p className="text-slate-500">This project route does not exist yet.</p>
        </GlassCard>
      </div>
    );
  }

  const relatedArticles = articleRegistry.filter((article) =>
    project.relatedArticles?.includes(article.id),
  );

  return (
    <>
      <Seo
        title={`${project.title} Case Study`}
        description={project.caseStudy.summary}
        canonical={canonicalUrl(projectPath(project))}
        type="article"
      />
      <div className="max-w-5xl w-full py-12 px-4">
        <button
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-[10px] mb-8"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to projects
        </button>

        <GlassCard solid className="!p-8 md:!p-14 border-slate-100">
          <header className="mb-10">
            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <Cpu size={18} />
              <span className="font-mono text-xs tracking-[0.4em] uppercase">Case study</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.95] tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-3xl">
              {project.caseStudy.summary}
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-[1fr_0.85fr] mb-10">
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Challenge</h2>
              <p className="text-slate-600 leading-relaxed">{project.caseStudy.challenge}</p>
            </div>
            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {[...project.tags, ...project.tech].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-blue-100 text-[10px] font-mono text-slate-600">
                    <Hash size={10} /> {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-8 md:grid-cols-2 mb-10">
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4">Approach</h2>
              <ul className="space-y-4">
                {project.caseStudy.approach.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600 leading-relaxed">
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4">Outcome</h2>
              <ul className="space-y-4">
                {project.caseStudy.outcome.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600 leading-relaxed">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="pt-8 border-t border-slate-100 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Related essays</h2>
                <div className="flex flex-col gap-2">
                  {relatedArticles.map((article) => (
                    <Link key={article.id} to={`/blogs/${article.id}`} className="text-sm font-bold text-blue-600 hover:text-slate-900">
                      {article.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900"
              >
                Open project <ArrowUpRight size={14} />
              </a>
            )}
          </footer>
        </GlassCard>
      </div>
    </>
  );
};

export default ProjectCaseStudyView;
