export class Todo {
    public id: number;
    public text: string;
    public isCompleted: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public completedAt: Date | null;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
        this.isCompleted = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.completedAt = null;
    }

    public complete() {
        this.isCompleted = true;
        this.completedAt = new Date();
    }

    public uncomplete () {
        this.isCompleted = false;
        this.completedAt = null;
    }

    public updateText(text: string) {
        this.text = text;
        this.updatedAt = new Date();
    }
}


// export class Todo {
    
//     private _id: number;
//     private _text: string;
//     private _isCompleted: boolean;
//     private _createdAt: Date;
//     private _updatedAt: Date;
//     private _completedAt: Date | null;
  
//     constructor(id: number, text: string) {
//       this._id = id;
//       this._text = text;
//       this._isCompleted = false;
//       this._createdAt = new Date();
//       this._updatedAt = new Date();
//       this._completedAt = null;
//     }

//     get id(): number { 
//         return this._id; 
//     }
//     get text(): string { 
//         return this._text; 
//     }
//     get isCompleted(): boolean { 
//         return this._isCompleted; 
//     }
//     get createdAt(): Date { 
//         return this._createdAt; 
//     }
//     get updatedAt(): Date { 
//         return this._updatedAt; 
//     }
//     get completedAt(): Date | null { 
//         return this._completedAt; 
//     }

//     public complete() {
//         this._isCompleted = true;
//         this._completedAt = new Date();
//     }

//     public uncomplete () {
//         this._isCompleted = false;
//         this._completedAt = null;
//     }

//     public updateText(text: string) {
//         this._text = text;
//         this._updatedAt = new Date();
//     }

// }