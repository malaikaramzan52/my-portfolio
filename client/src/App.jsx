import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import AboutTerminal from './components/AboutTerminal';
import SkillsVisualizer from './components/SkillsVisualizer';
import frontendCert from './assets/Forntend.jpeg';
import wordCert from './assets/Word.jpeg';

const API_BASE_URL = 'http://localhost:5000/api';

// Fallback data in case the server is offline or loading
const fallbackProjects = [
    {
        _id: "fb-1",
        title: "Tesla Homepage Clone",
        description: "A simple responsive clone of Tesla's homepage using HTML, Tailwind CSS, and basic JavaScript (for the hero slider).",
        imageUrl: "images/tesla.png",
        tags: ["HTML", "CSS", "Tailwind"],
        projectUrl: "https://malaikaramzan52.github.io/Task_3/",
        githubUrl: "https://github.com/malaikaramzan52"
    },
    {
        _id: "fb-2",
        title: "Currency Converter",
        description: "The Currency Converter Web Application is a responsive and interactive frontend project developed using HTML, CSS, and JavaScript. It allows users to convert currency values between different countries in real time by fetching accurate exchange rates from a third-party Currency Exchange API.",
        imageUrl: "images/cc.png",
        tags: ["JavaScript", "API", "CSS"],
        projectUrl: "https://malaikaramzan52.github.io/Currency-Converter/",
        githubUrl: "https://github.com/malaikaramzan52"
    },
    {
        _id: "fb-3",
        title: "Phoenix Homepage Clone",
        description: "A modern, responsive Admin Dashboard cloned from Phoenix UI. This dashboard showcases an elegant layout with navigation, widgets, charts, tables, and user interface components tailored for admin panel functionality.",
        imageUrl: "images/ppp.png",
        tags: ["HTML", "CSS", "JavaScript"],
        projectUrl: "https://malaikaramzan52.github.io/Task_4/",
        githubUrl: "https://github.com/malaikaramzan52"
    },
    {
        _id: "fb-4",
        title: "Task Scheduler",
        description: "A simple and interactive Time Scheduler Web App to add, manage and remove tasks based on priority and deadline using DOM manipulation.",
        imageUrl: "images/final.png",
        tags: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
        projectUrl: "https://malaikaramzan52.github.io/Task-Schedular/",
        githubUrl: "https://github.com/malaikaramzan52"
    }
];

const fallbackSkills = [
    { _id: "fbs-1", name: "HTML", imageUrl: "images/HTML.png", category: "Frontend" },
    { _id: "fbs-2", name: "CSS", imageUrl: "images/css.jpg", category: "Frontend" },
    { _id: "fbs-3", name: "Tailwind CSS", imageUrl: "images/Tailwind.png", category: "Frontend" },
    { _id: "fbs-4", name: "JavaScript", imageUrl: "images/Js.png", category: "Frontend" },
    { _id: "fbs-5", name: "Git & GitHub", imageUrl: "images/github.png", category: "Tools" }
];

const certificatesData = [
    {
        id: "cert-1",
        title: "Frontend Developer",
        org: "Fiesta Digital Solutions",
        date: "17-11-2025",
        badge: "Frontend Dev",
        badgeClass: "purple",
        iconClass: "fa-solid fa-award",
        image: frontendCert,
        credId: "FD-2025-0981",
        description: "Intensive frontend development credential covering HTML5, CSS3, modern JavaScript ES6+, responsive layout engineering, and building dynamic UI components. Handled real-world client briefs and digital solutions."
    },
    {
        id: "cert-2",
        title: "Microsoft Office Specialist",
        org: "Office Word 2016",
        date: "14-01-2021",
        badge: "MOS Word",
        badgeClass: "green",
        iconClass: "fa-solid fa-certificate",
        image: wordCert,
        credId: "MOS-2021-3049",
        description: "Official certification proving professional-level competence in formatting, layout structuring, references, tables, template generation, and advanced processing tools of Microsoft Word 2016."
    }
];

