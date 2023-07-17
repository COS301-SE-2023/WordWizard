import { User } from '@auth0/auth0-angular';

export class setUser{
    static readonly type = '[Auth] Set User';
    constructor(public readonly user: User | null) {}
}

export class login{
    static readonly type = '[Auth] Login';
    constructor(public readonly email : string, public readonly password: string) {}
}

export class signup{
    static readonly type = '[Auth] Signup';
    constructor(public readonly email : string, public readonly password: string) {}
}

export class logout{
    static readonly type = '[Auth] Logout';
}

