class CustomNavbar extends HTMLElement {
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
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        a:hover {
          opacity: 0.8;
        }
        .search-container {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          transition: all 0.3s;
          width: 300px;
        }
        .search-container:focus-within {
          background: rgba(255, 255, 255, 0.3);
        }
        .search-input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          width: 100%;
        }
        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        .admin-btn {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .admin-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          .nav-links {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }
          .search-container {
            width: 100%;
          }
        }
      </style>
      <nav>
        <a href="/" class="logo">
          <i data-feather="book-open"></i>
          <span>MangaQ</span>
        </a>
        <ul class="nav-links">
          <li><a href="/"><i data-feather="home"></i> الرئيسية</a></li>
          <li><a href="#popular"><i data-feather="trending-up"></i> الأكثر شعبية</a></li>
          <li><a href="#categories"><i data-feather="grid"></i> التصنيفات</a></li>
          <li>
            <div class="search-container">
              <i data-feather="search"></i>
              <input type="text" class="search-input" placeholder="ابحث عن مانجا..." id="search-input">
            </div>
          </li>
          <li>
            <div class="admin-btn" onclick="adminLogin()">
              <i data-feather="lock"></i>
              <span>لوحة التحكم</span>
            </div>
          </li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
