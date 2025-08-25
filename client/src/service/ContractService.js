import $api from "../http";

export const fetchContract= async () => {
    const {data} = await $api.get('contract/')
    return data
}

export const fetchOneContract = async (id) => {
    const {data} = await $api.get('contract/' + id)
    return data
}