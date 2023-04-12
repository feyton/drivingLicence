"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[723],{

/***/ 6708:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6515);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
var _excluded = ["loading", "children"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


function ButtonCustom(_ref) {
  var _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, props, loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("svg", {
    className: "animate-spin h-5 w-5 mr-3",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4",
    fill: "none"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
  })), children);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonCustom);

/***/ }),

/***/ 8723:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(319);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6252);
/* harmony import */ var _apollo_client_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9098);
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6515);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7536);
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1167);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6042);
/* harmony import */ var _components_ButtonCustom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6708);
/* harmony import */ var _utils_useTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3196);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var ADD_QUESTION = (0,_apollo_client_core__WEBPACK_IMPORTED_MODULE_6__/* .gql */ .Ps)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  mutation AddQuestion($input: QuestionInput!) {\n    AddQuestion(input: $input) {\n      id\n      text\n      options {\n        id\n        text\n      }\n      answer\n      explanation\n    }\n  }\n"])));
function QuestionForm() {
  (0,_utils_useTitle__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)("Add question");
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__/* .useForm */ .cI)({
      defaultValues: {
        options: [{}]
      }
    }),
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    control = _useForm.control,
    errors = _useForm.formState.errors,
    reset = _useForm.reset;
  var _useMutation = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_8__/* .useMutation */ .D)(ADD_QUESTION),
    _useMutation2 = _slicedToArray(_useMutation, 2),
    addQuestion = _useMutation2[0],
    loading = _useMutation2[1].loading;
  var client = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_9__/* .useApolloClient */ .x)();
  var onSubmit = function onSubmit(data) {
    var input = _objectSpread({}, data);
    addQuestion({
      variables: {
        input: input
      }
    }).then(function (result) {
      react_toastify__WEBPACK_IMPORTED_MODULE_3__/* .toast.success */ .Am.success("Question added");
      reset();
      client.resetStore();
    })["catch"](function (error) {
      react_toastify__WEBPACK_IMPORTED_MODULE_3__/* .toast.error */ .Am.error(error === null || error === void 0 ? void 0 : error.message);
    });
  };
  var quilRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  var handleImageUpload = function handleImageUpload() {
    var editor = quilRef.current.getEditor();
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
        var file, formData, res, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              file = input.files[0];
              formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "driving");
              _context.prev = 5;
              _context.next = 8;
              return fetch("https://api.cloudinary.com/v1_1/feyton/image/upload", {
                method: "POST",
                body: formData
              });
            case 8:
              res = _context.sent;
              _context.next = 11;
              return res.json();
            case 11:
              data = _context.sent;
              editor.insertEmbed(editor.getSelection(), "image", data.secure_url);
              _context.next = 19;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](5);
              console.error(_context.t0);
              react_toastify__WEBPACK_IMPORTED_MODULE_3__/* .toast.error */ .Am.error(_context.t0.message);
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[5, 15]]);
      }));
      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }();
  };
  var modules = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(function () {
    return {
      toolbar: {
        container: [["bold", "italic", "underline"], [{
          list: "ordered"
        }, {
          list: "bullet"
        }, {
          indent: "-1"
        }, {
          indent: "+1"
        }], ["link", "image"], ["clean"]],
        handlers: {
          image: handleImageUpload
        }
      }
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "px-5 mt-5 mx-auto w-full "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("form", {
    className: "max-w-xl mx-auto bg-white rounded-md px-6 pb-4 pt-2",
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", {
    className: "font-bold text-3xl text-center mb-2"
  }, "Ongeraho Ikibazo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "min-h-fit "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    required: true,
    htmlFor: "question"
  }, "Ikibazo:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__/* .Controller */ .Qr, {
    control: control,
    name: "text",
    rules: {
      required: "This field is required",
      minLength: {
        value: 15,
        message: "Enter at least 10 characters in the question"
      }
    },
    error: errors.text,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        onBlur = _ref2$field.onBlur,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_quill__WEBPACK_IMPORTED_MODULE_2__, {
        theme: "snow",
        ref: quilRef,
        onChange: function onChange(value) {
          return _onChange(value);
        },
        value: value || "",
        modules: modules,
        className: errors !== null && errors !== void 0 && errors.text ? "border border-red-500 rounded-md" : "border border-green-300 rounded-md"
      });
    }
  }), errors.text && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
    className: "text-red-500 "
  }, errors.text.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "  mb-4 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    htmlFor: "options block mb-2",
    required: true
  }, "Amahitamo:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row gap-2 mb-1 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[0].id",
    id: "options[0].id",
    readOnly: true,
    value: "A",
    className: "mr-2 leading-tight w-[40px] font-bold outline-none border-0 appearance-none  rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[0].id", {
    required: "Aha hakeneye kuzuzwa"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[0].text",
    id: "options[0].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Uzuza hano igisubizo"
  }, register("options[0].text", {
    required: "Aha hakeneye kuzuzwa"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[1].id",
    id: "options[1].id",
    value: "B",
    readOnly: true,
    className: "mr-2 w-[40px] font-bold outline-none border-0 leading-tight  appearance-none  rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[1].id", {
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[1].text",
    id: "options[1].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Uzuza hano igisubizo"
  }, register("options[1].text", {
    required: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[2].id",
    id: "options[2].id",
    readOnly: true,
    value: "C",
    className: "mr-2 w-[40px] font-bold outline-none border-0 leading-tight appearance-none  rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[2].id", {
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[2].text",
    id: "options[2].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Uzuza hano igisubizo"
  }, register("options[2].text", {
    required: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    value: "D",
    name: "options[3].id",
    id: "options[3].id",
    readOnly: true,
    className: "mr-2 leading-tight w-[40px] font-bold outline-none border-0 appearance-none rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[3].id", {
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[3].text",
    id: "options[3].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Uzuza hano igisubizo"
  }, register("options[3].text", {
    required: true
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    htmlFor: "answer"
  }, "Answer:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Select */ .Ph, _extends({
    className: "rounded-md"
  }, register("answer", {
    required: "Ugomba guhitamo igisubizo"
  }), {
    name: "answer",
    id: "answer",
    helperText: errors.answer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, "Oops! ", errors.answer.message),
    color: errors.answer && "failure"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "",
    hidden: true
  }, "Hitamo igisubizo cya nyacyo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "A"
  }, "A"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "B"
  }, "B"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "C"
  }, "C"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "D"
  }, "D"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-col gap-1 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    htmlFor: "category"
  }, "Ikiciro:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Select */ .Ph, _extends({
    className: "rounded-md"
  }, register("category", {
    required: "Ikiciro kirakenewe"
  }), {
    name: "category",
    id: "",
    helperText: (errors === null || errors === void 0 ? void 0 : errors.category) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, "Oops! ", errors.category.message),
    color: (errors === null || errors === void 0 ? void 0 : errors.category) && "failure"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "",
    hidden: true
  }, "Hitamo ikiciro"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "general"
  }, "Ibisanzwe"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "posts"
  }, "Ibyapa"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "mb-6 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    className: "font-primary",
    htmlFor: "explanation"
  }, "Ubusobanuro bw'igisubizo:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__/* .Controller */ .Qr, {
    control: control,
    name: "explanation",
    rules: {
      required: "Ubusobanuro buracyenewe",
      minLength: {
        value: 15,
        message: "Byibura imigemo 10 y'amagambo irakenewe"
      }
    },
    error: errors.explanation,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange2 = _ref3$field.onChange,
        onBlur = _ref3$field.onBlur,
        value = _ref3$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_quill__WEBPACK_IMPORTED_MODULE_2__, {
        theme: "snow",
        onChange: function onChange(value) {
          return _onChange2(value);
        },
        value: value || "",
        modules: {
          toolbar: [["bold", "italic", "underline"], [{
            list: "ordered"
          }, {
            list: "bullet"
          }, {
            indent: "-1"
          }, {
            indent: "+1"
          }], ["link"], ["clean"]]
        },
        className: errors !== null && errors !== void 0 && errors.explanation ? "border border-red-500 rounded-md" : "border border-green-300 rounded-md"
      });
    }
  }), errors.explanation && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, errors.explanation.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_ButtonCustom__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
    loading: loading,
    className: "mt-3",
    type: "submit"
  }, "Ohereza"))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuestionForm);

/***/ }),

/***/ 3196:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);

function useTitle(title) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    document.title = "".concat(title, " | DriveTestPro");
  }, [title]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useTitle);

/***/ })

}]);