
import { CareerEvent, Project, ArticleMetadata } from '../types';
import {
    Linkedin,
    Twitter,
    Github,
    Code2,
    Globe,
    ShieldCheck,
    Zap
} from "lucide-react";

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Lumina Inference Engine",
        description: "Distributed GPU-accelerated inference gateway for custom LLMs with real-time semantic caching.",
        tags: ["AI Infra", "Backend"],
        tech: ["Python", "Rust", "CUDA", "Redis"],
    },
    {
        id: 2,
        title: "Nexa Vector DB",
        description: "A lightweight, edge-optimized vector database designed for high-concurrency retrieval in RAG systems.",
        tags: ["Database", "Go"],
        tech: ["Go", "gRPC", "RocksDB", "Protobuf"],
    },
    {
        id: 3,
        title: "Synapse Agent Mesh",
        description: "Orchestration layer for autonomous AI agents allowing cross-agent communication and task delegation.",
        tags: ["AI Agents", "System Design"],
        tech: ["Python", "Node.js", "Docker", "RabbitMQ"],
    },
    {
        id: 4,
        title: "Aegis Vault",
        description: "Hardware-security-module based secrets manager specifically for securing LLM API keys and model weights.",
        tags: ["Security", "Systems"],
        tech: ["C++", "Rust", "PostgreSQL"],
    },
    {
        id: 5,
        title: "Echo Spatial Engine",
        description: "Geospatial data processor for tracking autonomous delivery drones with sub-millisecond latency.",
        tags: ["Real-time", "Geo"],
        tech: ["Elixir", "Kafka", "PostGIS"],
    },
    {
        id: 6,
        title: "Melodify",
        description: "Hackathon winning project that scrapes any website and then composes music out of contents using math functions on client browser.",
        tags: ["hackathon"],
        tech: ["Angular", "React", "Pupetter"],
        image: "/images/Melodify.PNG",
        link: "https://melodi-fy.web.app",
    },
    {
        id: 7,
        title: "Buzzo",
        description: "A Cross-platform application that serves as a place to connect fans with their idols. It also helps celebrities to get fair pay for their contents and merchandises",
        tags: ["hackathon"],
        tech: ["Angular", "React", "Pupetter"],
        image: "/images/Buzzo.PNG",
        link: "",
    },
    {
        id: 8,
        title: "SmartVille",
        description: "A dashboard that works along IoT devices to modernize city wide waste management",
        tags: ["hackathon"],
        tech: ["Angular", "React", "Pupetter"],
        image: "/images/SmartVille.png",
        link: "https://devpost.com/software/smart-wast-management-system",
    },
    {
        id: 9,
        title: "Jember",
        description: "An LMS that will help you to never forget assignment submissions for your remote classes and helps ease your research by composing excerpts",
        tags: ["hackathon"],
        tech: ["Angular", "React", "Pupetter"],
        image: "/images/Jember.PNG",
        link: "https://www.github.com/GedionT/JemberAPI.git",
    },
    {
        id: 10,
        title: "BandMetro",
        description: "A mobile app that synchronizes your entire bands syncopation like a metronome does over an ad-hoc network",
        tags: ["hackathon"],
        tech: ["Angular", "React", "Pupetter"],
        image: "/images/BandMetro.png",
        link: "https://devpost.com/software/bandmetro",
    },
    {
        id: 11,
        image: "/images/DefHacks.PNG",
        description: "A website underdevelopment for students in the DefHacks network to begin learning entry level CS",
        tags: ["hackathon"],
        tech: ["Angular", "React", "Pupetter"],
        title: "DefHacks-Learn",
        link: "",
    }
];


