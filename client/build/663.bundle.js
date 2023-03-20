"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[663],{

/***/ 2663:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6515);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9583);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5998);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9655);
/* harmony import */ var _redux_reducers_authReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9684);
/* harmony import */ var _utils_CheckRole__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3881);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







function Navbar() {
  var _user$user, _user$user2;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(function (state) {
      return state === null || state === void 0 ? void 0 : state.auth;
    }),
    authenticated = _useSelector.authenticated,
    user = _useSelector.user;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useDispatch */ .I0)();
  var handleLogout = function handleLogout() {
    dispatch((0,_redux_reducers_authReducer__WEBPACK_IMPORTED_MODULE_3__/* .logoutUser */ .TX)());
  };
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    menuOpen = _useState2[0],
    setMenuOpen = _useState2[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-row justify-between px-3 py-1 md:py-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/",
    className: "text-2xl md:text-3xl font-bold text-primary"
  }, "Permit")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "hidden md:flex flex-row gap-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/quiz"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    color: "info",
    size: "xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaArrowRight */ .Z1Y, {
    className: "mr-2"
  }), " Kora ikizamini")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/add"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    size: "xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaPen */ .tU3, {
    className: "mr-2"
  }), "Tanga Ikibazo")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_utils_CheckRole__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
    roles: ["admin", "super", "editor"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/questions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    size: "xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaList */ .AeW, {
    className: "mr-2"
  }), " Ibibazo"))), authenticated ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    onClick: function onClick() {
      return setMenuOpen(false);
    },
    to: "/profile"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    size: "xs",
    color: "success"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaUser */ .Xws, {
    className: "mr-1"
  }), " ", user === null || user === void 0 ? void 0 : (_user$user = user.user) === null || _user$user === void 0 ? void 0 : _user$user.name.split(" ")[0])), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    onClick: function onClick() {
      return handleLogout();
    },
    size: "xs",
    color: "failure"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaPowerOff */ .d7k, {
    className: "mr-2"
  }), "Sohoka")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/login"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    size: "xs",
    color: "success"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaUser */ .Xws, {
    className: "mr-2"
  }), " Injira")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/register"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    size: "xs",
    color: "success"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaArrowRight */ .Z1Y, {
    className: "mr-2"
  }), " Iyandikishe")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "md:hidden flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
    onClick: function onClick() {
      return setMenuOpen(!menuOpen);
    },
    className: "text-primary text-2xl focus:outline-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaBars */ .Fm7, null))), menuOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "md:hidden absolute top-10 bg-gray-100 w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex flex-col gap-3 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/quiz",
    className: "button-primary",
    onClick: function onClick() {
      return setMenuOpen(false);
    }
  }, "Kora ikizamini"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/add",
    className: "button-primary",
    onClick: function onClick() {
      return setMenuOpen(false);
    }
  }, "Tanga Ikibazo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_utils_CheckRole__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
    roles: ["admin", "super", "editor"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/questions",
    className: "button-primary",
    onClick: function onClick() {
      return setMenuOpen(false);
    }
  }, "Ibibazo")), authenticated ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    className: "button-primary",
    onClick: function onClick() {
      return setMenuOpen(false);
    },
    to: "/profile"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__/* .FaUser */ .Xws, null), " ", user === null || user === void 0 ? void 0 : (_user$user2 = user.user) === null || _user$user2 === void 0 ? void 0 : _user$user2.name.split(" ")[0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
    onClick: function onClick() {
      handleLogout();
      setMenuOpen(false);
    },
    className: "button-primary text-red-400"
  }, "Sohoka")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/login",
    className: "button-primary",
    onClick: function onClick() {
      return setMenuOpen(false);
    }
  }, "Injira"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__/* .Link */ .rU, {
    to: "/register",
    className: "button-primary",
    onClick: function onClick() {
      return setMenuOpen(false);
    }
  }, "Iyandikishe")))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

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
//# sourceMappingURL=663.bundle.js.map