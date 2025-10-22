class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background: linear-gradient(135deg, #6B46C1 0%, #4C1D95 100%);
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                .logo {
                    color: white;
                    font-weight: bold;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                }
                .logo img {
                    height: 2rem;
                    margin-left: 0.5rem;
                }
                ul {
                    display: flex;
                    gap: 1.5rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    align-items: center;
                }
                a {
                    color: white;
                    text-decoration: none;
                    transition: opacity 0.2s;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                }
                a:hover {
                    opacity: 0.8;
                }
                a i {
                    margin-left: 0.3rem;
                }
                .mobile-menu {
                    display: none;
                }
                @media (max-width: 768px) {
                    ul:not(.mobile-menu) {
                        display: none;
                    }
                    .mobile-menu {
                        display: block;
                    }
                }
            </style>
            <nav>
                <a href="/" class="logo">
                    <img src="/logo.png" alt="MangaQ Logo">
                    MangaQ
                </a>
                <ul class="hidden md:flex">
                    <li><a href="/"><i data-feather="home"></i> الرئيسية</a></li>
                    <li><a href="/library.html"><i data-feather="book"></i> المكتبة</a></li>
                    <li><a href="/categories.html"><i data-feather="grid"></i> التصنيفات</a></li>
                    <li><a href="/about.html"><i data-feather="info"></i> عن الموقع</a></li>
                    <li><a href="#" id="adminLink"><i data-feather="lock"></i> لوحة التحكم</a></li>
                </ul>
                <ul class="flex items-center gap-4">
                    <li><custom-dark-toggle></custom-dark-toggle></li>
                    <li class="mobile-menu md:hidden">
                        <button id="mobileMenuButton">
                            <i data-feather="menu"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        `;

        this.shadowRoot.getElementById('adminLink').addEventListener('click', (e) => {
            e.preventDefault();
            adminLogin();
        });

        this.shadowRoot.getElementById('mobileMenuButton').addEventListener('click', () => {
            // Mobile menu functionality would be implemented here
            alert('Mobile menu will open');
        });
    }
}
customElements.define('custom-navbar', CustomNavbar);
