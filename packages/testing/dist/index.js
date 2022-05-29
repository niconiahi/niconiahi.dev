var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var testing_exports = {};
__export(testing_exports, {
  DELAY: () => DELAY,
  getBaseProvider: () => getBaseProvider,
  getContractReceipt: () => getContractReceipt,
  getContractTransaction: () => getContractTransaction,
  getErc20Contract: () => getErc20Contract,
  getSigner: () => getSigner,
  getTransactionReceipt: () => getTransactionReceipt,
  getTransactionResponse: () => getTransactionResponse
});
module.exports = __toCommonJS(testing_exports);

// helpers/signer.ts
var getSigner = ({
  address,
  blockNumber,
  chainReference,
  transactionResponse
}) => {
  const baseProvider = getBaseProvider({
    blockNumber,
    chainReference,
    transactionResponse
  });
  const getAddress = () => {
    return address;
  };
  const signer = __spreadValues({
    getAddress,
    _isSigner: true
  }, baseProvider);
  return signer;
};

// helpers/contract.ts
var getContractTransaction = ({
  receipt,
  transaction
} = {}) => {
  const wait = () => {
    return new Promise((resolve) => {
      const nextReceipt = receipt != null ? receipt : {};
      const contractReceipt = getContractReceipt(nextReceipt);
      setTimeout(() => resolve(contractReceipt), DELAY);
    });
  };
  const contractTransaction = __spreadValues({
    wait
  }, transaction != null ? transaction : {});
  return contractTransaction;
};
var getContractReceipt = (contractReceipt) => {
  return contractReceipt;
};

// helpers/contracts/erc20.ts
var getErc20Contract = () => {
  const delegate = (delegatee) => {
    return new Promise((resolve) => {
      const contractReceiptMock = {
        to: delegatee
      };
      const contractTransaction = getContractTransaction({
        receipt: contractReceiptMock
      });
      setTimeout(() => resolve(contractTransaction), DELAY);
    });
  };
  const erc20Contract = {
    delegate
  };
  return erc20Contract;
};

// helpers/providers/base.ts
var import_providers = require("@ethersproject/providers");
var getBaseProvider = ({
  blockNumber,
  chainReference,
  transactionResponse
}) => {
  const sendTransaction = (signedTransaction) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(transactionResponse), DELAY);
    });
  };
  const getNetwork = () => {
    return new Promise((resolve) => {
      const networks = {
        [1 /* Mainnet */]: {
          chainId: 1,
          name: "Homestead"
        },
        [4 /* Rinkeby */]: {
          chainId: 4,
          name: "Rinkeby"
        },
        [539 /* Localhost */]: {
          chainId: 539,
          name: "Localhost"
        }
      };
      const network = networks[chainReference];
      setTimeout(() => resolve(network), DELAY);
    });
  };
  const getBlockNumber = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(blockNumber), DELAY);
    });
  };
  const formatter = new import_providers.Formatter();
  const baseProvider = {
    formatter,
    getNetwork,
    getBlockNumber,
    sendTransaction
  };
  return baseProvider;
};

// helpers/transaction.ts
var getTransactionResponse = ({
  receipt,
  response
} = {}) => {
  const wait = () => {
    return new Promise((resolve) => {
      const getNextReceipt = (receipt2) => {
        var _a;
        const hasLogs = Boolean((_a = receipt2 == null ? void 0 : receipt2.logs) == null ? void 0 : _a.length);
        if (!receipt2) {
          return {
            logs: []
          };
        }
        if (!hasLogs) {
          return __spreadProps(__spreadValues({}, receipt2), {
            logs: []
          });
        }
        return receipt2;
      };
      const nextReceipt = getNextReceipt(receipt);
      const transactionReceipt = getTransactionReceipt(nextReceipt);
      setTimeout(() => resolve(transactionReceipt), DELAY);
    });
  };
  const transactionResponse = __spreadValues({
    wait
  }, response != null ? response : {});
  return transactionResponse;
};
var getTransactionReceipt = (transactionReceipt) => {
  return transactionReceipt;
};

// constants/delays.ts
var DELAY = 200;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DELAY,
  getBaseProvider,
  getContractReceipt,
  getContractTransaction,
  getErc20Contract,
  getSigner,
  getTransactionReceipt,
  getTransactionResponse
});
//# sourceMappingURL=index.js.map