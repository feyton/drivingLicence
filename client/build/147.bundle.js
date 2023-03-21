"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[147],{

/***/ 4147:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_GetQuestions)
});

// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useLazyQuery.js + 2 modules
var useLazyQuery = __webpack_require__(6162);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useApolloClient.js
var useApolloClient = __webpack_require__(6252);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useMutation.js
var useMutation = __webpack_require__(319);
// EXTERNAL MODULE: ./node_modules/graphql-tag/lib/index.js + 10 modules
var lib = __webpack_require__(9098);
// EXTERNAL MODULE: ./node_modules/dompurify/dist/purify.js
var purify = __webpack_require__(7856);
// EXTERNAL MODULE: ./node_modules/flowbite-react/lib/esm/index.js + 136 modules
var esm = __webpack_require__(6515);
// EXTERNAL MODULE: ./node_modules/react-icons/hi/index.esm.js
var index_esm = __webpack_require__(3854);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/index.js
var dist = __webpack_require__(9655);
// EXTERNAL MODULE: ./node_modules/react-table/index.js
var react_table = __webpack_require__(9521);
;// CONCATENATED MODULE: ./src/pages/Questions.js
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }



function DataTable(_ref) {
  var data = _ref.data,
    columns = _ref.columns;
  var sortedData = react.useMemo(function () {
    return _toConsumableArray(data);
  }, [data]);
  var sortedColumns = react.useMemo(function () {
    return [{
      Header: "☑️",
      accessor: "",
      Cell: function Cell() {
        return /*#__PURE__*/react.createElement(esm/* Checkbox */.XZ, null);
      },
      sortable: false
    }].concat(_toConsumableArray(columns));
  }, [columns]);
  var TableInstance = (0,react_table.useTable)({
    data: sortedData,
    columns: sortedColumns,
    initialState: {
      pageSize: 100
    }
  }, react_table.useGlobalFilter, react_table.useSortBy, react_table.usePagination);
  var getTableProps = TableInstance.getTableProps,
    getTableBodyProps = TableInstance.getTableBodyProps,
    page = TableInstance.page,
    headerGroups = TableInstance.headerGroups,
    prepareRow = TableInstance.prepareRow,
    state = TableInstance.state;
  return /*#__PURE__*/react.createElement("div", {
    className: "overflow-y-scroll w-full"
  }, /*#__PURE__*/react.createElement(esm/* Table */.iA, _extends({
    striped: true,
    hoverable: true,
    className: "px-4 mb-5 w-full"
  }, getTableProps()), headerGroups.map(function (headerGroup) {
    return /*#__PURE__*/react.createElement(esm/* Table.Head */.iA.Head, headerGroup.getHeaderGroupProps(), headerGroup.headers.map(function (column) {
      return /*#__PURE__*/react.createElement(esm/* Table.HeadCell */.iA.HeadCell, column.getHeaderProps(column.getSortByToggleProps()), column.render("Header"), column.isSorted ? column.isSortedDesc ? " 🔽" : " 🔼" : "");
    }));
  }), /*#__PURE__*/react.createElement(esm/* Table.Body */.iA.Body, getTableBodyProps(), page.map(function (row) {
    prepareRow(row);
    return /*#__PURE__*/react.createElement(esm/* Table.Row */.iA.Row, row.getRowProps(), row.cells.map(function (cell) {
      return /*#__PURE__*/react.createElement(esm/* Table.Cell */.iA.Cell, _extends({
        className: "text-xs"
      }, cell.getCellProps()), cell.render("Cell"));
    }));
  }))));
}
;// CONCATENATED MODULE: ./src/pages/GetQuestions.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || GetQuestions_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function GetQuestions_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return GetQuestions_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GetQuestions_arrayLikeToArray(o, minLen); }
function GetQuestions_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var GET_QUESTIONS = (0,lib/* gql */.Ps)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query getQuestions {\n    getQuestions {\n      text\n      answer\n      approved\n      id\n      correctAnswer {\n        text\n      }\n    }\n  }\n"])));
var APPROVE_QUESTION = (0,lib/* gql */.Ps)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  mutation ApproveQuestion($id: ID!) {\n    ApproveQuestion(id: $id) {\n      id\n      approved\n      text\n    }\n  }\n"])));
var DELETE_QUESTION = (0,lib/* gql */.Ps)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  mutation DeleteQuestion($id: ID!) {\n    DeleteQuestion(id: $id) {\n      text\n    }\n  }\n"])));
var GET_QUESTION = (0,lib/* gql */.Ps)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  query getQuestion($id: ID!) {\n    getQuestion(id: $id) {\n      text\n      id\n      answer\n      approved\n      options {\n        id\n        text\n      }\n      explanation\n      user {\n        name\n      }\n      createdAt\n      correctAnswer {\n        id\n        text\n      }\n    }\n  }\n"])));



