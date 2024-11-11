class Layout extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
    .container {
      display: grid;
      padding: 0.5rem;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 0px 0px;
      grid-auto-flow: row;
      min-height: 85vh;
      grid-template-areas:
        "table forms forms forms"
        "table forms forms forms"
        "table forms forms forms";
    }

    #table {
      display: grid;
      grid-template-columns: 3fr;
      grid-template-rows: 45px 1fr 35px;
      gap: 0px 0px;
      grid-auto-flow: row;
      grid-template-areas:
        "."
        "."
        "."
        "."
        ".";
      grid-area: table;
    }

    #forms {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 45px 1fr 1fr;
      gap: 0px 0px;
      grid-auto-flow: row;
      grid-template-areas:
        "header header header header"
        "inputs inputs inputs inputs"
        "inputs inputs inputs inputs";
      grid-area: forms;

    }
    </style>

    <div class="container">
      <table-component id="table"></table-component>
      <forms-component id="forms"></forms-component>
    </div>
    `
  }
}

customElements.define('layout-component', Layout)
