module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/checkout/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
{}{
    step === 1 && /*#__PURE__*/ _jsxDEV("div", {
        children: [
            /*#__PURE__*/ _jsxDEV("h2", {
                className: "text-xl font-semibold text-[#2c3e50] mb-6",
                children: "Shipping Information"
            }, void 0, false, {
                fileName: "[project]/app/checkout/page.tsx",
                lineNumber: 4,
                columnNumber: 5
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "First Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 11,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                    /*#__PURE__*/ _jsxDEV("input", {
                                        type: "text",
                                        name: "firstName",
                                        required: true,
                                        value: formData.firstName,
                                        onChange: handleInputChange,
                                        className: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent",
                                        placeholder: "John"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 14,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 10,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("div", {
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Last Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 25,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                    /*#__PURE__*/ _jsxDEV("input", {
                                        type: "text",
                                        name: "lastName",
                                        required: true,
                                        value: formData.lastName,
                                        onChange: handleInputChange,
                                        className: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent",
                                        placeholder: "Doe"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 28,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 24,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/checkout/page.tsx",
                        lineNumber: 9,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("div", {
                        children: [
                            /*#__PURE__*/ _jsxDEV("label", {
                                className: "block text-sm font-medium text-gray-700 mb-2",
                                children: "Email Address *"
                            }, void 0, false, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 41,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("input", {
                                type: "email",
                                name: "email",
                                required: true,
                                value: formData.email,
                                onChange: handleInputChange,
                                className: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent",
                                placeholder: "john@example.com"
                            }, void 0, false, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 44,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/checkout/page.tsx",
                        lineNumber: 40,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("div", {
                        children: [
                            /*#__PURE__*/ _jsxDEV("label", {
                                className: "block text-sm font-medium text-gray-700 mb-2",
                                children: "Address *"
                            }, void 0, false, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 56,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("input", {
                                type: "text",
                                name: "address",
                                required: true,
                                value: formData.address,
                                onChange: handleInputChange,
                                className: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent",
                                placeholder: "123 Main St"
                            }, void 0, false, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 59,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/checkout/page.tsx",
                        lineNumber: 55,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "grid grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "City *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                    /*#__PURE__*/ _jsxDEV("input", {
                                        type: "text",
                                        name: "city",
                                        required: true,
                                        value: formData.city,
                                        onChange: handleInputChange,
                                        className: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent",
                                        placeholder: "New York"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 71,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("div", {
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "ZIP Code *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                    /*#__PURE__*/ _jsxDEV("input", {
                                        type: "text",
                                        name: "zipCode",
                                        required: true,
                                        value: formData.zipCode,
                                        onChange: handleInputChange,
                                        className: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent",
                                        placeholder: "10001"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 85,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("div", {
                                children: [
                                    /*#__PURE__*/ _jsxDEV("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Country *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                    /*#__PURE__*/ _jsxDEV("select", {
                                        name: "country",
                                        required: true,
                                        value: formData.country,
                                        onChange: handleInputChange,
                                        className: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "US",
                                                children: "United States"
                                            }, void 0, false, {
                                                fileName: "[project]/app/checkout/page.tsx",
                                                lineNumber: 110,
                                                columnNumber: 13
                                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "CA",
                                                children: "Canada"
                                            }, void 0, false, {
                                                fileName: "[project]/app/checkout/page.tsx",
                                                lineNumber: 111,
                                                columnNumber: 13
                                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "UK",
                                                children: "United Kingdom"
                                            }, void 0, false, {
                                                fileName: "[project]/app/checkout/page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 13
                                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                            /*#__PURE__*/ _jsxDEV("option", {
                                                value: "AU",
                                                children: "Australia"
                                            }, void 0, false, {
                                                fileName: "[project]/app/checkout/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 13
                                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/checkout/page.tsx",
                                        lineNumber: 103,
                                        columnNumber: 11
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 99,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/checkout/page.tsx",
                        lineNumber: 70,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("div", {
                        children: [
                            /*#__PURE__*/ _jsxDEV("label", {
                                className: "block text-sm font-medium text-gray-700 mb-2",
                                children: "Phone Number *"
                            }, void 0, false, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 119,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("input", {
                                type: "tel",
                                name: "phone",
                                required: true,
                                value: formData.phone,
                                onChange: handleInputChange,
                                className: "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent",
                                placeholder: "+1 (555) 123-4567"
                            }, void 0, false, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 122,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/checkout/page.tsx",
                        lineNumber: 118,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ _jsxDEV("input", {
                                type: "checkbox",
                                name: "saveInfo",
                                checked: formData.saveInfo,
                                onChange: handleInputChange,
                                className: "h-4 w-4 text-[#e74c3c] rounded"
                            }, void 0, false, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 134,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("label", {
                                className: "ml-2 text-sm text-gray-700",
                                children: "Save this information for next time"
                            }, void 0, false, {
                                fileName: "[project]/app/checkout/page.tsx",
                                lineNumber: 141,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/checkout/page.tsx",
                        lineNumber: 133,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                ]
            }, void 0, true, {
                fileName: "[project]/app/checkout/page.tsx",
                lineNumber: 8,
                columnNumber: 5
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
        ]
    }, void 0, true, {
        fileName: "[project]/app/checkout/page.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, /*TURBOPACK member replacement*/ __turbopack_context__.e);
}}),
"[project]/app/checkout/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/checkout/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a8d4dbb7._.js.map