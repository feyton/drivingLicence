"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([[855],{

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

/***/ 319:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ useMutation)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(655);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4012);
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2152);
/* harmony import */ var _parser_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4692);
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(990);
/* harmony import */ var _useApolloClient_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6252);







function useMutation(mutation, options) {
    var client = (0,_useApolloClient_js__WEBPACK_IMPORTED_MODULE_2__/* .useApolloClient */ .x)(options === null || options === void 0 ? void 0 : options.client);
    (0,_parser_index_js__WEBPACK_IMPORTED_MODULE_3__/* .verifyDocumentType */ .Vp)(mutation, _parser_index_js__WEBPACK_IMPORTED_MODULE_3__/* .DocumentType.Mutation */ .n_.Mutation);
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        called: false,
        loading: false,
        client: client,
    }), result = _a[0], setResult = _a[1];
    var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
        result: result,
        mutationId: 0,
        isMounted: true,
        client: client,
        mutation: mutation,
        options: options,
    });
    {
        Object.assign(ref.current, { client: client, options: options, mutation: mutation });
    }
    var execute = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (executeOptions) {
        if (executeOptions === void 0) { executeOptions = {}; }
        var _a = ref.current, options = _a.options, mutation = _a.mutation;
        var baseOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_4__/* .__assign */ .pi)((0,tslib__WEBPACK_IMPORTED_MODULE_4__/* .__assign */ .pi)({}, options), { mutation: mutation });
        var client = executeOptions.client || ref.current.client;
        if (!ref.current.result.loading && !baseOptions.ignoreResults && ref.current.isMounted) {
            setResult(ref.current.result = {
                loading: true,
                error: void 0,
                data: void 0,
                called: true,
                client: client,
            });
        }
        var mutationId = ++ref.current.mutationId;
        var clientOptions = (0,_core_index_js__WEBPACK_IMPORTED_MODULE_5__/* .mergeOptions */ .J)(baseOptions, executeOptions);
        return client.mutate(clientOptions).then(function (response) {
            var _a;
            var data = response.data, errors = response.errors;
            var error = errors && errors.length > 0
                ? new _errors_index_js__WEBPACK_IMPORTED_MODULE_6__/* .ApolloError */ .c({ graphQLErrors: errors })
                : void 0;
            if (mutationId === ref.current.mutationId &&
                !clientOptions.ignoreResults) {
                var result_1 = {
                    called: true,
                    loading: false,
                    data: data,
                    error: error,
                    client: client,
                };
                if (ref.current.isMounted && !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__/* .equal */ .D)(ref.current.result, result_1)) {
                    setResult(ref.current.result = result_1);
                }
            }
            var onCompleted = executeOptions.onCompleted || ((_a = ref.current.options) === null || _a === void 0 ? void 0 : _a.onCompleted);
            onCompleted === null || onCompleted === void 0 ? void 0 : onCompleted(response.data, clientOptions);
            return response;
        }).catch(function (error) {
            var _a;
            if (mutationId === ref.current.mutationId &&
                ref.current.isMounted) {
                var result_2 = {
                    loading: false,
                    error: error,
                    data: void 0,
                    called: true,
                    client: client,
                };
                if (!(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__/* .equal */ .D)(ref.current.result, result_2)) {
                    setResult(ref.current.result = result_2);
                }
            }
            var onError = executeOptions.onError || ((_a = ref.current.options) === null || _a === void 0 ? void 0 : _a.onError);
            if (onError) {
                onError(error, clientOptions);
                return { data: void 0, errors: error };
            }
            throw error;
        });
    }, []);
    var reset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
        if (ref.current.isMounted) {
            setResult({ called: false, loading: false, client: client });
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        ref.current.isMounted = true;
        return function () {
            ref.current.isMounted = false;
        };
    }, []);
    return [execute, (0,tslib__WEBPACK_IMPORTED_MODULE_4__/* .__assign */ .pi)({ reset: reset }, result)];
}
//# sourceMappingURL=useMutation.js.map

/***/ })

}]);