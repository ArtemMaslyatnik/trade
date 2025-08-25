import {makeAutoObservable} from "mobx";

export default class ContractStore {

    constructor() {
        this._contracts = [
        ]
        makeAutoObservable(this)
    }

    setContracts(contracts) {
        this._contracts = contracts
    }

    get contracts() {
        return this._contracts
    }

}