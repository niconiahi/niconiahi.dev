var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// ../../node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "../../node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toESM(require("react"));
  }
});

// ../../node_modules/remix/index.js
var require_remix = __commonJS({
  "../../node_modules/remix/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require("@remix-run/node");
    Object.defineProperty(exports, "createCookie", {
      enumerable: true,
      get: function() {
        return node.createCookie;
      }
    });
    Object.defineProperty(exports, "createCookieSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createCookieSessionStorage;
      }
    });
    Object.defineProperty(exports, "createFileSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createFileSessionStorage;
      }
    });
    Object.defineProperty(exports, "createMemorySessionStorage", {
      enumerable: true,
      get: function() {
        return node.createMemorySessionStorage;
      }
    });
    Object.defineProperty(exports, "createSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createSessionStorage;
      }
    });
    Object.defineProperty(exports, "unstable_createFileUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createFileUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return node.unstable_parseMultipartFormData;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require("@remix-run/server-runtime");
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var react = require("@remix-run/react");
    Object.defineProperty(exports, "Form", {
      enumerable: true,
      get: function() {
        return react.Form;
      }
    });
    Object.defineProperty(exports, "Link", {
      enumerable: true,
      get: function() {
        return react.Link;
      }
    });
    Object.defineProperty(exports, "Links", {
      enumerable: true,
      get: function() {
        return react.Links;
      }
    });
    Object.defineProperty(exports, "LiveReload", {
      enumerable: true,
      get: function() {
        return react.LiveReload;
      }
    });
    Object.defineProperty(exports, "Meta", {
      enumerable: true,
      get: function() {
        return react.Meta;
      }
    });
    Object.defineProperty(exports, "NavLink", {
      enumerable: true,
      get: function() {
        return react.NavLink;
      }
    });
    Object.defineProperty(exports, "Outlet", {
      enumerable: true,
      get: function() {
        return react.Outlet;
      }
    });
    Object.defineProperty(exports, "PrefetchPageLinks", {
      enumerable: true,
      get: function() {
        return react.PrefetchPageLinks;
      }
    });
    Object.defineProperty(exports, "RemixBrowser", {
      enumerable: true,
      get: function() {
        return react.RemixBrowser;
      }
    });
    Object.defineProperty(exports, "RemixServer", {
      enumerable: true,
      get: function() {
        return react.RemixServer;
      }
    });
    Object.defineProperty(exports, "Scripts", {
      enumerable: true,
      get: function() {
        return react.Scripts;
      }
    });
    Object.defineProperty(exports, "ScrollRestoration", {
      enumerable: true,
      get: function() {
        return react.ScrollRestoration;
      }
    });
    Object.defineProperty(exports, "useActionData", {
      enumerable: true,
      get: function() {
        return react.useActionData;
      }
    });
    Object.defineProperty(exports, "useBeforeUnload", {
      enumerable: true,
      get: function() {
        return react.useBeforeUnload;
      }
    });
    Object.defineProperty(exports, "useCatch", {
      enumerable: true,
      get: function() {
        return react.useCatch;
      }
    });
    Object.defineProperty(exports, "useFetcher", {
      enumerable: true,
      get: function() {
        return react.useFetcher;
      }
    });
    Object.defineProperty(exports, "useFetchers", {
      enumerable: true,
      get: function() {
        return react.useFetchers;
      }
    });
    Object.defineProperty(exports, "useFormAction", {
      enumerable: true,
      get: function() {
        return react.useFormAction;
      }
    });
    Object.defineProperty(exports, "useHref", {
      enumerable: true,
      get: function() {
        return react.useHref;
      }
    });
    Object.defineProperty(exports, "useLoaderData", {
      enumerable: true,
      get: function() {
        return react.useLoaderData;
      }
    });
    Object.defineProperty(exports, "useLocation", {
      enumerable: true,
      get: function() {
        return react.useLocation;
      }
    });
    Object.defineProperty(exports, "useMatches", {
      enumerable: true,
      get: function() {
        return react.useMatches;
      }
    });
    Object.defineProperty(exports, "useNavigate", {
      enumerable: true,
      get: function() {
        return react.useNavigate;
      }
    });
    Object.defineProperty(exports, "useNavigationType", {
      enumerable: true,
      get: function() {
        return react.useNavigationType;
      }
    });
    Object.defineProperty(exports, "useOutlet", {
      enumerable: true,
      get: function() {
        return react.useOutlet;
      }
    });
    Object.defineProperty(exports, "useOutletContext", {
      enumerable: true,
      get: function() {
        return react.useOutletContext;
      }
    });
    Object.defineProperty(exports, "useParams", {
      enumerable: true,
      get: function() {
        return react.useParams;
      }
    });
    Object.defineProperty(exports, "useResolvedPath", {
      enumerable: true,
      get: function() {
        return react.useResolvedPath;
      }
    });
    Object.defineProperty(exports, "useSearchParams", {
      enumerable: true,
      get: function() {
        return react.useSearchParams;
      }
    });
    Object.defineProperty(exports, "useSubmit", {
      enumerable: true,
      get: function() {
        return react.useSubmit;
      }
    });
    Object.defineProperty(exports, "useTransition", {
      enumerable: true,
      get: function() {
        return react.useTransition;
      }
    });
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// server-entry-module:@remix-run/dev/server-build
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_server = require("react-dom/server");
var import_remix = __toESM(require_remix());
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  meta: () => meta
});
init_react();
var import_remix2 = __toESM(require_remix());

// app/styles/app.css
var app_default = "/build/_assets/app-OLOSLFFZ.css";

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/root.tsx
var meta = () => {
  return { title: "niconiahi.dev" };
};
var links = () => {
  return [{ rel: "stylesheet", href: app_default }];
};
function Document({
  children,
  title
}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("link", {
    href: "/favicon.png",
    rel: "icon",
    type: "image/png"
  }), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement(import_remix2.Meta, null), /* @__PURE__ */ React.createElement(import_remix2.Links, null)), /* @__PURE__ */ React.createElement("body", null, children, /* @__PURE__ */ React.createElement(import_remix2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix2.Scripts, null), false));
}
function App() {
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(import_remix2.Outlet, null));
}
function CatchBoundary() {
  const caught = (0, import_remix2.useCatch)();
  switch (caught.status) {
    case 404:
      return /* @__PURE__ */ React.createElement(Document, {
        title: `${caught.status} ${caught.statusText}`
      }, /* @__PURE__ */ React.createElement("h1", null, caught.status, " ", caught.statusText));
    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement("h1", null, "App Error"), /* @__PURE__ */ React.createElement("pre", null, error.message), /* @__PURE__ */ React.createElement("p", null, "Replace this UI with what you want users to see when your app throws uncaught errors."));
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  loader: () => loader
});
init_react();
var import_remix3 = __toESM(require_remix());
var loader = async () => (0, import_remix3.redirect)("/find");

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find.tsx
var find_exports = {};
__export(find_exports, {
  default: () => Find
});
init_react();
var import_remix4 = __toESM(require_remix());

// app/icons/index.ts
init_react();

// app/icons/x.tsx
init_react();
function X({ className = "" }) {
  return /* @__PURE__ */ React.createElement("svg", {
    className,
    fill: "none",
    height: "24",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("line", {
    x1: "18",
    x2: "6",
    y1: "6",
    y2: "18"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "6",
    x2: "18",
    y1: "6",
    y2: "18"
  }));
}
var x_default = X;

// app/icons/github.tsx
init_react();
function Menu({ className = "" }) {
  return /* @__PURE__ */ React.createElement("svg", {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
  }));
}
var github_default = Menu;

