class CustomAdminNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .logo {
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        a, .nav-btn {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
        }
        a:hover, .nav-btn:hover {
          opacity: 0.8;
        }
        .user-dropdown {
          position: relative;
        }
        .dropdown-menu {
          position: absolute;
          left: 0;
          top: 100%;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          z-index: 10;
          display: none;
        }
        .dropdown-menu a {
          color: #374151;
          padding: 0.5rem 1rem;
          display: block;
        }
        .dropdown-menu a:hover {
          background: #F3F4F6;
        }
        .user-dropdown:hover .dropdown-menu {
          display: block;
        }
      </style>
      <nav>
        <a href="/admin.html" class="logo">
          <i data-feather="book-open"></i>
          <span>MangaQ Admin</span>
        </a>
        <ul class="nav-links">
          <li><a href="/admin.html"><i data-feather="home"></i> الرئيسية</a></li>
          <li class="user-dropdown">
            <div class="nav-btn">
              <i data-feather="user"></i>
              <span>المشرف</span>
              <i data-feather="chevron-down"></i>
            </div>
            <div class="dropdown-menu">
              <a href="#"><i data-feather="user"></i> الملف الشخصي</a>
              <a href="#"><i data-feather="settings"></i> الإعدادات</a>
              <a href="/"><i data-feather="log-out"></i> تسجيل الخروج</a>
            </div>
          </li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-admin-navbar', CustomAdminNavbar);
