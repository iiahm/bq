class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #1F2937;
          color: white;
          padding: 3rem 2rem;
          text-align: center;
          margin-top: 2rem;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: right;
        }
        .footer-section h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: #3B82F6;
          border-bottom: 2px solid #3B82F6;
          padding-bottom: 0.5rem;
          display: inline-block;
        }
        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-section li {
          margin-bottom: 0.5rem;
        }
        .footer-section a {
          color: #E5E7EB;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-section a:hover {
          color: #3B82F6;
        }
        .copyright {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #374151;
          color: #9CA3AF;
        }
        .social-icons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .social-icons a {
          color: white;
          background: #4B5563;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .social-icons a:hover {
          background: #3B82F6;
          transform: translateY(-3px);
        }
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h3>عن الموقع</h3>
            <p>MangaQ منصة عربية متخصصة في عرض المانجا والمانهوا المترجمة بجودة عالية.</p>
          </div>
          <div class="footer-section">
            <h3>روابط سريعة</h3>
            <ul>
              <li><a href="/">الرئيسية</a></li>
              <li><a href="#popular">الأكثر شعبية</a></li>
              <li><a href="#categories">التصنيفات</a></li>
              <li><a href="/admin.html">لوحة التحكم</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>تواصل معنا</h3>
            <p>info@mangaq.com</p>
            <p>+966 123 456 789</p>
            <div class="social-icons">
              <a href="#"><i data-feather="facebook"></i></a>
              <a href="#"><i data-feather="twitter"></i></a>
              <a href="#"><i data-feather="instagram"></i></a>
              <a href="#"><i data-feather="youtube"></i></a>
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>جميع الحقوق محفوظة &copy; 2024 MangaQ</p>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);