export const SOCIAL_LINKS = [
    { id: "linkedin", icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/gedion-teshome", color: "text-blue-600" },
    { id: "twitter", icon: Twitter, label: "X / Twitter", href: "https://x.com/gedionteshome", color: "text-sky-600" },
    { id: "devpost", icon: Code2, label: "Devpost", href: "https://devpost.com/gedionteshome", color: "text-indigo-600" },
    { id: "scholar", icon: Globe, label: "Scholar", href: "https://scholar.google.com/citations?user=N_wHleQAAAAJ&hl=en", color: "text-emerald-600" },
    { id: "github", icon: Github, label: "GitHub", href: "https://github.com/gediont", color: "text-black-600" }
];

export const PUBLICATIONS = [
    {
        title: "SDGi Corpus: A Comprehensive Multilingual Dataset for SDG Classification",
        venue: "CEUR-WS.org, 2024",
        link: "https://ceur-ws.org/Vol-3764/paper3.pdf",
        tags: ["NLP", "Policy", "AI"],
    },
    {
        title: "Long-text Classification for UN SDGs using GNNs",
        venue: "NLP for Social Good, 2024",
        link: "https://nlp4social.github.io/nlp4socialgood/#:~:text=4%3A15PM%20%2D%204%3A35PM%20BST%20%3A%20Paper%20Presentation%203%3A%20%22SDGi%20Corpus%3A%20A%20Comprehensive%20Multilingual%20Dataset%20for%20Text%20Classification%20by%20Sustainable%20Development%20Goals%22",
        tags: ["Machine Learning", "Graph Neural Networks"],
    },
    {
        title: "Amharic Text-to-Speech System for Accessibility",
        venue: "Tech Innovation Institute, 2021",
        link: "#",
        tags: ["Accessibility", "Speech Processing"],
    }
]

export const TALKS_AND_WORKSHOPS = [
    {
        title: "CaCTüS Symposium Talk",
        details: "Amazon Research Center, Tübingen, 2023",
        link: "https://www.projects.tuebingen.mpg.de/cactues-2023/#:~:text=Gedion%20Teshome%20Disassa",
        tags: ["Computational Neuroscience", "Deep Learning"],
        thumbnail: "https://www.projects.tuebingen.mpg.de/wp-content/uploads/2023/08/Bearbeitet-Klein-gedion-website-picture-IMG_5713-scaled-e1692314728728.jpg"
    },
    {
        title: "Lessons Learned from Building NLP Products",
        details: "Lanfrica Talks, 2022",
        link: "https://aihub.org/2022/12/12/forthcoming-machine-learning-and-ai-seminars-december-2022-edition/#:~:text=Lessons%20learned%20from%20building%20a%20TTS%20platform%20for%20the%20Amharic%20language%0ASpeaker%3A%20Gedion%20Teshome%20Disassa%0AOrganised%20by%3A%20Lanfrica%0AZoom%20link%20here.",
        tags: ["NLP", "Product"],
        thumbnail: "https://example.com/cactus-talk-thumbnail.jpg"

    },
    {
        title: "Hacktoberfest East Africa",
        details: "MLH/Workshop, 2021",
        link: "#",
        tags: ["Community", "Hackathon"],
        thumbnail: "https://example.com/cactus-talk-thumbnail.jpg"
    },
    {
        title: "Applied Machine Learning Days (AMLD)",
        details: "Workshop Evaluator, 2024",
        link: "#",
        tags: ["ML", "Research"],
        thumbnail: "https://example.com/cactus-talk-thumbnail.jpg"
    }
]

export const TECHNICAL_STACK = [
    { label: 'Backend', items: ['Python', 'JavaScript', 'Go', 'C++'] },
    { label: 'AI/ML', items: ['PyTorch', 'LangChain', 'OpenAI', 'RAG'] },
    { label: 'Infra', items: ['GCP', 'Azure', 'Docker', 'Kafka', 'PostgreSQL'] },
]

export const ACCOMPLISHMENTS = [
    { title: "GCP Prof. Data Engineer", icon: ShieldCheck, date: "2024" },
    { title: "AWS DeepRacer Elite", icon: Zap, date: "2023" },
    { title: "Top Open Source Contrib.", icon: Code2, date: "2022" },
]

export const CAREER_TIMELINE: CareerEvent[] = [
    {
        year: "2023",
        title: "Data Science, NLP, Analyst",
        organization: "UNDP HQ",
        location: "New York, USA",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/UNDP_logo.svg/960px-UNDP_logo.svg.png",
        description: "Spearheading data-driven initiatives for global sustainable development goals.",
        tags: ["Python", "R", "Policy Analysis"]
    },
    {
        year: "2023",
        title: "Research Fellow",
        organization: "Max Planck Institute",
        location: "Tübingen, Germany",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Max_Planck_Institutes_general_logo_%28cropped%29.png",
        description: "Advanced research in computational models and socio-technical systems.",
        tags: ["Research", "Academic", "AI Ethics"]
    },
    {
        year: "2023",
        title: "SDGi Corpus Co-author",
        organization: "Hugging Face / UNDP",
        location: "Remote",
        logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
        description: "Collaborated on the development of the SDGi Corpus for NLP tasks in sustainable development.",
        tags: ["NLP", "HuggingFace", "Open Source"]
    },
    {
        year: "2022",
        title: "MLH Top 50 Global Award",
        organization: "Major League Hacking",
        location: "Global",
        logo: "https://static.mlh.io/brand-assets/logo/official/mlh-logo-color.svg",
        description: "Recognized as one of the top 50 community members globally for contributions to tech education.",
        tags: ["Community", "Award", "Hackathons"]
    },
    {
        year: "2021",
        title: "Senior Developer",
        organization: "Gebeya Inc.",
        location: "Addis Ababa, Ethiopia",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCX8Lx32boqyvqi9P60fe9dPTpY8ONIPYjIg&s",
        description: "Led engineering teams in building scalable cloud-native solutions for pan-African markets.",
        tags: ["Leadership", "Cloud Architecture", "Go"]
    },
    {
        year: "2019",
        title: "Professional Degree",
        organization: "Gebeya Training",
        location: "Addis Ababa, Ethiopia",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCX8Lx32boqyvqi9P60fe9dPTpY8ONIPYjIg&s",
        description: "Specialized Backend Engineering certification with a focus on microservices.",
        tags: ["Backend", "Microservices", "Security"]
    },
    {
        year: "2018",
        title: "BSc, Software Engineering",
        organization: "AASTU",
        location: "Addis Ababa, Ethiopia",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZAdcOXmRhIo38tGRI5FcmrbR37m5kuu7xA&s",
        description: "Graduated with honors in Software Engineering from Addis Ababa Science and Technology University.",
        tags: ["Academia", "Software Eng", "Mathematics"]
    }
];


export const articleRegistry: ArticleMetadata[] = [
    {
        id: "spatial-web",
        title: "Engineering the Spatial Web",
        date: "2024-10-24",
        readingTime: "1 min read",
        excerpt: "Why flat interfaces are hitting a ceiling and how depth-driven design is becoming the new standard.",
        filePath: "/articles/spatial-web.md",
        tags: ["UI/UX", "Spatial Computing", "WebGPU"]
    },
    {
        id: "ai-workflows",
        title: "Scaling AI Native Workflows",
        date: "2024-09-15",
        readingTime: "2 min read",
        excerpt: "Transitioning from traditional software engineering to an agent-orchestrated development environment.",
        filePath: "/articles/ai-workflows.md",
        tags: ["AI", "Architecture", "Agents"]
    }
];