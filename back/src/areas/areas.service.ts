import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { AreaCreationDto, DicoDto } from './areas.dto';
@Injectable()
export class AreasService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool,
        private readonly httpService: HttpService
    ) { }

    async callReaction(params: string, type: string) {
        console.log(params, " ", type)
        var action = await this.pool.query(sql`SELECT * FROM action WHERE params = ${params} AND type = ${type}`)
        if (action.rowCount === 0) {
            return
        }
        let area = await this.pool.query(sql`SELECT * FROM area WHERE id_act = ${action.rows[0].id}`)
        console.log(area.rows[0].id)
        let reaction = await this.pool.query(sql`SELECT * FROM reaction WHERE id = ${area.rows[0].id_react}`)
        console.log(reaction.rows[0].params)
        let data = JSON.parse(reaction.rows[0].params.toString())
        console.log("data:", data)
        this.httpService.post(`http://localhost:8080/reactions/${reaction.rows[0].reaction_route}`, data).toPromise()
    }

    async createArea(userId: string, body: AreaCreationDto) {
        const reaction_dico = await this.pool.query(sql<DicoDto>`SELECT * FROM readictionnary WHERE id = ${body.reaction_id}`)
        const reaction_service = await this.pool.query(sql`SELECT * FROM service WHERE id = ${reaction_dico.rows[0].service_id}`)
        const action_dico = await this.pool.query(sql<DicoDto>`SELECT * FROM adictionnary WHERE id = ${body.action_id}`)
        const action = await this.pool.query(sql`INSERT INTO action (params, type, dico_id)
        VALUES (${JSON.stringify(body.action_params)}, ${action_dico.rows[0].params},${body.action_id}) RETURNING id;`)
        const reaction = await this.pool.query(sql`INSERT INTO reaction (params, type, reaction_route,dico_id)
        VALUES (${JSON.stringify(body.reaction_params)}, ${reaction_dico.rows[0].params},${reaction_service.rows[0].name} ,${body.reaction_id}) RETURNING id;`)

        const area = await this.pool.query(sql`INSERT INTO area (
            id_act,
            id_react,
            usr_id) VALUES (
                ${action.rows[0].id},
                ${reaction.rows[0].id},
                ${userId})`)
        console.log(action, reaction, area)
    }
}
