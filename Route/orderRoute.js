const express = require ("express")


const orderRouter = express.Router()


const { createOrder, getOrder, getOrders, updateOrder, deleteOrder } = require ("../controller/orderControler")

orderRouter.post("/", createOrder)

orderRouter.get("/:orderId", getOrder)

orderRouter.get("/orders", getOrders)

orderRouter.patch("/:id", updateOrder)

orderRouter.delete("/:id", deleteOrder)


module.exports = orderRouter