// app/icons/arrow-right.tsx
init_react();
function ArrowRight({ className = "" }) {
  return /* @__PURE__ */ React.createElement("svg", {
    className,
    fill: "none",
    height: "24",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    viewBox: "0 0 24 24",
    width: "24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("line", {
    x1: "5",
    x2: "19",
    y1: "12",
    y2: "12"
  }), /* @__PURE__ */ React.createElement("polyline", {
    points: "12 5 19 12 12 19"
  }));
}
var arrow_right_default = ArrowRight;

// app/components/index.ts
init_react();

// app/components/icon-link.tsx
init_react();
var import_clsx = __toESM(require("clsx"));
function IconLink(_a) {
  var _b = _a, {
    label,
    children,
    isExternal = false,
    className: classNameProp
  } = _b, aProps = __objRest(_b, [
    "label",
    "children",
    "isExternal",
    "className"
  ]);
  const className = getClassName(classNameProp);
  const referrer = isExternal ? { rel: "norefereer noopener", target: "_blank" } : {};
  return /* @__PURE__ */ React.createElement("a", __spreadValues(__spreadValues({
    className
  }, aProps), referrer), children, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, label));
}
var icon_link_default = IconLink;
function getClassName(className) {
  return (0, import_clsx.default)("p-2 rounded transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100", className);
}

// app/components/icon-button.tsx
init_react();
var import_clsx2 = __toESM(require("clsx"));
function IconButton(_a) {
  var _b = _a, {
    children,
    className: classNameProp
  } = _b, buttonProps = __objRest(_b, [
    "children",
    "className"
  ]);
  const className = getClassName2(classNameProp);
  return /* @__PURE__ */ React.createElement("button", __spreadValues({
    className
  }, buttonProps), children);
}
var icon_button_default = IconButton;
function getClassName2(className) {
  return (0, import_clsx2.default)("p-2 hover:bg-gray-200 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 text-black dark:text-white", className);
}

// app/components/address-display.tsx
init_react();

// app/helpers/array.ts
init_react();
function numbers(length) {
  return [...Array(length).keys()];
}
function replace(array, el, index) {
  return [...array.slice(0, index), el, ...array.slice(++index)];
}

// app/helpers/string.ts
init_react();
function firstLetterToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateString(str, start = 6, end = -4) {
  return `${str.slice(0, start)}...${str.slice(end)}`;
}

// app/helpers/big-number.ts
init_react();
var import_bignumber = require("@ethersproject/bignumber");
function bigNumberToString(bigNumber, decimals) {
  function getDivisor(decimals2) {
    const zeros = numbers(decimals2).map(() => "0").join("");
    return "1" + zeros;
  }
  const divisor = getDivisor(decimals);
  return bigNumber.div(divisor).toString();
}
function big(value) {
  return import_bignumber.BigNumber.from(value);
}

// app/helpers/gas.server.ts
init_react();
var ETHERCHAIN_URL = "https://etherchain.org/api/gasPriceOracle";
function getGasPrice() {
  function gweiToWei(gwei) {
    return gwei * 1e9;
  }
  return fetch(ETHERCHAIN_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => response.json()).then(({ fast: gwei }) => gweiToWei(gwei));
}

// app/helpers/block.server.ts
init_react();
async function getBlockNumber({
  chainId
}) {
  const provider = getRpcProvider({ chainId });
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
}

// app/helpers/provider.server.ts
init_react();
var import_providers2 = require("@ethersproject/providers");

// app/providers/transaction-provider.tsx
init_react();
var import_react4 = __toESM(require("react"));

// app/hooks/index.ts
init_react();

// app/hooks/use-connect-metamask.ts
init_react();
var import_tiny_invariant = __toESM(require("tiny-invariant"));
function useConnectMetamask() {
  const { provider, set } = useXyz();
  async function connectMetamask() {
    (0, import_tiny_invariant.default)(provider, "You need to have Metamask installed");
    await provider.provider.send("eth_requestAccounts", []).then((accounts) => {
      const [account] = accounts;
      set({ type: "ACCOUNT" /* Account */, value: account });
    });
  }
  return connectMetamask;
}

// app/hooks/contracts/use-mint-contract.ts
init_react();
var import_web3 = require("@niconiahi/web3");

// app/constants/routes.ts
init_react();
var ROUTES = {
  home: "/"
};
var EXTERNAL_ROUTES = {
  github: "https://github.com/niconiahi"
};

// app/constants/contracts.ts
init_react();
var RIKEBY_CONTRACT_ADDRESSES = {
  mint: "0x00EFD5B58c02502e18FC137EdC8ce4Acd7d183a6",
  waver: "0x0e41b2E16036632F2Eb7d7C6B920887B11f087e3",
  counter: "0x1D2561D18dD2fc204CcC8831026d28375065ed53"
};
var MAINNET_CONTRACT_ADDRESSES = {
  transfers: "0x1985365e9f78359a9B6AD760e32412f4a445E862"
};

// app/constants/endpoints.ts
init_react();
var ETHERSCAN_URL = "https://etherscan.io/tx/";

// app/hooks/contracts/use-mint-contract.ts
function useMintContract() {
  const { signer } = useXyz();
  const address = RIKEBY_CONTRACT_ADDRESSES.mint;
  if (!signer)
    return void 0;
  return import_web3.Mint__factory.connect(address, signer);
}

// app/hooks/contracts/use-waver-contract.ts
init_react();
var import_web32 = require("@niconiahi/web3");
function useWaverContract() {
  const { signer } = useXyz();
  const address = RIKEBY_CONTRACT_ADDRESSES.waver;
  if (!signer)
    return void 0;
  return import_web32.Waver__factory.connect(address, signer);
}

// app/hooks/contracts/use-counter-contract.ts
init_react();
var import_web33 = require("@niconiahi/web3");
function useCounterContract() {
  const { signer } = useXyz();
  const address = RIKEBY_CONTRACT_ADDRESSES.counter;
  if (!signer)
    return void 0;
  return import_web33.Counter__factory.connect(address, signer);
}

// app/hooks/contracts/use-transfers-contract.ts
init_react();
var import_web34 = require("@niconiahi/web3");
function useTransfersContract() {
  const { signer } = useXyz();
  const address = MAINNET_CONTRACT_ADDRESSES.transfers;
  if (!signer)
    return void 0;
  return import_web34.Transfers__factory.connect(address, signer);
}

