"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const convert_hour_string_to_minutes_1 = require("./utils/convert-hour-string-to-minutes");
const convert_minute_to_hour_string_1 = require("./utils/convert-minute-to-hour-string");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//cors= dominío foda
const prisma = new client_1.PrismaClient({
    log: ['query']
});
// app.get =    o endereço que o user vai está acessando ex:www.google.com/ads(o ads é o unico que deve ser usado no app get)
//  o app listen = deve ser a porta que o user ira utilizar (normalmente é seu local host)
// HTTP methods / API RESTful / HTTP Codes
// GET, POST, PUT, PATCH, DELETE 
// Get-> pegar uma listar(informação) para obter-la
// Post-> quando estiver criando algo no back end
// Put-> Editar uma entidade por completo(tipo editar perfil)
// PATCH-> Editar uma entidade especifica 
// Delete-> Remover uma entidade
/**
 * Query: localhost:3333/ads?page=2&sort=title
 * Route: localhost:3333/ads/como-dale
 * Body: body mantem a informação escondida n aparecendo na url
 *
*/
app.get('/games', (request, responde) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });
    return responde.json(games);
}));
app.post('/games/:id/ads', (request, responde) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const body = request.body;
    const ad = yield prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekdays: body.weekdays.join(','),
            hourStart: (0, convert_hour_string_to_minutes_1.converthourStringToMinutes)(body.hourStart),
            hourEnd: (0, convert_hour_string_to_minutes_1.converthourStringToMinutes)(body.hourEnd),
            usevoicechat: body.usevoicechat,
        }
    });
    return responde.status(201).json(ad);
}));
app.get('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameid = request.params.id;
    const ads = yield prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekdays: true,
            usevoicechat: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId: gameid,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    return response.json(ads.map(ad => {
        return Object.assign(Object.assign({}, ad), { weekdays: ad.weekdays.split(','), hourStart: (0, convert_minute_to_hour_string_1.convertMinutesToHourString)(ad.hourStart), hourEnd: (0, convert_minute_to_hour_string_1.convertMinutesToHourString)(ad.hourEnd) });
    }));
}));
app.get('/ads/:id/discord', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const adId = request.params.id;
    const ad = yield prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    });
    return response.json({
        discord: ad.discord,
    });
}));
app.listen(3333);
