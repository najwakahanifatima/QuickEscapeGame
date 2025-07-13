class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/main.css';
        const nav = document.createElement('nav');
        nav.classList.add('nav');
        nav.innerHTML = `
            <a href="/html/main.html">Home</a> 
            <a href="/html/main.html#header">About</a>
            <a href="/html/main.html#games">Games</a>
            <a href="/html/main.html#information">Information</a>
        `;

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(nav);
    }
}

customElements.define('nav-bar', NavBar);