function transformTitle(text) {
    return text.toLowerCase().replace(/\s+/g, '-');
}

class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}); //use shadow DOM
    }

    async connectedCallback() {
        const title = this.getAttribute('title') ||  ('Default Game');
        const filename = transformTitle(title);
        const targetUrl = `/html/${filename}.html`;

        const cssText = await fetch('/css/game-card.css').then(res => res.text());
        const styleEl = document.createElement('style');
        styleEl.textContent = cssText;

        this.shadowRoot.innerHTML = `
            <button class='card'>
                <img src="/assets/card-${filename}.png" alt="${title}">
            </button>
        `;
        this.shadowRoot.prepend(styleEl);

        // navigate to the game page if clicked
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            window.location.href = targetUrl;
        })
    }
}

customElements.define('game-card', Card)