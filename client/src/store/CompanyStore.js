import {makeAutoObservable} from "mobx";

export default class CompanyStore {

    constructor() {
        this._companies = [
        ]
        makeAutoObservable(this)
    }

    setCompanies(companies) {
        this._companies = companies
    }

    get companies() {
        return this._companies
    }

}