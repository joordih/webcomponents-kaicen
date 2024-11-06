class Button extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    this.buttonText = this.getAttribute('text') || 'Click me!'

    this.backgroundColor = this.getAttribute('background') || '#4CAF50'
    this.backgroundHoverColor = this.getAttribute('background-hover') || '#45a049'
    this.textColor = this.getAttribute('text-color') || '#4CAF50'

    this.borderRadius = this.getAttribute('border-radius') || '0.375rem'
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML = 
    /* html */ `
      <style>
        .button {
          display: flex;
          align-items: center;
          cursor: pointer;
          background-color: ${this.backgroundColor};
          padding: 0.5rem;
          width: 100%;
          border-radius: ${this.borderRadius};
          transition: background-color 0.1s ease;
          border: none;

          &:hover {
            background-color: ${this.backgroundHoverColor};
          }

          &:active {
            border: 1px solid ${this.textColor};
          }

          .button-text {
            font-size: 0.875rem;
            color: ${this.textColor};
            font-weight: bold;
            padding-right: 0.25rem;
          }
        }
        
        ::slotted(svg) {
          fill: ${this.textColor};
        }
      </style>
      <button title="${this.buttonText}" class="button">
        <slot></slot>
        <span class="button-text">${this.buttonText}</span>
      </button>
    `
  }
}

customElements.define('button-component', Button)
