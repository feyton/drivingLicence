"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[539],{

/***/ 539:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_LandingPage)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/flowbite-react/lib/esm/index.js + 136 modules
var esm = __webpack_require__(6515);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 13 modules
var es = __webpack_require__(5998);
// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/index.js
var dist = __webpack_require__(9655);
;// CONCATENATED MODULE: ./src/components/Hero.js




function Hero(props) {
  var _useSelector = (0,es/* useSelector */.v9)(function (state) {
      return state === null || state === void 0 ? void 0 : state.auth;
    }),
    user = _useSelector.user;
  return /*#__PURE__*/react.createElement("div", {
    className: "hero"
  }, /*#__PURE__*/react.createElement("div", {
    className: "hero w-full min-h-full flex flex-col justify-center grow items-center "
  }, /*#__PURE__*/react.createElement("div", {
    className: ""
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex h-full flex-col items-center justify-start  w-full px-4 py-2"
  }, /*#__PURE__*/react.createElement("h1", {
    className: "mt-28 sm:mt-20 text-2xl sm:text-4xl md:pl-10 md:text-6xl font-bold text-white dark:text-dark-text-fill font-lexend text-center md:text-left"
  }, "Murakaza neza"), /*#__PURE__*/react.createElement("p", {
    className: "text-2xl md:text-4xl lg:text-3xl mt-8 md:mt-8 lg:mt-8 w-full sm:w-3/4 md:w-4/5 lg:w-full md:px-0 lg:px-8 text-white dark:text-dark-text-fill font-sans text-center"
  }, "Aho wakimenyereza:", /*#__PURE__*/react.createElement("em", null, /*#__PURE__*/react.createElement("b", null, " Ukihugura \u27A1\uFE0F ")), /*#__PURE__*/react.createElement("em", null, /*#__PURE__*/react.createElement("b", null, " Ugatsinda"))), !(user !== null && user !== void 0 && user.auth) ? /*#__PURE__*/react.createElement("div", {
    className: "w-full text-center justify-center items-center mt-8"
  }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "quiz",
    className: "justify-center mx-auto"
  }, /*#__PURE__*/react.createElement(esm/* Button */.zx, {
    variant: "primary",
    className: "px-4 py-0 mx-auto font-lexend",
    size: "lg"
  }, "Tangira"))) : " "))));
}
/* harmony default export */ const components_Hero = (Hero);
;// CONCATENATED MODULE: ./src/components/Modal.js

function Modal(_ref) {
  var children = _ref.children,
    isOpen = _ref.isOpen,
    handleClose = _ref.handleClose;
  (0,react.useEffect)(function () {
    var closeOnEscapeKey = function closeOnEscapeKey(e) {
      return e.key === "Escape" ? handleClose() : null;
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return function () {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);
  if (!isOpen) return null;
  return /*#__PURE__*/react.createElement("div", {
    className: "fixed inset-0 bg-gray-400 bg-opacity-30 flex flex-col items-center justify-center transition-all ease-in-out overflow-hidden z-50 py-40 px-20"
  }, /*#__PURE__*/react.createElement("button", {
    onClick: handleClose,
    className: "close-btn"
  }, "Close"), /*#__PURE__*/react.createElement("div", {
    className: "w-[70%] h-[70%] bg-[#282c34] text-[#fff] flex items-center justify-center text-md"
  }, children));
}
/* harmony default export */ const components_Modal = (Modal);
;// CONCATENATED MODULE: ./src/pages/LandingPage.js
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



function LandingPage(props) {
  var openModal = props.openModal;
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(components_Hero, _extends({}, props, {
    setIsOpen: openModal
  })), /*#__PURE__*/react.createElement(components_Modal, {
    handleClose: function handleClose() {
      return openModal(false);
    },
    isOpen: props.isOpen
  }, "This is Modal Content!"));
}
/* harmony default export */ const pages_LandingPage = (LandingPage);

/***/ })

}]);
//# sourceMappingURL=539.bundle.js.map