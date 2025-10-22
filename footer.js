class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: #1A202C;
                    color: white;
                    padding: 2rem;
                    text-align: center;
                    margin-top: auto;
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
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: #F59E0B;
                }
                .footer-section ul {
                    list-style: none;
                    padding: 0;
                }
                .footer-section li {
                    margin-bottom: 0.5rem;
                }
                .footer-section a {
                    color: #CBD5E0;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .footer-section a:hover {
                    color: #F59E0B;
                }
                .copyright {
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 1px solid #2D3748;
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
                        <h3>روابط سريعة</h3>
                        <ul>
                            <li><a href="/">الرئيسية</a></li>
                            <li><a href="/library.html">المكتبة</a></li>
                            <li><a href="/categories.html">التصنيفات</a></li>
                            <li><a href="/about.html">عن الموقع</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>التصنيفات</h3>
                        <ul>
                            <li><a href="/category/action">أكشن</a></li>
                            <li><a href="/category/adventure">مغامرات</a></li>
                            <li><a href="/category/comedy">كوميدي</a></li>
                            <li><a href="/category/drama">دراما</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>تواصل معنا</h3>
                        <ul>
                            <li><a href="mailto:contact@mangaq.com">البريد الإلكتروني</a></li>
                            <li><a href="#">تويتر</a></li>
                            <li><a href="#">فيسبوك</a></li>
                            <li><a href="#">إنستغرام</a></li>
                        </ul>
                    </div>
                </div>
                <div class="copyright">
                    <p>&copy; 2023 MangaQ. جميع الحقوق محفوظة.</p>
                </div>
            </footer>
        `;
    }
}
customElements.define('custom-footer', CustomFooter);