// app/providers/xyz-provider.tsx
init_react();
var import_react = require("react");
var import_providers = require("@ethersproject/providers");
var XyzContext = (0, import_react.createContext)({});
function XyzProvider({
  children
}) {
  const [block, setBlock] = (0, import_react.useState)(void 0);
  const [signer, setSigner] = (0, import_react.useState)(void 0);
  const [chainId, setChainId] = (0, import_react.useState)(void 0);
  const [account, setAccount] = (0, import_react.useState)(void 0);
  const [provider, setProvider] = (0, import_react.useState)(void 0);
  const [blockNumber, setBlockNumber] = (0, import_react.useState)(void 0);
  (0, import_react.useEffect)(() => {
    if (!window || (provider == null ? void 0 : provider.type) === "METAMASK" /* Metamask */)
      return;
    setProvider({
      provider: new import_providers.Web3Provider(window.ethereum),
      type: "METAMASK" /* Metamask */
    });
  }, [provider]);
  (0, import_react.useEffect)(() => {
    if (window || provider)
      return;
    setProvider({
      provider: getRpcProvider({ chainId }),
      type: "RPC" /* Rpc */
    });
  }, [chainId, provider]);
  (0, import_react.useEffect)(() => {
    if (!provider)
      return;
    async function getAccount({ provider: provider2 }) {
      const accounts = await provider2.send("eth_accounts", []);
      setAccount(accounts[0]);
    }
    getAccount(provider);
  }, [provider]);
  (0, import_react.useEffect)(() => {
    if (!provider)
      return;
    async function getChainId({ provider: provider2 }) {
      const hexChainId = await provider2.send("eth_chainId", []);
      const chainId2 = hexToNumber(hexChainId);
      setChainId(chainId2);
    }
    getChainId(provider);
  }, [provider]);
  (0, import_react.useEffect)(() => {
    if (!provider)
      return;
    const blockIntervalId = setInterval(() => getBlockNumber2(provider), 5e3);
    async function getBlockNumber2({ provider: provider2 }) {
      const blockNumber2 = await provider2.getBlockNumber();
      setBlockNumber(blockNumber2);
    }
    getBlockNumber2(provider);
    return () => {
      clearInterval(blockIntervalId);
    };
  }, [provider]);
  (0, import_react.useEffect)(() => {
    if (!provider || !blockNumber)
      return;
    async function getBlock({ provider: provider2 }, blockNumber2) {
      const block2 = await provider2.getBlock(blockNumber2);
      setBlock(block2);
    }
    getBlock(provider, blockNumber);
  }, [blockNumber, provider]);
  (0, import_react.useEffect)(() => {
    if (!provider)
      return;
    function getSigner({ provider: provider2 }) {
      setSigner(provider2.getSigner());
    }
    getSigner(provider);
  }, [provider]);
  (0, import_react.useEffect)(() => {
    if (!window)
      return;
    const ethereum = getEthereum();
    ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        const [account2] = accounts;
        setAccount(account2);
      } else {
        setAccount(void 0);
      }
    });
    return () => {
      ethereum.removeListener("accountsChanged", () => {
        console.log('stop listening to "accountsChanged" event');
      });
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (!window)
      return;
    const ethereum = getEthereum();
    ethereum.on("chainChanged", (hexChainId) => {
      const chainId2 = hexToNumber(hexChainId);
      setChainId(chainId2);
    });
    return () => {
      ethereum.removeListener("chainChanged", () => {
        console.log('stop listening to "chanChanged" event');
      });
    };
  }, []);
  function set(nextValue) {
    switch (nextValue.type) {
      case "ACCOUNT" /* Account */: {
        setAccount(nextValue.value);
        break;
      }
    }
  }
  return /* @__PURE__ */ React.createElement(XyzContext.Provider, {
    value: { provider, account, chainId, blockNumber, block, signer, set }
  }, children);
}
function useXyz() {
  const web3Context = (0, import_react.useContext)(XyzContext);
  if (!web3Context) {
    throw new Error("You forgot to use your useWeb3hook within a Web3Provider");
  }
  return web3Context;
}
function hexToNumber(hexChainId) {
  return Number(hexChainId.slice(2));
}
function getEthereum() {
  return window.ethereum;
}

// app/providers/transaction-toast-provider.tsx
init_react();
var import_react2 = require("@headlessui/react");
var import_react3 = __toESM(require("react"));
var import_tiny_invariant2 = __toESM(require("tiny-invariant"));
var DEFAULT_OPTIONS = {
  titles: {
    ["IDLE" /* Idle */]: void 0,
    ["MINED" /* Mined */]: "Transaction mined",
    ["FAILED" /* Failed */]: "Transaction failed",
    ["MINING" /* Mining */]: "Transaction mining",
    ["PENDING" /* Pending */]: "Transaction pending"
  },
  descriptions: {
    ["IDLE" /* Idle */]: void 0,
    ["MINED" /* Mined */]: "Your transaction was mined by a miner",
    ["FAILED" /* Failed */]: "Your transaction failed to be transacted",
    ["MINING" /* Mining */]: "Your transaction was sent to the blockchain",
    ["PENDING" /* Pending */]: "Your transaction is pending to be signed"
  }
};
var TransactionToastContext = (0, import_react3.createContext)({});
var TransactionToastProvider = ({ children }) => {
  const [on, setOn] = (0, import_react3.useState)(void 0);
  const [messages, setMessages] = (0, import_react3.useState)(DEFAULT_OPTIONS);
  const { state } = useTransaction();
  const composeMessages = (nextMessages) => {
    const getMessages = (defaultMessages, nextMessages2) => {
      const messages3 = __spreadValues(__spreadValues({}, defaultMessages), nextMessages2);
      return messages3;
    };
    const messages2 = getMessages(DEFAULT_OPTIONS, nextMessages);
    setMessages(messages2);
  };
  (0, import_react3.useEffect)(() => {
    const handleOn = (state2, on2) => {
      switch (state2.state) {
        case "IDLE" /* Idle */:
          (0, import_tiny_invariant2.default)(state2.state === "IDLE" /* Idle */, "Transaction provider => state should be idle");
          const onIdle = on2 == null ? void 0 : on2["IDLE" /* Idle */];
          onIdle == null ? void 0 : onIdle(state2);
          return;
        case "MINED" /* Mined */:
          (0, import_tiny_invariant2.default)(state2.state === "MINED" /* Mined */, "Transaction provider => state should be success");
          const onMined = on2 == null ? void 0 : on2["MINED" /* Mined */];
          onMined == null ? void 0 : onMined(state2);
          return;
        case "FAILED" /* Failed */:
          (0, import_tiny_invariant2.default)(state2.state === "FAILED" /* Failed */, "Transaction provider => state should be failed");
          const onFailed = on2 == null ? void 0 : on2["FAILED" /* Failed */];
          onFailed == null ? void 0 : onFailed(state2);
          return;
        case "MINING" /* Mining */:
          (0, import_tiny_invariant2.default)(state2.state === "MINING" /* Mining */, "Transaction provider => state should be mining");
          const onMining = on2 == null ? void 0 : on2["MINING" /* Mining */];
          onMining == null ? void 0 : onMining(state2);
          return;
        case "PENDING" /* Pending */:
          (0, import_tiny_invariant2.default)(state2.state === "PENDING" /* Pending */, "Transaction provider => state should be pending");
          const onPending = on2 == null ? void 0 : on2["PENDING" /* Pending */];
          onPending == null ? void 0 : onPending(state2);
          return;
        default:
          break;
      }
    };
    handleOn(state, on);
  }, [on, state]);
  return /* @__PURE__ */ import_react3.default.createElement(TransactionToastContext.Provider, {
    value: { composeMessages, setOn }
  }, children, /* @__PURE__ */ import_react3.default.createElement(Toast, {
    key: state.state,
    messages,
    state
  }));
};
var useTransactionToast = ({
  on,
  messages
} = {}) => {
  const hasSetOn = (0, import_react3.useRef)(false);
  const hasSetMessages = (0, import_react3.useRef)(false);
  const transactionToastContext = (0, import_react3.useContext)(TransactionToastContext);
  if (!transactionToastContext) {
    throw new Error("You forgot to use your useTransactionToast within a TransactionToastProvider");
  }
  const { composeMessages, setOn } = transactionToastContext;
  (0, import_react3.useEffect)(() => {
    if (!messages)
      return;
    if (!hasSetMessages.current) {
      composeMessages(messages);
      hasSetMessages.current = true;
    }
  }, [composeMessages, messages]);
  (0, import_react3.useEffect)(() => {
    if (!on)
      return;
    if (!hasSetOn.current) {
      setOn(on);
      hasSetOn.current = true;
    }
  }, [on, setOn]);
};
function Toast({
  state,
  messages
}) {
  const [isOpen, setIsOpen] = (0, import_react3.useState)(true);
  const { descriptions, titles } = messages;
  function getTitle({ state: state2 }, titles2) {
    if (state2 === "IDLE" /* Idle */)
      return void 0;
    return titles2[state2];
  }
  function getDescription({ state: state2 }, descriptions2) {
    if (state2 === "IDLE" /* Idle */)
      return void 0;
    return descriptions2[state2];
  }
  const title = getTitle(state, titles);
  const description = getDescription(state, descriptions);
  if (state.state === "IDLE" /* Idle */)
    return null;
  return /* @__PURE__ */ import_react3.default.createElement(import_react2.Transition, {
    enter: "transition duration-100 ease-out",
    enterFrom: "transform scale-95 opacity-0",
    enterTo: "transform scale-100 opacity-100",
    leave: "transition duration-75 ease-out",
    leaveFrom: "transform scale-100 opacity-100",
    leaveTo: "transform scale-95 opacity-0",
    show: isOpen
  }, /* @__PURE__ */ import_react3.default.createElement(import_react2.Dialog, {
    className: "bg-gray-50 fixed bottom-4 right-4 border-2 border-gray-900 rounded-md p-2",
    onClose: () => setIsOpen(false)
  }, /* @__PURE__ */ import_react3.default.createElement("div", {
    className: "relative w-full h-full"
  }, /* @__PURE__ */ import_react3.default.createElement(import_react2.Dialog.Overlay, null), /* @__PURE__ */ import_react3.default.createElement(import_react2.Dialog.Title, null, title), /* @__PURE__ */ import_react3.default.createElement(import_react2.Dialog.Description, null, description), /* @__PURE__ */ import_react3.default.createElement(icon_button_default, {
    className: "absolute top-0 right-0 p-0",
    onClick: () => setIsOpen(false)
  }, /* @__PURE__ */ import_react3.default.createElement(x_default, {
    className: "h-5 w-5"
  })))));
}

