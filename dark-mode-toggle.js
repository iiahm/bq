class CustomDarkToggle extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .toggle-container {
                    display: flex;
                    align-items: center;
                }
                .toggle-button {
                    background: transparent;
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    transition: background 0.2s;
                }
                .toggle-button:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            </style>
            <div class="toggle-container">
                <button class="toggle-button" id="darkModeToggle">
                    <i data-feather="moon"></i>
                </button>
            </div>
        `;

        const toggle = this.shadowRoot.getElementById('darkModeToggle');
        
        // Check for saved user preference or use system preference
        if (localStorage.getItem('darkMode') === 'true' || 
            (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            toggle.innerHTML = '<i data-feather="sun"></i>';
        } else {
            document.documentElement.classList.remove('dark');
            toggle.innerHTML = '<i data-feather="moon"></i>';
        }

        feather.replace();

        toggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
            
            if (document.documentElement.classList.contains('dark')) {
                toggle.innerHTML = '<i data-feather="sun"></i>';
            } else {
                toggle.innerHTML = '<i data-feather="moon"></i>';
            }
            feather.replace();
        });
    }
}
customElements.define('custom-dark-toggle', CustomDarkToggle);
