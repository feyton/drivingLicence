"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[683],{

/***/ 3683:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6515);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5998);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9655);




function LandingPage(props) {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(function (state) {
      return state === null || state === void 0 ? void 0 : state.auth;
    }),
    user = _useSelector.user;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "hero"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "hero w-full min-h-full flex flex-col justify-center grow items-center "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex h-full flex-col items-center justify-start  w-full px-4 py-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", {
    className: "mt-28 sm:mt-20 text-2xl sm:text-4xl md:pl-10 md:text-6xl font-bold text-white dark:text-dark-text-fill font-lexend text-center md:text-left"
  }, "Bona provisoire vuba cyane."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
    className: "text-2xl md:text-4xl lg:text-3xl mt-8 md:mt-8 lg:mt-8 w-full sm:w-3/4 md:w-4/5 lg:w-full md:px-0 lg:px-8 text-white dark:text-dark-text-fill font-sans text-center"
  }, "Aho wakimenyereza:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("em", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("b", null, " Ukihugura \u27A1\uFE0F ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("em", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("b", null, " Ugatsinda"))), !(user !== null && user !== void 0 && user.auth) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "w-full text-center justify-center items-center mt-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__/* .Link */ .rU, {
    to: "quiz",
    className: "justify-center mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    variant: "primary",
    className: "px-4 py-0 mx-auto font-lexend",
    size: "lg"
  }, "Tangira"))) : " "))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LandingPage);

/***/ })

}]);
//# sourceMappingURL=683.bundle.js.map