// app/providers/transaction-provider.tsx
var TransactionContext = (0, import_react4.createContext)({});
var DEFAULT_STATUS = {
  state: "IDLE" /* Idle */
};
var TransactionProvider = ({ children }) => {
  const [state, setState] = (0, import_react4.useState)(DEFAULT_STATUS);
  (0, import_react4.useEffect)(() => {
    if (state.state !== "MINED" /* Mined */)
      return;
    setTimeout(() => {
      setState({ state: "IDLE" /* Idle */ });
    }, 5e3);
  }, [state]);
  (0, import_react4.useEffect)(() => {
    if (state.state !== "FAILED" /* Failed */)
      return;
    setTimeout(() => {
      setState({ state: "IDLE" /* Idle */ });
    }, 5e3);
  }, [state]);
  const send = async (transactionFunction) => {
    try {
      setState({ state: "PENDING" /* Pending */ });
      const transaction = await transactionFunction();
      setState({ state: "MINING" /* Mining */, transaction });
      const receipt = await transaction.wait();
      setState({
        state: "MINED" /* Mined */,
        receipt,
        transaction
      });
    } catch (error) {
      setState({
        state: "FAILED" /* Failed */,
        error: "Error while executing the transaction"
      });
    }
  };
  return /* @__PURE__ */ import_react4.default.createElement(TransactionContext.Provider, {
    value: { state, send }
  }, children);
};
function useTransaction({
  on,
  messages
} = {}) {
  const transactionContext = (0, import_react4.useContext)(TransactionContext);
  if (!transactionContext) {
    throw new Error("You forgot to use your useTransaction within a TransactionProvider");
  }
  const { send, state } = transactionContext;
  useTransactionToast({ messages, on });
  return {
    send,
    state
  };
}

// app/helpers/fetching.server.ts
init_react();
async function subgraph(query, project, variables) {
  function getEndpoint(project2) {
    switch (project2) {
      case "MINT" /* Mint */: {
        return process.env.SUBGRAPH_MINT;
      }
      case "WAVER" /* Waver */: {
        return process.env.SUBGRAPH_WAVER;
      }
      case "COUNTER" /* Counter */: {
        return process.env.SUBGRAPH_COUNTER;
      }
    }
  }
  return fetch(getEndpoint(project), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(__spreadValues({
      query
    }, variables ? variables : {}))
  }).then((response) => response.json()).then((response) => response.data);
}

// app/helpers/provider.server.ts
function getRpcProvider({
  chainId
}) {
  switch (chainId) {
    case 1 /* Mainnet */: {
      return new import_providers2.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/a5n7e0kB6LJg5nDUx2cFqEYeDoa8aeqP", chainId);
    }
    case 4 /* Rinkeby */: {
      return new import_providers2.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/DTrh_uPMx4itUkUWVvdvp3u4HmZxEXJE", chainId);
    }
    case 539 /* Localhost */: {
      return new import_providers2.JsonRpcProvider();
    }
    default: {
      return new import_providers2.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/a5n7e0kB6LJg5nDUx2cFqEYeDoa8aeqP", chainId);
    }
  }
}

// app/helpers/contracts.server.ts
init_react();
var import_web35 = require("@niconiahi/web3");
function getErc20Contract({
  address,
  chainId
}) {
  const provider = getRpcProvider({ chainId });
  return import_web35.ERC20__factory.connect(address, provider);
}

// app/helpers/contracts/waver-contract.server.ts
init_react();
var import_web36 = require("@niconiahi/web3");
function getWaverContract({
  provider
}) {
  const address = RIKEBY_CONTRACT_ADDRESSES.waver;
  return import_web36.Waver__factory.connect(address, provider);
}

