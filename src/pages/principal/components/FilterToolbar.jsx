import { FaSearch, FaFilter, FaSync } from 'react-icons/fa';

export default function FilterToolbar({ filters, setFilters, onApply, onReset }) {
    const semesters = [1, 2, 3, 4, 5, 6];
    const sections = ["A", "B"];
    const academicStatuses = ["Active", "Warning", "Detained"];
    const feeStatuses = ["Paid", "Partial", "Pending"];

    return (
        <div className="filter-toolbar">
            <div className="search-wrapper" style={{ flex: 1, position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                    type="text" 
                    className="search-input" 
                    style={{ paddingLeft: '45px', width: '100%' }}
                    placeholder="Search Register Number or Student Name"
                    value={filters.search || ''}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
            </div>

            <select 
                className="filter-select"
                value={filters.semester || 'All'}
                onChange={(e) => setFilters({...filters, semester: e.target.value})}
            >
                <option value="All">All Semesters</option>
                {semesters.map(s => <option key={s} value={s}>{s} Sem</option>)}
            </select>

            <select 
                className="filter-select"
                value={filters.section || 'All'}
                onChange={(e) => setFilters({...filters, section: e.target.value})}
            >
                <option value="All">All Sections</option>
                {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
            </select>

            <select 
                className="filter-select"
                value={filters.academic_status || 'All'}
                onChange={(e) => setFilters({...filters, academic_status: e.target.value})}
            >
                <option value="All">All Academic Status</option>
                {academicStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select 
                className="filter-select"
                value={filters.fee_status || 'All'}
                onChange={(e) => setFilters({...filters, fee_status: e.target.value})}
            >
                <option value="All">All Fee Status</option>
                {feeStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <button className="btn-filter" onClick={onApply} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaFilter /> Filter
            </button>
            <button className="btn-reset" onClick={onReset} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaSync /> Reset
            </button>
        </div>
    );
}
