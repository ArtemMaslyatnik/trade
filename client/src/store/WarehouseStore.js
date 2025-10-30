import {makeAutoObservable} from "mobx";

export default class WarehouseStore {

    constructor() {
        this._warehouses= [
        ]
        makeAutoObservable(this)
    }

    setWarehouses(warehouses) {
        this._warehouses = warehouses
    }

    get warehouses() {
        return this._warehouses
    }

}
