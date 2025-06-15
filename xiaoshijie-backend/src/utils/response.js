/**
 * 成功响应
 * @param {Object} res - Express响应对象
 * @param {string} message - 响应消息
 * @param {*} data - 响应数据
 * @param {number} code - 状态码
 */
const successResponse = (res, message = '操作成功', data = null, code = 200) => {
  return res.status(code).json({
    code,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * 错误响应
 * @param {Object} res - Express响应对象
 * @param {string} message - 错误消息
 * @param {number} code - 状态码
 * @param {*} errors - 详细错误信息
 */
const errorResponse = (res, message = '操作失败', code = 400, errors = null) => {
  return res.status(code).json({
    code,
    message,
    data: null,
    errors,
    timestamp: new Date().toISOString()
  });
};

/**
 * 分页响应
 * @param {Object} res - Express响应对象
 * @param {Array} list - 数据列表
 * @param {number} total - 总数
 * @param {number} page - 当前页
 * @param {number} limit - 每页数量
 * @param {string} message - 响应消息
 */
const paginationResponse = (res, list, total, page, limit, message = '获取成功') => {
  return res.status(200).json({
    code: 200,
    message,
    data: {
      list,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  successResponse,
  errorResponse,
  paginationResponse
}; 