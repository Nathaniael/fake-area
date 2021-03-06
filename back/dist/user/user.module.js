"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_areas_1 = require("./user.areas");
const user_controller_1 = require("./user.controller");
const axios_1 = require("@nestjs/axios");
const areas_service_1 = require("../areas/areas.service");
const actions_service_1 = require("../actions/actions.service");
const oauth_service_1 = require("../oauth/oauth.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [user_service_1.UserService, user_areas_1.UserAreas, areas_service_1.AreasService, actions_service_1.ActionsService, oauth_service_1.OauthService],
        exports: [user_service_1.UserService, user_areas_1.UserAreas],
        controllers: [user_controller_1.UserController]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map