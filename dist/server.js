"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_payload_1 = require("./get-payload");
const next_utils_1 = require("./next-utils");
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const trpc_1 = require("./trpc");
const body_parser_1 = __importDefault(require("body-parser"));
const webhooks_1 = require("./webhooks");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
const createContext = ({ req, res }) => ({
    req,
    res,
});
const start = async () => {
    const webhookMiddleware = body_parser_1.default.json({
        verify: (req, _, buffer) => {
            req.rawBody = buffer;
        },
    });
    app.post('/api/webhooks/stripe', webhookMiddleware, webhooks_1.stripeWebhookHandler);
    const payload = await (0, get_payload_1.getPayloadClient)({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
            },
        },
    });
    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router: trpc_1.appRouter,
        createContext,
    }));
    app.use((req, res) => (0, next_utils_1.nextHandler)(req, res));
    next_utils_1.nextApp.prepare().then(() => {
        payload.logger.info('Next.js started');
        app.listen(PORT, async () => {
            payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
        });
    });
};
start();
