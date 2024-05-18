import * as uuid from 'uuid';


export class Uuid {
    static v4 = () => uuid.v4();
}