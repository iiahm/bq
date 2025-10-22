class CustomAdminSidebar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        aside {
          background: #1F2937;
          color: white;
          width: 250px;
          height: 100vh;
          position: sticky;
          top: 0;
          padding: 1.5rem 0;
        }
        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .menu-item {
          margin-bottom: 0.25rem;
        }
        .menu-item a {
          color: #E5E7EB;
          text-decoration: none;
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          transition: all 0.3s;
          gap: 0.75rem;
        }
        .menu-item a:hover, .menu-item a.active {
          background: #374151;
          color: white;
        }
        .menu-item a.active {
          border-right: 4px solid #3B82F6;
        }
        .menu-item i {
          width: 20px;
          height: 20px;
        }
        .menu-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: #9CA3AF;
          padding: 0.5rem 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .submenu {
          list-style: none;
          padding: 0;
          margin: 0;
          padding-right: 1rem;
        }
        .submenu-item a {
          padding: 0.5rem 1.5rem 0.5rem 2.5rem;
          font-size: 0.875rem;
        }
        .sidebar-logo {
          font-size: 1.25rem;
          font-weight: bold;
          padding: 0 1.5rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      </style>
      <aside>
        <div class="sidebar-logo">
          <i data-feather="book-open"></i>
          <span>MangaQ</span>
        </div>
        <ul class="sidebar-menu">
          <li class="menu-title">الرئيسية</li>
          <li class="menu-item">
            <a href="/admin.html" class="active">
              <i data-feather="home"></i>
              <span>لوحة التحكم</span>
            </a>
          </li>
          
          <li class="menu-title">المحتوى</li>
          <li class="menu-item">
            <a href="#">
              <i data-feather="book"></i>
              <span>إدارة المانجا</span>
            </a>
          </li>
          <li class="menu-item">
            <a href="#">
              <i data-feather="file-text"></i>
              <span>إدارة الفصول</span>
            </a>
          </li>
          <li class="menu-item">
            <a href="#">
              <i data-feather="tag"></i>
              <span>التصنيفات</span>
            </a>
          </li>
          
          <li class="menu-title">المستخدمون</li>
          <li class="menu-item">
            <a href="#">
              <i data-feather="users"></i>
              <span>إدارة المستخدمين</span>
            </a>
          </li>
          <li class="menu-item">
            <a href="#">
              <i data-feather="message-square"></i>
              <span>التعليقات</span>
            </a>
          </li>
          
          <li class="menu-title">الإعدادات</li>
          <li class="menu-item">
            <a href="#">
              <i data-feather="settings"></i>
              <span>إعدادات الموقع</span>
            </a>
          </li>
        </ul>
      </aside>
    `;
  }
}
customElements.define('custom-admin-sidebar', CustomAdminSidebar);