// app/components/address-display.tsx
function AddressDisplay({
  account
}) {
  return /* @__PURE__ */ React.createElement("header", {
    className: "flex w-full justify-end"
  }, /* @__PURE__ */ React.createElement("aside", {
    className: "border-2 p-2 border-gray-900 rounded-md flex space-x-2 items-center justify-center"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "w-2 h-2 bg-green-400 rounded outline outline-1 outline-gray-900"
  }), /* @__PURE__ */ React.createElement("h1", null, truncateString(account))));
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find.tsx
function Find() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 bg-gray-50"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "min-w-60 flex flex-col dark:bg-gray-900 h-screen p-4 border-r-2 border-gray-900"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "mb-8"
  }, /* @__PURE__ */ React.createElement(import_remix4.Link, {
    to: ROUTES.home
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-3xl text-black dark:text-gray-100 magic-underline px-2"
  }, "niconiahi"))), /* @__PURE__ */ React.createElement("nav", {
    className: "flex flex-1"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "flex flex-col w-full"
  }, /* @__PURE__ */ React.createElement(import_remix4.Link, {
    className: "w-full p-2 rounded transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100",
    to: "bio"
  }, "Bio"), /* @__PURE__ */ React.createElement(import_remix4.Link, {
    className: "w-full p-2 rounded transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100",
    to: "projects"
  }, "Projects"))), /* @__PURE__ */ React.createElement("footer", {
    className: "flex items-center justify-start align-center px-2"
  }, /* @__PURE__ */ React.createElement(icon_link_default, {
    isExternal: true,
    className: "transform -translate-x-2",
    href: EXTERNAL_ROUTES.github,
    label: "Github"
  }, /* @__PURE__ */ React.createElement(github_default, {
    className: "h-8 w-8"
  })))), /* @__PURE__ */ React.createElement(import_remix4.Outlet, null));
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/bio/index.tsx
var bio_exports = {};
__export(bio_exports, {
  default: () => Index
});
init_react();
function Index() {
  return /* @__PURE__ */ React.createElement("h1", null, "What do you want to know about me?");
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/projects.tsx
var projects_exports = {};
__export(projects_exports, {
  default: () => Index2,
  loader: () => loader2
});
init_react();
var import_remix5 = __toESM(require_remix());

// app/providers/index.ts
init_react();

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/projects.tsx
var loader2 = () => {
  const projects = [
    { path: "counter", type: 0 /* Web3 */ },
    {
      path: "waver",
      type: 0 /* Web3 */
    },
    {
      path: "transfers",
      type: 0 /* Web3 */
    },
    {
      path: "mint",
      type: 0 /* Web3 */
    },
    {
      path: "indexing",
      type: 0 /* Web3 */
    }
  ];
  return (0, import_remix5.json)({ projects });
};
function Index2() {
  const { projects } = (0, import_remix5.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("nav", {
    className: "h-full min-w-60 border-r-2 border-gray-900 p-4"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "flex flex-col"
  }, projects.map(({ path }) => /* @__PURE__ */ React.createElement(import_remix5.Link, {
    key: `project-item-${path}`,
    className: "w-full p-2 rounded transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100",
    to: path
  }, firstLetterToUpper(path)))))), /* @__PURE__ */ React.createElement(XyzProvider, null, /* @__PURE__ */ React.createElement(TransactionProvider, null, /* @__PURE__ */ React.createElement(TransactionToastProvider, null, /* @__PURE__ */ React.createElement("main", {
    className: "flex flex-col items-center justify-start w-full flex-1 overflow-y-scroll relative h-screen space-y-4 p-4"
  }, /* @__PURE__ */ React.createElement(import_remix5.Outlet, null))))));
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/projects/transfers.tsx
var transfers_exports = {};
__export(transfers_exports, {
  default: () => TransfersProject
});
init_react();
var import_react5 = require("react");
function TransfersProject() {
  const connectMetamask = useConnectMetamask();
  const transfersContract = useTransfersContract();
  const { chainId, blockNumber, account } = useXyz();
  const isMainnet = chainId === 1 /* Mainnet */;
  async function handleConnectMetamaskClick() {
    connectMetamask();
  }
  if (!transfersContract || !blockNumber || !account) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col w-full items-center justify-center space-y-2 h-full"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-500"
    }, "You need to connect your Metamask"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-primary",
      onClick: handleConnectMetamaskClick
    }, "Connect wallet"));
  }
  if (!isMainnet) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex justify-center items-center h-full"
    }, /* @__PURE__ */ React.createElement("p", null, "This section works on Mainnet. Try changing to it from Metamask"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AddressDisplay, {
    account
  }), /* @__PURE__ */ React.createElement(Transfers, {
    blockNumber,
    transfersContract
  }));
}
function Transfers({
  blockNumber,
  transfersContract
}) {
  const [name, setName] = (0, import_react5.useState)(void 0);
  const [symbol, setSymbol] = (0, import_react5.useState)(void 0);
  const [decimals, setDecimals] = (0, import_react5.useState)(void 0);
  const [transfers, setTransfers] = (0, import_react5.useState)([]);
  const [totalSupply, setTotalSupply] = (0, import_react5.useState)(void 0);
  const TRANSFER_BLOCKS_AMOUNT = 3e3;
  const BLOCK_CONFIRMATIONS = 20;
  (0, import_react5.useEffect)(() => {
    async function getPastTransfers() {
      const transfersFilter = transfersContract.filters.Transfer();
      const transfers2 = await transfersContract.queryFilter(transfersFilter, blockNumber - TRANSFER_BLOCKS_AMOUNT, blockNumber);
      setTransfers(transfers2);
    }
    getPastTransfers();
  }, [blockNumber, transfersContract]);
  (0, import_react5.useEffect)(() => {
    function handleTransferOff(transfersContract2) {
      transfersContract2.off("Transfer", () => {
        console.warn(`Unsubscribed from "Transfer" Transfers contract's event`);
      });
    }
    function handleTransferOn(transfersContract2) {
      transfersContract2.on("Transfer", (transfer) => {
        setTransfers((prevTransfers) => [...prevTransfers, transfer]);
      });
    }
    handleTransferOn(transfersContract);
    return () => {
      handleTransferOff(transfersContract);
    };
  }, [transfersContract]);
  (0, import_react5.useEffect)(() => {
    async function getInformation() {
      const [name2, symbol2, decimals2, totalSupply2] = await Promise.all([
        transfersContract.name(),
        transfersContract.symbol(),
        transfersContract.decimals(),
        transfersContract.totalSupply()
      ]);
      setName(name2);
      setSymbol(symbol2);
      setDecimals(decimals2);
      setTotalSupply(totalSupply2);
    }
    getInformation();
  }, [transfersContract]);
  const isLoading = !name || !symbol || !decimals || !totalSupply;
  if (isLoading) {
    return /* @__PURE__ */ React.createElement("section", {
      className: "flex flex-col items-center justify-center"
    }, /* @__PURE__ */ React.createElement("p", null, "Gathering information..."));
  }
  function byConfirmations(transfer) {
    return blockNumber - transfer.blockNumber > BLOCK_CONFIRMATIONS;
  }
  const totalSupplyLabel = bigNumberToString(totalSupply, decimals);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start justify-center space-y-4"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "flex flex-col items-start justify-center"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "text-gray-500"
  }, "Token"), /* @__PURE__ */ React.createElement("div", {
    className: "bg-gray-200 p-2 rounded-md"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-500"
  }, "Name: ", /* @__PURE__ */ React.createElement("span", {
    className: "font-bold text-gray-900"
  }, name)), /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-500"
  }, "Symbol: ", /* @__PURE__ */ React.createElement("span", {
    className: "font-bold text-gray-900"
  }, symbol)), /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-500"
  }, "Decimals:", " ", /* @__PURE__ */ React.createElement("span", {
    className: "font-bold text-gray-900"
  }, decimals)), /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-500"
  }, "Amount:", " ", /* @__PURE__ */ React.createElement("span", {
    className: "font-bold text-gray-900"
  }, totalSupplyLabel)))), /* @__PURE__ */ React.createElement("section", {
    className: "flex flex-col items-start justify-center"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "text-gray-500"
  }, "Transfers"), /* @__PURE__ */ React.createElement("ul", {
    className: "flex flex-col items-start justify-center space-y-2"
  }, transfers.filter(byConfirmations).map(({ args, transactionHash }) => {
    const url = ETHERSCAN_URL + transactionHash;
    const { from, to, value: bigAmount } = args;
    const amount = bigNumberToString(bigAmount, decimals);
    const key = `${from}_${to}_${amount}_${transactionHash}`;
    return /* @__PURE__ */ React.createElement("article", {
      key,
      className: "flex items-center space-x-2"
    }, /* @__PURE__ */ React.createElement(Transfer, {
      from,
      href: url,
      to
    }), /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-500"
    }, " ", "for ", amount, " ", symbol));
  }))));
}
function Transfer({
  from,
  to,
  href
}) {
  return /* @__PURE__ */ React.createElement("a", {
    className: "flex items-center bg-gray-200 p-1 space-x-2 rounded-md transition text-gray-500 hover:bg-gray-700 hover:text-gray-100 dark:text-gray-500 dark:hover:text-gray-100",
    href
  }, /* @__PURE__ */ React.createElement("span", null, truncateString(from)), /* @__PURE__ */ React.createElement(arrow_right_default, {
    className: "h-4 w-4"
  }), /* @__PURE__ */ React.createElement("span", null, truncateString(to)));
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/projects/indexing.tsx
var indexing_exports = {};
__export(indexing_exports, {
  default: () => IndexingProject
});
init_react();
var import_react6 = require("react");
var import_bignumber2 = require("@ethersproject/bignumber");
var COMPOUND_ADDRESS = "0xc00e94cb662c3520282e6f5717214004a7f26888";
var ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
var START_BLOCK = 9601359;
function IndexingProject() {
  const [balances, setBalances] = (0, import_react6.useState)([]);
  function getBalanceMapping(transferEvents) {
    const balances2 = transferEvents.reduce((prevBalances, transferEvent) => {
      const [from, to, weight] = transferEvent.args;
      console.log("********************************************");
      console.log("New transfer event:");
      console.log("To =>", to);
      console.log("From =>", from);
      console.log("Weight =>", weight);
      console.log("********************************************");
      let nextBalances = __spreadValues({}, prevBalances);
      const isMinting = from === ZERO_ADDRESS;
      const shouldUpdateFromBalance = !isMinting;
      const { blockNumber, blockHash } = transferEvent;
      const block = {
        hash: blockHash,
        number: blockNumber
      };
      if (shouldUpdateFromBalance) {
        let composeFromBalance = function(from2, nextBalance2) {
          nextBalances = __spreadProps(__spreadValues({}, nextBalances), {
            [from2]: {
              block,
              weight: nextBalance2
            }
          });
        };
        const balance = prevBalances[from] ?? import_bignumber2.BigNumber.from(0);
        const nextBalance = balance.weight.sub(weight);
        composeFromBalance(from, nextBalance);
      }
      const isBurning = to === ZERO_ADDRESS;
      const shouldUpdateToBalance = !isBurning;
      if (shouldUpdateToBalance) {
        let composeToBalance = function(to2, nextBalance2) {
          nextBalances = __spreadProps(__spreadValues({}, nextBalances), {
            [to2]: {
              block,
              weight: nextBalance2
            }
          });
        };
        const balance = prevBalances[to] ?? import_bignumber2.BigNumber.from(0);
        const nextBalance = balance.weight.sub(weight);
        composeToBalance(to, nextBalance);
      }
      return nextBalances;
    }, {});
    return balances2;
  }
  function mappingToBalances(balanceMapping) {
    const balances2 = Object.entries(balanceMapping).map(([address, { block, weight }]) => ({ address, weight, block }));
    return balances2;
  }
  (0, import_react6.useEffect)(() => {
    async function getTransferEvents(startBlock, endBlock, erc20Contract) {
      const BATCH_SIZE = 100;
      for (let fromBlock = startBlock; fromBlock <= endBlock; fromBlock += BATCH_SIZE) {
        const toBlock = Math.min(fromBlock + BATCH_SIZE - 1, endBlock);
        const transfersFilter = erc20Contract.filters.Transfer();
        const nextTransferEvents = await erc20Contract.queryFilter(transfersFilter, fromBlock, toBlock);
        console.log("--------------------------------------------");
        console.log("indexTranferEvents ~ fromBlock", fromBlock);
        console.log("indexTranferEvents ~ toBlock", toBlock);
        console.log("--------------------------------------------");
        const balanceMapping = getBalanceMapping(nextTransferEvents);
        const balances2 = mappingToBalances(balanceMapping);
        setBalances((prevBalances) => [...prevBalances, ...balances2]);
      }
    }
    async function startIndexer() {
      const chainId = 1 /* Mainnet */;
      const blockNumber = await getBlockNumber({ chainId });
      const erc20Contract = getErc20Contract({
        address: COMPOUND_ADDRESS,
        chainId
      });
      getTransferEvents(START_BLOCK, blockNumber, erc20Contract);
    }
    startIndexer();
  }, []);
  (0, import_react6.useEffect)(() => {
    const chainId = 1 /* Mainnet */;
    const erc20Contract = getErc20Contract({
      address: COMPOUND_ADDRESS,
      chainId
    });
    function handleTransferOff(erc20Contract2) {
      erc20Contract2.off("Transfer", () => {
        console.warn(`Unsubscribed from "Transfer" Transfers contract's event`);
      });
    }
    function handleTransferOn(erc20Contract2) {
      erc20Contract2.on("Transfer", (transfer) => {
        const transfers = [transfer];
        const balanceMapping = getBalanceMapping(transfers);
        const balances2 = mappingToBalances(balanceMapping);
        setBalances((prevBalances) => [...prevBalances, ...balances2]);
      });
    }
    handleTransferOn(erc20Contract);
    return () => {
      handleTransferOff(erc20Contract);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("h1", null, "IndexingProject"), balances.map(({ address, weight }) => /* @__PURE__ */ React.createElement("span", {
    key: address + weight.toString()
  }, weight.toString())));
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/projects/counter.tsx
var counter_exports = {};
__export(counter_exports, {
  default: () => CounterProject,
  loader: () => loader3
});
init_react();
var import_remix6 = __toESM(require_remix());
var loader3 = async () => {
  async function getCounterCount() {
    async function getLastIncrement() {
      const query = `
    query LastIncrement{
      increments(
        orderBy: count, 
        orderDirection: desc, 
        first: 1
      ) {
      count
      }
    }`;
      return subgraph(query, "COUNTER" /* Counter */).then(({ increments }) => increments).then((increments) => increments[0]);
    }
    const { count: counterCount2 } = await getLastIncrement();
    return Number(counterCount2);
  }
  const counterCount = await getCounterCount();
  return (0, import_remix6.json)({ counterCount });
};
function CounterProject() {
  const { counterCount } = (0, import_remix6.useLoaderData)();
  const counterContract = useCounterContract();
  const connectMetamask = useConnectMetamask();
  const { chainId, account } = useXyz();
  const isRinkeby = chainId === 4 /* Rinkeby */;
  async function handleConnectMetamaskClick() {
    connectMetamask();
  }
  if (account === void 0 || chainId === void 0 || counterContract === void 0) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col w-full items-center justify-center space-y-2 h-full"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-500"
    }, "You need to connect your Metamask"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-primary",
      onClick: handleConnectMetamaskClick
    }, "Connect wallet"));
  }
  if (!isRinkeby) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex justify-center items-center h-full"
    }, /* @__PURE__ */ React.createElement("p", null, "This section works on Rinkeby. Try changing to it from Metamask"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AddressDisplay, {
    account
  }), /* @__PURE__ */ React.createElement(Counter, {
    counterContract,
    counterCount
  }));
}
function Counter({
  counterCount,
  counterContract
}) {
  const navigate = (0, import_remix6.useNavigate)();
  const onMined = () => {
    navigate("/find/projects/counter", { replace: true });
  };
  const { send } = useTransaction({
    on: {
      ["MINED" /* Mined */]: onMined
    }
  });
  function handleIncrease() {
    send(() => counterContract.increase());
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_remix6.Form, {
    className: "flex flex-col self-end items-center space-y-4 p-4 bg-gray-200 rounded-md border-2 border-gray-900"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "btn-primary",
    onClick: handleIncrease
  }, "Increase")), /* @__PURE__ */ React.createElement("section", {
    className: "flex flex-1 items-center"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-500 flex align-middle space-x-2"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-900 font-bold mr-2"
  }, counterCount, " counts"), "and counting!")));
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/projects/index.tsx
var projects_exports2 = {};
__export(projects_exports2, {
  default: () => Index3
});
init_react();
function Index3() {
  return /* @__PURE__ */ React.createElement("section", {
    className: "flex flex-1 items-center"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, "Pick a project from the list"));
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/projects/waver.tsx
var waver_exports = {};
__export(waver_exports, {
  action: () => action,
  default: () => WaverProject,
  loader: () => loader4
});
init_react();
var import_remix7 = __toESM(require_remix());
var import_tiny_invariant3 = __toESM(require("tiny-invariant"));
var invalid = (data) => (0, import_remix7.json)(data, { status: 400 });
var action = async ({ request }) => {
  const formData = await request.formData();
  const message = formData.get("message");
  (0, import_tiny_invariant3.default)(typeof message === "string", 'Expected "message" to be of type string');
  if (message.length < 1) {
    return invalid({ error: "EMPTY" /* Empty */ });
  }
  return (0, import_remix7.redirect)(`/find/projects/waver?message=${encodeURI(message)}`);
};
var loader4 = async ({ request }) => {
  async function getWaves() {
    const query = `
      query Waves {
        waves {
          from
          message
        }
      }`;
    return subgraph(query, "WAVER" /* Waver */).then(({ waves: waves2 }) => waves2).then((waves2) => waves2.map(({ message: message2, from }) => ({
      waver: from,
      message: message2
    })));
  }
  const provider = getRpcProvider({ chainId: 4 /* Rinkeby */ });
  const waverContract = getWaverContract({ provider });
  async function getWavesCount(waverContract2) {
    return waverContract2.getWavesCount().then((bigWavesCount) => bigWavesCount.toNumber());
  }
  const [waves, wavesCount] = await Promise.all([
    getWaves(),
    getWavesCount(waverContract)
  ]);
  const url = new URL(request.url);
  const message = url.searchParams.get("message");
  return (0, import_remix7.json)({
    waves,
    message: message ?? void 0,
    wavesCount
  });
};
function WaverProject() {
  const { waves, wavesCount, message } = (0, import_remix7.useLoaderData)();
  const waverContract = useWaverContract();
  const connectMetamask = useConnectMetamask();
  const { chainId, account } = useXyz();
  const isRinkeby = chainId === 4 /* Rinkeby */;
  async function handleConnectMetamaskClick() {
    connectMetamask();
  }
  if (!waverContract || !account) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col w-full items-center justify-center space-y-2 h-full"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-500"
    }, "You need to connect your Metamask"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-primary",
      onClick: handleConnectMetamaskClick
    }, "Connect wallet"));
  }
  if (!isRinkeby) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex justify-center items-center h-full"
    }, /* @__PURE__ */ React.createElement("h3", null, "This section works on Rinkeby. Try changing to it from Metamask"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AddressDisplay, {
    account
  }), /* @__PURE__ */ React.createElement(Waver, {
    message,
    waverContract,
    waves,
    wavesCount
  }));
}
function Waver({
  waves,
  message,
  wavesCount,
  waverContract
}) {
  const isWaveDisabled = !message;
  const actionData = (0, import_remix7.useActionData)();
  const error = actionData == null ? void 0 : actionData.error;
  const { send } = useTransaction();
  async function handleWave() {
    console.log("waving");
    (0, import_tiny_invariant3.default)(typeof message === "string", 'Expected "message" to have a value');
    console.log("handleWave ~ message", message);
    send(() => waverContract.wave(message, {
      gasLimit: 3e5
    }));
  }
  function getErrorMessage(type) {
    switch (type) {
      case "EMPTY" /* Empty */: {
        return "Your message can't be empty";
      }
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", {
    className: "flex flex-col self-end items-center space-y-4 p-4 bg-gray-200 rounded-md border-2 border-gray-900"
  }, /* @__PURE__ */ React.createElement(import_remix7.Form, {
    className: "flex flex-col items-center space-y-4",
    method: "post"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("label", {
    className: "text-gray-500",
    htmlFor: "number"
  }, "Leave a message:"), /* @__PURE__ */ React.createElement("input", {
    "aria-errormessage": "message_error",
    "aria-invalid": "false",
    "aria-required": "true",
    className: "h-10 w-80 border-2 border-gray-900 p-2 bg-gray-50",
    id: "message",
    name: "message"
  }), error ? /* @__PURE__ */ React.createElement("span", {
    className: "text-red-400",
    id: "message_error"
  }, getErrorMessage(error)) : null), /* @__PURE__ */ React.createElement("button", {
    className: "btn-primary w-full",
    type: "submit"
  }, "Validate message")), /* @__PURE__ */ React.createElement("button", {
    className: "btn-secondary w-full h-10",
    disabled: isWaveDisabled,
    onClick: handleWave
  }, "Wave")), /* @__PURE__ */ React.createElement("section", {
    className: "flex items-center w-full flex-col space-y-4"
  }, /* @__PURE__ */ React.createElement("h3", null, "I have been waved", /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-900 font-bold ml-2"
  }, wavesCount, " times")), waves.map(({ message: message2, waver }, index) => /* @__PURE__ */ React.createElement("article", {
    key: `wave_card_${waver}_${message2.slice(0, 10)}_${index}`,
    className: "flex flex-col bg-gray-100 border-2 border-gray-200 p-2 w-fit rounded-md"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-500"
  }, "Left by"), /* @__PURE__ */ React.createElement(Address, null, waver), /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-500"
  }, ", who said:")), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-900 font-bold"
  }, '"', message2, '"')))));
}
function Address({ children }) {
  return /* @__PURE__ */ React.createElement("p", {
    className: "font-bold ml-2 text-gray-500 hover:cursor-pointer hover:text-gray-900 transition-colors duration-100"
  }, children);
}

