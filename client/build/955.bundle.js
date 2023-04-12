"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[955],{

/***/ 6162:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "t": () => (/* binding */ useLazyQuery)
});

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(655);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
var react_namespaceObject = /*#__PURE__*/__webpack_require__.t(react, 2);
// EXTERNAL MODULE: ./node_modules/@apollo/client/utilities/common/mergeOptions.js
var mergeOptions = __webpack_require__(4012);
// EXTERNAL MODULE: ./node_modules/@apollo/client/utilities/globals/index.js + 6 modules
var globals = __webpack_require__(3952);
// EXTERNAL MODULE: ./node_modules/@apollo/client/utilities/common/canUse.js
var canUse = __webpack_require__(320);
;// CONCATENATED MODULE: ./node_modules/@apollo/client/react/hooks/useSyncExternalStore.js



var didWarnUncachedGetSnapshot = false;
var uSESKey = "useSyncExternalStore";
var realHook = react_namespaceObject[uSESKey];
var useSyncExternalStore = realHook || (function (subscribe, getSnapshot, getServerSnapshot) {
    var value = getSnapshot();
    if (__DEV__ &&
        !didWarnUncachedGetSnapshot &&
        value !== getSnapshot()) {
        didWarnUncachedGetSnapshot = true;
        __DEV__ && globals/* invariant.error */.kG.error('The result of getSnapshot should be cached to avoid an infinite loop');
    }
    var _a = react.useState({ inst: { value: value, getSnapshot: getSnapshot } }), inst = _a[0].inst, forceUpdate = _a[1];
    if (canUse/* canUseLayoutEffect */.JC) {
        react.useLayoutEffect(function () {
            Object.assign(inst, { value: value, getSnapshot: getSnapshot });
            if (checkIfSnapshotChanged(inst)) {
                forceUpdate({ inst: inst });
            }
        }, [subscribe, value, getSnapshot]);
    }
    else {
        Object.assign(inst, { value: value, getSnapshot: getSnapshot });
    }
    react.useEffect(function () {
        if (checkIfSnapshotChanged(inst)) {
            forceUpdate({ inst: inst });
        }
        return subscribe(function handleStoreChange() {
            if (checkIfSnapshotChanged(inst)) {
                forceUpdate({ inst: inst });
            }
        });
    }, [subscribe]);
    return value;
});
function checkIfSnapshotChanged(_a) {
    var value = _a.value, getSnapshot = _a.getSnapshot;
    try {
        return value !== getSnapshot();
    }
    catch (_b) {
        return true;
    }
}
//# sourceMappingURL=useSyncExternalStore.js.map
// EXTERNAL MODULE: ./node_modules/@wry/equality/lib/equality.esm.js
var equality_esm = __webpack_require__(2152);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/context/ApolloContext.js
var ApolloContext = __webpack_require__(5317);
// EXTERNAL MODULE: ./node_modules/@apollo/client/errors/index.js
var errors = __webpack_require__(990);
// EXTERNAL MODULE: ./node_modules/@apollo/client/core/networkStatus.js
var networkStatus = __webpack_require__(1644);
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/parser/index.js
var parser = __webpack_require__(4692);
// EXTERNAL MODULE: ./node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js
var maybeDeepFreeze = __webpack_require__(8702);
// EXTERNAL MODULE: ./node_modules/@apollo/client/utilities/common/compact.js
var compact = __webpack_require__(3712);
// EXTERNAL MODULE: ./node_modules/@apollo/client/utilities/common/arrays.js
var arrays = __webpack_require__(1436);
;// CONCATENATED MODULE: ./node_modules/@apollo/client/react/hooks/useQuery.js












