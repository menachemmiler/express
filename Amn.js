import { v4 as uuidv4 } from 'uuid';

// console.log(uuidv4());


class Amn {
    constructor(type, status, active) {
        this.id = uuidv4;
        this.type = type
        this.status = status//boool אם זה מאושר
        this.active = active//bool 
    }
}

export {
    Amn
}