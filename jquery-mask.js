"use strict";
!(function (t, a, e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "object" == typeof exports
    ? (module.exports = t(require("jquery")))
    : t(a || e);
})(
  function (t) {
    var a = function (a, e, n) {
      var s = {
        invalid: [],
        getCaret: function () {
          try {
            var t,
              e = 0,
              n = a.get(0),
              r = document.selection,
              o = n.selectionStart;
            return (
              r && -1 === navigator.appVersion.indexOf("MSIE 10")
                ? ((t = r.createRange()).moveStart(
                    "character",
                    -s.val().length
                  ),
                  (e = t.text.length))
                : (o || "0" === o) && (e = o),
              e
            );
          } catch (t) {}
        },
        setCaret: function (t) {
          try {
            if (a.is(":focus")) {
              var e,
                n = a.get(0);
              n.setSelectionRange
                ? n.setSelectionRange(t, t)
                : ((e = n.createTextRange()).collapse(!0),
                  e.moveEnd("character", t),
                  e.moveStart("character", t),
                  e.select());
            }
          } catch (t) {}
        },
        events: function () {
          a.on("keydown.mask", function (t) {
            a.data("mask-keycode", t.keyCode || t.which),
              a.data("mask-previus-value", a.val());
          })
            .on(
              t.jMaskGlobals.useInput ? "input.mask" : "keyup.mask",
              s.behaviour
            )
            .on("paste.mask drop.mask", function () {
              setTimeout(function () {
                a.keydown().keyup();
              }, 100);
            })
            .on("change.mask", function () {
              a.data("changed", !0);
            })
            .on("blur.mask", function () {
              i === s.val() || a.data("changed") || a.trigger("change"),
                a.data("changed", !1);
            })
            .on("blur.mask", function () {
              i = s.val();
            })
            .on("focus.mask", function (a) {
              !0 === n.selectOnFocus && t(a.target).select();
            })
            .on("focusout.mask", function () {
              n.clearIfNotMatch && !r.test(s.val()) && s.val("");
            });
        },
        getRegexMask: function () {
          for (var t, a, n, s, r, i, c = [], l = 0; l < e.length; l++)
            (t = o.translation[e.charAt(l)])
              ? ((a = t.pattern.toString().replace(/.{1}$|^.{1}/g, "")),
                (n = t.optional),
                (s = t.recursive)
                  ? (c.push(e.charAt(l)),
                    (r = { digit: e.charAt(l), pattern: a }))
                  : c.push(n || s ? a + "?" : a))
              : c.push(e.charAt(l).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
          return (
            (i = c.join("")),
            r &&
              (i = i
                .replace(
                  new RegExp("(" + r.digit + "(.*" + r.digit + ")?)"),
                  "($1)?"
                )
                .replace(new RegExp(r.digit, "g"), r.pattern)),
            new RegExp(i)
          );
        },
        destroyEvents: function () {
          a.off(
            [
              "input",
              "keydown",
              "keyup",
              "paste",
              "drop",
              "blur",
              "focusout",
              "",
            ].join(".mask ")
          );
        },
        val: function (t) {
          var e,
            n = a.is("input") ? "val" : "text";
          return (
            arguments.length > 0
              ? (a[n]() !== t && a[n](t), (e = a))
              : (e = a[n]()),
            e
          );
        },
        calculateCaretPosition: function (t, e) {
          var n = e.length,
            s = a.data("mask-previus-value") || "",
            r = s.length;
          return (
            8 === a.data("mask-keycode") && s !== e
              ? (t -= e.slice(0, t).length - s.slice(0, t).length)
              : s !== e &&
                (t >= r
                  ? (t = n)
                  : (t += e.slice(0, t).length - s.slice(0, t).length)),
            t
          );
        },
        behaviour: function (e) {
          (e = e || window.event), (s.invalid = []);
          var n = a.data("mask-keycode");
          if (-1 === t.inArray(n, o.byPassKeys)) {
            var r = s.getMasked(),
              i = s.getCaret();
            return (
              setTimeout(
                function (t, a) {
                  s.setCaret(s.calculateCaretPosition(t, a));
                },
                10,
                i,
                r
              ),
              s.val(r),
              s.setCaret(i),
              s.callbacks(e)
            );
          }
        },
        getMasked: function (t, a) {
          var r,
            i,
            c,
            l = [],
            u = void 0 === a ? s.val() : a + "",
            h = 0,
            f = e.length,
            d = 0,
            v = u.length,
            k = 1,
            p = "push",
            g = -1;
          for (
            n.reverse
              ? ((p = "unshift"),
                (k = -1),
                (r = 0),
                (h = f - 1),
                (d = v - 1),
                (i = function () {
                  return h > -1 && d > -1;
                }))
              : ((r = f - 1),
                (i = function () {
                  return h < f && d < v;
                }));
            i();

          ) {
            var m = e.charAt(h),
              y = u.charAt(d),
              M = o.translation[m];
            M
              ? (y.match(M.pattern)
                  ? (l[p](y),
                    M.recursive &&
                      (-1 === g ? (g = h) : h === r && (h = g - k),
                      r === g && (h -= k)),
                    (h += k))
                  : y === c
                  ? (c = void 0)
                  : M.optional
                  ? ((h += k), (d -= k))
                  : M.fallback
                  ? (l[p](M.fallback), (h += k), (d -= k))
                  : s.invalid.push({ p: d, v: y, e: M.pattern }),
                (d += k))
              : (t || l[p](m), y === m ? (d += k) : (c = m), (h += k));
          }
          var b = e.charAt(r);
          return f !== v + 1 || o.translation[b] || l.push(b), l.join("");
        },
        callbacks: function (t) {
          var r = s.val(),
            o = r !== i,
            c = [r, t, a, n],
            l = function (t, a, e) {
              "function" == typeof n[t] && a && n[t].apply(this, e);
            };
          l("onChange", !0 === o, c),
            l("onKeyPress", !0 === o, c),
            l("onComplete", r.length === e.length, c),
            l("onInvalid", s.invalid.length > 0, [r, t, a, s.invalid, n]);
        },
      };
      a = t(a);
      var r,
        o = this,
        i = s.val();
      (e = "function" == typeof e ? e(s.val(), void 0, a, n) : e),
        (o.mask = e),
        (o.options = n),
        (o.remove = function () {
          var t = s.getCaret();
          return s.destroyEvents(), s.val(o.getCleanVal()), s.setCaret(t), a;
        }),
        (o.getCleanVal = function () {
          return s.getMasked(!0);
        }),
        (o.getMaskedVal = function (t) {
          return s.getMasked(!1, t);
        }),
        (o.init = function (i) {
          if (
            ((i = i || !1),
            (n = n || {}),
            (o.clearIfNotMatch = t.jMaskGlobals.clearIfNotMatch),
            (o.byPassKeys = t.jMaskGlobals.byPassKeys),
            (o.translation = t.extend(
              {},
              t.jMaskGlobals.translation,
              n.translation
            )),
            (o = t.extend(!0, {}, o, n)),
            (r = s.getRegexMask()),
            i)
          )
            s.events(), s.val(s.getMasked());
          else {
            n.placeholder && a.attr("placeholder", n.placeholder),
              a.data("mask") && a.attr("autocomplete", "off");
            for (var c = 0, l = !0; c < e.length; c++) {
              var u = o.translation[e.charAt(c)];
              if (u && u.recursive) {
                l = !1;
                break;
              }
            }
            l && a.attr("maxlength", e.length), s.destroyEvents(), s.events();
            var h = s.getCaret();
            s.val(s.getMasked()), s.setCaret(h);
          }
        }),
        o.init(!a.is("input"));
    };
    t.maskWatchers = {};
    var e = function () {
        var e = t(this),
          s = {},
          r = e.attr("data-mask");
        if (
          (e.attr("data-mask-reverse") && (s.reverse = !0),
          e.attr("data-mask-clearifnotmatch") && (s.clearIfNotMatch = !0),
          "true" === e.attr("data-mask-selectonfocus") &&
            (s.selectOnFocus = !0),
          n(e, r, s))
        )
          return e.data("mask", new a(this, r, s));
      },
      n = function (a, e, n) {
        n = n || {};
        var s = t(a).data("mask"),
          r = JSON.stringify,
          o = t(a).val() || t(a).text();
        try {
          return (
            "function" == typeof e && (e = e(o)),
            "object" != typeof s || r(s.options) !== r(n) || s.mask !== e
          );
        } catch (t) {}
      };
    (t.fn.mask = function (e, s) {
      s = s || {};
      var r = this.selector,
        o = t.jMaskGlobals,
        i = o.watchInterval,
        c = s.watchInputs || o.watchInputs,
        l = function () {
          if (n(this, e, s)) return t(this).data("mask", new a(this, e, s));
        };
      return (
        t(this).each(l),
        r &&
          "" !== r &&
          c &&
          (clearInterval(t.maskWatchers[r]),
          (t.maskWatchers[r] = setInterval(function () {
            t(document).find(r).each(l);
          }, i))),
        this
      );
    }),
      (t.fn.masked = function (t) {
        return this.data("mask").getMaskedVal(t);
      }),
      (t.fn.unmask = function () {
        return (
          clearInterval(t.maskWatchers[this.selector]),
          delete t.maskWatchers[this.selector],
          this.each(function () {
            var a = t(this).data("mask");
            a && a.remove().removeData("mask");
          })
        );
      }),
      (t.fn.cleanVal = function () {
        return this.data("mask").getCleanVal();
      }),
      (t.applyDataMask = function (a) {
        ((a = a || t.jMaskGlobals.maskElements) instanceof t ? a : t(a))
          .filter(t.jMaskGlobals.dataMaskAttr)
          .each(e);
      });
    var s,
      r,
      o,
      i = {
        maskElements: "input,td,span,div",
        dataMaskAttr: "*[data-mask]",
        dataMask: !0,
        watchInterval: 300,
        watchInputs: !0,
        useInput:
          !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(
            window.navigator.userAgent
          ) &&
          ((s = "input"),
          (o = document.createElement("div")),
          (r = (s = "on" + s) in o) ||
            (o.setAttribute(s, "return;"), (r = "function" == typeof o[s])),
          (o = null),
          r),
        watchDataMask: !1,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
          0: { pattern: /\d/ },
          9: { pattern: /\d/, optional: !0 },
          "#": { pattern: /\d/, recursive: !0 },
          A: { pattern: /[a-zA-Z0-9]/ },
          S: { pattern: /[a-zA-Z]/ },
        },
      };
    (t.jMaskGlobals = t.jMaskGlobals || {}),
      (i = t.jMaskGlobals = t.extend(!0, {}, i, t.jMaskGlobals)).dataMask &&
        t.applyDataMask(),
      setInterval(function () {
        t.jMaskGlobals.watchDataMask && t.applyDataMask();
      }, i.watchInterval);
  },
  window.jQuery,
  window.Zepto
);