var useQuery_hasOwnProperty = Object.prototype.hasOwnProperty;
function useQuery(query, options) {
    if (options === void 0) { options = Object.create(null); }
    return useInternalState(useApolloClient(options.client), query).useQuery(options);
}
function useInternalState(client, query) {
    var stateRef = (0,react.useRef)();
    if (!stateRef.current ||
        client !== stateRef.current.client ||
        query !== stateRef.current.query) {
        stateRef.current = new InternalState(client, query, stateRef.current);
    }
    var state = stateRef.current;
    var _a = (0,react.useState)(0), _tick = _a[0], setTick = _a[1];
    state.forceUpdate = function () {
        setTick(function (tick) { return tick + 1; });
    };
    return state;
}
var InternalState = (function () {
    function InternalState(client, query, previous) {
        this.client = client;
        this.query = query;
        this.asyncResolveFns = new Set();
        this.optionsToIgnoreOnce = new (canUse/* canUseWeakSet */.sy ? WeakSet : Set)();
        this.ssrDisabledResult = (0,maybeDeepFreeze/* maybeDeepFreeze */.J)({
            loading: true,
            data: void 0,
            error: void 0,
            networkStatus: networkStatus/* NetworkStatus.loading */.I.loading,
        });
        this.skipStandbyResult = (0,maybeDeepFreeze/* maybeDeepFreeze */.J)({
            loading: false,
            data: void 0,
            error: void 0,
            networkStatus: networkStatus/* NetworkStatus.ready */.I.ready,
        });
        this.toQueryResultCache = new (canUse/* canUseWeakMap */.mr ? WeakMap : Map)();
        (0,parser/* verifyDocumentType */.Vp)(query, parser/* DocumentType.Query */.n_.Query);
        var previousResult = previous && previous.result;
        var previousData = previousResult && previousResult.data;
        if (previousData) {
            this.previousData = previousData;
        }
    }
    InternalState.prototype.forceUpdate = function () {
        __DEV__ && globals/* invariant.warn */.kG.warn("Calling default no-op implementation of InternalState#forceUpdate");
    };
    InternalState.prototype.asyncUpdate = function (signal) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var watchQueryOptions = _this.watchQueryOptions;
            var handleAborted = function () {
                _this.asyncResolveFns.delete(resolve);
                _this.optionsToIgnoreOnce.delete(watchQueryOptions);
                signal.removeEventListener('abort', handleAborted);
                reject(signal.reason);
            };
            _this.asyncResolveFns.add(resolve);
            _this.optionsToIgnoreOnce.add(watchQueryOptions);
            signal.addEventListener('abort', handleAborted);
            _this.forceUpdate();
        });
    };
    InternalState.prototype.useQuery = function (options) {
        var _this = this;
        this.renderPromises = (0,react.useContext)((0,ApolloContext/* getApolloContext */.K)()).renderPromises;
        this.useOptions(options);
        var obsQuery = this.useObservableQuery();
        var result = useSyncExternalStore((0,react.useCallback)(function () {
            if (_this.renderPromises) {
                return function () { };
            }
            var onNext = function () {
                var previousResult = _this.result;
                var result = obsQuery.getCurrentResult();
                if (previousResult &&
                    previousResult.loading === result.loading &&
                    previousResult.networkStatus === result.networkStatus &&
                    (0,equality_esm/* equal */.D)(previousResult.data, result.data)) {
                    return;
                }
                _this.setResult(result);
            };
            var onError = function (error) {
                var last = obsQuery["last"];
                subscription.unsubscribe();
                try {
                    obsQuery.resetLastResults();
                    subscription = obsQuery.subscribe(onNext, onError);
                }
                finally {
                    obsQuery["last"] = last;
                }
                if (!useQuery_hasOwnProperty.call(error, 'graphQLErrors')) {
                    throw error;
                }
                var previousResult = _this.result;
                if (!previousResult ||
                    (previousResult && previousResult.loading) ||
                    !(0,equality_esm/* equal */.D)(error, previousResult.error)) {
                    _this.setResult({
                        data: (previousResult && previousResult.data),
                        error: error,
                        loading: false,
                        networkStatus: networkStatus/* NetworkStatus.error */.I.error,
                    });
                }
            };
            var subscription = obsQuery.subscribe(onNext, onError);
            return function () { return subscription.unsubscribe(); };
        }, [
            obsQuery,
            this.renderPromises,
            this.client.disableNetworkFetches,
        ]), function () { return _this.getCurrentResult(); }, function () { return _this.getCurrentResult(); });
        this.unsafeHandlePartialRefetch(result);
        var queryResult = this.toQueryResult(result);
        if (!queryResult.loading && this.asyncResolveFns.size) {
            this.asyncResolveFns.forEach(function (resolve) { return resolve(queryResult); });
            this.asyncResolveFns.clear();
        }
        return queryResult;
    };
    InternalState.prototype.useOptions = function (options) {
        var _a;
        var watchQueryOptions = this.createWatchQueryOptions(this.queryHookOptions = options);
        var currentWatchQueryOptions = this.watchQueryOptions;
        if (this.optionsToIgnoreOnce.has(currentWatchQueryOptions) ||
            !(0,equality_esm/* equal */.D)(watchQueryOptions, currentWatchQueryOptions)) {
            this.watchQueryOptions = watchQueryOptions;
            if (currentWatchQueryOptions && this.observable) {
                this.optionsToIgnoreOnce.delete(currentWatchQueryOptions);
                this.observable.reobserve(this.getObsQueryOptions());
                this.previousData = ((_a = this.result) === null || _a === void 0 ? void 0 : _a.data) || this.previousData;
                this.result = void 0;
            }
        }
        this.onCompleted = options.onCompleted || InternalState.prototype.onCompleted;
        this.onError = options.onError || InternalState.prototype.onError;
        if ((this.renderPromises || this.client.disableNetworkFetches) &&
            this.queryHookOptions.ssr === false &&
            !this.queryHookOptions.skip) {
            this.result = this.ssrDisabledResult;
        }
        else if (this.queryHookOptions.skip ||
            this.watchQueryOptions.fetchPolicy === 'standby') {
            this.result = this.skipStandbyResult;
        }
        else if (this.result === this.ssrDisabledResult ||
            this.result === this.skipStandbyResult) {
            this.result = void 0;
        }
    };
    InternalState.prototype.getObsQueryOptions = function () {
        var toMerge = [];
        var globalDefaults = this.client.defaultOptions.watchQuery;
        if (globalDefaults)
            toMerge.push(globalDefaults);
        if (this.queryHookOptions.defaultOptions) {
            toMerge.push(this.queryHookOptions.defaultOptions);
        }
        toMerge.push((0,compact/* compact */.o)(this.observable && this.observable.options, this.watchQueryOptions));
        return toMerge.reduce(mergeOptions/* mergeOptions */.J);
    };
    InternalState.prototype.createWatchQueryOptions = function (_a) {
        var _b;
        if (_a === void 0) { _a = {}; }
        var skip = _a.skip, ssr = _a.ssr, onCompleted = _a.onCompleted, onError = _a.onError, defaultOptions = _a.defaultOptions, otherOptions = (0,tslib_es6/* __rest */._T)(_a, ["skip", "ssr", "onCompleted", "onError", "defaultOptions"]);
        var watchQueryOptions = Object.assign(otherOptions, { query: this.query });
        if (this.renderPromises &&
            (watchQueryOptions.fetchPolicy === 'network-only' ||
                watchQueryOptions.fetchPolicy === 'cache-and-network')) {
            watchQueryOptions.fetchPolicy = 'cache-first';
        }
        if (!watchQueryOptions.variables) {
            watchQueryOptions.variables = {};
        }
        if (skip) {
            var _c = watchQueryOptions.fetchPolicy, fetchPolicy = _c === void 0 ? this.getDefaultFetchPolicy() : _c, _d = watchQueryOptions.initialFetchPolicy, initialFetchPolicy = _d === void 0 ? fetchPolicy : _d;
            Object.assign(watchQueryOptions, {
                initialFetchPolicy: initialFetchPolicy,
                fetchPolicy: 'standby',
            });
        }
        else if (!watchQueryOptions.fetchPolicy) {
            watchQueryOptions.fetchPolicy =
                ((_b = this.observable) === null || _b === void 0 ? void 0 : _b.options.initialFetchPolicy) ||
                    this.getDefaultFetchPolicy();
        }
        return watchQueryOptions;
    };
    InternalState.prototype.getDefaultFetchPolicy = function () {
        var _a, _b;
        return (((_a = this.queryHookOptions.defaultOptions) === null || _a === void 0 ? void 0 : _a.fetchPolicy) ||
            ((_b = this.client.defaultOptions.watchQuery) === null || _b === void 0 ? void 0 : _b.fetchPolicy) ||
            "cache-first");
    };
    InternalState.prototype.onCompleted = function (data) { };
    InternalState.prototype.onError = function (error) { };
    InternalState.prototype.useObservableQuery = function () {
        var obsQuery = this.observable =
            this.renderPromises
                && this.renderPromises.getSSRObservable(this.watchQueryOptions)
                || this.observable
                || this.client.watchQuery(this.getObsQueryOptions());
        this.obsQueryFields = (0,react.useMemo)(function () { return ({
            refetch: obsQuery.refetch.bind(obsQuery),
            reobserve: obsQuery.reobserve.bind(obsQuery),
            fetchMore: obsQuery.fetchMore.bind(obsQuery),
            updateQuery: obsQuery.updateQuery.bind(obsQuery),
            startPolling: obsQuery.startPolling.bind(obsQuery),
            stopPolling: obsQuery.stopPolling.bind(obsQuery),
            subscribeToMore: obsQuery.subscribeToMore.bind(obsQuery),
        }); }, [obsQuery]);
        var ssrAllowed = !(this.queryHookOptions.ssr === false ||
            this.queryHookOptions.skip);
        if (this.renderPromises && ssrAllowed) {
            this.renderPromises.registerSSRObservable(obsQuery);
            if (obsQuery.getCurrentResult().loading) {
                this.renderPromises.addObservableQueryPromise(obsQuery);
            }
        }
        return obsQuery;
    };
    InternalState.prototype.setResult = function (nextResult) {
        var previousResult = this.result;
        if (previousResult && previousResult.data) {
            this.previousData = previousResult.data;
        }
        this.result = nextResult;
        this.forceUpdate();
        this.handleErrorOrCompleted(nextResult);
    };
    InternalState.prototype.handleErrorOrCompleted = function (result) {
        var _this = this;
        if (!result.loading) {
            var error_1 = this.toApolloError(result);
            Promise.resolve().then(function () {
                if (error_1) {
                    _this.onError(error_1);
                }
                else if (result.data) {
                    _this.onCompleted(result.data);
                }
            }).catch(function (error) {
                __DEV__ && globals/* invariant.warn */.kG.warn(error);
            });
        }
    };
    InternalState.prototype.toApolloError = function (result) {
        return (0,arrays/* isNonEmptyArray */.O)(result.errors)
            ? new errors/* ApolloError */.c({ graphQLErrors: result.errors })
            : result.error;
    };
    InternalState.prototype.getCurrentResult = function () {
        if (!this.result) {
            this.handleErrorOrCompleted(this.result = this.observable.getCurrentResult());
        }
        return this.result;
    };
    InternalState.prototype.toQueryResult = function (result) {
        var queryResult = this.toQueryResultCache.get(result);
        if (queryResult)
            return queryResult;
        var data = result.data, partial = result.partial, resultWithoutPartial = (0,tslib_es6/* __rest */._T)(result, ["data", "partial"]);
        this.toQueryResultCache.set(result, queryResult = (0,tslib_es6/* __assign */.pi)((0,tslib_es6/* __assign */.pi)((0,tslib_es6/* __assign */.pi)({ data: data }, resultWithoutPartial), this.obsQueryFields), { client: this.client, observable: this.observable, variables: this.observable.variables, called: !this.queryHookOptions.skip, previousData: this.previousData }));
        if (!queryResult.error && (0,arrays/* isNonEmptyArray */.O)(result.errors)) {
            queryResult.error = new errors/* ApolloError */.c({ graphQLErrors: result.errors });
        }
        return queryResult;
    };
    InternalState.prototype.unsafeHandlePartialRefetch = function (result) {
        if (result.partial &&
            this.queryHookOptions.partialRefetch &&
            !result.loading &&
            (!result.data || Object.keys(result.data).length === 0) &&
            this.observable.options.fetchPolicy !== 'cache-only') {
            Object.assign(result, {
                loading: true,
                networkStatus: networkStatus/* NetworkStatus.refetch */.I.refetch,
            });
            this.observable.refetch();
        }
    };
    return InternalState;
}());
//# sourceMappingURL=useQuery.js.map
// EXTERNAL MODULE: ./node_modules/@apollo/client/react/hooks/useApolloClient.js
var hooks_useApolloClient = __webpack_require__(6252);
;// CONCATENATED MODULE: ./node_modules/@apollo/client/react/hooks/useLazyQuery.js





