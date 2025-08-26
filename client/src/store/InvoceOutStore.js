import {makeAutoObservable} from "mobx";

export default class InvoceOutStore {

    constructor() {
        // this._is_active = ''
        // this._number = ''
        // this._created_at =''
        // this._company = ''
        // this._partner = ''
        // this._contract =''
        
        this._invocesOut = [
        ]
        makeAutoObservable(this)
    }

    setInvocesOut(invocesOut) {
        this._invocesOut = invocesOut
    }

    get invocesOut() {
        return this._invocesOut
    }

}