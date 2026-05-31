import { FaUsers, FaChartBar, FaExclamationTriangle, FaGraduationCap, FaRupeeSign } from 'react-icons/fa';

export default function StudentStatsCards({ stats }) {
    const cards = [
        { label: "TOTAL STUDENTS", value: 20, icon: <FaUsers />, color: "#4f46e5", bg: "#eef2ff" },
        { label: "PASSING STUDENTS", value: 12, icon: <FaGraduationCap />, color: "#10b981", bg: "#ecfdf5" },
        { label: "AVG INTERNAL MARKS", value: "32/40", icon: <FaChartBar />, color: "#8b5cf6", bg: "#f5f3ff" },
        { label: "AVG EXTERNAL MARKS", value: "48/60", icon: <FaChartBar />, color: "#f59e0b", bg: "#fffbeb" },
    ];

    return (
        <div className="stats-grid">
            {cards.map((card, idx) => (
                <div className="stat-card" key={idx}>
                    <div className="s-header">
                        <div className="s-icon" style={{ backgroundColor: card.bg, color: card.color }}>
                            {card.icon}
                        </div>
                        <span className="s-label">{card.label}</span>
                    </div>
                    <div className="s-value">{card.value}</div>
                    <a href="#" className="s-link">View Details &rarr;</a>
                </div>
            ))}
        </div>
    );
}
