export enum Reason {
    Flight, Train, Bus, Taxi, Hotel, Restaurant, Other
}

export class Receipt {
    constructor(public id: string, public name: string, public reason: Reason, public date: string, public amount: number, public text: string) { }
}