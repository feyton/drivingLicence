"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[60],{

/***/ 6060:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5998);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9250);



var PrivateRoute = function PrivateRoute(props) {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__/* .useSelector */ .v9)(function (state) {
      return state === null || state === void 0 ? void 0 : state.auth;
    }),
    authenticated = _useSelector.authenticated,
    user = _useSelector.user;
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .useLocation */ .TH)();
  if (authenticated && user) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.children);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .Navigate */ .Fg, {
    to: "/login",
    state: location.pathname
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PrivateRoute);

/***/ })

}]);