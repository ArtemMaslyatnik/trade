import {makeAutoObservable} from "mobx";

export default class GoodsStore {

    constructor() {
        this._warehouses= [
        ]
        makeAutoObservable(this)
    }

    setWarehoses(warehouses) {
        this._warehouses = warehouses
    }

    get goods() {
        return this._warehouses
    }

}
