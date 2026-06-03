import { useEffect, useState, useRef } from 'react';

function AboutTerminal() {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentCommandText, setCurrentCommandText] = useState('');
    const [isTypingCommand, setIsTypingCommand] = useState(false);
    const [showNextPrompt, setShowNextPrompt] = useState(false);
    const sectionRef = useRef(null);
    const typeIntervalRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    const fullCommand = 'curl -X GET /api/malaika-dev/about';
    const jsonLines = [
        '{',
        '  "name": "Malaika Ramzan",',
        '  "role": "MERN Stack Developer",',
        '  "experience": "6+ months",',
        '  "location": "Multan, Pakistan",',
        '  "skills": [',
        '    "MongoDB", "Express.js", "React.js", "Node.js",',
        '    "JavaScript", "HTML5", "CSS3", "Tailwind CSS",',
        '    "Mongoose", "Nodemailer", "Git", "GitHub",',
        '    "RESTful APIs", "JWT", "Vite"',
        '  ],',
        '  "passion": "Building high-performance, responsive web applications with clean code.",',
        '  "status": "Available for new opportunities"',
        '}'
    ];

    const startAnimation = () => {
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        
        // Reset states
        setDisplayedLines([]);
        setCurrentCommandText('');
        setIsTypingCommand(true);
        setShowNextPrompt(false);

        if (typeIntervalRef.current) {
            clearInterval(typeIntervalRef.current);
        }

        // Type the command character by character
        let charIndex = 0;
        typeIntervalRef.current = setInterval(() => {
            if (charIndex < fullCommand.length) {
                // Ensure we only append valid characters, double check boundary
                const nextChar = fullCommand[charIndex];
                if (nextChar !== undefined) {
                    setCurrentCommandText(prev => prev + nextChar);
                }
                charIndex++;
            } else {
                if (typeIntervalRef.current) {
                    clearInterval(typeIntervalRef.current);
                    typeIntervalRef.current = null;
                }
                setIsTypingCommand(false);
                // Start rendering JSON lines after a brief delay
                setTimeout(() => {
                    renderJsonLines(0);
                }, 400);
            }
        }, 50);
    };

    const renderJsonLines = (lineIndex) => {
        if (lineIndex < jsonLines.length) {
            setDisplayedLines(prev => [...prev, jsonLines[lineIndex]]);
            setTimeout(() => {
                renderJsonLines(lineIndex + 1);
            }, 100); // Delay between JSON lines
        } else {
            // Finished typing JSON, show final prompt
            setTimeout(() => {
                setShowNextPrompt(true);
            }, 300);
        }
    };

    const handleReset = () => {
        if (typeIntervalRef.current) {
            clearInterval(typeIntervalRef.current);
            typeIntervalRef.current = null;
        }
        hasAnimatedRef.current = false;
        setDisplayedLines([]);
        setCurrentCommandText('');
        setIsTypingCommand(false);
        setShowNextPrompt(false);
        // Trigger again
        setTimeout(() => {
            startAnimation();
        }, 100);
    };

    const handleSkip = () => {
        if (typeIntervalRef.current) {
            clearInterval(typeIntervalRef.current);
            typeIntervalRef.current = null;
        }
        setIsTypingCommand(false);
        setCurrentCommandText(fullCommand);
        setDisplayedLines(jsonLines);
        setShowNextPrompt(true);
        hasAnimatedRef.current = true;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    startAnimation();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            if (typeIntervalRef.current) {
                clearInterval(typeIntervalRef.current);
            }
        };
    }, []);

    // Syntax highlighting for JSON lines
    const renderHighlightedLine = (line) => {
        const keyValRegex = /^(\s*)"([^"]+)"\s*:\s*(.*)$/;
        const match = line.match(keyValRegex);

        if (match) {
            const indent = match[1];
            const key = match[2];
            const val = match[3];

            let highlightedVal = val;
            if (val.trim().startsWith('"')) {
                highlightedVal = <span className="term-val-str">{val}</span>;
            } else {
                highlightedVal = <span className="term-val-other">{val}</span>;
            }

            return (
                <span>
                    {indent}
                    <span className="term-key">"{key}"</span>
                    <span className="term-colon">: </span>
                    {highlightedVal}
                </span>
            );
        }

        return <span className="term-bracket">{line}</span>;
    };

    // Calculate line numbers
    let totalLinesCount = 1; // first prompt
    if (displayedLines.length > 0 || isTypingCommand) {
        totalLinesCount += displayedLines.length;
    }
    if (showNextPrompt) {
        totalLinesCount += 1;
    }

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            <div className="section-header scroll-animate">
                <span className="section-label">Identity & Background</span>
                <h2 className="section-title">About Me</h2>
            </div>

            <div className="terminal-window scroll-animate" style={{ transitionDelay: '0.2s' }}>
                {/* Header */}
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <div className="terminal-title">Terminal — about</div>
                    <div className="terminal-actions">
                        <button className="term-btn skip" onClick={handleSkip}>Skip</button>
                        <button className="term-btn reset" onClick={handleReset}>Reset</button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="terminal-body">
                    {/* Line Numbers column */}
                    <div className="terminal-line-numbers">
                        {Array.from({ length: Math.max(totalLinesCount, 16) }).map((_, idx) => (
                            <div key={idx} className="line-num">
                                {String(idx + 1).padStart(2, '0')}
                            </div>
                        ))}
                    </div>

                    {/* Code Content column */}
                    <div className="terminal-code">
                        {/* Line 1: Prompt + Command */}
                        <div className="term-line">
                            <span className="term-prompt-user">malaika</span>
                            <span className="term-prompt-at">@</span>
                            <span className="term-prompt-host">portfolio</span>
                            <span className="term-prompt-colon">:</span>
                            <span className="term-prompt-path">~</span>
                            <span className="term-prompt-dollar">$ </span>
                            <span className="term-command">{currentCommandText}</span>
                            {isTypingCommand && <span className="term-cursor typing"></span>}
                        </div>

                        {/* JSON Lines */}
                        {displayedLines.map((line, idx) => (
                            <div key={idx} className="term-line code-line">
                                {renderHighlightedLine(line)}
                            </div>
                        ))}

                        {/* Final Prompt */}
                        {showNextPrompt && (
                            <div className="term-line">
                                <span className="term-prompt-user">malaika</span>
                                <span className="term-prompt-at">@</span>
                                <span className="term-prompt-host">portfolio</span>
                                <span className="term-prompt-colon">:</span>
                                <span className="term-prompt-path">~</span>
                                <span className="term-prompt-dollar">$ </span>
                                <span className="term-cursor blinking"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutTerminal;
