"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(site)/signin/page",{

/***/ "(app-pages-browser)/./components/FormControls.jsx":
/*!*************************************!*\
  !*** ./components/FormControls.jsx ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormControls)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n//* Create FormControls component to be used in Login & Signup pages\nfunction FormControls(param) {\n    let { label, type, id, value, setValue } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"pb-5 flex flex-col items-center\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n            htmlFor: id,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                className: \"   text-black    h-10    ps-5    px-5   rounded-lg    text-lg    ring-2   ring-inset   ring-purple-200   focus:ring-4   focus:ring-purple-300   outline-none   bg-gray-100   leading-6   \",\n                onChange: (e)=>setValue(e.target.value),\n                required: true,\n                value: value,\n                type: type,\n                name: id,\n                id: id,\n                placeholder: id === \"email\" ? \"example@email.com\" : \"password\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\dbisw\\\\OneDrive\\\\Desktop\\\\SIH\\\\new\\\\digital-canvas\\\\components\\\\FormControls.jsx\",\n                lineNumber: 9,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\dbisw\\\\OneDrive\\\\Desktop\\\\SIH\\\\new\\\\digital-canvas\\\\components\\\\FormControls.jsx\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\dbisw\\\\OneDrive\\\\Desktop\\\\SIH\\\\new\\\\digital-canvas\\\\components\\\\FormControls.jsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n_c = FormControls;\nvar _c;\n$RefreshReg$(_c, \"FormControls\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvRm9ybUNvbnRyb2xzLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUUxQixvRUFBb0U7QUFDckQsU0FBU0MsYUFBYSxLQUFvQztRQUFwQyxFQUFFQyxLQUFLLEVBQUVDLElBQUksRUFBRUMsRUFBRSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFwQztJQUNuQyxxQkFDRSw4REFBQ0M7UUFBSUMsV0FBVTtrQkFDYiw0RUFBQ047WUFBTU8sU0FBU0w7c0JBRWQsNEVBQUNNO2dCQUNDRixXQUFVO2dCQWdCVkcsVUFBVSxDQUFDQyxJQUFNTixTQUFTTSxFQUFFQyxNQUFNLENBQUNSLEtBQUs7Z0JBQ3hDUyxRQUFRO2dCQUNSVCxPQUFPQTtnQkFDUEYsTUFBTUE7Z0JBQ05ZLE1BQU1YO2dCQUNOQSxJQUFJQTtnQkFDSlksYUFBYVosT0FBTyxVQUFVLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7OztBQUs5RDtLQWpDd0JIIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGRiaXN3XFxPbmVEcml2ZVxcRGVza3RvcFxcU0lIXFxuZXdcXGRpZ2l0YWwtY2FudmFzXFxjb21wb25lbnRzXFxGb3JtQ29udHJvbHMuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbi8vKiBDcmVhdGUgRm9ybUNvbnRyb2xzIGNvbXBvbmVudCB0byBiZSB1c2VkIGluIExvZ2luICYgU2lnbnVwIHBhZ2VzXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvcm1Db250cm9scyh7IGxhYmVsLCB0eXBlLCBpZCwgdmFsdWUsIHNldFZhbHVlIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwYi01IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgIDxsYWJlbCBodG1sRm9yPXtpZH0+XHJcbiAgICAgICAgey8qIDxwPntsYWJlbH08L3A+ICovfVxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiXHJcbiAgICAgICAgICAgIHRleHQtYmxhY2sgXHJcbiAgICAgICAgICAgIGgtMTAgXHJcbiAgICAgICAgICAgIHBzLTUgXHJcbiAgICAgICAgICAgIHB4LTVcclxuICAgICAgICAgICAgcm91bmRlZC1sZyBcclxuICAgICAgICAgICAgdGV4dC1sZyBcclxuICAgICAgICAgICAgcmluZy0yXHJcbiAgICAgICAgICAgIHJpbmctaW5zZXRcclxuICAgICAgICAgICAgcmluZy1wdXJwbGUtMjAwXHJcbiAgICAgICAgICAgIGZvY3VzOnJpbmctNFxyXG4gICAgICAgICAgICBmb2N1czpyaW5nLXB1cnBsZS0zMDBcclxuICAgICAgICAgICAgb3V0bGluZS1ub25lXHJcbiAgICAgICAgICAgIGJnLWdyYXktMTAwXHJcbiAgICAgICAgICAgIGxlYWRpbmctNlxyXG4gICAgICAgICAgXCJcclxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VmFsdWUoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgIHR5cGU9e3R5cGV9XHJcbiAgICAgICAgICBuYW1lPXtpZH1cclxuICAgICAgICAgIGlkPXtpZH1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtpZCA9PT0gXCJlbWFpbFwiID8gXCJleGFtcGxlQGVtYWlsLmNvbVwiIDogXCJwYXNzd29yZFwifVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkZvcm1Db250cm9scyIsImxhYmVsIiwidHlwZSIsImlkIiwidmFsdWUiLCJzZXRWYWx1ZSIsImRpdiIsImNsYXNzTmFtZSIsImh0bWxGb3IiLCJpbnB1dCIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsInJlcXVpcmVkIiwibmFtZSIsInBsYWNlaG9sZGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/FormControls.jsx\n"));

/***/ })

});