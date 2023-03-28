"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[905],{

/***/ 9905:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_GetQuizzes)
});

// EXTERNAL MODULE: ./node_modules/graphql-tag/lib/index.js + 10 modules
var lib = __webpack_require__(9098);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useLazyQuery.js + 2 modules
var useLazyQuery = __webpack_require__(6162);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useMutation.js
var useMutation = __webpack_require__(319);
// EXTERNAL MODULE: ./node_modules/flowbite-react/lib/esm/index.js + 136 modules
var esm = __webpack_require__(6515);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(7536);
// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/index.js
var dist = __webpack_require__(9655);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs + 1 modules
var react_toastify_esm = __webpack_require__(6042);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useApolloClient.js
var useApolloClient = __webpack_require__(6252);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.esm.js
var fa_index_esm = __webpack_require__(9583);
// EXTERNAL MODULE: ./src/utils/CheckRole.js
var CheckRole = __webpack_require__(3881);
;// CONCATENATED MODULE: ./src/components/QuizList.js
var _templateObject;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var DELETE_QUIZ = (0,lib/* gql */.Ps)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  mutation DeleteQuiz($id: ID!) {\n    DeleteQuiz(id: $id) {\n      id\n      title\n    }\n  }\n"])));
function QuizList(_ref) {
  var quizzes = _ref.quizzes;
  var _useMutation = (0,useMutation/* useMutation */.D)(DELETE_QUIZ),
    _useMutation2 = _slicedToArray(_useMutation, 1),
    deleteQuiz = _useMutation2[0];
  var _useState = (0,react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showDeleteModal = _useState2[0],
    setShowDeleteModal = _useState2[1];
  var _useState3 = (0,react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedQuiz = _useState4[0],
    setSelectedQuiz = _useState4[1];
  var client = (0,useApolloClient/* useApolloClient */.x)();
  var handleDelete = function handleDelete() {
    if (selectedQuiz) {
      deleteQuiz({
        variables: {
          id: selectedQuiz.id
        },
        onCompleted: function onCompleted(data) {
          react_toastify_esm/* toast.success */.Am.success("Quiz deleted");
          client.resetStore();
        }
      });
      setShowDeleteModal(false);
    }
  };
  var handleShowDeleteModal = function handleShowDeleteModal(quiz) {
    setSelectedQuiz(quiz);
    setShowDeleteModal(true);
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "flex flex-row gap-3 flex-wrap py-2 w-full justify-start"
  }, quizzes.map(function (quiz, index) {
    return /*#__PURE__*/react.createElement(esm/* Card */.Zb, {
      className: "w-[400px] ".concat(quiz.userAttempts > 0 && "bg-green-300 bg-opacity-10", " "),
      key: index
    }, quiz.userAttempts > 0 && /*#__PURE__*/react.createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/react.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/react.createElement(fa_index_esm/* FaCheckCircle */.FJM, {
      className: "mr-2 text-green-500"
    }), /*#__PURE__*/react.createElement("span", {
      className: "text-xs font-medium"
    }, "You have attempted this quiz ", /*#__PURE__*/react.createElement("b", null, quiz.userAttempts), " ", "time(s)."))), /*#__PURE__*/react.createElement("h5", {
      className: "text-xl font-bold tracking-tight text-gray-900 dark:text-white"
    }, quiz.title), /*#__PURE__*/react.createElement("hr", null), /*#__PURE__*/react.createElement("p", {
      className: "font-normal text-sm text-gray-700 dark:text-gray-400"
    }, quiz.description), /*#__PURE__*/react.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/react.createElement("img", {
      src: quiz.user.picture,
      alt: "User Avatar",
      className: "w-10 h-10 rounded-full mr-2"
    }), /*#__PURE__*/react.createElement("div", {
      className: "flex flex-col"
    }, /*#__PURE__*/react.createElement("h5", {
      className: "text-sm font-medium text-gray-900 dark:text-white"
    }, quiz.user.name), /*#__PURE__*/react.createElement("p", {
      className: "text-xs text-gray-500"
    }, quiz.createdAt))), /*#__PURE__*/react.createElement("p", {
      className: "text-muted text-xs "
    }, "Ibibazo: ", /*#__PURE__*/react.createElement("b", null, quiz.score), ". Abantu ", /*#__PURE__*/react.createElement("b", null, quiz.attempts), " ", "barayikoze."), /*#__PURE__*/react.createElement("div", {
      className: "flex justify-between flex-wrap items-center mt-4 gap-4"
    }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
      to: "/quiz/".concat(quiz.id)
    }, /*#__PURE__*/react.createElement(esm/* Button */.zx, null, "Kora ikizamini", /*#__PURE__*/react.createElement("svg", {
      className: "ml-2 -mr-1 h-4 w-4",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/react.createElement("path", {
      fillRule: "evenodd",
      d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
      clipRule: "evenodd"
    })))), /*#__PURE__*/react.createElement(CheckRole/* default */.Z, {
      roles: ["super"]
    }, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
      color: "failure",
      onClick: function onClick() {
        return handleShowDeleteModal(quiz);
      }
    }, /*#__PURE__*/react.createElement(fa_index_esm/* FaTrash */.Xm5, {
      className: "mr-3"
    }), "Siba"))));
  }), /*#__PURE__*/react.createElement(esm/* Modal */.u_, {
    show: showDeleteModal,
    onClose: function onClose() {
      return setShowDeleteModal(false);
    }
  }, /*#__PURE__*/react.createElement(esm/* Modal.Header */.u_.Header, null, "Siba ikizamini"), /*#__PURE__*/react.createElement(esm/* Modal.Body */.u_.Body, null, "Koko se dukomeze dusibe iki kizamini?"), /*#__PURE__*/react.createElement(esm/* Modal.Footer */.u_.Footer, null, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    color: "success",
    onClick: function onClick() {
      return setShowDeleteModal(false);
    }
  }, "Oya"), /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    color: "failure",
    variant: "danger",
    onClick: handleDelete
  }, "Siba"))));
}
/* harmony default export */ const components_QuizList = (QuizList);
;// CONCATENATED MODULE: ./src/pages/GetQuizzes.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var GetQuizzes_templateObject, _templateObject2;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function GetQuizzes_slicedToArray(arr, i) { return GetQuizzes_arrayWithHoles(arr) || GetQuizzes_iterableToArrayLimit(arr, i) || GetQuizzes_unsupportedIterableToArray(arr, i) || GetQuizzes_nonIterableRest(); }
function GetQuizzes_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function GetQuizzes_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return GetQuizzes_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GetQuizzes_arrayLikeToArray(o, minLen); }
function GetQuizzes_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function GetQuizzes_iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function GetQuizzes_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function GetQuizzes_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var GET_QUIZZES = (0,lib/* gql */.Ps)(GetQuizzes_templateObject || (GetQuizzes_templateObject = GetQuizzes_taggedTemplateLiteral(["\n  query GetQuizzes {\n    getQuizzes {\n      title\n      description\n      id\n      score\n      attempts\n      createdAt\n      userAttempts\n      user {\n        name\n        picture\n      }\n    }\n  }\n"])));
var CREATE_QUIZ = (0,lib/* gql */.Ps)(_templateObject2 || (_templateObject2 = GetQuizzes_taggedTemplateLiteral(["\n  mutation CreateQuiz($input: QuizInput!) {\n    CreateQuiz(input: $input) {\n      title\n      description\n      id\n      score\n    }\n  }\n"])));
function GetQuizzes() {
  var _useLazyQuery = (0,useLazyQuery/* useLazyQuery */.t)(GET_QUIZZES),
    _useLazyQuery2 = GetQuizzes_slicedToArray(_useLazyQuery, 2),
    getQuizzes = _useLazyQuery2[0],
    getQuizLoading = _useLazyQuery2[1].loading;
  var _useState = (0,react.useState)(),
    _useState2 = GetQuizzes_slicedToArray(_useState, 2),
    quizzes = _useState2[0],
    setQuizzes = _useState2[1];
  var _useMutation = (0,useMutation/* useMutation */.D)(CREATE_QUIZ),
    _useMutation2 = GetQuizzes_slicedToArray(_useMutation, 2),
    createQuiz = _useMutation2[0],
    loading = _useMutation2[1].loading;
  var _useState3 = (0,react.useState)(false),
    _useState4 = GetQuizzes_slicedToArray(_useState3, 2),
    showModal = _useState4[0],
    setShowModal = _useState4[1];
  var _useForm = (0,index_esm/* useForm */.cI)({
      mode: "onBlur"
    }),
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    reset = _useForm.reset,
    errors = _useForm.formState.errors;
  var handleCreateQuiz = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            createQuiz({
              variables: {
                input: data
              },
              onCompleted: function onCompleted() {
                reset();
                setShowModal(false);
                react_toastify_esm/* toast.success */.Am.success("Quiz created succesfully");
                getQuizzes({
                  onCompleted: function onCompleted(data) {
                    return setQuizzes(data.getQuizzes);
                  },
                  fetchPolicy: "network-only"
                });
              },
              onError: function onError(error) {
                return react_toastify_esm/* toast.error */.Am.error(error.message);
              }
            });
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleCreateQuiz(_x2) {
      return _ref.apply(this, arguments);
    };
  }();
  (0,react.useEffect)(function () {
    getQuizzes({
      onCompleted: function onCompleted(data) {
        return setQuizzes(data.getQuizzes);
      },
      onError: function onError(error) {
        return react_toastify_esm/* toast.error */.Am.error(error.message);
      }
    });
  }, []);
  return /*#__PURE__*/react.createElement("div", {
    className: "px-5 mt-10 w-full"
  }, /*#__PURE__*/react.createElement(CheckRole/* default */.Z, {
    roles: ["admin", "superuser"]
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex justify-end mb-3"
  }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "/quiz/new"
  }, /*#__PURE__*/react.createElement(esm/* Button */.zx, null, "Create Quiz"))), /*#__PURE__*/react.createElement("hr", null)), quizzes && /*#__PURE__*/react.createElement(components_QuizList, {
    quizzes: quizzes
  }), getQuizLoading && /*#__PURE__*/react.createElement("button", {
    type: "submit",
    className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    disabled: loading
  }, "(", /*#__PURE__*/react.createElement("svg", {
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
  })), ") Loading"), /*#__PURE__*/react.createElement(esm/* Modal */.u_, {
    show: showModal,
    onClose: function onClose() {
      return setShowModal(false);
    }
  }, /*#__PURE__*/react.createElement(esm/* Modal.Header */.u_.Header, null, "Create Quiz"), /*#__PURE__*/react.createElement(esm/* Modal.Body */.u_.Body, null, /*#__PURE__*/react.createElement("form", {
    onSubmit: handleSubmit(handleCreateQuiz)
  }, /*#__PURE__*/react.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/react.createElement("label", {
    htmlFor: "title",
    className: "block text-gray-700 font-bold mb-2"
  }, "Title"), /*#__PURE__*/react.createElement(esm/* TextInput */.oi, _extends({
    type: "text",
    name: "title",
    id: "title",
    className: "form-input rounded-md shadow-sm mt-1 block w-full"
  }, register("title", {
    required: "This field is required",
    minLength: {
      value: 3,
      message: "Title must be at least 3 characters"
    }
  }), {
    helperText: errors.title && /*#__PURE__*/react.createElement(react.Fragment, null, "Oops: ", errors.title.message),
    placeholder: "Quiz title",
    color: (errors === null || errors === void 0 ? void 0 : errors.title) && "failure"
  }))), /*#__PURE__*/react.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/react.createElement("label", {
    htmlFor: "description",
    className: "block text-gray-700 font-bold mb-2"
  }, "Description"), /*#__PURE__*/react.createElement(esm/* Textarea */.gx, _extends({
    name: "description",
    id: "description",
    className: "form-textarea rounded-md shadow-sm mt-1 block w-full",
    rows: "3"
  }, register("description", {
    required: "Description is required",
    minLength: {
      value: 10,
      message: "Description must be at least 10 characters"
    }
  }), {
    helperText: (errors === null || errors === void 0 ? void 0 : errors.description) && /*#__PURE__*/react.createElement(react.Fragment, null, "Oops! ", errors.description.message),
    color: (errors === null || errors === void 0 ? void 0 : errors.description) && "failure"
  }))), /*#__PURE__*/react.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/react.createElement("button", {
    type: "submit",
    className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
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
  })), "Create Quiz"))))));
}
/* harmony default export */ const pages_GetQuizzes = (GetQuizzes);

/***/ }),

/***/ 3881:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5998);


var CheckRole = function CheckRole(_ref) {
  var _user$user, _user$user2;
  var children = _ref.children,
    _ref$roles = _ref.roles,
    roles = _ref$roles === void 0 ? ["user"] : _ref$roles;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__/* .useSelector */ .v9)(function (state) {
      return state === null || state === void 0 ? void 0 : state.auth;
    }),
    user = _useSelector.user;
  if ((user === null || user === void 0 ? void 0 : (_user$user = user.user) === null || _user$user === void 0 ? void 0 : _user$user.role) === "super") {
    return children;
  }
  if (roles.includes(user === null || user === void 0 ? void 0 : (_user$user2 = user.user) === null || _user$user2 === void 0 ? void 0 : _user$user2.role)) {
    return children;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckRole);

/***/ })

}]);
//# sourceMappingURL=905.bundle.js.map