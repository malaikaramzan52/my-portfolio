import { useState, useEffect } from 'react';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-inner">
                {/* Top Bar for socials and contact */}
                <div className="header-top-right">
                    <div className="social-icons">
                        <a href="https://github.com/malaikaramzan52" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/malaika-ramzan-883923325/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="mailto:malaikaramzan52@gmail.com" title="Email"><i className="fa-solid fa-envelope"></i></a>
                    </div>
                    <a href="#contact" className="btn-contact-top">CONTACT US</a>
                </div>

                {/* Main Navbar (Blue Band) containing Logo and Menu */}
                <div className="nav-blue-band">
                    {/* Logo Section */}
                    <div className="logo-section">
                        <div className="logo-container">
                            <span className="logo-icon"><i className="fa-solid fa-code"></i></span>
                            <div className="logo-text">
                                Malaika Ramzan
                                <span className="logo-sub">MERN Stack Developer</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="nav-menu">
                        <li><a href="#home" className="nav-item">HOME</a></li>
                        <li><a href="#about" className="nav-item">ABOUT</a></li>
                        <li><a href="#skills" className="nav-item">SKILLS</a></li>
                        <li><a href="#projects" className="nav-item">PROJECTS</a></li>
                        <li><a href="#education" className="nav-item">EDUCATION</a></li>
                        <li><a href="#contact" className="nav-item">CONTACT</a></li>
                    </ul>

                    {/* Mobile Menu Burger Toggle */}
                    <div 
                        className="mobile-burger"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {mobileMenuOpen && (
                <div className="mobile-drawer-nav">
                    <a href="#home" onClick={() => setMobileMenuOpen(false)} className="drawer-item">HOME</a>
                    <a href="#about" onClick={() => setMobileMenuOpen(false)} className="drawer-item">ABOUT</a>
                    <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="drawer-item">SKILLS</a>
                    <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="drawer-item">PROJECTS</a>
                    <a href="#education" onClick={() => setMobileMenuOpen(false)} className="drawer-item">EDUCATION</a>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="drawer-item">CONTACT</a>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="drawer-item-btn">CONTACT US</a>
                </div>
            )}
        </header>
    );
}

export default Header;
