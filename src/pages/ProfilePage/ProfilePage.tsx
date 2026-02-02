import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";

export default function ProfilePage() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-page__content">
        <nav className="profile-page__breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="profile-page__breadcrumb-link">
            Home
          </Link>
          <span className="profile-page__breadcrumb-sep">›</span>
          <span className="profile-page__breadcrumb-current">Profile</span>
        </nav>
        <div className="profile-page__placeholder">
          <h2>Profile</h2>
          <p>Coming soon</p>
        </div>
      </div>
    </div>
  );
}
