"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[625],{

/***/ 7625:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_QuestionEditPage)
});

// EXTERNAL MODULE: ./node_modules/graphql-tag/lib/index.js + 10 modules
var lib = __webpack_require__(9098);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useLazyQuery.js + 2 modules
var useLazyQuery = __webpack_require__(6162);
// EXTERNAL MODULE: ./node_modules/flowbite-react/lib/esm/index.js + 136 modules
var esm = __webpack_require__(6515);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-router/dist/index.js
var dist = __webpack_require__(9250);
// EXTERNAL MODULE: ./src/utils/useTitle.js
var useTitle = __webpack_require__(3196);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useMutation.js
var useMutation = __webpack_require__(319);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useApolloClient.js
var useApolloClient = __webpack_require__(6252);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(7536);
// EXTERNAL MODULE: ./node_modules/react-quill/lib/index.js
var react_quill_lib = __webpack_require__(1167);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs + 1 modules
var react_toastify_esm = __webpack_require__(6042);
;// CONCATENATED MODULE: ./src/pages/QuestionFormEdit.js
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









var EDIT_QUESTION = (0,lib/* gql */.Ps)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  mutation EditQuestion($id: ID!, $input: QuestionInput!) {\n    EditQuestion(id: $id, input: $input) {\n      id\n      text\n      options {\n        id\n        text\n      }\n      answer\n      explanation\n    }\n  }\n"])));
function QuestionFormEdit(_ref) {
  var question = _ref.question;
  var id = question.id,
    text = question.text,
    options = question.options,
    category = question.category,
    explanation = question.explanation,
    answer = question.answer;
  (0,useTitle/* default */.Z)("Edit question");
  var _useForm = (0,index_esm/* useForm */.cI)({
      defaultValues: {
        text: text,
        options: options,
        explanation: explanation,
        answer: answer,
        category: category
      }
    }),
    register = _useForm.register,
    handleSubmit = _useForm.handleSubmit,
    control = _useForm.control,
    errors = _useForm.formState.errors,
    reset = _useForm.reset;
  var navigate = (0,dist/* useNavigate */.s0)();
  var _useMutation = (0,useMutation/* useMutation */.D)(EDIT_QUESTION),
    _useMutation2 = _slicedToArray(_useMutation, 1),
    editQuestion = _useMutation2[0];
  var client = (0,useApolloClient/* useApolloClient */.x)();
  var onSubmit = function onSubmit(data) {
    var input = _objectSpread({}, data);
    editQuestion({
      variables: {
        input: input,
        id: id
      }
    }).then(function (result) {
      react_toastify_esm/* toast.success */.Am.success("Question edited");
      reset();
      client.resetStore();
      navigate(-1);
    })["catch"](function (error) {
      react_toastify_esm/* toast.error */.Am.error(error === null || error === void 0 ? void 0 : error.message);
    });
  };
  return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("div", {
    className: "px-5 mt-5 mx-auto w-full "
  }, /*#__PURE__*/react.createElement("form", {
    className: "max-w-xl mx-auto bg-white rounded-md px-6 pb-4 pt-2",
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react.createElement("h2", {
    className: "font-bold text-3xl text-center mb-2"
  }, "Add question"), /*#__PURE__*/react.createElement("hr", null), /*#__PURE__*/react.createElement("div", {
    className: "min-h-fit "
  }, /*#__PURE__*/react.createElement("label", {
    htmlFor: "question"
  }, "Ikibazo:"), /*#__PURE__*/react.createElement(index_esm/* Controller */.Qr, {
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
      return /*#__PURE__*/react.createElement(react_quill_lib, {
        theme: "snow",
        onChange: function onChange(text) {
          return _onChange(text);
        },
        value: value || "",
        modules: {
          toolbar: {
            container: [["bold", "italic", "underline"], [{
              list: "ordered"
            }, {
              list: "bullet"
            }, {
              indent: "-1"
            }, {
              indent: "+1"
            }], ["link", "image"], ["clean"]]
          }
        },
        className: errors !== null && errors !== void 0 && errors.text ? "border border-red-500 rounded-md" : "border border-green-300 rounded-md"
      });
    }
  }), errors.text && /*#__PURE__*/react.createElement("span", {
    className: "text-red-500 "
  }, errors.text.message)), /*#__PURE__*/react.createElement("div", {
    className: "  mb-4"
  }, /*#__PURE__*/react.createElement("label", {
    htmlFor: "options block"
  }, "Amahitamo"), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react.createElement("input", _extends({
    type: "text",
    name: "options[0].id",
    id: "options[0].id",
    defaultValue: "A",
    className: "mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[0].id", {
    required: true
  }))), /*#__PURE__*/react.createElement("input", _extends({
    type: "text",
    name: "options[0].text",
    id: "options[0].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Option Text"
  }, register("options[0].text", {
    required: true
  })))), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react.createElement("input", _extends({
    type: "text",
    name: "options[1].id",
    id: "options[1].id",
    defaultValue: "B",
    className: "mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[1].id", {
    required: true
  }))), /*#__PURE__*/react.createElement("input", _extends({
    type: "text",
    name: "options[1].text",
    id: "options[1].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Option Text"
  }, register("options[1].text", {
    required: true
  })))), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react.createElement("input", _extends({
    type: "text",
    name: "options[2].id",
    id: "options[2].id",
    defaultValue: "C",
    className: "mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[2].id", {
    required: true
  }))), /*#__PURE__*/react.createElement("input", _extends({
    type: "text",
    name: "options[2].text",
    id: "options[2].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Option Text"
  }, register("options[2].text", {
    required: true
  })))), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-row gap-2 mb-1"
  }, /*#__PURE__*/react.createElement("input", _extends({
    type: "text",
    defaultValue: "D",
    name: "options[3].id",
    id: "options[3].id",
    className: "mr-2 leading-tight w-[20%] appearance-none border rounded-md focus:outline-none focus:shadow-outline",
    placeholder: "Option ID"
  }, register("options[3].id", {
    required: true
  }))), /*#__PURE__*/react.createElement("input", _extends({
    type: "text",
    name: "options[3].text",
    id: "options[3].text",
    className: "flex-1 px-3 py-2 leading-tight border rounded-md appearance-none focus:outline-none focus:shadow-outline",
    placeholder: "Option Text"
  }, register("options[3].text", {
    required: true
  }))))), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/react.createElement("label", {
    htmlFor: "answer"
  }, "Answer:"), /*#__PURE__*/react.createElement(esm/* Select */.Ph, _extends({
    className: "rounded-md"
  }, register("answer", {
    required: "This field is required"
  }), {
    name: "answer",
    id: "answer",
    helperText: errors.answer && /*#__PURE__*/react.createElement(react.Fragment, null, "Oops! ", errors.answer.message),
    color: errors.answer && "failure"
  }), /*#__PURE__*/react.createElement("option", {
    value: "",
    hidden: true
  }, "Select answer ID"), /*#__PURE__*/react.createElement("option", {
    value: "A"
  }, "A"), /*#__PURE__*/react.createElement("option", {
    value: "B"
  }, "B"), /*#__PURE__*/react.createElement("option", {
    value: "C"
  }, "C"), /*#__PURE__*/react.createElement("option", {
    value: "D"
  }, "D"))), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-col gap-1 mt-2"
  }, /*#__PURE__*/react.createElement("label", {
    htmlFor: "category"
  }, "Category:"), /*#__PURE__*/react.createElement(esm/* Select */.Ph, _extends({
    className: "rounded-md"
  }, register("category", {
    required: "Ikiciro kirakenewe"
  }), {
    name: "category",
    id: "",
    helperText: (errors === null || errors === void 0 ? void 0 : errors.category) && /*#__PURE__*/react.createElement(react.Fragment, null, "Oops! ", errors.category.message),
    color: (errors === null || errors === void 0 ? void 0 : errors.category) && "failure"
  }), /*#__PURE__*/react.createElement("option", {
    value: "",
    hidden: true
  }, "Hitamo ikiciro"), /*#__PURE__*/react.createElement("option", {
    value: "general"
  }, "General"), /*#__PURE__*/react.createElement("option", {
    value: "posts"
  }, "Ibyapa"))), /*#__PURE__*/react.createElement("div", {
    className: "mb-6 mt-2"
  }, /*#__PURE__*/react.createElement("label", {
    className: "font-primary",
    htmlFor: "explanation"
  }, "Explanation:"), /*#__PURE__*/react.createElement(index_esm/* Controller */.Qr, {
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
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange2 = _ref3$field.onChange,
        onBlur = _ref3$field.onBlur,
        value = _ref3$field.value;
      return /*#__PURE__*/react.createElement(react_quill_lib, {
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
  }), errors.explanation && /*#__PURE__*/react.createElement("span", null, errors.explanation.message)), /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    className: "mt-3",
    type: "submit"
  }, "Submit"))));
}
/* harmony default export */ const pages_QuestionFormEdit = (QuestionFormEdit);
;// CONCATENATED MODULE: ./src/pages/QuestionEditPage.js
var QuestionEditPage_templateObject;
function QuestionEditPage_slicedToArray(arr, i) { return QuestionEditPage_arrayWithHoles(arr) || QuestionEditPage_iterableToArrayLimit(arr, i) || QuestionEditPage_unsupportedIterableToArray(arr, i) || QuestionEditPage_nonIterableRest(); }
function QuestionEditPage_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function QuestionEditPage_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return QuestionEditPage_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestionEditPage_arrayLikeToArray(o, minLen); }
function QuestionEditPage_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function QuestionEditPage_iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function QuestionEditPage_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function QuestionEditPage_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var GET_QUESTION = (0,lib/* gql */.Ps)(QuestionEditPage_templateObject || (QuestionEditPage_templateObject = QuestionEditPage_taggedTemplateLiteral(["\n  query getQuestion($id: ID!) {\n    getQuestion(id: $id) {\n      text\n      id\n      answer\n      category\n      options {\n        id\n        text\n      }\n      explanation\n      correctAnswer {\n        id\n        text\n      }\n    }\n  }\n"])));
function QuestionEditPage() {
  var _useParams = (0,dist/* useParams */.UO)(),
    id = _useParams.id;
  (0,useTitle/* default */.Z)("Edit question");
  var _useState = (0,react.useState)(),
    _useState2 = QuestionEditPage_slicedToArray(_useState, 2),
    question = _useState2[0],
    setQuestion = _useState2[1];
  var _useLazyQuery = (0,useLazyQuery/* useLazyQuery */.t)(GET_QUESTION),
    _useLazyQuery2 = QuestionEditPage_slicedToArray(_useLazyQuery, 2),
    getQuestion = _useLazyQuery2[0],
    loading = _useLazyQuery2[1].loading;
  (0,react.useEffect)(function () {
    getQuestion({
      variables: {
        id: id
      },
      onCompleted: function onCompleted(data) {
        return setQuestion(data.getQuestion);
      }
    });
  });
  return /*#__PURE__*/react.createElement("div", null, loading && /*#__PURE__*/react.createElement(esm/* Spinner */.$j, null), question && /*#__PURE__*/react.createElement(pages_QuestionFormEdit, {
    question: question
  }));
}
/* harmony default export */ const pages_QuestionEditPage = (QuestionEditPage);

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
//# sourceMappingURL=625.bundle.js.map