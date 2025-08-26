import {makeAutoObservable} from "mobx";

export default class InvoceInStore {

    constructor() {
        // this._is_active = ''
        // this._number = ''
        // this._created_at =''
        // this._company = ''
        // this._partner = ''
        // this._contract =''
        
        this._invocesIn = [
        ]
        makeAutoObservable(this)
    }

    setInvocesIn(invocesIn) {
        this._invocesIn = invocesIn
    }

    get invocesIn() {
        return this._invocesIn
    }

}