// route:/home/niconiahi/Documents/projects/niconiahi.dev.new/apps/web/app/routes/find/projects/mint.tsx
var mint_exports = {};
__export(mint_exports, {
  action: () => action2,
  default: () => MintProject,
  loader: () => loader5
});
init_react();
var import_tiny_invariant4 = __toESM(require("tiny-invariant"));
var import_remix8 = __toESM(require_remix());
var invalid2 = (data) => (0, import_remix8.json)(data, { status: 400 });
var action2 = async ({ request }) => {
  const formData = await request.formData();
  const tokenId = formData.get("tokenId");
  (0, import_tiny_invariant4.default)(typeof tokenId === "string", 'Expected "tokenId" to be of type string');
  const tokens = await getTokens();
  const canMint = tokens.every(({ id }) => id !== Number(tokenId));
  if (!canMint) {
    return invalid2({ error: "minted" /* Minted */ });
  }
  if (Number(tokenId) <= 0) {
    return invalid2({ error: "positive" /* Positive */ });
  }
  return (0, import_remix8.redirect)(`/find/projects/mint?tokenId=${tokenId}`);
};
var loader5 = async ({ request }) => {
  const url = new URL(request.url);
  const tokenId = url.searchParams.get("tokenId");
  const [tokens, gasPrice] = await Promise.all([getTokens(), getGasPrice()]);
  return (0, import_remix8.json)({
    tokens,
    tokenId: tokenId ? Number(tokenId) : void 0,
    gasPrice
  });
};
function MintProject() {
  const { gasPrice, tokens, tokenId } = (0, import_remix8.useLoaderData)();
  const mintContract = useMintContract();
  const connectMetamask = useConnectMetamask();
  const { chainId, blockNumber, account } = useXyz();
  const isRinkeby = chainId === 4 /* Rinkeby */;
  async function handleConnectMetamaskClick() {
    connectMetamask();
  }
  if (!account || !blockNumber || !mintContract) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col w-full items-center justify-center space-y-2 h-full"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "text-gray-500"
    }, "You need to connect your Metamask"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-primary",
      onClick: handleConnectMetamaskClick
    }, "Connect wallet"));
  }
  if (!isRinkeby) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex justify-center items-center h-full"
    }, /* @__PURE__ */ React.createElement("p", null, "This section works on Rinkeby. Try changing to it from Metamask"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AddressDisplay, {
    account
  }), /* @__PURE__ */ React.createElement(Mint, {
    account,
    gasPrice,
    mintContract,
    tokenId,
    tokens
  }));
}
function Mint({
  tokens,
  tokenId,
  account,
  gasPrice,
  mintContract
}) {
  const navigate = (0, import_remix8.useNavigate)();
  const actionData = (0, import_remix8.useActionData)();
  const onMined = () => {
    navigate("/find/projects/mint", { replace: true });
  };
  const { send } = useTransaction({
    on: {
      ["MINED" /* Mined */]: onMined
    }
  });
  const error = actionData == null ? void 0 : actionData.error;
  const isMintDisabled = typeof tokenId !== "number";
  async function mint(tokenId2) {
    const value = big(tokenId2).mul(1e12);
    const gasLimit = await mintContract.estimateGas.mint(account, tokenId2, {
      value,
      gasPrice
    });
    send(() => mintContract.mint(account, tokenId2, {
      value,
      gasLimit,
      gasPrice
    }));
  }
  function handleMintClick() {
    (0, import_tiny_invariant4.default)(typeof tokenId === "number", 'Expected "tokenId" to have a value');
    mint(tokenId);
  }
  function getErrorMessage(type) {
    switch (type) {
      case "minted" /* Minted */: {
        return "Your number was already minted";
      }
      case "positive" /* Positive */: {
        return "Your number needs to be positive";
      }
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", {
    className: "flex flex-col self-end items-center space-y-4 p-4 bg-gray-200 rounded-md border-2 border-gray-900"
  }, /* @__PURE__ */ React.createElement(import_remix8.Form, {
    className: "flex flex-col items-center space-y-4",
    method: "post"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("label", {
    className: "text-gray-500",
    htmlFor: "number"
  }, "Pick a number:"), /* @__PURE__ */ React.createElement("input", {
    "aria-errormessage": "tokenId_error",
    "aria-invalid": "false",
    "aria-required": "true",
    className: "h-10 w-80 border-2 border-gray-900 p-2 bg-gray-50",
    id: "tokenId",
    name: "tokenId",
    type: "tokenId"
  }), error ? /* @__PURE__ */ React.createElement("span", {
    className: "text-red-400",
    id: "tokenId_error"
  }, getErrorMessage(error)) : null), /* @__PURE__ */ React.createElement("button", {
    className: "btn-primary w-full",
    type: "submit"
  }, "Check availability")), /* @__PURE__ */ React.createElement("button", {
    className: "btn-secondary w-full h-10",
    disabled: isMintDisabled,
    onClick: handleMintClick
  }, "Mint NFT")), /* @__PURE__ */ React.createElement("section", {
    className: "w-full"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "text-gray-500"
  }, "NFTs"), /* @__PURE__ */ React.createElement("ol", {
    className: "w-full"
  }, tokens.map(({ id, owner }, index) => /* @__PURE__ */ React.createElement("li", {
    key: `token_id_${id}_${index}`,
    className: ""
  }, "Token ", id, ", owned by: ", owner)))));
}
async function getTokens() {
  async function getTransfers() {
    const query = `
    query Transfers {
      transfers {
        id
        to
        from
        timestamp
      }
    }
    `;
    return subgraph(query, "MINT" /* Mint */).then(({ transfers: transfers2 }) => transfers2);
  }
  const transfers = await getTransfers();
  return transfers.reduce((prevTokens, { to, id }) => {
    const prevTokenIndex = prevTokens.findIndex(({ id: prevId }) => prevId === Number(id));
    const nextToken = { id: Number(id), owner: to };
    if (prevTokenIndex === -1) {
      return [...prevTokens, nextToken];
    } else {
      const nextTokens = replace(prevTokens, nextToken, prevTokenIndex);
      return nextTokens;
    }
  }, []);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = { "version": "0726ffdc", "entry": { "module": "/build/entry.client-BFVMSD6H.js", "imports": ["/build/_shared/chunk-Z5QSR74T.js", "/build/_shared/chunk-VJC6QHPE.js", "/build/_shared/chunk-DOJI7SJ7.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-O3COU4JF.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/find": { "id": "routes/find", "parentId": "root", "path": "find", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/find-7YH4VWK4.js", "imports": ["/build/_shared/chunk-2R3T2GR2.js", "/build/_shared/chunk-KBUVUTUU.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/find/bio/index": { "id": "routes/find/bio/index", "parentId": "routes/find", "path": "bio", "index": true, "caseSensitive": void 0, "module": "/build/routes/find/bio/index-DITRC5VM.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/find/projects": { "id": "routes/find/projects", "parentId": "routes/find", "path": "projects", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/find/projects-AOU6K63O.js", "imports": ["/build/_shared/chunk-SGHFEOTU.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/find/projects/counter": { "id": "routes/find/projects/counter", "parentId": "routes/find/projects", "path": "counter", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/find/projects/counter-HKQLFRCF.js", "imports": ["/build/_shared/chunk-2R3T2GR2.js", "/build/_shared/chunk-KBUVUTUU.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/find/projects/index": { "id": "routes/find/projects/index", "parentId": "routes/find/projects", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/find/projects/index-KEQJG2UT.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/find/projects/indexing": { "id": "routes/find/projects/indexing", "parentId": "routes/find/projects", "path": "indexing", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/find/projects/indexing-TFCNM6Y5.js", "imports": ["/build/_shared/chunk-KBUVUTUU.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/find/projects/mint": { "id": "routes/find/projects/mint", "parentId": "routes/find/projects", "path": "mint", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/find/projects/mint-77ER6ET4.js", "imports": ["/build/_shared/chunk-2R3T2GR2.js", "/build/_shared/chunk-KBUVUTUU.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/find/projects/transfers": { "id": "routes/find/projects/transfers", "parentId": "routes/find/projects", "path": "transfers", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/find/projects/transfers-HJLXNBDY.js", "imports": ["/build/_shared/chunk-2R3T2GR2.js", "/build/_shared/chunk-KBUVUTUU.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/find/projects/waver": { "id": "routes/find/projects/waver", "parentId": "routes/find/projects", "path": "waver", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/find/projects/waver-SJRG2VDR.js", "imports": ["/build/_shared/chunk-2R3T2GR2.js", "/build/_shared/chunk-KBUVUTUU.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-ZAFQDRRF.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-0726FFDC.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/find": {
    id: "routes/find",
    parentId: "root",
    path: "find",
    index: void 0,
    caseSensitive: void 0,
    module: find_exports
  },
  "routes/find/bio/index": {
    id: "routes/find/bio/index",
    parentId: "routes/find",
    path: "bio",
    index: true,
    caseSensitive: void 0,
    module: bio_exports
  },
  "routes/find/projects": {
    id: "routes/find/projects",
    parentId: "routes/find",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: projects_exports
  },
  "routes/find/projects/transfers": {
    id: "routes/find/projects/transfers",
    parentId: "routes/find/projects",
    path: "transfers",
    index: void 0,
    caseSensitive: void 0,
    module: transfers_exports
  },
  "routes/find/projects/indexing": {
    id: "routes/find/projects/indexing",
    parentId: "routes/find/projects",
    path: "indexing",
    index: void 0,
    caseSensitive: void 0,
    module: indexing_exports
  },
  "routes/find/projects/counter": {
    id: "routes/find/projects/counter",
    parentId: "routes/find/projects",
    path: "counter",
    index: void 0,
    caseSensitive: void 0,
    module: counter_exports
  },
  "routes/find/projects/index": {
    id: "routes/find/projects/index",
    parentId: "routes/find/projects",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: projects_exports2
  },
  "routes/find/projects/waver": {
    id: "routes/find/projects/waver",
    parentId: "routes/find/projects",
    path: "waver",
    index: void 0,
    caseSensitive: void 0,
    module: waver_exports
  },
  "routes/find/projects/mint": {
    id: "routes/find/projects/mint",
    parentId: "routes/find/projects",
    path: "mint",
    index: void 0,
    caseSensitive: void 0,
    module: mint_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
/**
 * @remix-run/node v1.4.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.4.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.4.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
