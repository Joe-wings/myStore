"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GroupService = class GroupService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createGroupDto) {
        return this.prisma.group.create({
            data: createGroupDto,
        });
    }
    findAll() {
        return this.prisma.group.findMany({
            include: {
                products: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.group.findMany({
            where: { id: id },
            include: {
                products: true,
            },
        });
    }
    search(name) {
        return this.prisma.group.findMany({
            where: { name: { contains: name } },
            include: {
                products: true,
            },
        });
    }
    update(id, updateGroupDto) {
        return this.prisma.group.update({
            where: { id: id },
            data: updateGroupDto,
        });
    }
    remove(id) {
        return this.prisma.group.delete({
            where: { id: id }
        });
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupService);
//# sourceMappingURL=group.service.js.map