var EAGER_METHODS = [
    'refetch',
    'reobserve',
    'fetchMore',
    'updateQuery',
    'startPolling',
    'subscribeToMore',
];
function useLazyQuery(query, options) {
    var _a;
    var abortControllersRef = (0,react.useRef)(new Set());
    var execOptionsRef = (0,react.useRef)();
    var merged = execOptionsRef.current ? (0,mergeOptions/* mergeOptions */.J)(options, execOptionsRef.current) : options;
    var internalState = useInternalState((0,hooks_useApolloClient/* useApolloClient */.x)(options && options.client), (_a = merged === null || merged === void 0 ? void 0 : merged.query) !== null && _a !== void 0 ? _a : query);
    var useQueryResult = internalState.useQuery((0,tslib_es6/* __assign */.pi)((0,tslib_es6/* __assign */.pi)({}, merged), { skip: !execOptionsRef.current }));
    var initialFetchPolicy = useQueryResult.observable.options.initialFetchPolicy ||
        internalState.getDefaultFetchPolicy();
    var result = Object.assign(useQueryResult, {
        called: !!execOptionsRef.current,
    });
    var eagerMethods = (0,react.useMemo)(function () {
        var eagerMethods = {};
        var _loop_1 = function (key) {
            var method = result[key];
            eagerMethods[key] = function () {
                if (!execOptionsRef.current) {
                    execOptionsRef.current = Object.create(null);
                    internalState.forceUpdate();
                }
                return method.apply(this, arguments);
            };
        };
        for (var _i = 0, EAGER_METHODS_1 = EAGER_METHODS; _i < EAGER_METHODS_1.length; _i++) {
            var key = EAGER_METHODS_1[_i];
            _loop_1(key);
        }
        return eagerMethods;
    }, []);
    Object.assign(result, eagerMethods);
    (0,react.useEffect)(function () {
        return function () {
            abortControllersRef.current.forEach(function (controller) {
                controller.abort();
            });
        };
    }, []);
    var execute = (0,react.useCallback)(function (executeOptions) {
        var controller = new AbortController();
        abortControllersRef.current.add(controller);
        execOptionsRef.current = executeOptions ? (0,tslib_es6/* __assign */.pi)((0,tslib_es6/* __assign */.pi)({}, executeOptions), { fetchPolicy: executeOptions.fetchPolicy || initialFetchPolicy }) : {
            fetchPolicy: initialFetchPolicy,
        };
        var promise = internalState
            .asyncUpdate(controller.signal)
            .then(function (queryResult) {
            abortControllersRef.current.delete(controller);
            return Object.assign(queryResult, eagerMethods);
        });
        promise.catch(function () {
            abortControllersRef.current.delete(controller);
        });
        return promise;
    }, []);
    return [execute, result];
}
//# sourceMappingURL=useLazyQuery.js.map

