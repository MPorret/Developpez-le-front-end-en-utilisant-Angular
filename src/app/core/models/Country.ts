// TODO: create here a typescript interface for an olympic country

import { Participation } from "./Participation";

export class Country {
    constructor(
        public id: number,
        public country: string,
        public participations: Participation[] // Participant Table
    ) {}
}


