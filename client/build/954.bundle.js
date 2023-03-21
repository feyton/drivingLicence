"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[954],{

/***/ 954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_ExamPage)
});

// EXTERNAL MODULE: ./node_modules/graphql-tag/lib/index.js + 10 modules
var lib = __webpack_require__(9098);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useLazyQuery.js + 2 modules
var useLazyQuery = __webpack_require__(6162);
// EXTERNAL MODULE: ./node_modules/flowbite-react/lib/esm/index.js + 136 modules
var esm = __webpack_require__(6515);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-icons/bs/index.esm.js
var index_esm = __webpack_require__(3750);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 13 modules
var es = __webpack_require__(5998);
// EXTERNAL MODULE: ./node_modules/react-router/dist/index.js
var dist = __webpack_require__(9250);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs + 1 modules
var react_toastify_esm = __webpack_require__(6042);
;// CONCATENATED MODULE: ./src/components/Timer.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function Timer(_ref) {
  var start = _ref.start,
    onFinish = _ref.onFinish;
  var ref = (0,react.useRef)();
  var _useSelector = (0,es/* useSelector */.v9)(function (state) {
      return state === null || state === void 0 ? void 0 : state.timer;
    }),
    running = _useSelector.running;
  var _useState = (0,react.useState)("00:00"),
    _useState2 = _slicedToArray(_useState, 2),
    timer = _useState2[0],
    setTimer = _useState2[1];
  var getTimeRemaining = function getTimeRemaining(e) {
    var total = Date.parse(e) - Date.parse(new Date());
    var seconds = Math.floor(total / 1000 % 60);
    var minutes = Math.floor(total / 1000 / 60 % 60);
    return {
      total: total,
      minutes: minutes,
      seconds: seconds
    };
  };
  var startTimer = function startTimer(e) {
    var _getTimeRemaining = getTimeRemaining(e),
      total = _getTimeRemaining.total,
      hours = _getTimeRemaining.hours,
      minutes = _getTimeRemaining.minutes,
      seconds = _getTimeRemaining.seconds;
    if (total >= 0) {
      setTimer((minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds));
    } else {
      onFinish();
    }
  };
  var clearTimer = function clearTimer(e) {
    setTimer("20:00");
    if (ref.current) clearInterval(ref.current);
    var id = setInterval(function () {
      startTimer(e);
    }, 1000);
    ref.current = id;
  };
  var getDeadTime = function getDeadTime() {
    var deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 20 * 60);
    return deadline;
  };
  (0,react.useEffect)(function () {
    if (running) clearTimer(getDeadTime());
    return;
  }, [running]);
  return /*#__PURE__*/react.createElement("div", {
    className: "font-bold px-3 text-[3rem] text-primary"
  }, running && timer);
}
/* harmony default export */ const components_Timer = (Timer);
// EXTERNAL MODULE: ./src/redux/reducers/timerReducer.js
var timerReducer = __webpack_require__(9191);
// EXTERNAL MODULE: ./src/utils/useTitle.js
var useTitle = __webpack_require__(3196);
// EXTERNAL MODULE: ./node_modules/dompurify/dist/purify.js
var purify = __webpack_require__(7856);
;// CONCATENATED MODULE: ./src/components/Question.js



function QuizQuestion(props) {
  var question = props.question,
    options = props.options,
    onSelectOption = props.onSelectOption,
    selectedOption = props.selectedOption,
    questionIndex = props.questionIndex;
  console.log(selectedOption);
  return /*#__PURE__*/react.createElement("div", {
    className: "font-primary mb-3"
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex flex-row gap-3 align-top mb-3"
  }, /*#__PURE__*/react.createElement("h2", {
    className: "font-bold mb-1"
  }, questionIndex, "."), /*#__PURE__*/react.createElement("div", {
    className: "bg-white question-content",
    dangerouslySetInnerHTML: {
      __html: purify.sanitize(question)
    }
  })), /*#__PURE__*/react.createElement("hr", null), /*#__PURE__*/react.createElement("div", {
    className: "bg-gray-100 px-3 py-2 rounded-md shadow-md mt-2"
  }, options.map(function (option, index) {
    return /*#__PURE__*/react.createElement("div", {
      className: "ml-3 mb-1",
      key: index
    }, /*#__PURE__*/react.createElement("div", {
      className: "flex items-center gap-2 py-1"
    }, /*#__PURE__*/react.createElement(esm/* Radio */.Y8, {
      id: option.id,
      name: "option",
      value: option.id,
      defaultChecked: (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.id) === (option === null || option === void 0 ? void 0 : option.id),
      onChange: function onChange() {
        return onSelectOption(option);
      }
    }), /*#__PURE__*/react.createElement(esm/* Label */.__, {
      htmlFor: option.id
    }, option.text)));
  })));
}
/* harmony default export */ const Question = (QuizQuestion);
;// CONCATENATED MODULE: ./src/components/QuizProgress.js


