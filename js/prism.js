/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+c+cpp+julia+latex+python */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = function(u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W ? new W(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
          },
          type: function(e) {
            return Object.prototype.toString.call(e).slice(8, -1)
          },
          objId: function(e) {
            return e.__id || Object.defineProperty(e, "__id", {
              value: ++n
            }), e.__id
          },
          clone: function r(e, t) {
            var a, n;
            switch (t = t || {}, M.util.type(e)) {
              case "Object":
                if (n = M.util.objId(e), t[n]) return t[n];
                for (var i in a = {}, t[n] = a, e) e.hasOwnProperty(i) && (a[i] = r(e[i], t));
                return a;
              case "Array":
                return n = M.util.objId(e), t[n] ? t[n] : (a = [], t[n] = a, e.forEach(function(e, n) {
                  a[n] = r(e, t)
                }), a);
              default:
                return e
            }
          },
          getLanguage: function(e) {
            for (; e && !c.test(e.className);) e = e.parentElement;
            return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none"
          },
          currentScript: function() {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var r = document.getElementsByTagName("script");
                for (var t in r)
                  if (r[t].src == n) return r[t]
              }
              return null
            }
          },
          isActive: function(e, n, r) {
            for (var t = "no-" + n; e;) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(t)) return !1;
              e = e.parentElement
            }
            return !!r
          }
        },
        languages: {
          extend: function(e, n) {
            var r = M.util.clone(M.languages[e]);
            for (var t in n) r[t] = n[t];
            return r
          },
          insertBefore: function(r, e, n, t) {
            var a = (t = t || M.languages)[r],
              i = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e)
                  for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = a[l])
              } var s = t[r];
            return t[r] = i, M.languages.DFS(M.languages, function(e, n) {
              n === s && e != r && (this[e] = i)
            }), i
          },
          DFS: function e(n, r, t, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                r.call(n, l, n[l], t || l);
                var o = n[l],
                  s = M.util.type(o);
                "Object" !== s || a[i(o)] ? "Array" !== s || a[i(o)] || (a[i(o)] = !0, e(o, r, l, a)) : (a[i(o)] = !0, e(o, r, null, a))
              }
          }
        },
        plugins: {},
        highlightAll: function(e, n) {
          M.highlightAllUnder(document, e, n)
        },
        highlightAllUnder: function(e, n, r) {
          var t = {
            callback: r,
            container: e,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          M.hooks.run("before-highlightall", t), t.elements = Array.prototype.slice.apply(t.container.querySelectorAll(t.selector)), M.hooks.run("before-all-elements-highlight", t);
          for (var a, i = 0; a = t.elements[i++];) M.highlightElement(a, !0 === n, t.callback)
        },
        highlightElement: function(e, n, r) {
          var t = M.util.getLanguage(e),
            a = M.languages[t];
          e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + t;
          var i = e.parentElement;
          i && "pre" === i.nodeName.toLowerCase() && (i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + t);
          var l = {
            element: e,
            language: t,
            grammar: a,
            code: e.textContent
          };

          function o(e) {
            l.highlightedCode = e, M.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, M.hooks.run("after-highlight", l), M.hooks.run("complete", l), r && r.call(l.element)
          }
          if (M.hooks.run("before-sanity-check", l), !l.code) return M.hooks.run("complete", l), void(r && r.call(l.element));
          if (M.hooks.run("before-highlight", l), l.grammar)
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              s.onmessage = function(e) {
                o(e.data)
              }, s.postMessage(JSON.stringify({
                language: l.language,
                code: l.code,
                immediateClose: !0
              }))
            } else o(M.highlight(l.code, l.grammar, l.language));
          else o(M.util.encode(l.code))
        },
        highlight: function(e, n, r) {
          var t = {
            code: e,
            grammar: n,
            language: r
          };
          return M.hooks.run("before-tokenize", t), t.tokens = M.tokenize(t.code, t.grammar), M.hooks.run("after-tokenize", t), W.stringify(M.util.encode(t.tokens), t.language)
        },
        tokenize: function(e, n) {
          var r = n.rest;
          if (r) {
            for (var t in r) n[t] = r[t];
            delete n.rest
          }
          var a = new i;
          return I(a, a.head, e),
            function e(n, r, t, a, i, l) {
              for (var o in t)
                if (t.hasOwnProperty(o) && t[o]) {
                  var s = t[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + "," + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias;
                    if (h && !c.pattern.global) {
                      var v = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, v + "g")
                    }
                    for (var p = c.pattern || c, m = a.next, y = i; m !== r.tail && !(l && y >= l.reach); y += m.value.length, m = m.next) {
                      var k = m.value;
                      if (r.length > n.length) return;
                      if (!(k instanceof W)) {
                        var b, x = 1;
                        if (h) {
                          if (!(b = z(p, y, n, f))) break;
                          var w = b.index,
                            A = b.index + b[0].length,
                            P = y;
                          for (P += m.value.length; P <= w;) m = m.next, P += m.value.length;
                          if (P -= m.value.length, y = P, m.value instanceof W) continue;
                          for (var S = m; S !== r.tail && (P < A || "string" == typeof S.value); S = S.next) x++, P += S.value.length;
                          x--, k = n.slice(y, P), b.index -= y
                        } else if (!(b = z(p, 0, k, f))) continue;
                        var w = b.index,
                          E = b[0],
                          O = k.slice(0, w),
                          L = k.slice(w + E.length),
                          N = y + k.length;
                        l && N > l.reach && (l.reach = N);
                        var j = m.prev;
                        O && (j = I(r, j, O), y += O.length), q(r, j, x);
                        var C = new W(o, g ? M.tokenize(E, g) : E, d, E);
                        if (m = I(r, j, C), L && I(r, m, L), 1 < x) {
                          var _ = {
                            cause: o + "," + u,
                            reach: N
                          };
                          e(n, r, t, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach)
                        }
                      }
                    }
                  }
                }
            }(e, a, n, a.head, 0),
            function(e) {
              var n = [],
                r = e.head.next;
              for (; r !== e.tail;) n.push(r.value), r = r.next;
              return n
            }(a)
        },
        hooks: {
          all: {},
          add: function(e, n) {
            var r = M.hooks.all;
            r[e] = r[e] || [], r[e].push(n)
          },
          run: function(e, n) {
            var r = M.hooks.all[e];
            if (r && r.length)
              for (var t, a = 0; t = r[a++];) t(n)
          }
        },
        Token: W
      };

    function W(e, n, r, t) {
      this.type = e, this.content = n, this.alias = r, this.length = 0 | (t || "").length
    }

    function z(e, n, r, t) {
      e.lastIndex = n;
      var a = e.exec(r);
      if (a && t && a[1]) {
        var i = a[1].length;
        a.index += i, a[0] = a[0].slice(i)
      }
      return a
    }

    function i() {
      var e = {
          value: null,
          prev: null,
          next: null
        },
        n = {
          value: null,
          prev: e,
          next: null
        };
      e.next = n, this.head = e, this.tail = n, this.length = 0
    }

    function I(e, n, r) {
      var t = n.next,
        a = {
          value: r,
          prev: n,
          next: t
        };
      return n.next = a, t.prev = a, e.length++, a
    }

    function q(e, n, r) {
      for (var t = n.next, a = 0; a < r && t !== e.tail; a++) t = t.next;
      (n.next = t).prev = n, e.length -= a
    }
    if (u.Prism = M, W.stringify = function n(e, r) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var t = "";
          return e.forEach(function(e) {
            t += n(e, r)
          }), t
        }
        var a = {
            type: e.type,
            content: n(e.content, r),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: r
          },
          i = e.alias;
        i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run("wrap", a);
        var l = "";
        for (var o in a.attributes) l += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
        return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + l + ">" + a.content + "</" + a.tag + ">"
      }, !u.document) return u.addEventListener && (M.disableWorkerMessageHandler || u.addEventListener("message", function(e) {
      var n = JSON.parse(e.data),
        r = n.language,
        t = n.code,
        a = n.immediateClose;
      u.postMessage(M.highlight(t, M.languages[r], r)), a && u.close()
    }, !1)), M;
    var e = M.util.currentScript();

    function r() {
      M.manual || M.highlightAll()
    }
    if (e && (M.filename = e.src, e.hasAttribute("data-manual") && (M.manual = !0)), !M.manual) {
      var t = document.readyState;
      "loading" === t || "interactive" === t && e && e.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16)
    }
    return M
  }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null
      },
      string: {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: !0
      },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      name: /[^\s<>'"]+/
    }
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{
            pattern: /^=/,
            alias: "attr-equals"
          }, /"|'/]
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: [{
    pattern: /&[\da-z]{1,8};/i,
    alias: "named-entity"
  }, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function(a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  value: function(a, e) {
    var s = {};
    s["language-" + e] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: !0,
      inside: Prism.languages[e]
    }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
    var n = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: s
      }
    };
    n["language-" + e] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[e]
    };
    var t = {};
    t[a] = {
      pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() {
        return a
      }), "i"),
      lookbehind: !0,
      greedy: !0,
      inside: n
    }, Prism.languages.insertBefore("markup", "cdata", t)
  }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
