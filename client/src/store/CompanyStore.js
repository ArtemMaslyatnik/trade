import {makeAutoObservable} from "mobx";

export default class CompanyStore {

    constructor() {
        this._name = ''
        makeAutoObservable(this)
    }

    setName(name) {
        this.name = name
    }

    get name() {
        return this.name
    }

}