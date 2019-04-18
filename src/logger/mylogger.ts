import { Logger } from '@nestjs/common';
import * as fs from 'fs';

export class MyLogger extends Logger {
    myContext: string;

    constructor(context?: string, isTimestampEnabled?: boolean) {
        super(context, isTimestampEnabled);
        this.myContext = context;
    }

    log(message: any, context?: string) {
        super.log(message, context);
        const myTimeStamp = new Date().toLocaleString();
        const messageLogged: string = `[${this.myContext}]: ${myTimeStamp} : ${message} \n`;
        fs.appendFile('logs/mycustomloger.log', messageLogged, (err) => {if (err) { throw err; }} );
    }

    error(message: any) {
        super.error(message);
        const myTimeStamp = new Date().toLocaleString();
        message = JSON.stringify(message, null, '\t');
        const messageLogged: string = `[${this.myContext}]: ${myTimeStamp} : ${message} \n`;
        fs.appendFile('logs/mycustomlogererrors.log', messageLogged, (err) => {if (err) { throw err; }} );
    }
}
