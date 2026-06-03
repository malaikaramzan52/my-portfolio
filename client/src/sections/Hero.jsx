import { useState, useEffect } from 'react';
import heroBg from '../assets/hero.jpg';
import myPick from '../assets/My_Pick.jpeg';

const words = ["MERN Stack Developer", "Frontend Developer"];
const descriptions = [
    "Specializing in the MERN stack to build scalable, robust, and clean-coded digital products that solve complex problems and drive business growth.",
    "Designing and crafting highly responsive, performant user interfaces, building reusable components, and managing seamless state experiences with modern tools."
];

function Hero() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [typingSpeed, setTypingSpeed] = useState(150);

    const activeIndex = loopNum % words.length;

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullWord = words[i];

            if (!isDeleting) {
                // Typing character by character
                setCurrentText(fullWord.substring(0, currentText.length + 1));
                setTypingSpeed(100); // Normal typing speed

                if (currentText === fullWord) {
                    setIsDeleting(true);
                    setTypingSpeed(2500); // Hold complete word on screen
                }
            } else {
                // Deleting character by character
                setCurrentText(fullWord.substring(0, currentText.length - 1));
                setTypingSpeed(45); // Deleting is faster

                if (currentText === '') {
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                    setTypingSpeed(250); // Small delay before typing the next word
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, loopNum, typingSpeed]);

    return (
        <section 
            id="home" 
            className="hero-section"
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            {/* Overlay to ensure text readability & color matching */}
            <div className="hero-overlay"></div>

            <div className="hero-container">
                {/* Left Side: Content */}
                <div className="hero-content animate-slide-in-left">
                    <h1 className="hero-title">
                        {currentText}
                        <span className="typing-cursor">|</span>
                    </h1>

                    <p className="hero-desc">
                        {descriptions[activeIndex]}
                    </p>
                    <div className="hero-btns">
                        <a href="#projects" className="hero-btn-outline">VIEW MY WORK</a>
                        <a href="/Web_Developer_CV.pdf" target="_blank" rel="noopener noreferrer" className="hero-btn-solid">MY RESUME</a>
                    </div>
                </div>

                {/* Right Side: Image with a glowing technology ring around it */}
                <div className="hero-image-wrapper animate-fade-in-right">
                    <div className="glowing-ring"></div>
                    <div className="image-card">
                        <img src={myPick} alt="Malaika Ramzan" className="hero-profile-pic" />
                    </div>
                </div>
            </div>

            {/* Premium organic brush/wave divider at the bottom of the section */}
            <div className="wave-divider">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path 
                        d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" 
                        fill="#001219"
                    ></path>
                </svg>
            </div>
        </section>
    );
}

export default Hero;
