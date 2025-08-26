import $api from "../http";

export const fetchInvoceOut= async () => {
    const {data} = await $api.get('invoice_out/')
    return data
}

export const fetchOneInvoceOut = async (id) => {
    const {data} = await $api.get('invoice_out/' + id)
    return data
}