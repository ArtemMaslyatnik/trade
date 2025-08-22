import {makeAutoObservable} from "mobx";

export default class GoodsStore {

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
