import { useRef } from 'react';

function SkillsSlider() {
    const sliderRef = useRef(null);

    const skills = [
        { name: "MongoDB", icon: "fa-solid fa-leaf", color: "#00ED64" },
        { name: "Express.js", icon: "fa-solid fa-gears", color: "#ffffff" },
        { name: "React", icon: "fa-brands fa-react", color: "#61DAFB" },
        { name: "Node.js", icon: "fa-brands fa-node-js", color: "#339933" },
        { name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E" },
        { name: "Tailwind CSS", icon: "fa-solid fa-wind", color: "#38BDF8" },
        { name: "Git & GitHub", icon: "fa-brands fa-github", color: "#ffffff" },
        { name: "HTML5", icon: "fa-brands fa-html5", color: "#E34F26" },
        { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#1572B6" }
    ];

    const scroll = (direction) => {
        if (sliderRef.current) {
            const { scrollLeft } = sliderRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - 260 
                : scrollLeft + 260;
            sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="skills-slider-section">
            <div className="skills-slider-container">
                <button className="slider-arrow left" onClick={() => scroll('left')} aria-label="Scroll Left">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                
                <div className="skills-slider-track" ref={sliderRef}>
                    {skills.map((skill, index) => (
                        <div key={index} className="slider-skill-card">
                            <div className="skill-icon-wrapper" style={{ '--skill-color': skill.color }}>
                                <i className={skill.icon}></i>
                            </div>
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>

                <button className="slider-arrow right" onClick={() => scroll('right')} aria-label="Scroll Right">
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}

export default SkillsSlider;
