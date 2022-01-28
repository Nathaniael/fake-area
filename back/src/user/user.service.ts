import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { UserCreationDto, UserDto, UserLoginDto } from './user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool
    ) { }

    async registerUser(usr: UserCreationDto) {
        await this.pool.query(sql`INSERT INTO usr
        (username, password, email)
        values
        (${usr.username}, ${bcrypt.hashSync(usr.password, 10)}, ${usr.email})`)
    }

    async getUser(usr: UserLoginDto) {
        let res
        if (usr.email) {
            res = await this.pool.query(sql`SELECT email,
                username,
                id,
                created_at,
                password
                FROM usr WHERE email = ${usr.email}`)
        } else if (usr.username) {
            res = await this.pool.query(sql`SELECT email,
            username,
            id,
            created_at,
            password
            FROM usr WHERE username = ${usr.username}`)
        }
        else {
            throw new UnauthorizedException("User not found sheesh")
        }
        if (!res || res.rows.length <= 0) {
            throw new UnauthorizedException("User not found")
        }
        return res.rows[0]
    }
}