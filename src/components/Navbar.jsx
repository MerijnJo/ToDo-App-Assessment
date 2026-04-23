import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
            {/* Using Link prevents the browser from doing a full page refresh */}
            <Link to="/">TODOs</Link>
            <Link to="/about">About</Link>
        </nav>
    );
}