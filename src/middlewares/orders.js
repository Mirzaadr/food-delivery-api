import orders from '../validations/orders';
import helpers from '../helpers/misc';
import statusCodes from '../utils/statusCodes';
import messages from '../utils/messages';
import models from '../database/models';
import services from '../services/services';
import _ from 'lodash';

const { placeOrder, getOrder } = orders;
const {
  returnErrorMessages,
  errorResponse,
} = helpers;
const { notFound, serverError } = statusCodes;
const { orderNotFound, ordersListNotFound } = messages;

const { Order, Contents, User } = models;
const { findOrderByConditionAll, findAllOrders } = services;

const validatePlaceOrder = async (req, res, next) => {
  const { error } = placeOrder(req.body);
  returnErrorMessages(error, res, next);
}

const validateGetOrder = async (req, res, next) => {
  const { error } = getOrder(req.params);
  returnErrorMessages(error, res, next);
}

const findUserOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userData.id;
    const condition = { id, userId };
    const orderData = await findOrderByConditionAll(Order, condition, Contents, User);
    if (!orderData) {
      return errorResponse(res, notFound, orderNotFound);
    }
    req.orderData = orderData.dataValues;
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
}

const findOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { id };
    const orderData = await findOrderByConditionAll(Order, condition, Contents, User);
    if (!orderData) {
      return errorResponse(res, notFound, orderNotFound);
    }
    req.orderData = orderData.dataValues;
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
}

const findOrdersList = async (req, res, next) => {
  try {
    const orders = await findAllOrders(Order, Contents, User);
    if (_.isEmpty(orders)) {
      return errorResponse(res, notFound, ordersListNotFound);
    }
    req.ordersList = orders;
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
}

export default {
  validatePlaceOrder,
  validateGetOrder,
  findUserOrderById,
  findAllOrders,
  findOrderById,
  findOrdersList,
}