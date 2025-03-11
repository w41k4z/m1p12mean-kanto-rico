export class AppJwt {
    id: string;
    username: string;
    role: string;
    iat: number; // Issued At timestamp
    exp: number; // Expiration time timestamp

    constructor(
        id: string,
        username: string,
        role: string,
        iat: number,
        exp: number
    ) {
        this.id = id;
        this.username = username;
        this.iat = iat;
        this.exp = exp;
        this.role = role;
    }
}
