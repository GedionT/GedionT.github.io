import React, { useEffect } from 'react';
import { articleRegistry } from '../articles';
import { PROJECTS } from '../constants';
import { projectPath, slugify, tagPath } from '../slugs';
import { canonicalUrl } from '../site';
import identity from "../../content/identity.json";

const StructuredData: React.FC = () => {
  useEffect(() => {
    if (document.getElementById("site-structured-data")) return;

    const tags = Array.from(new Set(articleRegistry.flatMap((article) => article.tags))).sort();
    const breadcrumb = (route: string, items: Array<[string, string]>) => ({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl(route)}#breadcrumb`,
      "itemListElement": items.map(([itemRoute, name], index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": name,
        "item": canonicalUrl(itemRoute)
      }))
    });
    const articleBreadcrumb = (article: typeof articleRegistry[number]) =>
      breadcrumb(`/blogs/${article.id}`, [
        ["/", "Home"],
        ["/blogs", "Engineering Logs"],
        [`/blogs/${article.id}`, article.title]
      ]);
    const projectBreadcrumb = (project: typeof PROJECTS[number]) =>
      breadcrumb(projectPath(project), [
        ["/", "Home"],
        ["/projects", "Projects"],
        [projectPath(project), project.title]
      ]);
    const tagBreadcrumb = (tag: string) =>
      breadcrumb(tagPath(tag), [
        ["/", "Home"],
        ["/blogs", "Engineering Logs"],
        [tagPath(tag), `${tag} Essays`]
      ]);

    const script = document.createElement('script');
    script.id = "site-structured-data";
    script.type = 'application/ld+json';
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": canonicalUrl("/#person"),
          "name": identity.canonicalName,
          "alternateName": identity.nameVariants.filter((name) => name !== identity.canonicalName),
          "url": "https://gediont.github.io",
          "image": "https://avatars.githubusercontent.com/u/26666155?v=4",
          "sameAs": [
            "https://www.linkedin.com/in/gedion-teshome",
            "https://x.com/gedionteshome",
            "https://github.com/gediont",
            "https://devpost.com/gedionteshome",
            "https://huggingface.co/gedt",
            "https://huggingface.co/datasets/UNDP/sdgi-corpus",
            "https://github.com/UNDP-Data/dsc-sdgi-corpus",
            "https://ceur-ws.org/Vol-3764/paper3.pdf",
            "https://top.mlh.io/2022/profiles/gedion-teshome",
            "https://scholar.google.com/citations?user=N_wHleQAAAAJ&hl=en",
            "https://www.kyb.tuebingen.mpg.de/person/129409/85837",
            "https://www.projects.tuebingen.mpg.de/cactues-2023/#:~:text=Gedion%20Teshome%20Disassa%0AEthiopia%0A%0ASoftware%20Engineering%2C%20Deep%20Learning%2C%20and%20NLP",
            "https://orcid.org/0009-0000-8552-154X",
            "https://www.informationisbeautifulawards.com/showcase/7312-undp-data-futures-exchange",
          ],
          "jobTitle": "AI specialist and software engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "United Nations Development Programme"
          },
          "affiliation": [
            { "@type": "Organization", "name": "United Nations Development Programme" },
            { "@type": "Organization", "name": "CaCTuS Program, Tuebingen" }
          ],
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Addis Ababa Science and Technology University"
          },
          "award": [
            "MLH Top 50 Hackers 2022",
            "Information is Beautiful Awards 2024 Longlist credit for UNDP Data Futures Exchange"
          ],
          "description": "Data Science, AI, and software professional specializing in high-performance backend systems, generative AI, NLP, governance, public-interest data systems, and research software.",
          "knowsAbout": [
            "Generative AI",
            "Backend Architecture",
            "Software Engineering",
            "Computational Neuroscience",
            "Systems Design",
            "Research",
            "SDGs",
            "Sustainable Development Goals",
            "AI Ethics",
            "Data Science",
            "Data Governance",
            "Python",
            "React",
            "Machine Learning",
            "Data Engineering",
            "Geospatial Intelligence",
            "Agentic Workflows",
            "NLP for Social Good"
          ]
        },
        {
          "@type": "WebSite",
          "@id": canonicalUrl("/#website"),
          "url": canonicalUrl("/"),
          "name": "Gedion Disassa | Portfolio",
          "alternateName": identity.nameVariants,
          "about": { "@id": canonicalUrl("/#person") },
          "publisher": { "@id": canonicalUrl("/#person") }
        },
        {
          "@type": "ProfilePage",
          "@id": canonicalUrl("/about#profilepage"),
          "url": canonicalUrl("/about"),
          "name": "About Gedion Teshome Disassa",
          "description": "Professional profile for Gedion Teshome Disassa, covering AI, data science, software engineering, governance technology, and research software.",
          "about": { "@id": canonicalUrl("/#person") },
          "mainEntity": { "@id": canonicalUrl("/#person") },
          "isPartOf": { "@id": canonicalUrl("/#website") },
          "breadcrumb": { "@id": `${canonicalUrl("/about")}#breadcrumb` }
        },
        {
          "@type": "Blog",
          "@id": canonicalUrl("/blogs#blog"),
          "url": canonicalUrl("/blogs"),
          "name": "Gedion Disassa Engineering Logs",
          "description": "Essays on AI, technology, governance, geospatial intelligence, biology, art, projection mapping, and software architecture.",
          "publisher": { "@id": canonicalUrl("/#person") },
          "isPartOf": { "@id": canonicalUrl("/#website") }
        },
        {
          "@type": "CollectionPage",
          "@id": canonicalUrl("/projects#collection"),
          "url": canonicalUrl("/projects"),
          "name": "Gedion Disassa Project Case Studies",
          "description": "AI, software, geospatial, civic technology, and creative coding project case studies.",
          "mainEntity": PROJECTS.map((project) => ({ "@id": `${canonicalUrl(projectPath(project))}#softwareapplication` })),
          "isPartOf": { "@id": canonicalUrl("/#website") },
          "breadcrumb": { "@id": `${canonicalUrl("/projects")}#breadcrumb` }
        },
        {
          "@type": "Dataset",
          "@id": "https://huggingface.co/datasets/UNDP/sdgi-corpus#dataset",
          "name": "SDGi Corpus",
          "alternateName": "SDG Integration Corpus",
          "description": "A multilingual dataset for text classification by Sustainable Development Goals, with over 7,000 English, French, and Spanish examples from Voluntary National Reviews and Voluntary Local Reviews.",
          "url": "https://huggingface.co/datasets/UNDP/sdgi-corpus",
          "creator": { "@type": "Organization", "name": "United Nations Development Programme" },
          "contributor": { "@id": canonicalUrl("/#person") },
          "citation": "https://ceur-ws.org/Vol-3764/paper3.pdf",
          "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
          "keywords": ["SDGi Corpus", "Sustainable Development Goals", "text classification", "NLP", "multilingual dataset", "UNDP"],
          "inLanguage": ["en", "fr", "es"],
          "isAccessibleForFree": true,
          "includedInDataCatalog": {
            "@type": "DataCatalog",
            "name": "Hugging Face Datasets",
            "url": "https://huggingface.co/datasets"
          }
        },
        breadcrumb("/", [["/", "Home"]]),
        breadcrumb("/about", [["/", "Home"], ["/about", "About"]]),
        breadcrumb("/projects", [["/", "Home"], ["/projects", "Projects"]]),
        breadcrumb("/blogs", [["/", "Home"], ["/blogs", "Engineering Logs"]]),
        breadcrumb("/contact", [["/", "Home"], ["/contact", "Contact"]]),
        ...tags.map((tag) => ({
          "@type": "CollectionPage",
          "@id": `${canonicalUrl(tagPath(tag))}#collection`,
          "url": canonicalUrl(tagPath(tag)),
          "name": `${tag} Essays`,
          "description": `Essays by Gedion Disassa tagged ${tag}.`,
          "about": { "@type": "Thing", "name": tag },
          "keywords": [tag, slugify(tag), "Gedion Disassa essays"],
          "isPartOf": { "@id": canonicalUrl("/blogs#blog") },
          "breadcrumb": { "@id": `${canonicalUrl(tagPath(tag))}#breadcrumb` }
        })),
        ...tags.map(tagBreadcrumb),
        ...PROJECTS.map((project) => ({
          "@type": "SoftwareApplication",
          "@id": `${canonicalUrl(projectPath(project))}#softwareapplication`,
          "name": project.title,
          "url": canonicalUrl(projectPath(project)),
          "sameAs": project.link || undefined,
          "description": project.caseStudy.summary || project.description,
          "applicationCategory": project.tags[0] || "DeveloperApplication",
          "operatingSystem": "Web",
          "programmingLanguage": project.tech,
          "keywords": [...project.tags, ...project.tech],
          "author": { "@id": canonicalUrl("/#person") },
          "creator": { "@id": canonicalUrl("/#person") },
          "isPartOf": { "@id": canonicalUrl("/projects#collection") },
          "mainEntityOfPage": canonicalUrl(projectPath(project))
        })),
        ...PROJECTS.map(projectBreadcrumb),
        ...articleRegistry.map((article) => ({
          "@type": "BlogPosting",
          "@id": canonicalUrl(`/blogs/${article.id}#article`),
          "headline": article.title,
          "description": article.excerpt,
          "datePublished": article.date,
          "dateModified": article.date,
          "url": canonicalUrl(`/blogs/${article.id}`),
          "mainEntityOfPage": canonicalUrl(`/blogs/${article.id}`),
          "image": canonicalUrl("/Ged-384.png"),
          "keywords": article.tags,
          "articleSection": article.tags[0],
          "isPartOf": { "@id": canonicalUrl("/blogs#blog") },
          "about": article.tags.map((tag) => ({ "@type": "Thing", "name": tag })),
          "mentions": [
            ...(article.relatedProjects || []).map((slug) => ({
              "@id": `${canonicalUrl(`/projects/${slug}`)}#softwareapplication`
            })),
            ...(article.relatedArticles || []).map((id) => ({
              "@id": canonicalUrl(`/blogs/${id}#article`)
            }))
          ],
          "breadcrumb": { "@id": `${canonicalUrl(`/blogs/${article.id}`)}#breadcrumb` },
          "author": { "@id": canonicalUrl("/#person") },
          "publisher": { "@id": canonicalUrl("/#person") }
        })),
        ...articleRegistry.map(articleBreadcrumb)
      ]
    };
    script.innerHTML = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (<div className="sr-only" aria-hidden="true">
    <section>
      <h2>Gedion Teshome Disassa - Professional Profile</h2>
      <p>Also known as: {identity.nameVariants.join(", ")}.</p>
      <p>Expertise: Software Architecture, AI Engineering, Distributed Systems, Research, Computational Neuroscience, Policy & Governance.</p>
      <p>Tech Stack: Python, Go, React, LangChain, GCP, Docker, Azure.</p>
      <p>Current Focus: Agentic workflows and low-latency inference engines to manage knowledge systems.</p>
    </section>
  </div>);
};

export default StructuredData;
