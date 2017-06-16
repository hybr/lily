
export class Record {
	web_domain: string = '';
    email_address: string = '';
    passwords: Password[] = [];
}

export class Password {
    password: string = '';
}

export const formTitle = 'User Credentials';
export const formSummary = 'User credentials to login';
export const dbTableName = 'users';