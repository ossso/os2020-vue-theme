/**
 * 自定义错误
 */

class CustomError extends Error {
  constructor(msg, code, error = {}) {
    super(msg);
    this.code = code;
    this.error = error;
  }
}

export default CustomError;
