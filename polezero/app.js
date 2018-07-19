webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, map, zip, zipWith, zipAll, drop, apply, andList, findIndex, elemIndex, trace, traceJson, findEdit, raise, list, enumerate, enumerateWith, peek, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
ref$ = __webpack_require__(0), map = ref$.map, zip = ref$.zip, zipWith = ref$.zipWith, zipAll = ref$.zipAll, drop = ref$.drop, apply = ref$.apply, andList = ref$.andList, findIndex = ref$.findIndex, elemIndex = ref$.elemIndex;
out$.trace = trace = function(){
  console.log.apply(this, arguments);
  return arguments[arguments.length - 1];
};
out$.traceJson = traceJson = function(){
  console.log.apply(console, map(JSON.stringify, arguments));
  return arguments[arguments.length - 1];
};
out$.findEdit = findEdit = curry$(function(eq, a, b){
  var idx, mode, diff;
  if (1 < Math.abs(a.length - b.length)) {
    return null;
  }
  idx = elemIndex(false, zipWith(eq, a, b));
  if (!(a.length !== b.length || idx != null)) {
    return undefined;
  }
  idx == null && (idx = Math.min(a.length, b.length));
  mode = (function(){
    switch (a.length - b.length) {
    case 1:
      return 'deletion';
    case 0:
      return 'substitution';
    case -1:
      return 'insertion';
    }
  }());
  diff = Math.min(a.length, b.length) - idx - (a.length === b.length);
  if (!andList(zipWith(eq, slice$.call(a, a.length - diff), slice$.call(b, b.length - diff)))) {
    return null;
  }
  return [idx, mode];
});
out$.raise = raise = function(key, value, log){
  value == null && (value = eval(key));
  log == null && (log = false);
  window[key] = value;
  if (log) {
    console.log(value);
  }
};
out$.list = list = function(){
  return slice$.call(arguments, 0);
};
out$.enumerate = enumerate = function(it){
  return zip((function(){
    var i$, to$, results$ = [];
    for (i$ = 0, to$ = it.length; i$ < to$; ++i$) {
      results$.push(i$);
    }
    return results$;
  }()), it);
};
out$.enumerateWith = enumerateWith = curry$(function(f, a){
  return zipWith(f, (function(){
    var i$, to$, results$ = [];
    for (i$ = 0, to$ = a.length; i$ < to$; ++i$) {
      results$.push(i$);
    }
    return results$;
  }()), a);
});
out$.peek = peek = curry$(function(n, a){
  return apply(zipAll)(
  enumerateWith(function(){
    return drop(arguments[0], arguments[1]);
  })(
  repeatArray$([a], n)));
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
function repeatArray$(arr, n){
  for (var r = []; n > 0; (n >>= 1) && (arr = arr.concat(arr)))
    if (n & 1) r.push.apply(r, arr);
  return r;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, map, elemIndex, isZero, Complex, one, zero, i, j, e, pi, real, imag, isReal, toString, negate, abs, abs2, closeTo, angle, conj, pair, top, polar, rect, add, sub, mul, div, pow, exp, iexp, out$ = typeof exports != 'undefined' && exports || this, this$ = this;
ref$ = __webpack_require__(0), map = ref$.map, elemIndex = ref$.elemIndex;
isZero = __webpack_require__(5).isZero;
out$.Complex = Complex = function(a, b){
  b == null && (b = 0);
  if (Array.isArray(a)) {
    return a;
  } else {
    return [a, b];
  }
};
out$.one = one = [1, 0];
out$.zero = zero = [0, 0];
out$.i = i = [0, 1];
out$.j = j = [0, 1];
out$.e = e = [Math.E, 0];
out$.pi = pi = [Math.PI, 0];
out$.real = real = function(it){
  return it[0];
};
out$.imag = imag = function(it){
  return it[1];
};
out$.isReal = isReal = compose$(imag, isZero);
out$.toString = toString = function(arg$, prec){
  var x, y, ref$, a, b;
  x = arg$[0], y = arg$[1];
  prec == null && (prec = 5);
  ref$ = map(isZero, [x, y]), a = ref$[0], b = ref$[1];
  ref$ = map(function(num){
    var str;
    str = num.toString();
    switch (false) {
    case !in$('e', str):
      return num.toExponential(prec);
    case !in$('.', str):
      return num.toFixed(Math.min(prec, str.length - 1 - elemIndex('.', str)));
    default:
      return str;
    }
  }, [x, y]), x = ref$[0], y = ref$[1];
  switch (false) {
  case !(a && b):
    return '0';
  case !b:
    return x + "";
  case !a:
    return y + "i";
  case !(y < 0):
    return x + "" + y + "i";
  default:
    return x + "+" + y + "i";
  }
};
out$.negate = negate = function(arg$){
  var x, y;
  x = arg$[0], y = arg$[1];
  return [-x, -y];
};
out$.abs = abs = function(arg$){
  var x, y;
  x = arg$[0], y = arg$[1];
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
out$.abs2 = abs2 = function(arg$){
  var x, y;
  x = arg$[0], y = arg$[1];
  return Math.pow(x, 2) + Math.pow(y, 2);
};
out$.closeTo = closeTo = curry$(function(delta, a, b){
  return delta * delta >= abs2(sub(a, b));
});
out$.angle = angle = function(arg$){
  var x, y;
  x = arg$[0], y = arg$[1];
  return Math.atan2(y, x);
};
out$.conj = conj = function(arg$){
  var x, y;
  x = arg$[0], y = arg$[1];
  return [x, -y];
};
out$.pair = pair = function(it){
  if (isReal(it)) {
    return [it];
  } else {
    return [it, conj(it)];
  }
};
out$.top = top = function(it){
  switch (false) {
  case !isZero(it[1]):
    return it;
  case !(it[1] > 0):
    return it;
  default:
    return [it[0], -it[1]];
  }
};
out$.polar = polar = function(x){
  return [abs(x), angle(x)];
};
out$.rect = rect = function(arg$){
  var r, t;
  r = arg$[0], t = arg$[1];
  return [r * Math.cos(t), r * Math.sin(t)];
};
out$.add = add = curry$(function(arg$, arg1$){
  var x1, y1, x2, y2;
  x1 = arg$[0], y1 = arg$[1];
  x2 = arg1$[0], y2 = arg1$[1];
  return [x1 + x2, y1 + y2];
});
out$.sub = sub = curry$(function(arg$, arg1$){
  var x1, y1, x2, y2;
  x1 = arg$[0], y1 = arg$[1];
  x2 = arg1$[0], y2 = arg1$[1];
  return [x1 - x2, y1 - y2];
});
out$.mul = mul = curry$(function(arg$, arg1$){
  var x1, y1, x2, y2;
  x1 = arg$[0], y1 = arg$[1];
  x2 = arg1$[0], y2 = arg1$[1];
  return [x1 * x2 - y1 * y2, x2 * y1 + x1 * y2];
});
out$.div = div = curry$(function(arg$, arg1$){
  var x1, y1, x2, y2, sq;
  x1 = arg$[0], y1 = arg$[1];
  x2 = arg1$[0], y2 = arg1$[1];
  sq = Math.pow(x2, 2) + Math.pow(y2, 2);
  return [(x1 * x2 + y1 * y2) / sq, (x2 * y1 - x1 * y2) / sq];
});
out$.pow = pow = curry$(function(arg$, arg1$){
  var x1, y1, x2, y2, ref$, z1, z2, r, t;
  x1 = arg$[0], y1 = arg$[1];
  x2 = arg1$[0], y2 = arg1$[1];
  ref$ = [isZero(y1), isZero(y2)], z1 = ref$[0], z2 = ref$[1];
  switch (false) {
  case !(z1 && z2):
    return [Math.pow(x1, x2), 0];
  case !z1:
    return rect([Math.pow(x1, x2), y2 * Math.log(x1)]);
  case !z2:
    ref$ = polar([x1, y1]), r = ref$[0], t = ref$[1];
    return rect([Math.pow(r, x2), t * x2]);
  default:
    t = angle([x1, y1]);
    return mul(pow([x1 * x1 + y1 * y1, 0], [x2 / 2, y2 / 2]), pow(e, [-y2 * t, x2 * t]));
  }
});
out$.exp = exp = pow(e);
out$.iexp = iexp = function(it){
  return rect([1, it]);
};
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, map, concatMap, pairsToObj, objToPairs, apply, Complex, trace, Token, Number, Constant, constants, Bracket, LeftBracket, RightBracket, brackets, leftBrackets, rightBrackets, Operator, operators, Separator, separators, Function, RealFunction, functions, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
ref$ = __webpack_require__(0), map = ref$.map, concatMap = ref$.concatMap, pairsToObj = ref$.pairsToObj, objToPairs = ref$.objToPairs, apply = ref$.apply;
Complex = __webpack_require__(2);
trace = __webpack_require__(1).trace;
out$.Token = Token = (function(){
  Token.displayName = 'Token';
  var prototype = Token.prototype, constructor = Token;
  function Token(){}
  return Token;
}());
out$.Number = Number = (function(superclass){
  var prototype = extend$((import$(Number, superclass).displayName = 'Number', Number), superclass).prototype, constructor = Number;
  function Number(value){
    this.value = Complex.Complex(value);
  }
  return Number;
}(Token));
out$.Constant = Constant = (function(superclass){
  var prototype = extend$((import$(Constant, superclass).displayName = 'Constant', Constant), superclass).prototype, constructor = Constant;
  function Constant(){
    Constant.superclass.apply(this, arguments);
  }
  return Constant;
}(Number));
out$.constants = constants = {
  pi: new Constant(Complex.pi),
  e: new Constant(Complex.e),
  j: new Constant(Complex.j),
  i: new Constant(Complex.i)
};
out$.Bracket = Bracket = (function(superclass){
  var prototype = extend$((import$(Bracket, superclass).displayName = 'Bracket', Bracket), superclass).prototype, constructor = Bracket;
  function Bracket(val, comp){
    this.val = val;
    this.comp = comp;
  }
  return Bracket;
}(Token));
out$.LeftBracket = LeftBracket = (function(superclass){
  var prototype = extend$((import$(LeftBracket, superclass).displayName = 'LeftBracket', LeftBracket), superclass).prototype, constructor = LeftBracket;
  function LeftBracket(){
    LeftBracket.superclass.apply(this, arguments);
  }
  return LeftBracket;
}(Bracket));
out$.RightBracket = RightBracket = (function(superclass){
  var prototype = extend$((import$(RightBracket, superclass).displayName = 'RightBracket', RightBracket), superclass).prototype, constructor = RightBracket;
  function RightBracket(){
    RightBracket.superclass.apply(this, arguments);
  }
  return RightBracket;
}(Bracket));
out$.brackets = brackets = pairsToObj(
map(function(it){
  return [it[0], new Bracket(it[0], it[1])];
})(
concatMap(function(it){
  return [it, it.split('').reverse().join('')];
})(
['()', '[]', '{}'])));
out$.leftBrackets = leftBrackets = pairsToObj(
map(function(it){
  return [it, new LeftBracket(it, brackets[it].comp)];
})(
['(', '[', '{']));
out$.rightBrackets = rightBrackets = pairsToObj(
map(function(it){
  return [it, new RightBracket(it, brackets[it].comp)];
})(
[')', ']', '}']));
out$.Operator = Operator = (function(superclass){
  var prototype = extend$((import$(Operator, superclass).displayName = 'Operator', Operator), superclass).prototype, constructor = Operator;
  function Operator(op, prec, fix){
    this.op = op;
    this.prec = prec;
    this.fix = fix;
  }
  return Operator;
}(Token));
out$.operators = operators = {
  '+': new Operator(Complex.add, 1, 'l'),
  '-': new Operator(Complex.sub, 1, 'l'),
  '*': new Operator(Complex.mul, 2, 'l'),
  '/': new Operator(Complex.div, 2, 'l'),
  '^': new Operator(Complex.pow, 3, 'r')
};
out$.Separator = Separator = (function(superclass){
  var prototype = extend$((import$(Separator, superclass).displayName = 'Separator', Separator), superclass).prototype, constructor = Separator;
  function Separator(type){
    this.type = type;
  }
  return Separator;
}(Token));
out$.separators = separators = {
  ',': new Separator(',')
};
out$.Function = Function = (function(superclass){
  var prototype = extend$((import$(Function, superclass).displayName = 'Function', Function), superclass).prototype, constructor = Function;
  function Function(func){
    this.func = func;
  }
  return Function;
}(Token));
out$.RealFunction = RealFunction = (function(superclass){
  var prototype = extend$((import$(RealFunction, superclass).displayName = 'RealFunction', RealFunction), superclass).prototype, constructor = RealFunction;
  function RealFunction(func){
    this.func = function(){
      var args, res$, i$, to$, len$, arg;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      for (i$ = 0, len$ = args.length; i$ < len$; ++i$) {
        arg = args[i$];
        if (!Complex.isReal(arg)) {
          throw new Error('complex argument to real function');
        }
      }
      return apply(func, map(Complex.real, args));
    };
  }
  return RealFunction;
}(Function));
out$.functions = functions = {
  sin: new RealFunction(Math.sin),
  cos: new RealFunction(Math.cos),
  tan: new RealFunction(Math.tan),
  asin: new RealFunction(Math.asin),
  acos: new RealFunction(Math.acos),
  atan: new RealFunction(Math.atan),
  log: new RealFunction(Math.log10),
  ln: new RealFunction(Math.log),
  sqrt: new Function(partialize$.apply(Complex, [Complex.pow, [void 8, [0.5, 0]], [0]])),
  exp: new Function(Complex.exp)
};
function extend$(sub, sup){
  function fun(){} fun.prototype = (sub.superclass = sup).prototype;
  (sub.prototype = new fun).constructor = sub;
  if (typeof sup.extended == 'function') sup.extended(sub);
  return sub;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function partialize$(f, args, where){
  var context = this;
  return function(){
    var params = slice$.call(arguments), i,
        len = params.length, wlen = where.length,
        ta = args ? args.concat() : [], tw = where ? where.concat() : [];
    for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
    return len < wlen && len ?
      partialize$.apply(context, [f, ta, tw]) : f.apply(context, ta);
  };
}


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, fold, last, head, tail, zipWith, map, Complex, delta, isZero, addRoot, toPolynomial, out$ = typeof exports != 'undefined' && exports || this, this$ = this;
ref$ = __webpack_require__(0), fold = ref$.fold, last = ref$.last, head = ref$.head, tail = ref$.tail, zipWith = ref$.zipWith, map = ref$.map;
Complex = __webpack_require__(2);
delta = 1e-10;
out$.isZero = isZero = compose$(Math.abs, (function(it){
  return it < delta;
}));
out$.addRoot = addRoot = curry$(function(poly, root){
  root = Complex.negate(Complex.Complex(root));
  return [Complex.mul(head(poly), root)].concat(zipWith(Complex.add, poly, map(Complex.mul(root), tail(poly))), [last(poly)]);
});
out$.toPolynomial = toPolynomial = function(it){
  return fold(addRoot, [Complex.one], it);
};
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var d3, Prelude, Complex, Numeric, fft, evaluate, ref$, enumerate, trace, traceJson, raise, findEdit, draggable, scalable, slideContainer, ListInput, attachResizeListener, config, listInputs, i$, syncDarts, getDimensions, minIndexBy, closestIndexTo, darts, x$, score, recalcCascade, rescaleCascade, options, stableSortBy, dedupeDarts, this$ = this, slice$ = [].slice, split$ = ''.split;
d3 = __webpack_require__(4);
Prelude = __webpack_require__(0);
importAll$(window, Prelude);
Complex = __webpack_require__(2);
Numeric = __webpack_require__(5);
fft = __webpack_require__(12).fft;
evaluate = __webpack_require__(13).evaluate;
ref$ = __webpack_require__(1), enumerate = ref$.enumerate, trace = ref$.trace, traceJson = ref$.traceJson, raise = ref$.raise, findEdit = ref$.findEdit;
draggable = __webpack_require__(16);
scalable = __webpack_require__(17);
slideContainer = __webpack_require__(18);
ListInput = __webpack_require__(19);
attachResizeListener = __webpack_require__(20).attachResizeListener;
raise('d3', d3);
config = {
  poles: [],
  zeros: [],
  scale: 'linear',
  frequency: Math.PI,
  gain: 1,
  resolution: 256
};
listInputs = {
  poles: document.querySelector('#poles .list-input'),
  zeros: document.querySelector('#zeros .list-input')
};
for (i$ in listInputs) {
  (fn$.call(this, i$, listInputs[i$]));
}
syncDarts = function(){
  var i$, ref$;
  for (i$ in ref$ = listInputs) {
    (fn$.call(this, i$, ref$[i$]));
  }
  function fn$(type, list){
    var temp, this$ = this;
    map(function(it){
      return it.remove();
    })(
    list.querySelectorAll(':scope > li'));
    temp = config[type];
    each(function(it){
      ListInput.appendItem(list, it);
    })(
    map(Complex.toString)(
    config[type]));
    ListInput.appendItem(list);
    config[type] = temp;
  }
};
getDimensions = function(node){
  var style, property;
  style = window.getComputedStyle(node);
  property = function(it){
    return parseFloat(style.getPropertyValue(it));
  };
  return {
    width: property('width'),
    height: property('height')
  };
};
minIndexBy = curry$(function(func, list){
  return elemIndex(minimumBy(func, list), list);
});
closestIndexTo = curry$(function(num, list){
  num = Complex.top(num);
  return minIndexBy(compose$(Complex.top, Complex.polar, Complex.sub(num), Complex.abs2), list);
});
/*-------------------
Pole zero plot config
-------------------*/
importAll$(importAll$(importAll$(importAll$(darts = {
  dim: {
    t: 10,
    r: 10,
    b: 10,
    l: 10
  }
}, {
  svg: d3.select('svg#darts'),
  r: d3.scaleLinear().domain([0, 1.2])
}), {
  g: darts.svg.append('g'),
  line: d3.radialLine().radius(compose$(function(it){
    return it[0];
  }, darts.r)).angle(compose$(function(it){
    return it[1];
  }, negate, (function(it){
    return it + Math.PI / 2;
  })))
}), {
  rAxis: darts.g.append('g').classed('r-axis', true),
  tAxis: (x$ = darts.g.append('g').classed('t-axis', true), x$.selectAll('g').data(d3.range(0, 360, 30)).enter().append('line').style('transform', function(it){
    return "rotate(" + it + "deg)";
  }), x$),
  zeros: darts.g.append('g').classed('zeros', true),
  poles: darts.g.append('g').classed('poles', true),
  cross: '0 2.8,3 5,5 3,2.8 0,5 -3,3 -5,0 -2.8,-3 -5,-5 -3,-2.8 0,-5 3,-3 5'
}), {
  drag: function(type){
    return d3.drag().on('start', function(data){
      var idx, ref$;
      idx = closestIndexTo(data, config[type]);
      ref$ = [config[type][idx], config[type][0]], config[type][0] = ref$[0], config[type][idx] = ref$[1];
    }).on('drag', function(data){
      var ref$, width, height, x, y, this$ = this;
      ref$ = getDimensions(darts.svg.node()), width = ref$.width, height = ref$.height;
      ref$ = d3.event, x = ref$.x, y = ref$.y;
      if (!/Chrome/.test(navigator.userAgent)) {
        ref$ = zipWith(curry$(function(x$, y$){
          return x$ - y$;
        }), [x, y], map((function(it){
          return it / 2;
        }), [width, height])), x = ref$[0], y = ref$[1];
      }
      config[type][0] = map(darts.r.invert, [x, y]);
      syncDarts();
      recalcCascade();
    });
  },
  click: function(type, flip){
    flip == null && (flip = false);
    return function(data){
      var popped;
      d3.event.preventDefault();
      d3.event.stopPropagation();
      popped = config[type].splice(closestIndexTo(data, config[type]), 1);
      if (flip) {
        if (type === 'poles') {
          config.zeros.push(popped[0]);
        } else {
          config.poles.push(popped[0]);
        }
      }
      syncDarts();
      recalcCascade();
    };
  }
});
raise('darts', darts);
/*------------------
Add a new zero with right click
------------------*/
darts.svg.on('contextmenu', function(){
  var ref$, t, r, b, l, width, height, x, y, this$ = this;
  d3.event.preventDefault();
  ref$ = darts.dim, t = ref$.t, r = ref$.r, b = ref$.b, l = ref$.l;
  ref$ = getDimensions(darts.svg.node()), width = ref$.width, height = ref$.height;
  ref$ = d3.event, x = ref$.layerX, y = ref$.layerY;
  ref$ = map(darts.r.invert, zipWith(curry$(function(x$, y$){
    return x$ - y$;
  }), [x, y], map((function(it){
    return it / 2;
  }), [width, height]))), x = ref$[0], y = ref$[1];
  config.zeros.push([x, y]);
  syncDarts();
  recalcCascade();
});
/*-------------------
Pole zero plot handling
-------------------*/
(darts.resize = function(){
  var ref$, t, r, b, l, width, height;
  ref$ = darts.dim, t = ref$.t, r = ref$.r, b = ref$.b, l = ref$.l;
  ref$ = getDimensions(darts.svg.node()), width = ref$.width, height = ref$.height;
  ref$ = [width - l - r, height - t - b], width = ref$[0], height = ref$[1];
  darts.g.style('transform', "translate(" + (width / 2 + l) + "px," + (height / 2 + t) + "px)");
  darts.r.range([0, Math.min(width, height) / 2]);
})();
(darts.rescale = function(){
  var x$;
  darts.rAxis.selectAll('circle').remove();
  darts.rAxis.selectAll('text').remove();
  x$ = darts.rAxis.selectAll('g').data(slice$.call(darts.r.ticks().filter(function(){
    return arguments[1] % 2 === 0 && arguments[0] !== 1;
  }), 1)).enter();
  x$.append('circle').classed('scale', true);
  x$.append('text').classed('scale', true);
  darts.rAxis.append('circle').classed('unit', true);
  darts.rAxis.append('text').classed('unit', true).data([1]);
})();
(darts.recalc = function(){
  var marks, type, shape, this$ = this;
  marks = {
    zeros: [
      'circle', function(it){
        return it.attr('r', 5);
      }
    ],
    poles: [
      'polygon', function(it){
        return it.attr('points', darts.cross);
      }
    ]
  };
  for (type in marks) {
    shape = marks[type];
    darts[type].selectAll(shape[0]).remove();
    fn$(
    shape[1](
    darts[type].selectAll('g').data(map(Complex.polar, concatMap(Complex.pair, config[type]))).enter().append(shape[0])));
  }
  function fn$(it){
    return it.call(darts.drag(type)).on('contextmenu', darts.click(type, false)).on('dblclick', darts.click(type, true));
  }
})();
(darts.reaxis = function(){
  var this$ = this;
  darts.rAxis.selectAll('circle.scale').attr('r', darts.r);
  darts.rAxis.selectAll('text').attr('y', compose$(darts.r, (function(it){
    return it + 1;
  }), negate)).text(id);
  darts.rAxis.select('circle.unit').attr('r', darts.r(1));
  (function(radius){
    darts.tAxis.selectAll('line').attr('x2', radius);
  }.call(this, darts.r.range()[1]));
})();
(darts.redraw = function(){
  var translate;
  translate = function(data){
    var p;
    p = darts.line([data]).slice(1, -1).split(',');
    return "translate(" + p[0] + "px," + p[1] + "px)";
  };
  darts.zeros.selectAll('circle').style('transform', translate);
  darts.poles.selectAll('polygon').style('transform', translate);
})();
(function(dartsParent){
  attachResizeListener(dartsParent);
  dartsParent.addEventListener('resize', function(){
    darts.resize();
    darts.reaxis();
    darts.redraw();
  });
}.call(this, darts.svg.node().parentElement));
/*------------------
Frequency response config
------------------*/
importAll$(importAll$(importAll$(score = {
  dim: {
    t: 20,
    r: 20,
    b: 30,
    l: 50
  }
}, {
  svg: d3.select('svg#score'),
  x: d3.scaleLinear(),
  y: null
}), {
  g: score.svg.append('g')
}), {
  xAxis: score.g.append('g').classed('x-axis', true),
  yAxis: score.g.append('g').classed('y-axis', true),
  path: score.g.append('path').classed('line', true)
});
raise('score', score);
/*------------------
Frequency response handling
------------------*/
(score.rescale = function(){
  var scales;
  scales = {
    linear: function(){
      return d3.scaleLinear();
    },
    decibel: function(){
      return d3.scaleLinear();
    },
    logarithmic: function(){
      return d3.scaleLog().base(10);
    }
  };
  score.x.domain([0, config.frequency]);
  score.y = scales[config.scale]();
})();
(score.resize = function(){
  var ref$, t, r, b, l, width, height;
  ref$ = score.dim, t = ref$.t, r = ref$.r, b = ref$.b, l = ref$.l;
  ref$ = getDimensions(score.svg.node()), width = ref$.width, height = ref$.height;
  ref$ = [width - l - r, height - t - b], width = ref$[0], height = ref$[1];
  score.g.style('transform', "translate(" + l + "px," + t + "px)");
  score.x.range([0, width]);
  score.y.range([height, 0]);
  score.xAxis.style('transform', "translateY(" + height + "px)");
})();
(score.recalc = function(){
  var this$ = this;
  score.data = filter(function(it){
    return it[1] != null && !isItNaN(it[1]);
  })(
  enumerate(
  map(compose$(Complex.abs, (function(it){
    return it * config.gain;
  })))(
  apply(zipWith(Complex.div))(
  map(compose$(concatMap(Complex.pair), Numeric.toPolynomial, fft(config.resolution), function(it){
    return take(it.length / 2 + 1, it);
  }))(
  [config.zeros, config.poles])))));
  switch (config.scale) {
  case 'logarithmic':
    score.data = filter(function(it){
      return it[1] > 1e-5;
    })(
    score.data);
    break;
  case 'decibel':
    score.data = map(function(it){
      return [it[0], 20 * Math.log10(it[1])];
    })(
    filter(function(it){
      return it[1] > 1e-5;
    })(
    score.data));
  }
})();
(score.redraw = function(){
  var ref$, t, r, b, l, width, height, min, max, this$ = this;
  ref$ = score.dim, t = ref$.t, r = ref$.r, b = ref$.b, l = ref$.l;
  ref$ = getDimensions(score.svg.node()), width = ref$.width, height = ref$.height;
  ref$ = [width - l - r, height - t - b], width = ref$[0], height = ref$[1];
  ref$ = d3.extent(score.data, function(it){
    return it[1];
  }), min = ref$[0], max = ref$[1];
  if (config.scale === 'linear') {
    min = 0;
  }
  score.y.domain([min, max]).nice();
  score.xAxis.call(d3.axisBottom(score.x).tickSizeInner(-height));
  score.yAxis.call(d3.axisLeft(score.y).tickSizeInner(-width));
})();
(score.replot = function(){
  var this$ = this;
  score.path.datum(score.data).attr('d', d3.line().x(compose$(function(it){
    return it[0];
  }, (function(it){
    return it * (2 * config.frequency / config.resolution);
  }), score.x)).y(compose$(function(it){
    return it[1];
  }, score.y)));
})();
(function(scoreParent){
  attachResizeListener(scoreParent);
  scoreParent.addEventListener('resize', function(){
    score.resize();
    score.redraw();
    score.replot();
  });
}.call(this, score.svg.node().parentElement));
/*------------------
P/Z list change handling
------------------*/
recalcCascade = function(){
  var x$, y$;
  x$ = darts;
  x$.recalc();
  x$.reaxis();
  x$.redraw();
  y$ = score;
  y$.recalc();
  y$.redraw();
  y$.replot();
};
rescaleCascade = function(){
  var x$, y$;
  x$ = darts;
  x$.resize();
  x$.recalc();
  y$ = score;
  y$.rescale();
  y$.resize();
  y$.recalc();
  y$.redraw();
  y$.replot();
};
for (i$ in listInputs) {
  (fn1$.call(this, i$, listInputs[i$]));
}
/*------------------
Options handling
------------------*/
options = document.getElementById('options');
(function(input){
  var listener;
  input.value = config.resolution;
  listener = function(event){
    var value, round, diff, this$ = this;
    value = parseInt(
    input.value);
    round = Math.round(
    Math.log2(
    value));
    diff = (function(it){
      return value - it;
    })(
    (function(it){
      return Math.pow(2, it);
    })(
    round));
    input.value = Math.min(4096, (function(it){
      return Math.pow(2, it);
    })(
    (function(it){
      return it + signum(diff);
    })(
    round)));
    config.resolution = input.value;
    recalcCascade();
  };
  input.addEventListener('change', listener);
  input.addEventListener('click', listener);
}.call(this, options.querySelector("input[name='resolution']")));
(function(input){
  input.value = config.gain;
  input.addEventListener('change', function(event){
    config.gain = parseFloat(input.value);
    recalcCascade();
  });
}.call(this, options.querySelector("input[name='gain']")));
(function(input){
  input.value = config.frequency;
  input.addEventListener('change', function(event){
    config.frequency = parseFloat(input.value);
    rescaleCascade();
  });
}.call(this, options.querySelector("input[name='frequency']")));
each(function(input){
  input.addEventListener('click', function(event){
    config.scale = input.value;
    rescaleCascade();
  });
})(
options.querySelectorAll("input[name='axis']"));
/*------------------
Import export handling
------------------*/
(function(textarea){
  textarea.addEventListener('click', function(event){
    var ref$, a, b, poles, zeros, this$ = this;
    ref$ = map(compose$(concatMap(Complex.pair), Numeric.toPolynomial))(
    [config.poles, config.zeros]), a = ref$[0], b = ref$[1];
    b = map(Complex.mul(Complex.Complex(config.gain)), b);
    ref$ = map(compose$(reverse, map(Complex.toString), function(it){
      return it.join(', ');
    }))(
    [a, b]), a = ref$[0], b = ref$[1];
    ref$ = map(compose$(concatMap(Complex.pair), map(Complex.toString), function(it){
      return it.join(', ');
    }))(
    [config.poles, config.zeros]), poles = ref$[0], zeros = ref$[1];
    return textarea.value = "B = [" + b + "]\nA = [" + a + "]\nzeros = [" + zeros + "]\npoles = [" + poles + "]";
  });
}.call(this, options.querySelector("textarea[name='export']")));
stableSortBy = curry$(function(func, array){
  var merge;
  if (array.length < 2) {
    return array;
  }
  merge = curry$(function(stack, arg$, arg1$){
    var i, j, left, right;
    i = arg$[0], j = arg$[1];
    left = arg1$[0], right = arg1$[1];
    switch (false) {
    case !!(i < left.length):
      return stack.concat(slice$.call(right, j));
    case !!(j < right.length):
      return stack.concat(slice$.call(left, i));
    case !(func(left[i]) < func(right[j])):
      stack.push(left[i]);
      return merge(stack, [i + 1, j], [left, right]);
    default:
      stack.push(right[j]);
      return merge(stack, [i, j + 1], [left, right]);
    }
  });
  return merge([], [0, 0])(
  map(stableSortBy(func))(
  splitAt(floor(array.length / 2))(
  array)));
});
dedupeDarts = function(darts){
  var closeTo, complexCloseTo, ref$, real, complex, dedupe, above, below, this$ = this;
  closeTo = curry$(function(a, b){
    return 1e-6 < Math.abs(a - b);
  });
  complexCloseTo = Complex.closeTo(1e-6);
  ref$ = partition(Complex.isReal, darts), real = ref$[0], complex = ref$[1];
  dedupe = curry$(function(stack, arg$, arg1$){
    var i, j, above, below;
    i = arg$[0], j = arg$[1];
    above = arg1$[0], below = arg1$[1];
    switch (false) {
    case !!(i < above.length):
      return stack.concat(slice$.call(below, j));
    case !!(j < below.length):
      return stack.concat(slice$.call(above, i));
    case !complexCloseTo(above[i], below[j]):
      stack.push(above[i]);
      return dedupe(stack, [i + 1, j + 1], [above, below]);
    case !closeTo(Complex.real(above[i]), Complex.real(below[j])):
      switch (false) {
      case !Complex.imag(above[i] < Complex.imag(below[j])):
        stack.push(above[i]);
        return dedupe(stack, [i + 1, j], [above, below]);
      default:
        stack.push(below[j]);
        return dedupe(stack, [i, j + 1], [above, below]);
      }
      break;
    case !Complex.real(above[i] < Complex.real(below[j])):
      stack.push(above[i]);
      return dedupe(stack, [i + 1, j], [above, below]);
    default:
      stack.push(below[j]);
      return dedupe(stack, [i, j + 1], [above, below]);
    }
  });
  ref$ = map(compose$(sortBy(Complex.imag), stableSortBy(Complex.real)))(
  partition(compose$(Complex.imag, (function(it){
    return it > 0;
  })))(
  complex)), above = ref$[0], below = ref$[1];
  return (function(it){
    return it.concat(real);
  })(
  dedupe([], [0, 0])(
  [above, map(Complex.conj, below)]));
};
(function(textarea){
  textarea.addEventListener('change', function(event){
    var ref$, poles, zeros, e, this$ = this;
    ref$ = [null, null], poles = ref$[0], zeros = ref$[1];
    try {
      ref$ = map(compose$(function(it){
        return it.exec(textarea.value);
      }, function(it){
        return it[1];
      }, (function(it){
        return split$.call(it, ',');
      }), filter((function(it){
        return it !== '';
      })), map(evaluate)))(
      [/poles?\s*=\s*\[\s*(.*?)\s*\]/mi, /zeros?\s*=\s*\[\s*(.*?)\s*\]/mi]), poles = ref$[0], zeros = ref$[1];
      if (options.querySelector("input[name='dedupe']").checked) {
        ref$ = map(dedupeDarts, [poles, zeros]), poles = ref$[0], zeros = ref$[1];
      }
    } catch (e$) {
      e = e$;
      alert(e);
      return;
    }
    ref$ = [poles, zeros], config.poles = ref$[0], config.zeros = ref$[1];
    syncDarts();
    recalcCascade();
  });
}.call(this, options.querySelector("textarea[name='import']")));
function importAll$(obj, src){
  for (var key in src) obj[key] = src[key];
  return obj;
}
function fn$(_, list){
  ListInput.attachValidator(list, function(value){
    var result, e;
    if (value === '') {
      return;
    }
    try {
      result = evaluate(value);
      return {
        value: result,
        content: value
      };
    } catch (e$) {
      e = e$;
      return null;
    }
  });
}
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}
function fn1$(type, list){
  list.addEventListener('change', function(event){
    var this$ = this;
    config[type] = compact(
    map(compose$(function(it){
      return it.getAttribute('value');
    }, JSON.parse))(
    list.getElementsByTagName('li')));
    recalcCascade();
  });
}


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, map, zipWith, maximum, id, negate, Complex, fft, ifft, fft_impl, out$ = typeof exports != 'undefined' && exports || this;
ref$ = __webpack_require__(0), map = ref$.map, zipWith = ref$.zipWith, maximum = ref$.maximum, id = ref$.id, negate = ref$.negate;
Complex = __webpack_require__(2);
out$.fft = fft = curry$(function(length, array){
  var this$ = this;
  length = (function(it){
    return Math.pow(2, it);
  })(
  Math.ceil(
  Math.log2(
  maximum(
  [length, array.length]))));
  array = map(Complex.Complex, array).concat(repeatArray$([Complex.zero], length - array.length));
  return fft_impl(negate, array);
});
out$.ifft = ifft = curry$(function(length, array){
  var this$ = this;
  length = (function(it){
    return Math.pow(2, it);
  })(
  Math.ceil(
  Math.log2(
  maximum(
  [length, array.length]))));
  array = map(Complex.Complex, array).concat(repeatArray$([Complex.zero], length - array.length));
  return map(function(arg$){
    var x, y;
    x = arg$[0], y = arg$[1];
    return [x / length, y / length];
  }, fft_impl(id, array));
});
fft_impl = curry$(function(wheel, array){
  var n, i, i$, ref$, l, r;
  if ((n = array.length / 2) < 1) {
    return array;
  }
  array = fft_impl(wheel, (function(){
    var x$, i$, to$, results$ = [];
    for (i$ = 0, to$ = array.length; i$ < to$; i$ += 2) {
      x$ = i$;
      if (x$ < array.length) {
        results$.push(array[x$]);
      }
    }
    return results$;
  }())).concat(zipWith(Complex.mul, fft_impl(wheel, (function(){
    var x$, i$, to$, results$ = [];
    for (i$ = 1, to$ = array.length; i$ < to$; i$ += 2) {
      x$ = i$;
      if (x$ < array.length) {
        results$.push(array[x$]);
      }
    }
    return results$;
  }())), (function(){
    var i$, to$, results$ = [];
    for (i$ = 0, to$ = n; i$ < to$; ++i$) {
      i = i$;
      results$.push(Complex.iexp(wheel(Math.PI * i / n)));
    }
    return results$;
  }())));
  for (i$ = 0; i$ < n; ++i$) {
    i = i$;
    ref$ = [array[i], array[i + n]], l = ref$[0], r = ref$[1];
    array[i] = Complex.add(l, r);
    array[i + n] = Complex.sub(l, r);
  }
  return array;
});
function repeatArray$(arr, n){
  for (var r = []; n > 0; (n >>= 1) && (arr = arr.concat(arr)))
    if (n & 1) r.push.apply(r, arr);
  return r;
}
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, apply, reverse, Token, tokenize, shunting, Util, popStack, calcRpn, evaluate, out$ = typeof exports != 'undefined' && exports || this, this$ = this;
ref$ = __webpack_require__(0), apply = ref$.apply, reverse = ref$.reverse;
Token = __webpack_require__(3);
tokenize = __webpack_require__(14).tokenize;
shunting = __webpack_require__(15).shunting;
Util = __webpack_require__(1);
popStack = function(stack){
  return function(){
    if (!stack.length) {
      throw new Error('not enough numbers');
    }
    return stack.pop();
  };
};
out$.calcRpn = calcRpn = function(tokens){
  var stack, pop, i$, len$, token;
  stack = [];
  pop = popStack(stack);
  for (i$ = 0, len$ = tokens.length; i$ < len$; ++i$) {
    token = tokens[i$];
    switch (false) {
    case !(token instanceof Token.Number):
      stack.push(token);
      break;
    case !(token instanceof Token.Function):
      stack.push(new Token.Number(apply(token.func, reverse((fn$())))));
      break;
    case !(token instanceof Token.Operator):
      stack.push(new Token.Number(apply(token.op, reverse([pop().value, pop().value]))));
      break;
    default:
      throw new Error('invalid token');
    }
  }
  if (stack.length !== 1) {
    throw 'too many numbers';
  }
  return stack[0];
  function fn$(){
    var i$, results$ = [];
    for (i$ = 0; i$ < 1; ++i$) {
      results$.push(pop().value);
    }
    return results$;
  }
};
out$.evaluate = evaluate = compose$(tokenize, shunting, calcRpn, function(it){
  return it.value;
});
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var compact, Token, ref$, list, trace, regex, split, takeFrom, tokenize, out$ = typeof exports != 'undefined' && exports || this;
compact = __webpack_require__(0).compact;
Token = __webpack_require__(3);
ref$ = __webpack_require__(1), list = ref$.list, trace = ref$.trace;
regex = {
  space: [/^(\s+)(.*)/, 1, 2, []],
  number: [/^(\d+(\.\d*)?(e[+-]?\d+)?)(.*)/i, 1, 4, []],
  word: [/^(\w+)(.*)/i, 1, 2, list(Token.constants, Token.functions)],
  other: [/^(.)(.*)/i, 1, 2, list(Token.leftBrackets, Token.rightBrackets, Token.operators, Token.separators)]
};
split = curry$(function(arg$, string){
  var reg, head, tail, pool, parts;
  reg = arg$[0], head = arg$[1], tail = arg$[2], pool = arg$[3];
  parts = reg.exec(string);
  if (parts != null) {
    return [parts[head], parts[tail], pool];
  } else {
    return null;
  }
});
takeFrom = curry$(function(dicts, key){
  var i$, len$, dict;
  for (i$ = 0, len$ = dicts.length; i$ < len$; ++i$) {
    dict = dicts[i$];
    if (key in dict) {
      return dict[key];
    }
  }
  throw new Error('invalid token');
});
out$.tokenize = tokenize = compose$(function(string){
  var that, results$ = [];
  while (string.length) {
    switch (false) {
    case !(that = split(regex.space, string)):
      string = that[1];
      results$.push(void 8);
      break;
    case !(that = split(regex.number, string)):
      string = that[1];
      results$.push(new Token.Number(parseFloat(that[0])));
      break;
    case !(that = split(regex.word, string)):
      string = that[1];
      results$.push(takeFrom(that[2], that[0]));
      break;
    case !(that = split(regex.other, string)):
      string = that[1];
      results$.push(takeFrom(that[2], that[0]));
    }
  }
  return results$;
}, compact);
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, reverse, any, Token, trace, list, enumerate, peek, multiply, negate, validations, validate, clearStack, comparePrecedence, shunting, out$ = typeof exports != 'undefined' && exports || this;
ref$ = __webpack_require__(0), reverse = ref$.reverse, any = ref$.any;
Token = __webpack_require__(3);
ref$ = __webpack_require__(1), trace = ref$.trace, list = ref$.list, enumerate = ref$.enumerate, peek = ref$.peek;
out$.multiply = multiply = curry$(function(a, b){
  var ref$;
  if (a == null) {
    return false;
  }
  if (a instanceof Token.Number) {
    ref$ = [b, a], a = ref$[0], b = ref$[1];
  } else if (!(b instanceof Token.Number)) {
    return false;
  }
  if (a instanceof Token.Number && !(a instanceof Token.Constant)) {
    return !(b instanceof Token.Number && !(b instanceof Token.Constant));
  }
  return a instanceof Token.Constant || a instanceof Token.Function;
});
out$.negate = negate = curry$(function(a, b){
  if (b !== Token.operators['-']) {
    return false;
  }
  return a == null || a instanceof Token.LeftBracket || a instanceof Token.Operator;
});
validations = [[multiply, Token.operators['*']], [negate, new Token.Number(0)]];
out$.validate = validate = function(tokens){
  var queue, i$, ref$, len$, ref1$, f, op, a, b, j$, len1$, ref2$;
  queue = [];
  for (i$ = 0, len$ = (ref$ = validations).length; i$ < len$; ++i$) {
    ref1$ = ref$[i$], f = ref1$[0], op = ref1$[1];
    if (f(null, tokens[0])) {
      queue.push(op);
    }
  }
  queue.push(tokens[0]);
  for (i$ = 0, len$ = (ref$ = peek(2, tokens)).length; i$ < len$; ++i$) {
    ref1$ = ref$[i$], a = ref1$[0], b = ref1$[1];
    for (j$ = 0, len1$ = (ref1$ = validations).length; j$ < len1$; ++j$) {
      ref2$ = ref1$[j$], f = ref2$[0], op = ref2$[1];
      if (f(a, b)) {
        queue.push(op);
      }
    }
    queue.push(b);
  }
  return queue;
};
out$.clearStack = clearStack = function(stack, pop){
  var queue;
  pop == null && (pop = null);
  queue = [];
  while (stack.length && !(stack[stack.length - 1] instanceof Token.LeftBracket)) {
    queue.push(stack.pop());
  }
  if (stack.length === 0 || (pop != null && stack[stack.length - 1].val !== pop.comp)) {
    throw new Error('mismatched brackets');
  }
  if (pop != null) {
    stack.pop();
    if (stack.length && stack[stack.length - 1] instanceof Token.Function) {
      queue.push(stack.pop());
    }
  }
  return queue;
};
out$.comparePrecedence = comparePrecedence = function(a, b){
  if (a.fix === 'l') {
    return a.prec <= b.prec;
  } else {
    return a.prec < b.prec;
  }
};
out$.shunting = shunting = compose$(validate, function(tokens){
  var ref$, stack, queue, i$, len$, token, this$ = this;
  ref$ = [[], []], stack = ref$[0], queue = ref$[1];
  for (i$ = 0, len$ = tokens.length; i$ < len$; ++i$) {
    token = tokens[i$];
    switch (false) {
    case !(token instanceof Token.Number):
      queue.push(token);
      break;
    case !(token instanceof Token.Function):
      stack.push(token);
      break;
    case !(token instanceof Token.LeftBracket):
      stack.push(token);
      break;
    case !(token instanceof Token.Separator):
      queue = queue.concat(clearStack(stack));
      break;
    case !(token instanceof Token.RightBracket):
      queue = queue.concat(clearStack(stack, token));
      break;
    case !(token instanceof Token.Operator):
      while (stack.length && stack[stack.length - 1] instanceof Token.Operator && comparePrecedence(token, stack[stack.length - 1])) {
        queue.push(stack.pop());
      }
      stack.push(token);
    }
  }
  if (any((function(it){
    return it instanceof Token.Bracket;
  }), stack)) {
    throw new Error('mismatched brackets');
  }
  return queue.concat(reverse(stack));
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, flip, each, map;
ref$ = __webpack_require__(0), flip = ref$.flip, each = ref$.each, map = ref$.map;
flip(each)(document.getElementsByClassName('draggable'), function(element){
  var ref$, target, xDiff, yDiff, xLim, yLim, mousemove, mouseup;
  ref$ = [null, 0, 0, 0, 0], target = ref$[0], xDiff = ref$[1], yDiff = ref$[2], xLim = ref$[3], yLim = ref$[4];
  mousemove = function(event){
    var ref$, ref1$;
    event.stopPropagation();
    window.getSelection().removeAllRanges();
    target.style.left = ((ref$ = 0 > (ref1$ = event.clientX - xDiff) ? 0 : ref1$) < xLim ? ref$ : xLim) + 'px';
    target.style.top = ((ref$ = 0 > (ref1$ = event.clientY - yDiff) ? 0 : ref1$) < yLim ? ref$ : yLim) + 'px';
  };
  mouseup = function(event){
    element.style.cursor = 'default';
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
  };
  element.addEventListener('mousedown', function(event){
    var ref$, targetRect, parentRect, this$ = this;
    target = element.getAttribute('dragtarget') != null ? document.querySelector(element.getAttribute('dragtarget')) : element;
    ref$ = map(function(it){
      return it.getBoundingClientRect();
    }, [target, target.parentElement]), targetRect = ref$[0], parentRect = ref$[1];
    ref$ = [parseInt(event.clientX) - parseInt(targetRect.left), parseInt(event.clientY) - parseInt(targetRect.top)], xDiff = ref$[0], yDiff = ref$[1];
    ref$ = [parseInt(parentRect.width) - parseInt(targetRect.width), parseInt(parentRect.height) - parseInt(targetRect.height)], xLim = ref$[0], yLim = ref$[1];
    element.style.cursor = 'move';
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  });
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, flip, each, map;
ref$ = __webpack_require__(0), flip = ref$.flip, each = ref$.each, map = ref$.map;
flip(each)(document.getElementsByClassName('scalable'), function(element){
  var corner, ref$, xDiff, yDiff, xLim, yLim, mousemove, mouseup;
  corner = document.createElement('div');
  corner.classList.add('scalable-corner');
  element.appendChild(corner);
  ref$ = [0, 0, 0, 0], xDiff = ref$[0], yDiff = ref$[1], xLim = ref$[2], yLim = ref$[3];
  mousemove = function(event){
    var ref$, ref1$;
    event.stopPropagation();
    window.getSelection().removeAllRanges();
    element.style.width = ((ref$ = 0 > (ref1$ = event.clientX - xDiff) ? 0 : ref1$) < xLim ? ref$ : xLim) + 'px';
    element.style.height = ((ref$ = 0 > (ref1$ = event.clientY - yDiff) ? 0 : ref1$) < yLim ? ref$ : yLim) + 'px';
  };
  mouseup = function(event){
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
  };
  corner.addEventListener('mousedown', function(event){
    var ref$, cornerRect, elementRect, parentRect, this$ = this;
    event.stopPropagation();
    ref$ = map(function(it){
      return it.getBoundingClientRect();
    }, [corner, element, element.parentElement]), cornerRect = ref$[0], elementRect = ref$[1], parentRect = ref$[2];
    ref$ = [parseInt(event.clientX) - parseInt(elementRect.width), parseInt(event.clientY) - parseInt(elementRect.height)], xDiff = ref$[0], yDiff = ref$[1];
    ref$ = [parseInt(parentRect.width) - parseInt(elementRect.left), parseInt(parentRect.height) - parseInt(elementRect.top)], xLim = ref$[0], yLim = ref$[1];
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  });
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, flip, each, map, intersection, filter, findIndex;
ref$ = __webpack_require__(0), flip = ref$.flip, each = ref$.each, map = ref$.map, intersection = ref$.intersection, filter = ref$.filter, findIndex = ref$.findIndex;
flip(each)(document.getElementsByClassName('slide-container'), function(container){
  var ref$, prevTarget, nextTarget, titleTarget, titled, getSlides, findActive, shiftActive, this$ = this;
  ref$ = map(function(it){
    if (it != null) {
      return document.querySelector(it);
    } else {
      return null;
    }
  })(
  map(function(it){
    return container.getAttribute(it);
  })(
  ['prevtarget', 'nexttarget', 'titletarget'])), prevTarget = ref$[0], nextTarget = ref$[1], titleTarget = ref$[2];
  titled = titleTarget != null;
  getSlides = compose$(function(it){
    return it.childNodes;
  }, filter(function(it){
    return it.nodeType === 1;
  }), filter(function(it){
    return it.classList.contains('slide-item');
  }));
  findActive = findIndex(function(it){
    return it.classList.contains('active');
  });
  (function(slides){
    var active, title;
    active = findActive(slides);
    if (active == null) {
      active = 0;
      slides[0].classList.add('active');
    }
    active = slides[active];
    if (titled && (title = active.querySelector('.slide-title')) != null) {
      titleTarget.appendChild(title);
    }
  }.call(this, getSlides(container)));
  shiftActive = curry$(function(shamt, event){
    var slides, index, activeSource, activeTarget, ref$;
    event.stopPropagation();
    slides = getSlides(container);
    index = findActive(slides);
    activeSource = slides[index];
    activeTarget = slides[(((index + shamt) % (ref$ = slides.length) + ref$) % ref$)];
    activeSource.classList.remove('active');
    activeTarget.classList.add('active');
    if (titled) {
      activeSource.appendChild(titleTarget.querySelector('.slide-title'));
      titleTarget.appendChild(activeTarget.querySelector('.slide-title'));
    }
    return activeTarget.dispatchEvent(new Event('resize'));
  });
  if (prevTarget != null) {
    prevTarget.addEventListener('click', shiftActive(-1));
  }
  if (nextTarget != null) {
    nextTarget.addEventListener('click', shiftActive(1));
  }
});
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, flip, each, id, flatten, list, trace, validators, createInput, validateInput, createItem, removeItem, appendItem, attachValidator, out$ = typeof exports != 'undefined' && exports || this;
ref$ = __webpack_require__(0), flip = ref$.flip, each = ref$.each, id = ref$.id, flatten = ref$.flatten;
ref$ = __webpack_require__(1), list = ref$.list, trace = ref$.trace;
validators = {};
validators[null] = validators[undefined] = validators[void 8] = function(it){
  return {
    value: it,
    content: it
  };
};
out$.createInput = createInput = function(init){
  var input, listener;
  init == null && (init = null);
  input = document.createElement('input');
  if (init != null) {
    input.value = init;
  }
  input.type = 'text';
  listener = function(event){
    event.stopPropagation();
    validateInput(input);
  };
  input.addEventListener('click', function(it){
    it.stopPropagation();
  });
  input.addEventListener('blur', listener);
  input.addEventListener('keydown', function(event){
    if (event.keyCode !== 13) {
      return;
    }
    listener.apply(this, arguments);
  });
  return input;
};
out$.validateInput = validateInput = function(input, append){
  var item, container, valid, value, content, newItem;
  append == null && (append = true);
  if ((item = input.parentNode) == null) {
    return;
  }
  if (append && (container = item.parentNode) == null) {
    return;
  }
  if ((valid = input.value === ''
    ? {
      value: '',
      content: ''
    }
    : validators[container](input.value)) == null) {
    return;
  }
  value = valid.value, content = valid.content;
  if (content === '' || valid === '') {
    return removeItem(item);
  }
  item.setAttribute('value', JSON.stringify(value));
  item.textContent = valid.content;
  input.remove();
  if (append && item.nextSibling == null) {
    container.appendChild(newItem = createItem());
    newItem.focus();
  }
  item.dispatchEvent(new Event('change'));
  item.parentNode.dispatchEvent(new Event('change'));
};
out$.createItem = createItem = function(init){
  var item, input;
  init == null && (init = null);
  item = document.createElement('li');
  item.appendChild(input = createInput(init));
  item.addEventListener('click', function(event){
    var input;
    event.stopPropagation();
    input = createInput(item.textContent);
    item.textContent = '';
    item.appendChild(input);
    input.focus();
  });
  return item;
};
out$.removeItem = removeItem = function(item){
  var container, newItem;
  if ((container = item.parentNode) == null) {
    return;
  }
  if (item.nextSibling == null) {
    container.appendChild(newItem = createItem());
    newItem.focus();
  }
  try {
    item.remove();
  } catch (e$) {}
  container.dispatchEvent(new Event('change'));
};
out$.appendItem = appendItem = function(container, init){
  var item, input, valid;
  init == null && (init = null);
  container.appendChild(item = createItem(init));
  if ((input = item.querySelector(':scope > input')) != null) {
    if ((valid = validators[container](init)) != null) {
      validateInput(input, false);
      item.setAttribute('value', JSON.stringify(valid.value));
      item.textContent = valid.content;
    } else {
      input.focus();
    }
  }
};
out$.attachValidator = attachValidator = curry$(function(container, validator){
  validator == null && (validator = null);
  validator == null && (validator = function(it){
    return {
      value: it,
      content: it
    };
  });
  validators[container] = validator;
  if (container.querySelector(':scope > li') == null) {
    container.appendChild(createItem());
  }
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var ref$, map, filter, createObject, getObjects, attachResizeListener, this$ = this, out$ = typeof exports != 'undefined' && exports || this;
ref$ = __webpack_require__(0), map = ref$.map, filter = ref$.filter;
createObject = function(element){
  var x$, y$;
  x$ = document.createElement('object');
  x$.type = 'text/html';
  x$.data = 'about:blank';
  y$ = x$.classList;
  y$.add('resize-trigger');
  x$.addEventListener('load', function(){
    this.contentDocument.defaultView.addEventListener('resize', function(){
      element.dispatchEvent(new Event('resize'));
    });
  });
  return x$;
};
getObjects = compose$(function(it){
  return it.childNodes;
}, filter(function(it){
  return it.nodeType === 1;
}), filter(function(it){
  return it.classList.contains('resize-trigger');
}));
out$.attachResizeListener = attachResizeListener = function(element){
  if (!getObjects(element).length) {
    element.appendChild(createObject(element));
  }
};
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}


/***/ })
],[6]);