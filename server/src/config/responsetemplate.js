export const internalServerError = (response, data) => {
    return response.status(500).send({
        error: true,
        message: "Internal Server Error",
        data: data || {},
        status:{
            code:500
        }
    })
}

export const success = (response, data) => {
    return response.status(200).send({
        error: false,
        message: "success",
        data: data || {},
        status:{
            code:200
        }
    })
}

export const badRequest = (response, data) => {
    return response.status(422).send({
        error: true,
        message: "Bad Request",
        data: data || {},
        status:{
            code:422
        }
    })
}
export const conflict = (response,data) => {
    return response.status(409).send({
        error: true,
        message: "conflict",
        data: data || {},
        status:{
            code:409
        }
    })
}