import $api from "../http";

export const fetch= async () => {
    const {data} = await $api.get('invoice_out/')
    return data
}

export const fetchOne = async (id) => {
    const {data} = await $api.get('invoice_out/' + id)
    return data
}

export const create = async (item) => {
    const data = await $api.post('invoice_out/', item)
    return data
}

export const update = async (id, item) => {
    const data = await $api.put('invoice_out/'+ id +'/', item).catch(error => {
        if (error.response) {
            
        // Сервер ответил с кодом статуса, выходящим за пределы 2xx
        console.error('Ошибка данных:', error.response.data);
        console.error('Статус код:', error.response.status); // В данном случае это 400

        if (error.response.status === 400) {
            // Обработка ошибки Bad Request
            alert(error.response.data);
        }
        } else if (error.request) {
        // Запрос был сделан, но ответ не был получен
        console.error('Отсутствует ответ от сервера.');
        } else {
        // Произошла другая ошибка при настройке запроса
        console.error('Ошибка запроса:', error.message);
        }
  });

    return data
}
