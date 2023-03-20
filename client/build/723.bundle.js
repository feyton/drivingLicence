"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[723],{

/***/ 8723:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(319);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6252);
/* harmony import */ var _apollo_client_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9098);
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6515);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7536);
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1167);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6042);
/* harmony import */ var _utils_useTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3196);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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








var ADD_QUESTION = (0,_apollo_client_core__WEBPACK_IMPORTED_MODULE_5__/* .gql */ .Ps)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  mutation AddQuestion($input: QuestionInput!) {\n    AddQuestion(input: $input) {\n      id\n      text\n      options {\n        id\n        text\n      }\n      answer\n      explanation\n    }\n  }\n"])));
function QuestionForm() {
  (0,_utils_useTitle__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)("Add question");
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_6__/* .useForm */ .cI)({
      defaultValues: {
        options: [{}]
      }
    }),
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    control = _useForm.control,
    errors = _useForm.formState.errors,
    reset = _useForm.reset;
  var _useMutation = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_7__/* .useMutation */ .D)(ADD_QUESTION),
    _useMutation2 = _slicedToArray(_useMutation, 1),
    addQuestion = _useMutation2[0];
  var client = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_8__/* .useApolloClient */ .x)();
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "px-5 mt-5 mx-auto w-full "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("form", {
    className: "max-w-xl mx-auto bg-white rounded-md px-6 pb-4 pt-2",
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", {
    className: "font-bold text-3xl text-center mb-2"
  }, "Add question"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "min-h-fit "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    htmlFor: "question"
  }, "Ikibazo:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_6__/* .Controller */ .Qr, {
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
    render: function render(_ref) {
      var _ref$field = _ref.field,
        _onChange = _ref$field.onChange,
        onBlur = _ref$field.onBlur,
        value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_quill__WEBPACK_IMPORTED_MODULE_2__, {
        theme: "snow",
        onChange: function onChange(text) {
          return _onChange(text);
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
          }], ["link", "image"], ["clean"]]
        },
        className: errors !== null && errors !== void 0 && errors.text ? "border border-red-500 rounded-md" : "border border-green-300 rounded-md"
      });
    }
  }), errors.text && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
    className: "text-red-500 "
  }, errors.text.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "  mb-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    htmlFor: "options block"
  }, "Amahitamo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[0].id",
    id: "options[0].id",
    defaultValue: "A",
    className: "mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[0].id", {
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[0].text",
    id: "options[0].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Option Text"
  }, register("options[0].text", {
    required: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[1].id",
    id: "options[1].id",
    defaultValue: "B",
    className: "mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[1].id", {
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[1].text",
    id: "options[1].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Option Text"
  }, register("options[1].text", {
    required: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[2].id",
    id: "options[2].id",
    defaultValue: "C",
    className: "mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[2].id", {
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[2].text",
    id: "options[2].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Option Text"
  }, register("options[2].text", {
    required: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    defaultValue: "D",
    name: "options[3].id",
    id: "options[3].id",
    className: "mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[3].id", {
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", _extends({
    type: "text",
    name: "options[3].text",
    id: "options[3].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Option Text"
  }, register("options[3].text", {
    required: true
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    htmlFor: "answer"
  }, "Answer:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Select */ .Ph, _extends({
    className: "rounded-md"
  }, register("answer", {
    required: "This field is required"
  }), {
    name: "answer",
    id: "answer",
    helperText: errors.answer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, "Oops! ", errors.answer.message),
    color: errors.answer && "failure"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "",
    hidden: true
  }, "Select answer ID"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
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
  }, "Category:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Select */ .Ph, _extends({
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
  }, "General"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", {
    value: "posts"
  }, "Ibyapa"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "mb-6 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    className: "font-primary",
    htmlFor: "explanation"
  }, "Explanation:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_6__/* .Controller */ .Qr, {
    control: control,
    name: "explanation",
    rules: {
      required: "This field is required",
      minLength: {
        value: 15,
        message: "Enter at least 10 characters in the description"
      }
    },
    error: errors.explanation,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange2 = _ref2$field.onChange,
        onBlur = _ref2$field.onBlur,
        value = _ref2$field.value;
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
          }], ["link", "image"], ["clean"]]
        },
        className: errors !== null && errors !== void 0 && errors.explanation ? "border border-red-500 rounded-md" : "border border-green-300 rounded-md"
      });
    }
  }), errors.explanation && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, errors.explanation.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    className: "mt-3",
    type: "submit"
  }, "Submit"))));
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
    document.title = "".concat(title, " | DL");
  }, [title]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useTitle);

/***/ })

}]);
//# sourceMappingURL=723.bundle.js.map