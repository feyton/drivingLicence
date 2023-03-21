"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[357],{

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

/***/ 9357:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9098);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6162);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9250);
/* harmony import */ var _QuizResults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2716);
var _templateObject;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var GET_SCORE = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_2__/* .gql */ .Ps)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query GetScore($id: ID!) {\n    getScore(id: $id) {\n      score\n      questions {\n        id\n        text\n        correctAnswer {\n          id\n          text\n        }\n        userAnswer {\n          id\n          text\n        }\n        explanation\n      }\n    }\n  }\n"])));
function ViewScore() {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__/* .useParams */ .UO)(),
    id = _useParams.id;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    score = _useState2[0],
    setscore = _useState2[1];
  var _useLazyQuery = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_4__/* .useLazyQuery */ .t)(GET_SCORE),
    _useLazyQuery2 = _slicedToArray(_useLazyQuery, 2),
    getscore = _useLazyQuery2[0],
    loading = _useLazyQuery2[1].loading;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getscore({
      variables: {
        id: id
      },
      onCompleted: function onCompleted(data) {
        return setscore(data.getScore);
      }
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit",
    className: "inline-flex items-center px-4 py-2 my-auto mt-20 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  }, loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    className: "animate-spin h-5 w-5 mr-3",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4",
    fill: "none"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm8-4a4 4 0 100 8 4 4 0 000-8z"
  })), "Loading..."), score && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_QuizResults__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, score));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewScore);

/***/ })

}]);
//# sourceMappingURL=357.bundle.js.map