function QuizProgress(props) {
  var currentQuestionIndex = props.currentQuestionIndex,
    totalQuestions = props.totalQuestions;
  var progressPercentage = (currentQuestionIndex + 1) / totalQuestions * 100;
  return /*#__PURE__*/react.createElement("div", {
    className: "py-3"
  }, /*#__PURE__*/react.createElement(esm/* Progress */.Ex, {
    progress: parseInt(progressPercentage),
    textLabel: "".concat(currentQuestionIndex + 1, " / ").concat(totalQuestions),
    labelProgress: true,
    size: "lg",
    color: "green"
  }));
}
/* harmony default export */ const components_QuizProgress = (QuizProgress);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useMutation.js
var useMutation = __webpack_require__(319);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useApolloClient.js
var useApolloClient = __webpack_require__(6252);
// EXTERNAL MODULE: ./src/pages/QuizResults.js
var QuizResults = __webpack_require__(2716);
;// CONCATENATED MODULE: ./src/pages/QuizPage.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function QuizPage_slicedToArray(arr, i) { return QuizPage_arrayWithHoles(arr) || QuizPage_iterableToArrayLimit(arr, i) || QuizPage_unsupportedIterableToArray(arr, i) || QuizPage_nonIterableRest(); }
function QuizPage_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function QuizPage_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return QuizPage_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuizPage_arrayLikeToArray(o, minLen); }
function QuizPage_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function QuizPage_iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function QuizPage_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var SUBMIT_QUIZ_ANSWERS = (0,lib/* gql */.Ps)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  mutation SubmitQuizAnswers($quizId: ID!, $answers: [QuizAnswerInput]!) {\n    submitQuizAnswers(quizId: $quizId, answers: $answers) {\n      score\n      questions {\n        id\n        text\n        correctAnswer {\n          id\n          text\n        }\n        userAnswer {\n          id\n          text\n        }\n        explanation\n      }\n    }\n  }\n"])));
function QuizPage(props) {
  var _useState = (0,react.useState)(0),
    _useState2 = QuizPage_slicedToArray(_useState, 2),
    currentQuestionIndex = _useState2[0],
    setCurrentQuestionIndex = _useState2[1];
  var _useState3 = (0,react.useState)({}),
    _useState4 = QuizPage_slicedToArray(_useState3, 2),
    answers = _useState4[0],
    setAnswers = _useState4[1];
  var quiz = props.quiz;
  var currentQuestion = quiz.questions[currentQuestionIndex];
  var isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  var hasNextQuestion = !isLastQuestion;
  var _useMutation = (0,useMutation/* useMutation */.D)(SUBMIT_QUIZ_ANSWERS),
    _useMutation2 = QuizPage_slicedToArray(_useMutation, 2),
    submitQuizAnswers = _useMutation2[0],
    _useMutation2$ = _useMutation2[1],
    isSubmitting = _useMutation2$.loading,
    error = _useMutation2$.error,
    data = _useMutation2$.data;
  function handleSelectOption(questionId, option) {
    setAnswers(_objectSpread(_objectSpread({}, answers), {}, _defineProperty({}, questionId, option)));
    console.log(answers);
  }
  function handleNextQuestion() {
    if (hasNextQuestion && answers[currentQuestion.id]) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }
  function handlePreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }
  var _useState5 = (0,react.useState)(),
    _useState6 = QuizPage_slicedToArray(_useState5, 2),
    result = _useState6[0],
    setResults = _useState6[1];
  var client = (0,useApolloClient/* useApolloClient */.x)();
  var dispatch = (0,es/* useDispatch */.I0)();
  function handleSubmit() {
    return _handleSubmit.apply(this, arguments);
  }
  function _handleSubmit() {
    _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var quizId, answersArray, res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            quizId = quiz.id;
            dispatch((0,timerReducer/* stopTimer */.N6)());
            answersArray = Object.entries(answers).map(function (_ref) {
              var _ref2 = QuizPage_slicedToArray(_ref, 2),
                questionId = _ref2[0],
                answer = _ref2[1];
              return {
                questionId: questionId,
                answer: answer.id
              };
            });
            _context.next = 5;
            return submitQuizAnswers({
              variables: {
                quizId: quizId,
                answers: answersArray
              }
            });
          case 5:
            res = _context.sent;
            setResults(res.data.submitQuizAnswers);
            client.resetStore();
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _handleSubmit.apply(this, arguments);
  }
  return /*#__PURE__*/react.createElement(react.Fragment, null, !result && /*#__PURE__*/react.createElement("div", {
    className: "mt-8 sm:w-full md:w-[600px]"
  }, currentQuestion && /*#__PURE__*/react.createElement(Question, {
    key: currentQuestion.id,
    question: currentQuestion.text,
    options: currentQuestion.options,
    selectedOption: answers[currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.id],
    onSelectOption: function onSelectOption(option) {
      return handleSelectOption(currentQuestion.id, option);
    },
    questionIndex: currentQuestionIndex + 1
  }), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-row gap-5"
  }, currentQuestionIndex > 0 && /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    onClick: handlePreviousQuestion
  }, isSubmitting && /*#__PURE__*/react.createElement("svg", {
    className: "animate-spin h-5 w-5 mr-3",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4",
    fill: "none"
  }), /*#__PURE__*/react.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
  })), "Ikibanza"), hasNextQuestion && /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    disabled: !answers[currentQuestion.id],
    onClick: handleNextQuestion
  }, isSubmitting && /*#__PURE__*/react.createElement("svg", {
    className: "animate-spin h-5 w-5 mr-3",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4",
    fill: "none"
  }), /*#__PURE__*/react.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
  })), "Igikurikira"), !hasNextQuestion && /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    disabled: !answers[currentQuestion.id],
    onClick: handleSubmit
  }, isSubmitting && /*#__PURE__*/react.createElement("svg", {
    className: "animate-spin h-5 w-5 mr-3",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4",
    fill: "none"
  }), /*#__PURE__*/react.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
  })), isSubmitting ? "Komereza..." : "Ohereza")), /*#__PURE__*/react.createElement(components_QuizProgress, {
    currentQuestionIndex: answers[currentQuestion.id] ? currentQuestionIndex : currentQuestionIndex - 1,
    totalQuestions: quiz.questions.length
  })), result && /*#__PURE__*/react.createElement(QuizResults/* default */.Z, result), /*#__PURE__*/react.createElement(esm/* Modal */.u_, {
    isOpen: isSubmitting
  }, /*#__PURE__*/react.createElement(esm/* Modal.Body */.u_.Body, null, /*#__PURE__*/react.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react.createElement("p", {
    className: "text-lg font-bold"
  }, "Sending your answers...")))));
}
/* harmony default export */ const pages_QuizPage = (QuizPage);
;// CONCATENATED MODULE: ./src/pages/ExamPage.js
var ExamPage_templateObject;
function ExamPage_slicedToArray(arr, i) { return ExamPage_arrayWithHoles(arr) || ExamPage_iterableToArrayLimit(arr, i) || ExamPage_unsupportedIterableToArray(arr, i) || ExamPage_nonIterableRest(); }
function ExamPage_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ExamPage_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ExamPage_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ExamPage_arrayLikeToArray(o, minLen); }
function ExamPage_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ExamPage_iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function ExamPage_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ExamPage_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }











var GET_QUIZ = (0,lib/* gql */.Ps)(ExamPage_templateObject || (ExamPage_templateObject = ExamPage_taggedTemplateLiteral(["\n  query GetQuiz($id: ID!) {\n    getQuiz(id: $id) {\n      title\n      id\n      description\n      questions {\n        text\n        id\n        options {\n          id\n          text\n        }\n      }\n      score\n      createdAt\n    }\n  }\n"])));
function ExamPage() {
  var _useParams = (0,dist/* useParams */.UO)(),
    id = _useParams.id;
  (0,useTitle/* default */.Z)("Take Quiz");
  var dispatch = (0,es/* useDispatch */.I0)();
  var _useState = (0,react.useState)(false),
    _useState2 = ExamPage_slicedToArray(_useState, 2),
    start = _useState2[0],
    setStart = _useState2[1];
  var _useState3 = (0,react.useState)(),
    _useState4 = ExamPage_slicedToArray(_useState3, 2),
    quiz = _useState4[0],
    setQuiz = _useState4[1];
  var _useLazyQuery = (0,useLazyQuery/* useLazyQuery */.t)(GET_QUIZ),
    _useLazyQuery2 = ExamPage_slicedToArray(_useLazyQuery, 2),
    getQuiz = _useLazyQuery2[0],
    loading = _useLazyQuery2[1].loading;
  (0,react.useEffect)(function () {
    getQuiz({
      variables: {
        id: id
      },
      onCompleted: function onCompleted(data) {
        return setQuiz(data.getQuiz);
      }
    });
  }, []);
  var handleStart = function handleStart() {
    dispatch((0,timerReducer/* startTimer */.Xg)());
    setStart(true);
  };
  var handleFinish = function handleFinish() {
    setStart(false);
    react_toastify_esm/* toast.error */.Am.error("You have runned out of time");
    dispatch((0,timerReducer/* stopTimer */.N6)());
    return;
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "flex flex-col items-center w-md justify-center h-full relative"
  }, quiz ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "absolute top-1 right-5 rounded-md shadow-lg bg-white"
  }, start && /*#__PURE__*/react.createElement(components_Timer, {
    onFinish: handleFinish,
    duration: 1200
  })), /*#__PURE__*/react.createElement("div", {
    className: "p-6 mt-20 bg-white rounded-md w-md shadow-md "
  }, !start && /*#__PURE__*/react.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/react.createElement("h1", {
    className: "font-bold text-2xl mb-4"
  }, quiz.title), /*#__PURE__*/react.createElement("hr", null), /*#__PURE__*/react.createElement("p", {
    className: "text-lg font-medium"
  }, quiz.description), /*#__PURE__*/react.createElement("p", {
    className: "text-sm font-thin text-left mt-3"
  }, "Amanota: ", /*#__PURE__*/react.createElement("b", null, quiz.score)), /*#__PURE__*/react.createElement("p", {
    className: "text-sm font-thin"
  }, "Yasohotse: ", /*#__PURE__*/react.createElement("b", null, quiz.createdAt)), /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    pill: true,
    gradientMonochrome: "success",
    color: "success",
    className: "mt-4 duration-200 transition-all",
    onClick: handleStart
  }, "Tangira ikizamini", " ", /*#__PURE__*/react.createElement(index_esm/* BsArrowRight */.lzl, {
    className: "inline-block ml-2"
  }))), start && /*#__PURE__*/react.createElement(pages_QuizPage, {
    quiz: quiz,
    onFinish: handleFinish
  }))) : /*#__PURE__*/react.createElement("button", {
    type: "submit",
    className: "inline-flex items-center px-4 py-2 my-auto mt-20 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    disabled: loading
  }, loading && /*#__PURE__*/react.createElement("svg", {
    className: "animate-spin h-5 w-5 mr-3",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4",
    fill: "none"
  }), /*#__PURE__*/react.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
  })), "Loading..."));
}
/* harmony default export */ const pages_ExamPage = (ExamPage);

