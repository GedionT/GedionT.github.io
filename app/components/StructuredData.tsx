import React, { useEffect } from 'react';

const StructuredData: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "name": "Gedion Teshome Disassa",
          "alternateName": "Gedion Disassa | Gedion T. Disassa | Gedion Teshome | GedionT",
          "url": "https://gediont.github.io",
          "image": "https://avatars.githubusercontent.com/u/26666155?v=4",
          "sameAs": [
            "https://www.linkedin.com/in/gedion-teshome",
            "https://x.com/gedionteshome",
            "https://github.com/gediont",
            "https://devpost.com/gedionteshome",
            "https://huggingface.co/gedt",
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
          "description": "Data Science, AI, and Software professional specializing in the intersection of High-Performance Backend Systems and Generative AI and studying impacts of emerging AI technology in the space of multi-national organizations.",
          "knowsAbout": [
            "Generative AI",
            "Backend Architecture",
            "Software Engineering",
            "Computational Neuroscience",
            "Systems Design",
            "Research",
            "SDGs",
            "AI Ethics",
            "Data Science",
            "Data Governance",
            "Python",
            "React",
            "Machine Learning",
            "Data Engineering"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://gediont.github.io/#website",
          "url": "https://gediont.github.io",
          "name": "Gedion Disassa | Portfolio",
          "publisher": { "@id": "https://gediont.github.io/#person" }
        }
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
      <p>Expertise: Software Architecture, AI Engineering, Distributed Systems, Research, Computational Neuroscience, Policy & Governance.</p>
      <p>Tech Stack: Python, Go, React, LangChain, GCP, Docker, Azure.</p>
      <p>Current Focus: Agentic workflows and low-latency inference engines to manage knowledge systems.</p>
    </section>
  </div>);
};

export default StructuredData;