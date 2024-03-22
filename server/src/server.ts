import { PrismaClient } from '@prisma/client';
import express from 'express'
import { converthourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minute-to-hour-string';
import cors from 'cors' 

const app = express()

app.use(express.json())
app.use(cors())
//cors= dominío foda



const prisma = new PrismaClient({
    log: ['query']
})



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


app.get('/games', async (request, responde) => {
    const games = await prisma.game.findMany({
        include:
        {
            _count:
            {
                select:
                {
                    ads:
                        true,
                }
            }
        }
    })

    return responde.json(games)
});

app.post('/games/:id/ads', async (request, responde) => {

    
    const gameId = request.params.id; 
    const body: any = request.body;





    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekdays: body.weekdays.join(','),
            hourStart: converthourStringToMinutes(body.hourStart),
            hourEnd: converthourStringToMinutes(body.hourEnd),
            usevoicechat: body.usevoicechat,
        }
    })


    return responde.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response) => {
    
    
    const gameid = request.params.id;
    const ads = await prisma.ad.findMany({
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
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekdays: ad.weekdays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),



        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }

    })


    return response.json({
        discord: ad.discord,
    })
})

app.listen(3333)