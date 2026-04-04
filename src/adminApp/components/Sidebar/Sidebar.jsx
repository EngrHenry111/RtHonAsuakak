import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin</h2>

      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/leadership">Leadership</Link>
      <Link to="/admin/achievements">Achievements</Link>
      <Link to="/admin/education">Education</Link>
      <Link to="/admin/skills">Skills</Link>
      <Link to="/admin/gallery">Gallery</Link>
      <Link to="/admin/news">News</Link>
      <Link to="/admin/profile">Profile</Link>
    </div>
  );
};

export default Sidebar;