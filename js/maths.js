MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    tags: 'ams',
    macros: {
      NN: "\\mathbb{N}",
      ZZ: "\\mathbb{Z}",
      PP: "\\mathbb{P}",
      QQ: "\\mathbb{Q}",
      RR: "\\mathbb{R}",
      CC: "\\mathbb{C}",
      HH: "\\mathbb{H}",
      tr: "\\intercal",
      grad: "\\nabla",
      div: "\\nabla\\cdot",
      curl: "\\nabla\\times",
      abs: ["\\lvert #1 \\rvert", 1],
      norm: ["\\lVert #1 \\rVert", 1],
      inner: ["\\langle #1, #2 \\rangle", 2],
      d: "\\mathrm{d}",
      dv: ["\\frac{\\d #1}{\\d #2}", 2],
      dvn: ["\\frac{\\d^{#3} #1}{\\d^{#3} #2}", 3],
      pdv: ["\\frac{\\partial #1}{\\partial #2}", 2],
      pdvn: ["\\frac{\\partial^{#3} #1}{\\partial #2^{#3}}", 3],
    },
  },
  svg: {
    fontCache: 'global',
  }
};