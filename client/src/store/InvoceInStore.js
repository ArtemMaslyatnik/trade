import {makeAutoObservable} from "mobx";

export default class InvoceInStore {

    constructor() {
        this._invoceIns = [
        ]
        makeAutoObservable(this)
    }

    setInvoceIns(invoceIns) {
        this._invoceIns = invoceIns
    }

    get invoceIns() {
        return this._invoceIns
    }

}