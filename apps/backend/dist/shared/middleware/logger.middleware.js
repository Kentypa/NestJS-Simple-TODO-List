"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const is_empty_object_1 = require("../../utils/is-empty-object");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const { method, originalUrl, ip, body } = req;
        const requestTime = Date.now();
        const data = (0, is_empty_object_1.isObjectEmpty)(body) ? null : JSON.stringify(body);
        res.on('finish', () => {
            const { statusCode } = res;
            const responseTime = Date.now() - requestTime;
            console.log(`${method} ${originalUrl} ${statusCode} - ${responseTime}ms from ${ip} ${data ?? ''}`);
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map