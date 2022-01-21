const Order = require('../../../models/order')
 const moment = require('moment')
function orderController() {
    return {
        store(req, res) {

            const { phone, address } = req.body
            if (!phone || !address) {
                req.flash('error', 'all field are required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            order.save().then(result => {
                req.flash('success', 'Order placed successfull')
                //  //   delete req.session.cart
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })
        },

        async  index(req, res){
            const orders = await Order.find({ customer: req.user._id })
            res.render('customers/orders', { orders: orders, moment: moment })
           //console.log(orders)
        }

    }
}
module.exports = orderController