function GetQuestions() {
  var _useLazyQuery = (0,useLazyQuery/* useLazyQuery */.t)(GET_QUESTIONS),
    _useLazyQuery2 = _slicedToArray(_useLazyQuery, 2),
    getQuestions = _useLazyQuery2[0],
    loading = _useLazyQuery2[1].loading;
  var _useLazyQuery3 = (0,useLazyQuery/* useLazyQuery */.t)(GET_QUESTION),
    _useLazyQuery4 = _slicedToArray(_useLazyQuery3, 2),
    getQuestion = _useLazyQuery4[0],
    _useLazyQuery4$ = _useLazyQuery4[1],
    loadingQuestion = _useLazyQuery4$.loading,
    data = _useLazyQuery4$.data;
  var _useState = (0,react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    selectedQuestionView = _useState2[0],
    setSelectedQuestionView = _useState2[1];
  var _useState3 = (0,react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    questions = _useState4[0],
    setQuestions = _useState4[1];
  var client = (0,useApolloClient/* useApolloClient */.x)();
  var _useMutation = (0,useMutation/* useMutation */.D)(DELETE_QUESTION),
    _useMutation2 = _slicedToArray(_useMutation, 1),
    deleteQuestion = _useMutation2[0];
  var _useMutation3 = (0,useMutation/* useMutation */.D)(APPROVE_QUESTION),
    _useMutation4 = _slicedToArray(_useMutation3, 1),
    approveQuestion = _useMutation4[0];
  var _useState5 = (0,react.useState)(),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedQuestion = _useState6[0],
    setselectedQuestion = _useState6[1];
  var _useState7 = (0,react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showDeleteModal = _useState8[0],
    setShowDeleteModal = _useState8[1];
  (0,react.useEffect)(function () {
    getQuestions({
      onCompleted: function onCompleted(data) {
        setQuestions(data.getQuestions);
      }
    });
  }, []);
  var handleApprove = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return approveQuestion({
              variables: {
                id: id
              }
            });
          case 2:
            _context.next = 4;
            return client.resetStore();
          case 4:
            return _context.abrupt("return");
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleApprove(_x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleDelete = function handleDelete() {
    if (selectedQuestion) {
      deleteQuestion({
        variables: {
          id: selectedQuestion
        },
        onCompleted: function () {
          var _onCompleted = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return client.resetStore();
                case 2:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function onCompleted(_x3) {
            return _onCompleted.apply(this, arguments);
          }
          return onCompleted;
        }()
      });
      setShowDeleteModal(false);
    }
  };
  var handleShowDeleteModal = function handleShowDeleteModal(question) {
    setselectedQuestion(question.id);
    setShowDeleteModal(true);
  };
  var handleView = function handleView(id) {
    setSelectedQuestionView(id);
    getQuestion({
      variables: {
        id: id
      }
    });
  };
  var columns = [{
    Header: "Text",
    accessor: "text",
    Cell: function Cell(_ref2) {
      var row = _ref2.row;
      return /*#__PURE__*/react.createElement("div", {
        onClick: function onClick() {
          return handleView(row.original.id);
        },
        role: "button",
        className: " text-xs hover:text-primary",
        dangerouslySetInnerHTML: {
          __html: purify.sanitize(row.original.text, {
            FORBID_ATTR: ["img"]
          })
        }
      });
    }
  }, {
    Header: "Answer",
    accessor: "correctAnswer.text"
  }, {
    Header: "Approved",
    accessor: "approved",
    Cell: function Cell(_ref3) {
      var row = _ref3.row;
      return /*#__PURE__*/react.createElement(react.Fragment, null, row.original.approved === true ? /*#__PURE__*/react.createElement(esm/* Badge */.Ct, {
        icon: index_esm/* HiCheck */.dZ6,
        className: "w-fit px-3",
        size: "xs",
        color: "success"
      }, "Yego") : /*#__PURE__*/react.createElement(esm/* Badge */.Ct, {
        icon: index_esm/* HiX */.apv,
        className: "w-fit px-3",
        size: "xs",
        color: "failure"
      }, "Oya"));
    }
  }, {
    Header: "Action",
    accessor: "",
    Cell: function Cell(_ref4) {
      var row = _ref4.row;
      return /*#__PURE__*/react.createElement("div", {
        className: "flex flex-row gap-2 items-center justify-center"
      }, row.original.approved === false && /*#__PURE__*/react.createElement(esm/* Tooltip */.u, {
        content: "Emeza"
      }, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
        color: "info",
        onClick: function onClick() {
          return handleApprove(row.original.id);
        },
        size: "xs"
      }, /*#__PURE__*/react.createElement(index_esm/* HiCheck */.dZ6, null))), /*#__PURE__*/react.createElement(esm/* Tooltip */.u, {
        content: "Reba"
      }, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
        color: "success",
        onClick: function onClick() {
          return handleView(row.original.id);
        },
        size: "xs"
      }, /*#__PURE__*/react.createElement(index_esm/* HiEye */.Rbo, null))), /*#__PURE__*/react.createElement(esm/* Tooltip */.u, {
        content: "Hindura"
      }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
        to: "/questions/edit/".concat(row.original.id)
      }, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
        color: "success",
        size: "xs"
      }, /*#__PURE__*/react.createElement(index_esm/* HiPencil */.LsQ, null)))), /*#__PURE__*/react.createElement(esm/* Tooltip */.u, {
        content: "Siba"
      }, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
        color: "failure",
        onClick: function onClick() {
          return handleShowDeleteModal(row.original);
        },
        size: "xs"
      }, /*#__PURE__*/react.createElement(index_esm/* HiTrash */._YF, null))));
    }
  }];
  return /*#__PURE__*/react.createElement("div", {
    className: "w-full justify-center ml-2"
  }, questions && /*#__PURE__*/react.createElement(DataTable, {
    data: questions,
    columns: columns
  }), loading && /*#__PURE__*/react.createElement("div", {
    className: "w-full flex justify-center"
  }, /*#__PURE__*/react.createElement("button", {
    type: "submit",
    className: "inline-flex items-center justify-self-center mt-20 mx-auto px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, /*#__PURE__*/react.createElement("svg", {
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
  })), "Loading")), /*#__PURE__*/react.createElement(esm/* Modal */.u_, {
    show: !!selectedQuestionView,
    onClose: function onClose() {
      return setSelectedQuestionView(null);
    }
  }, loadingQuestion && /*#__PURE__*/react.createElement(esm/* Modal.Body */.u_.Body, null, /*#__PURE__*/react.createElement(esm/* Spinner */.$j, null)), data && /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(esm/* Modal.Header */.u_.Header, null, /*#__PURE__*/react.createElement("div", {
    className: "bg-white question-content",
    dangerouslySetInnerHTML: {
      __html: purify.sanitize(data.getQuestion.text)
    }
  })), /*#__PURE__*/react.createElement(esm/* Modal.Body */.u_.Body, null, /*#__PURE__*/react.createElement("div", {
    className: "bg-gray-100 px-3 py-2 rounded-md shadow-md"
  }, /*#__PURE__*/react.createElement("p", {
    className: "font-semibold pb-1"
  }, "Amahitamo: "), /*#__PURE__*/react.createElement("hr", null), data.getQuestion.options.map(function (option, index) {
    return /*#__PURE__*/react.createElement("div", {
      className: "ml-3 mb-1",
      key: index
    }, /*#__PURE__*/react.createElement("div", {
      className: "flex items-center gap-2 py-1"
    }, /*#__PURE__*/react.createElement("span", null, option.id, "."), /*#__PURE__*/react.createElement("span", null, option.text)));
  })), /*#__PURE__*/react.createElement("div", {
    className: "flex items-center mb-2 mt-2"
  }, /*#__PURE__*/react.createElement("div", {
    className: "font-bold mr-2"
  }, "Igisubizo:"), /*#__PURE__*/react.createElement("div", null, data.getQuestion.correctAnswer.text)), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-col  justify-start"
  }, /*#__PURE__*/react.createElement("div", {
    className: "font-bold mr-2"
  }, "Ubusobanuro:"), /*#__PURE__*/react.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: purify.sanitize(data.getQuestion.explanation)
    }
  })), /*#__PURE__*/react.createElement("div", {
    className: "text-muted text-xs my-1"
  }, /*#__PURE__*/react.createElement("span", null, "Submitted by: ", /*#__PURE__*/react.createElement("b", null, data.getQuestion.user.name)))), /*#__PURE__*/react.createElement(esm/* Modal.Footer */.u_.Footer, null, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    color: "success",
    onClick: function onClick() {
      return handleApprove(data.getQuestion.id);
    }
  }, "Emeza"), /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    color: "failure",
    onClick: function onClick() {
      return handleShowDeleteModal(data.getQuestion);
    }
  }, "Siba"), /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    color: "warning",
    onClick: function onClick() {
      return setSelectedQuestionView(null);
    }
  }, "Close")))), /*#__PURE__*/react.createElement(esm/* Modal */.u_, {
    show: showDeleteModal,
    onClose: function onClose() {
      return setShowDeleteModal(false);
    }
  }, /*#__PURE__*/react.createElement(esm/* Modal.Header */.u_.Header, null, "Siba ikibazo"), /*#__PURE__*/react.createElement(esm/* Modal.Body */.u_.Body, null, "Koko se dukomeze dusibe iki kibazo?"), /*#__PURE__*/react.createElement(esm/* Modal.Footer */.u_.Footer, null, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
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
/* harmony default export */ const pages_GetQuestions = (GetQuestions);

/***/ })

}]);
//# sourceMappingURL=147.bundle.js.map