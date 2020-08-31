import getStoresApi from '../controllers/stores/get.controller'

export default (app) => {
    app.get('/stores/get/:query', getStoresApi)
    return app
}