/***/ }),

/***/ 2716:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7856);
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6515);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7294);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9583);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9655);





function QuizResult(_ref) {
  var score = _ref.score,
    questions = _ref.questions;
  var percentScore = (score / questions.length * 100).toFixed();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "w-full p-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "font-bold text-2xl mb-4 flex items-center flex-row gap-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h1", null, "Amanota: ", score, " / ", questions.length, " \u27A1\uFE0F", " ", percentScore >= 60 ? "Watsinze" : "Ntabwo watsinze"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "h-12 w-12 flex items-center justify-center rounded-full mb-4 ".concat(percentScore >= 60 ? "bg-green-400" : "bg-red-400")
  }, percentScore >= 60 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__/* .FaCheck */ .l_A, {
    className: "text-white text-2xl"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__/* .FaTimes */ .aHS, {
    className: "text-white text-2xl"
  }))), questions.map(function (question) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      key: question.id,
      className: "p-4 border-2 rounded-lg mb-4 ".concat(question.correctAnswer.id === question.userAnswer.id ? "border-green-400 bg-green-100" : "border-red-400 bg-red-100")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: " mb-2",
      dangerouslySetInnerHTML: {
        __html: dompurify__WEBPACK_IMPORTED_MODULE_0__.sanitize(question.text)
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("hr", {
      className: "text-red-500 border border-red-500"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "flex items-center mb-2 mt-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "font-bold mr-2"
    }, "Igisubizo cya nyacyo:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, question.correctAnswer.text)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "flex items-center mb-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "font-bold mr-2"
    }, "Igisubizo cyawe:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, question.userAnswer.text)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "flex flex-col  justify-start"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "font-bold mr-2"
    }, "Ubusobanuro:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: dompurify__WEBPACK_IMPORTED_MODULE_0__.sanitize(question.explanation)
      }
    })), question.correctAnswer.id === question.userAnswer.id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "flex items-center mt-2 text-green-400"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__/* .FaCheck */ .l_A, {
      className: "mr-1"
    }), "Wagikoze neza") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "flex items-center mt-2 text-red-400"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__/* .FaTimes */ .aHS, {
      className: "mr-1"
    }), "Ntabwo wagikoze"));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__/* .Link */ .rU, {
    to: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_1__/* .Button */ .zx, {
    color: "info"
  }, "Subira Ahatangira")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuizResult);

/***/ }),

/***/ 3196:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);

function useTitle(title) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    document.title = "".concat(title, " | DL");
  }, [title]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useTitle);

/***/ })

}]);
//# sourceMappingURL=954.bundle.js.map