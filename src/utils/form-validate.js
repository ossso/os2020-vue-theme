const hasOwnProperty = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

/**
 * 验证单项
 * @param {String} val 验证值
 * @param {Object} rule 验证规则
 */
const validateItem = (val, rule) => {
  if (rule.required && val.length === 0) {
    return false;
  }
  if (rule.noSpacek && /\s/.test(val)) {
    return false;
  }
  if (hasOwnProperty(rule, 'min')) {
    if (typeof val === 'string' && val.length < rule.min) {
      return false;
    }
    if (typeof val === 'number' && val < rule.min) {
      return false;
    }
  }
  if (hasOwnProperty(rule, 'max')) {
    if (typeof val === 'string' && val.length > rule.max) {
      return false;
    }
    if (typeof val === 'number' && val > rule.max) {
      return false;
    }
  }
  if (hasOwnProperty(rule, 'validator') && typeof rule.validator === 'function') {
    return rule.validator(val, rule);
  }
  return true;
};

/**
 * form对象校验
 * @param {Object} data 校验对象
 * @param {Object} rules 校验规则
 */
const formValidate = (data, rules) => {
  const dataArr = Object.keys(data);
  for (let i = 0, n = dataArr.length; i < n; i += 1) {
    const key = dataArr[i];
    let val = data[key] || '';
    if (typeof val === 'string') {
      val = `${val}`.trim();
    }
    const inpRules = rules[key];
    if (inpRules) {
      for (let k = 0, l = inpRules.length; k < l; k += 1) {
        const rule = inpRules[k];
        if (!validateItem(val, rule)) {
          // Todo 接入一个简单的Toast
          return false;
        }
      }
    }
  }

  return true;
};

export default formValidate;
