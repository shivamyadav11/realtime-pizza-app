 const homecontroller = require('../app/http/controllers/homecontroller')
 const authController = require('../app/http/controllers/authController')
 const cartController = require('../app/http/controllers/customers/cartController')

function initRoutes(app) {
    
    app.get('/', homecontroller().index)

    
    app.get('/login',authController().login )
    app.get('/register', authController().register)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    
    }
    
    module.exports =initRoutes