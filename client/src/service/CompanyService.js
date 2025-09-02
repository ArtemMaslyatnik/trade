import $api from "../http";

export const fetch= async () => {
    const {data} = await $api.get('company/')
    return data
}

export const fetchOne = async (id) => {
    const {data} = await $api.get('company/' + id)
    return data
}

export const create = async (item) => {
    console.log(item)
    const {data} = await $api.post('company/', item)
    return data
}

export const update = async (id, item) => {
    console.log(item);
    const {data} = await $api.put('company/'+ id +'/', item)
    return data
}
