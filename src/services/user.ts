import { prismaClient } from "../lib/db";
import {createHmac, randomBytes } from 'node:crypto'
import JWT from 'jsonwebtoken'

const JWTSecret = '@Super$an123';

export interface CreteUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}
export interface GetUserTokenPayload {
    email: string;
    password: string;
}
class UserService {

    private static generateHash(salt:string, password:string){
        const hashedPassword = createHmac('sha256',salt).update(password).digest('hex')
        return hashedPassword;
    }
    
    public static createUser(payload:CreteUserPayload){
        const {firstName,lastName,email,password} = payload;
        const salt = randomBytes(32).toString('hex')
        const hashedPassword = this.generateHash(salt,password);

        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword
            }
        })
    }

    private static getUserByEmail(email:string){
        return prismaClient.user.findUnique({where : {email}});
    }

    public static async getUserToken(payload:GetUserTokenPayload) {
        const {email,password} = payload;
        
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error("user does not found")
        }

        const userSalt = user.salt;
        const usersHashPassword = UserService.generateHash(userSalt,password);
        if (usersHashPassword !== user.password) {
            throw new Error('Incorrect Password')
        }

        // Generate Token
        const token = JWT.sign({id:user.id, email: user.email},JWTSecret);
        return token;
    }

    public static decodeJWTToken (token:string){
        return JWT.verify(token,JWTSecret);
    }

    public static getUserById(id: string) {
        return prismaClient.user.findUnique({where: {id}});
    }
}

export default UserService