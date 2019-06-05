export class Address {
    id: number;
    country: string;
    city: string;
    county: string;
    street: string;

    constructor(id: number, country: string, city: string, county: string, street: string) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.county = county;
        this.street = street;
    }
}