/***/ }),

/***/ 1955:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9098);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6162);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(319);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6252);
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6515);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9583);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5998);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9655);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6042);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject, _templateObject2;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var GET_PROFILE = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_4__/* .gql */ .Ps)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query GetProfile {\n    getProfile {\n      id\n      name\n      email\n      phoneNumber\n      picture\n      scores {\n        id\n        quiz {\n          id\n          title\n          description\n          score\n        }\n        score\n        createdAt\n      }\n    }\n  }\n"])));
var DELETE_SCORE = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_4__/* .gql */ .Ps)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  mutation DeleteScore($id: ID!) {\n    DeleteScore(id: $id) {\n      id\n    }\n  }\n"])));
function UserProfile() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(function (state) {
      return state.auth;
    }),
    authenticated = _useSelector.authenticated;
  var _useLazyQuery = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_5__/* .useLazyQuery */ .t)(GET_PROFILE),
    _useLazyQuery2 = _slicedToArray(_useLazyQuery, 2),
    getProfile = _useLazyQuery2[0],
    _useLazyQuery2$ = _useLazyQuery2[1],
    loading = _useLazyQuery2$.loading,
    data = _useLazyQuery2$.data;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (authenticated) {
      getProfile();
    }
  }, [authenticated, getProfile]);
  var _useMutation = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_6__/* .useMutation */ .D)(DELETE_SCORE),
    _useMutation2 = _slicedToArray(_useMutation, 1),
    deleteScore = _useMutation2[0];
  var client = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_7__/* .useApolloClient */ .x)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    selectedScore = _useState2[0],
    setselectedScore = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showDeleteModal = _useState4[0],
    setShowDeleteModal = _useState4[1];
  var handleDelete = function handleDelete() {
    if (selectedScore) {
      deleteScore({
        variables: {
          id: selectedScore
        },
        onCompleted: function () {
          var _onCompleted = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  react_toastify__WEBPACK_IMPORTED_MODULE_3__/* .toast.success */ .Am.success("Score deleted");
                  _context.next = 3;
                  return client.resetStore();
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function onCompleted(_x2) {
            return _onCompleted.apply(this, arguments);
          }
          return onCompleted;
        }()
      });
      setShowDeleteModal(false);
    }
  };
  var handleShowDeleteModal = function handleShowDeleteModal(score) {
    setselectedScore(score);
    setShowDeleteModal(true);
  };
  if (loading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "flex justify-center items-center h-screen"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_8__/* .FaSpinner */ .fCD, {
      className: "animate-spin h-5 w-5 mr-3"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Loading..."));
  }
  if (!data) {
    return null;
  }
  var _data$getProfile = data.getProfile,
    email = _data$getProfile.email,
    name = _data$getProfile.name,
    phoneNumber = _data$getProfile.phoneNumber,
    picture = _data$getProfile.picture,
    scores = _data$getProfile.scores;
  var scorePercentage = function scorePercentage(score, total) {
    return (score / total * 100).toFixed();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "container mx-auto py-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "bg-white rounded-lg shadow-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "px-4 py-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("img", {
    src: picture,
    alt: name,
    className: "h-12 w-12 rounded-full"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "ml-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
    className: "text-lg font-semibold text-gray-800"
  }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
    className: "text-sm text-gray-600"
  }, email))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h3", {
    className: "text-sm font-semibold text-gray-800"
  }, "Contact Information"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
    className: "text-sm text-gray-600"
  }, phoneNumber)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h3", {
    className: "text-xl font-bold text-center text-gray-800"
  }, "Quiz Scores"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table */ .iA, {
    hoverable: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.Head */ .iA.Head, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.HeadCell */ .iA.HeadCell, null, "SN"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.HeadCell */ .iA.HeadCell, null, "Quiz Title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.HeadCell */ .iA.HeadCell, null, "Score"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.HeadCell */ .iA.HeadCell, null, "Action")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.Body */ .iA.Body, {
    className: "divide-y"
  }, scores.map(function (_ref, index) {
    var id = _ref.id,
      answers = _ref.answers,
      quiz = _ref.quiz,
      score = _ref.score;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.Row */ .iA.Row, {
      key: id,
      className: scorePercentage(score, quiz.score) >= 60 ? "bg-green-200 bg-opacity-40" : "bg-red-200 bg-opacity-40"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.Cell */ .iA.Cell, null, index + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.Cell */ .iA.Cell, {
      className: "whitespace-nowrap font-medium text-gray-900 dark:text-white"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__/* .Link */ .rU, {
      to: "/score/".concat(id)
    }, quiz.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.Cell */ .iA.Cell, null, "".concat(score, " / ").concat(quiz.score)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Table.Cell */ .iA.Cell, {
      className: "flex flex-row gap-3 justify-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
      color: "failure",
      size: "xs",
      onClick: function onClick() {
        return handleShowDeleteModal(id);
      }
    }, "Delete"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__/* .Link */ .rU, {
      to: "/score/".concat(id)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
      size: "xs",
      color: "success"
    }, "View"))));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Modal */ .u_, {
    show: showDeleteModal,
    onClose: function onClose() {
      return setShowDeleteModal(false);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Modal.Header */ .u_.Header, null, "Siba ikizamini"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Modal.Body */ .u_.Body, null, "Koko se dukomeze dusibe iki kizamini?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Modal.Footer */ .u_.Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    color: "success",
    onClick: function onClick() {
      return setShowDeleteModal(false);
    }
  }, "Oya"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(flowbite_react__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
    color: "failure",
    variant: "danger",
    onClick: handleDelete
  }, "Siba"))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserProfile);

/***/ })

}]);