import { useState, useRef, useEffect } from 'react';

function SkillsVisualizer() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [hoveredNode, setHoveredNode] = useState(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });

        const nodes = [
        // Center Highlighted Node
        { id: "react", label: "React", category: ["frontend", "frameworks"], x: 50, y: 50, color: "#61DAFB", isCenter: true },
        
        // Frontend Cluster (Green Glow)
        { id: "html", label: "HTML", category: ["frontend"], x: 20, y: 25, color: "#00ED64" },
        { id: "css", label: "CSS", category: ["frontend"], x: 20, y: 45, color: "#00ED64" },
        { id: "tailwind", label: "Tailwind CSS", category: ["frontend", "frameworks"], x: 32, y: 58, color: "#00ED64" },
        { id: "js", label: "JavaScript", category: ["frontend"], x: 35, y: 35, color: "#00ED64" },
        
        // Backend Cluster (Orange Glow)
        { id: "node", label: "Node.js", category: ["backend"], x: 68, y: 35, color: "#EE9B00" },
        { id: "express", label: "Express", category: ["backend", "frameworks"], x: 82, y: 45, color: "#EE9B00" },
        { id: "mongodb", label: "MongoDB", category: ["backend"], x: 75, y: 65, color: "#EE9B00" },
        
        // Tools & DevOps Cluster (Blue/Gray Glow)
        { id: "git", label: "Git", category: ["tools"], x: 25, y: 80, color: "#38BDF8" },
        { id: "github", label: "GitHub", category: ["tools"], x: 42, y: 80, color: "#38BDF8" },
        { id: "vercel", label: "Vercel", category: ["tools"], x: 58, y: 78, color: "#38BDF8" }
    ];

    const links = [
        // Frontend connections
        { from: "html", to: "css" },
        { from: "html", to: "js" },
        { from: "css", to: "tailwind" },
        { from: "css", to: "js" },
        { from: "js", to: "react" },
        { from: "tailwind", to: "react" },
        
        // Backend connections
        { from: "react", to: "node" },
        { from: "node", to: "express" },
        { from: "node", to: "mongodb" },
        { from: "express", to: "mongodb" },
        
        // Tools & Cross connections
        { from: "git", to: "github" },
        { from: "github", to: "vercel" },
        { from: "react", to: "vercel" },
        { from: "js", to: "github" },
        { from: "tailwind", to: "vercel" }
    ];

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight || 600
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        const timer = setTimeout(updateDimensions, 100);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(timer);
        };
    }, []);

    const categories = [
        { id: 'all', label: 'All Skills', icon: 'fa-solid fa-layer-group' },
        { id: 'frontend', label: 'Frontend', icon: 'fa-solid fa-laptop-code' },
        { id: 'backend', label: 'Backend', icon: 'fa-solid fa-server' },
        { id: 'frameworks', label: 'Frameworks', icon: 'fa-solid fa-cubes' },
        { id: 'tools', label: 'Tools', icon: 'fa-solid fa-screwdriver-wrench' }
    ];

    // Helper to get connected node IDs for hover highlights
    const getConnectedNodeIds = (nodeId) => {
        const connected = new Set([nodeId]);
        links.forEach(link => {
            if (link.from === nodeId) connected.add(link.to);
            if (link.to === nodeId) connected.add(link.from);
        });
        return connected;
    };

    const isNodeActive = (node) => {
        if (activeCategory !== 'all') {
            return node.category.includes(activeCategory);
        }
        if (hoveredNode) {
            const connectedIds = getConnectedNodeIds(hoveredNode);
            return connectedIds.has(node.id);
        }
        return true;
    };

    const isLinkActive = (link) => {
        const fromNode = nodes.find(n => n.id === link.from);
        const toNode = nodes.find(n => n.id === link.to);
        if (!fromNode || !toNode) return false;
        
        if (activeCategory !== 'all') {
            return fromNode.category.includes(activeCategory) && toNode.category.includes(activeCategory);
        }
        
        if (hoveredNode) {
            return link.from === hoveredNode || link.to === hoveredNode;
        }
        
        return true;
    };

    const getNodePos = (node) => {
        const xPx = (node.x / 100) * dimensions.width;
        const yPx = (node.y / 100) * dimensions.height;
        return { x: xPx, y: yPx };
    };

    const getNodeSize = (node) => {
        if (!node) return 100;
        if (node.isCenter) return 140; // React center node highlighted and larger
        const length = node.label.length;
        if (length > 10) return 130; // e.g., Tailwind CSS
        if (length >= 7) return 115;  // e.g., JavaScript, Next.js, Express, Node.js, MongoDB
        return 100;                  // e.g., HTML, CSS, Git, GitHub, Vercel
    };

    return (
        <section id="skills" className="skills-visualizer-section">
            <div className="section-header scroll-animate">
                <span className="section-label">Interactive Node Map</span>
                <h2 className="section-title">Technical Skills</h2>
            </div>

            {/* Category Tabs Menu */}
            <div className="visualizer-tabs scroll-animate" style={{ transitionDelay: '0.15s' }}>
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        className={`vis-tab ${cat.id} ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        <i className={cat.icon}></i>
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Graph Network Canvas Scrollable Wrapper */}
            <div className="graph-wrapper scroll-animate" style={{ transitionDelay: '0.3s' }}>
                <div className="graph-container" ref={containerRef}>
                    {/* SVG Connections Layer */}
                    <svg className="graph-svg">
                        {links.map((link, idx) => {
                            const fromNode = nodes.find(n => n.id === link.from);
                            const toNode = nodes.find(n => n.id === link.to);
                            if (!fromNode || !toNode) return null;

                            const fromPos = getNodePos(fromNode);
                            const toPos = getNodePos(toNode);
                            const active = isLinkActive(link);

                            // Calculate smooth curve path
                            const dx = toPos.x - fromPos.x;
                            const dy = toPos.y - fromPos.y;
                            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                            const mx = (fromPos.x + toPos.x) / 2;
                            const my = (fromPos.y + toPos.y) / 2;
                            const nx = -dy / dist;
                            const ny = dx / dist;
                            const offset = Math.min(30, dist * 0.18);
                            const cx = mx + nx * offset;
                            const cy = my + ny * offset;
                            const pathData = `M ${fromPos.x} ${fromPos.y} Q ${cx} ${cy} ${toPos.x} ${toPos.y}`;

                            return (
                                <path 
                                    key={idx}
                                    d={pathData}
                                    fill="none"
                                    className={`graph-line ${active ? 'active' : 'faded'}`}
                                    style={{
                                        stroke: active 
                                            ? (fromNode.category.includes('frontend') && toNode.category.includes('frontend') 
                                                ? 'rgba(0, 237, 100, 0.55)' 
                                                : fromNode.category.includes('backend') && toNode.category.includes('backend')
                                                ? 'rgba(238, 155, 0, 0.55)'
                                                : 'rgba(56, 189, 248, 0.55)') 
                                            : 'rgba(255, 255, 255, 0.05)',
                                        strokeWidth: active ? 1.8 : 1
                                    }}
                                />
                            );
                        })}
                    </svg>

                    {/* Nodes Layer */}
                    {nodes.map(node => {
                        const pos = getNodePos(node);
                        const size = getNodeSize(node);
                        const active = isNodeActive(node);
                        const isHovered = hoveredNode === node.id;

                        return (
                            <div 
                                key={node.id}
                                className={`graph-node ${active ? 'active' : 'faded'} ${isHovered ? 'hovered' : ''} ${node.isCenter ? 'center-node' : ''}`}
                                style={{
                                    left: `${pos.x}px`,
                                    top: `${pos.y}px`,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    backgroundColor: node.color,
                                    boxShadow: active 
                                        ? `0 0 25px ${node.color}60` 
                                        : 'none',
                                    '--node-color': node.color,
                                    animationDelay: `${(node.x + node.y) * 0.01}s`
                                }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                <span className="node-label">{node.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default SkillsVisualizer;
