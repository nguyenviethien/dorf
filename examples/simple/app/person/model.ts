import { Validators } from "@angular/forms";

import {
    DorfDomainObject,
    IDorfInputDefinition,
    DorfInputDefinition,
    DorfSelectDefinition,
    PropertiesToDorfDefinitionsMap
} from "dorf";

/**
 * Reactive Form will return set of properties, not a class with methods.
 * It's recommended to store those properties in the interface and use them in class.
 */
export interface IPerson {
    name: string;
    surname: string;
    birthDate: number;
    cardCode: number;
    favColor: string;
}

/**
 * Domain Object. 
 * Big part of the class is a standard definition - properties, getters, constructor (based on the interface).
 * Real additional job is when providing FieldDefinitions.
 */
export class Person extends DorfDomainObject implements IPerson {

    /**
     * Definition is class specific in most cases, 
     * so it's more meaningful to have it as a static property/function.
     */
    static get fieldDefinitions() {
        return new this().getFieldDefinitions();
    }

    /* 
    Example properties.
     */

    name: string;
    surname: string;
    birthDate: number;
    cardCode: number;
    favColor: string;

    /**
     * Shortcut for getting name and surname pair.
     */
    get fullname() {
        return this.name + " " + this.surname;
    }

    /**
     * Creation from the interface should be supported.
     */
    constructor(base: IPerson = null) {
        super();

        if (base) {
            this.name = base.name;
            this.surname = base.surname;
            this.birthDate = base.birthDate;
            this.cardCode = base.cardCode;
            this.favColor = base.favColor;
        }
    }

    // @Override
    getFieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
        return {
            "name": this.nameDef,
            "surname": this.surnameDef,
            "birthDate": this.birthDateDef,
            "cardCode": this.cardCodeDef,
            "favColor": this.favColorDef
        };
    }

    /*
    Example definitions. 
    It's more readable to store them in getters.
     */

    private get nameDef(): DorfInputDefinition<string> {
        return new DorfInputDefinition({
            label: "Name",
            type: "text",
            validator: Validators.required
        });
    }

    private get surnameDef(): DorfInputDefinition<string> {
        return new DorfInputDefinition({
            label: "Surname",
            type: "text",
            validator: Validators.required
        });
    }

    private get birthDateDef(): DorfInputDefinition<Date> {
        return new DorfInputDefinition({
            label: "Date of birth",
            type: "date",
            validator: Validators.required
        });
    }

    private get cardCodeDef(): DorfInputDefinition<number> {
        return new DorfInputDefinition({
            label: "Credit card PIN",
            type: "password",
            validator: Validators.pattern("[0-9]{4}")
        });
    }

    private get favColorDef(): DorfSelectDefinition<string> {
        return new DorfSelectDefinition({
            label: "Favourite color",
            optionsToSelect: [{
                key: "#fff",
                value: "white"
            }, {
                key: "#000",
                value: "black"
            }, {
                key: "#ff0000",
                value: "red"
            }, {
                key: "#00ff00",
                value: "green"
            }, {
                key: "#0000ff",
                value: "blue"
            }]
        });
    }
}