! function(s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector"
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0
        }
      }
    },
    url: {
      pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: {
          pattern: RegExp("^" + e.source + "$"),
          alias: "url"
        }
      }
    },
    selector: RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"),
    string: {
      pattern: e,
      greedy: !0
    },
    property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/
  }, s.languages.css.atrule.inside.rest = s.languages.css;
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), s.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
      pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
      lookbehind: !0,
      inside: {
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            style: {
              pattern: /(["'])[\s\S]+(?=["']$)/,
              lookbehind: !0,
              alias: "language-css",
              inside: s.languages.css
            },
            punctuation: [{
              pattern: /^=/,
              alias: "attr-equals"
            }, /"|'/]
          }
        },
        "attr-name": /^style/i
      }
    }
  }, t.tag))
}(Prism);
Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0,
    greedy: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "class-name": {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.c = Prism.languages.extend("clike", {
  comment: {
    pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  "class-name": {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0
  },
  keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  function: /[a-z_]\w*(?=\s*\()/i,
  number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
}), Prism.languages.insertBefore("c", "string", {
  macro: {
    pattern: /(^\s*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: !0,
    greedy: !0,
    alias: "property",
    inside: {
      string: [{
        pattern: /^(#\s*include\s*)<[^>]+>/,
        lookbehind: !0
      }, Prism.languages.c.string],
      comment: Prism.languages.c.comment,
      "macro-name": [{
        pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
        lookbehind: !0
      }, {
        pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
        lookbehind: !0,
        alias: "function"
      }],
      directive: {
        pattern: /^(#\s*)[a-z]+/,
        lookbehind: !0,
        alias: "keyword"
      },
      "directive-hash": /^#/,
      punctuation: /##|\\(?=[\r\n])/,
      expression: {
        pattern: /\S[\s\S]*/,
        inside: Prism.languages.c
      }
    }
  },
  constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
}), delete Prism.languages.c.boolean;
! function(e) {
  var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
  e.languages.cpp = e.languages.extend("c", {
    "class-name": [{
      pattern: RegExp("(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(/<keyword>/g, function() {
        return t.source
      })),
      lookbehind: !0
    }, /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],
    keyword: t,
    number: {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0
    },
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:true|false)\b/
  }), e.languages.insertBefore("cpp", "string", {
    "raw-string": {
      pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
      alias: "string",
      greedy: !0
    }
  }), e.languages.insertBefore("cpp", "class-name", {
    "base-clause": {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
      lookbehind: !0,
      greedy: !0,
      inside: e.languages.extend("cpp", {})
    }
  }), e.languages.insertBefore("inside", "operator", {
    "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
  }, e.languages.cpp["base-clause"])
}(Prism);
Prism.languages.julia = {
  comment: {
    pattern: /(^|[^\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/,
    lookbehind: !0
  },
  regex: {
    pattern: /r"(?:\\.|[^"\\\r\n])*"[imsx]{0,4}/,
    greedy: !0
  },
  string: {
    pattern: /"""[\s\S]+?"""|\w*"(?:\\.|[^"\\\r\n])*"|(^|[^\w'])'(?:\\[^\r\n][^'\r\n]*|[^\\\r\n])'|`(?:[^\\`\r\n]|\\.)*`/,
    lookbehind: !0,
    greedy: !0
  },
  keyword: /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,
  boolean: /\b(?:true|false)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+(?:_[\da-f]+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[efp][+-]?\d+(?:_\d+)*)?j?/i,
  operator: /&&|\|\||[-+*^%?????&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:|])?|>(?:=|>>?=?)?|==?=?|[~?????????'??????]/,
  punctuation: /::?|[{}[\]();,.?]/,
  constant: /\b(?:(?:NaN|Inf)(?:16|32|64)?|im|pi)\b|[?????]/
};
! function(a) {
  var e = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
    n = {
      "equation-command": {
        pattern: e,
        alias: "regex"
      }
    };
  a.languages.latex = {
    comment: /%.*/m,
    cdata: {
      pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
      lookbehind: !0
    },
    equation: [{
      pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
      inside: n,
      alias: "string"
    }, {
      pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
      lookbehind: !0,
      inside: n,
      alias: "string"
    }],
    keyword: {
      pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: !0
    },
    url: {
      pattern: /(\\url\{)[^}]+(?=\})/,
      lookbehind: !0
    },
    headline: {
      pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
      lookbehind: !0,
      alias: "class-name"
    },
    function: {
      pattern: e,
      alias: "selector"
    },
    punctuation: /[[\]{}&]/
  }, a.languages.tex = a.languages.latex, a.languages.context = a.languages.latex
}(Prism);
Prism.languages.python = {
  comment: {
    pattern: /(^|[^\\])#.*/,
    lookbehind: !0
  },
  "string-interpolation": {
    pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: !0,
        inside: {
          "format-spec": {
            pattern: /(:)[^:(){}]+(?=}$)/,
            lookbehind: !0
          },
          "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation"
          },
          rest: null
        }
      },
      string: /[\s\S]+/
    }
  },
  "triple-quoted-string": {
    pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: "string"
  },
  string: {
    pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0
  },
  "class-name": {
    pattern: /(\bclass\s+)\w+/i,
    lookbehind: !0
  },
  decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im,
    lookbehind: !0,
    alias: ["annotation", "punctuation"],
    inside: {
      punctuation: /\./
    }
  },
  keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/
}, Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python, Prism.languages.py = Prism.languages.python;
