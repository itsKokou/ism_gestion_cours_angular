export interface AuthentificationRequest {
    username:string
    password:string
}

export interface TokenResponse {
    username:string
    roles:string[]
    token:string
    userId:number
    nomComplet:string
}

export interface User {
    username:string
    roles:string[]
    userId:number
    nomComplet:string
}