function App() {
    const [projects, setProjects] = useState(fallbackProjects);
    const [skills, setSkills] = useState(fallbackSkills);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingSkills, setLoadingSkills] = useState(true);

    // Form State
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Certificate Modal State
    const [selectedCert, setSelectedCert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Temporarily bypassing backend fetch while focusing purely on the frontend UI
        setProjects(fallbackProjects);
        setLoadingProjects(false);
        
        setSkills(fallbackSkills);
        setLoadingSkills(false);
        
        /* 
        // Fetch Projects
        fetch(`${API_BASE_URL}/projects`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch projects');
                return res.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    setProjects(data);
                }
                setLoadingProjects(false);
            })
            .catch(err => {
                setLoadingProjects(false);
            });

        // Fetch Skills
        fetch(`${API_BASE_URL}/skills`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch skills');
                return res.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    setSkills(data);
                }
                setLoadingSkills(false);
            })
            .catch(err => {
                setLoadingSkills(false);
            });
        */
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.05 }
        );
        const elements = document.querySelectorAll('.scroll-animate, #education');
        elements.forEach(el => observer.observe(el));
        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, [projects, loadingProjects]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsModalOpen(false);
                setSelectedCert(null);
            }
        };
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ type: '', text: '' });
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                let successMessage = "Thank you! Your message has been received.";
                if (result.warning) {
                    successMessage += ` (${result.warning})`;
                } else if (result.emailSent) {
                    successMessage += " An email notification was also successfully sent.";
                }
                
                setFormStatus({
                    type: 'success',
                    text: successMessage
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormStatus({
                    type: 'error',
                    text: result.message || 'Something went wrong. Please try again.'
                });
            }
        } catch (error) {
            console.error('Contact Form Error:', error);
            setFormStatus({
                type: 'error',
                text: 'Connection error: Unable to contact the server. Please check if the backend is running.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Modular Header Navigation */}
            <Header />

            {/* Modular Hero Section */}
            <Hero />

            {/* About Me Terminal Section */}
            <AboutTerminal />

            {/* Interactive Skills Visualizer Graph Section */}
            <SkillsVisualizer />

            {/* Projects Section */}
            <section id="projects">
                <div className="section-header scroll-animate">
                    <span className="section-label">Portfolio</span>
                    <h2 className="section-title">Featured Projects</h2>
                </div>

                {loadingProjects ? (
                    <div style={{ padding: '2rem', fontSize: '1.1rem', opacity: 0.7 }}>Loading projects database...</div>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project, idx) => (
                            <div 
                                key={project._id} 
                                className="project-card scroll-animate"
                                style={{ transitionDelay: `${idx * 0.12}s` }}
                            >
                                <div className="project-header">
                                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                        <img src={project.imageUrl} alt={project.title} />
                                    </a>
                                </div>
                                <div className="project-content" style={{ textAlign: 'left' }}>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-tags">
                                        {project.tags.map((tag, idx) => (
                                            <span key={idx} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="project-actions">
                                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="btn-project demo">
                                            <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                                        </a>
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-project github">
                                            <i className="fa-brands fa-github"></i> GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>


            {/* Education Section */}
            <section id="education">
                <div className="section-header">
                    <span className="section-label">Academic Background</span>
                    <h2 className="section-title">Education</h2>
                </div>
                
                <div className="timeline-container">
                    <div className="timeline-item left">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <span className="timeline-date">2022 - 2026</span>
                            <h3 className="timeline-degree">BS in Computer Science</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                                <span className="timeline-status">Completed</span>
                                <span className="timeline-gpa">CGPA: 3.83/4.00</span>
                            </div>
                            <p className="timeline-inst">University of Education Lahore, Multan Campus</p>
                            <div className="timeline-tags">
                                <span className="timeline-tag">Computer Science</span>
                                <span className="timeline-tag">Database Systems</span>
                                <span className="timeline-tag">Web Development</span>
                                <span className="timeline-tag">Software Engineering</span>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-item right">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <span className="timeline-date">2020 - 2022</span>
                            <h3 className="timeline-degree">Intermediate in Computer Science</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                                <span className="timeline-status">Completed</span>
                                <span className="timeline-gpa">Marks: 968/1100</span>
                            </div>
                            <p className="timeline-inst">Punjab Group of Colleges, Multan</p>
                            <div className="timeline-tags">
                                <span className="timeline-tag">Computer Science</span>
                                <span className="timeline-tag">Mathematics</span>
                                <span className="timeline-tag">Physics</span>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-item left">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                            <span className="timeline-date">2018 - 2020</span>
                            <h3 className="timeline-degree">Matriculation in Science</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                                <span className="timeline-status">Completed</span>
                                <span className="timeline-gpa">Marks: 948/1100</span>
                            </div>
                            <p className="timeline-inst">Sun Model Higher Secondary School, Multan</p>
                            <div className="timeline-tags">
                                <span className="timeline-tag">Science</span>
                                <span className="timeline-tag">Computer Science</span>
                                <span className="timeline-tag">Mathematics</span>
                                <span className="timeline-tag">Physics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certificates Section */}
            <section id="certificates">
                <div className="section-header scroll-animate">
                    <span className="section-label">Valued Credentials</span>
                    <h2 className="section-title">Certificates</h2>
                </div>

                <div className="certificates-container">
                    {certificatesData.map((cert, idx) => (
                        <div 
                            key={cert.id} 
                            className="certificate-card scroll-animate"
                            style={{ transitionDelay: `${idx * 0.15}s` }}
                        >
                            <div className={`cert-icon-container ${cert.badgeClass}`}>
                                <i className={cert.iconClass}></i>
                            </div>
                            <div className="cert-info">
                                <span className="cert-org">{cert.org}</span>
                                <h3 className="cert-title">{cert.title}</h3>
                                <div className="cert-meta">
                                    <span className="cert-date">
                                        <i className="fa-regular fa-calendar-days"></i> Issued: {cert.date}
                                    </span>
                                    <span className={`cert-badge ${cert.badgeClass}`}>{cert.badge}</span>
                                </div>
                            </div>
                            <div className="cert-actions">
                                <button 
                                    className="btn-cert"
                                    onClick={() => {
                                        setSelectedCert(cert);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    View credential <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact">
                <div className="section-header scroll-animate">
                    <span className="section-label">Get In Touch</span>
                    <h2 className="section-title">Contact Me</h2>
                    <p className="section-subtitle">Open to opportunities, collaborations, or just a friendly hello.</p>
                </div>

                <div className="contact-container">
                    {/* Part 1: Connect with me (simple list of icons + text, no enclosing giant card) */}
                    <div className="connect-wrapper">
                        <a href="https://github.com/malaikaramzan52" target="_blank" rel="noopener noreferrer" className="connect-item scroll-animate" style={{ transitionDelay: '0.1s' }}>
                            <span className="connect-icon github"><i className="fa-brands fa-github"></i></span>
                            <div className="connect-details">
                                <span className="connect-label">GitHub</span>
                                <span className="connect-text">malaikaramzan52</span>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/malaika-ramzan-883923325/" target="_blank" rel="noopener noreferrer" className="connect-item scroll-animate" style={{ transitionDelay: '0.2s' }}>
                            <span className="connect-icon linkedin"><i className="fa-brands fa-linkedin-in"></i></span>
                            <div className="connect-details">
                                <span className="connect-label">LinkedIn</span>
                                <span className="connect-text">malaikaramzan52</span>
                            </div>
                        </a>

                        <a href="mailto:malaikaramzan52@gmail.com" className="connect-item scroll-animate" style={{ transitionDelay: '0.3s' }}>
                            <span className="connect-icon email"><i className="fa-solid fa-envelope"></i></span>
                            <div className="connect-details">
                                <span className="connect-label">Email</span>
                                <span className="connect-text">malaikaramzan52@gmail.com</span>
                            </div>
                        </a>

                        <div className="connect-item cursor-default scroll-animate" style={{ transitionDelay: '0.4s' }}>
                            <span className="connect-icon location"><i className="fa-solid fa-location-dot"></i></span>
                            <div className="connect-details">
                                <span className="connect-label">Location</span>
                                <span className="connect-text">Multan, Pakistan</span>
                            </div>
                        </div>
                    </div>

                    {/* Divider Line */}
                    <div className="contact-divider scroll-animate" style={{ transitionDelay: '0.45s' }}>
                        <span>or send a message</span>
                    </div>

                    {/* Part 2: Send a message Form Card */}
                    <div className="contact-form-card scroll-animate" style={{ transitionDelay: '0.5s' }}>
                        <div className="form-card-header">
                            <i className="fa-regular fa-comment-dots"></i>
                            <h3>Send a message</h3>
                        </div>

                        {formStatus.text && (
                            <div className={`alert alert-${formStatus.type}`}>
                                {formStatus.text}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="contact-form-new">
                            <div className="form-row-two">
                                <div className="form-group-new">
                                    <label htmlFor="name">Full name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        className="form-control-new" 
                                        placeholder="Your Name" 
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>

                                <div className="form-group-new">
                                    <label htmlFor="email">Email address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        className="form-control-new" 
                                        placeholder="yourname@gmail.com" 
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group-new">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows="5" 
                                    className="form-control-new" 
                                    placeholder="How can I help you?" 
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="btn-submit-new" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-paper-plane"></i>
                                        Send message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-professional">
                <div className="footer-container">
                    <div className="footer-brand">
                        <div className="logo-container">
                            <span className="logo-icon"><i className="fa-solid fa-code"></i></span>
                            <div className="logo-text">
                                Malaika Ramzan
                                <span className="logo-sub">MERN Stack Developer</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-copyright">
                        <p>© 2026 Malaika Ramzan. All rights reserved.</p>
                    </div>

                    <div className="footer-socials">
                        <a href="https://maps.google.com/?q=Multan,Pakistan" target="_blank" rel="noopener noreferrer" title="Multan, Pakistan"><i className="fa-solid fa-location-dot"></i></a>
                        <a href="https://github.com/malaikaramzan52" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/malaika-ramzan-883923325/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="mailto:malaikaramzan52@gmail.com" title="Email"><i className="fa-solid fa-envelope"></i></a>
                    </div>
                </div>
            </footer>

            {/* Certificate Detail Modal */}
            {isModalOpen && selectedCert && (
                <div 
                    className="cert-modal-overlay" 
                    onClick={() => { setIsModalOpen(false); setSelectedCert(null); }}
                >
                    <div 
                        className="cert-modal-window animate-modal-zoom"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="cert-modal-close"
                            onClick={() => { setIsModalOpen(false); setSelectedCert(null); }}
                            title="Close"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        
                        <div className="cert-modal-grid">
                            <div className="cert-modal-image-container">
                                <img 
                                    src={selectedCert.image} 
                                    alt={selectedCert.title} 
                                    className="cert-modal-img"
                                />
                            </div>
                            <div className="cert-modal-info">
                                <span className="cert-modal-org">{selectedCert.org}</span>
                                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                                
                                <div className="cert-modal-meta">
                                    <span className="cert-modal-date">
                                        <i className="fa-regular fa-calendar-days"></i> Issued: {selectedCert.date}
                                    </span>
                                </div>
                                
                                <hr className="cert-modal-divider" />
                                
                                <div className="cert-modal-desc">
                                    <h4>Description</h4>
                                    <p>{selectedCert.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
