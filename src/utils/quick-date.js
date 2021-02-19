/**
 * 时间工具
 */

class QuickDate {
  /**
   * 自动处理为时间对象
   * @param {Number|String|Date} date 时间字符串或时间戳或时间对象
   *
   * @return {Date}
   */
  auto(date = null) {
    /**
     * 如果date本身就是时间对象直接返回
     */
    if (date instanceof Date) {
      return this.constructor.Clone(date);
    }
    /**
     * 如果date是false、undefined、null等非法值，返回一个当前时间对象
     */
    if (!date && date !== 0) {
      return new Date();
    }
    /**
     * date可能是一个符合时间表达式的字符串，尝试用new Date的方式创建
     */
    const d = new Date(date);
    if (Number.isInteger(d.getTime())) {
      return d;
    }
    /**
     * 把字符串数字也当作时间戳来处理
     */
    if (typeof date === 'string' && !/[^0-9]/.test(date)) {
      return new Date(parseInt(date, 10));
    }
    /**
     * 通常到了这里，都是出现了JS引擎对-/等符号的兼容不支持
     * 丢到parse格式化方法里面去处理
     */
    if (typeof date === 'string') {
      return this.constructor.Parse(date);
    }
    throw Error(`无法将“${date}”转为可用时间对象`);
  }

  /**
   * Alias By QuickDate.Parse
   * 时间字符串转为时间
   * @param {String} dateString 时间字符串
   *
   * @return {Date}
   */
  parse(dateString) {
    return this.constructor.Parse(dateString);
  }

  /**
   * 闰年判断
   */
  leapYear(date = null, isDate = true) {
    const d = this.auto(date);
    const year = isDate ? d.getFullYear() : date;
    return year % 400 !== 0 && year % 4 === 0;
  }

  /**
   * 格式化输出时间
   * @param {String} tpl 字符串模板
   * @param {String|Number|Date} date 被转换的时间
   *
   * @return {String} 2000/01/01 00:00:00
   */
  format(tpl = 'yyyy/mm/dd hh:ii:ss', date = null) {
    const d = this.auto(date);
    const o = {};
    o.yyyy = d.getFullYear();
    o.yy = `${o.yyyy}`.substring(2);
    o.m = d.getMonth() + 1;
    o.mm = o.m < 10 ? `0${o.m}` : o.m;
    o.d = d.getDate();
    o.dd = o.d < 10 ? `0${o.d}` : o.d;
    if (tpl && tpl.indexOf('h') > -1) {
      o.h = d.getHours();
      o.hh = o.h < 10 ? (`0${o.h}`) : o.h;
      o.i = d.getMinutes();
      o.ii = o.i < 10 ? (`0${o.i}`) : o.i;
      o.s = d.getSeconds();
      o.ss = o.s < 10 ? (`0${o.s}`) : o.s;
      o.ms = d.getMilliseconds();
      if (o.ms < 10) {
        o.mss = `00${o.s}`;
      } else
      if (o.ms < 100) {
        o.mss = `0${o.ms}`;
      } else {
        o.mss = o.ms;
      }
    }
    if (tpl && tpl.indexOf('w') > -1) {
      o.w = d.getDay() || 7;
      o.ww = `0${o.w}`;
      o.wz = ('日一二三四五六')[o.w % 7];
    }

    const dateTemplate = tpl || 'yyyy/mm/dd';
    const regexp = /(yyyy|yy|mss|ms|mm|m|dd|d|hh|h|ii|i|ss|s|wz|ww|w)/ig;
    return dateTemplate.replace(regexp, (key) => o[key.toLowerCase()]);
  }

  /**
   * 自动处理跨年份时间格式化
   * @param {String|Array|Object} symbol 分割符号
   * @param {String|Number|Date} date 时间字符串或时间对象
   */
  autoYearFormat(symbol = '/', date = null) {
    const d = this.auto(date);
    const dYear = d.getFullYear();
    const nowYear = (new Date()).getFullYear();
    if (nowYear !== dYear) {
      const tpl = this.constructor.GetFormatTpl(symbol, true);
      return this.format(tpl, d);
    }
    const tpl = this.constructor.GetFormatTpl(symbol);
    return this.format(tpl, d);
  }

  /**
   * 多久前or后
   * @param {String|Number|Date} aDate 对比时间
   * @param {String|Number|Date} bDate 缺省为当前时间
   * @param {Number} maxDays 对比的最大天数，超过后返回aDate的时间字符串
   * @param {Function} callback 当超过指定天数后，可选执行回调函数的方式返回一个指定的字符串内容
   *
   * @return {String} xxx前/后
   */
  ago(aDate, bDate = null, maxDays = 365, callback = null) {
    const aTime = this.auto(aDate).getTime();
    const bTime = this.auto(bDate).getTime();
    const s = Math.abs(aTime - bTime);
    const symbol = aTime - bTime < 0 ? '前' : '后';
    if (s < 5 * 1000) {
      if (symbol === '前') {
        return '刚刚';
      }
      return '即将';
    }
    if (s < 60 * 1000) {
      return `1分钟${symbol}`;
    }
    if (s < 60 * 60 * 1000) {
      return `${Math.floor(s / 60 / 1000)}分钟${symbol}`;
    }
    if (s < 24 * 60 * 60 * 1000) {
      return `${Math.floor(s / 60 / 60 / 1000)}小时${symbol}`;
    }
    if (s < maxDays * 24 * 60 * 60 * 1000) {
      return `${Math.floor(s / 24 / 60 / 60 / 1000)}天${symbol}`;
    }
    if (typeof callback === 'function') {
      return callback(aDate, bDate, maxDays, s, symbol);
    }
    return this.format(null, aDate);
  }

  /**
   * 两个日期之间的相差天数
   * @param {String|Date} aDate A日期
   * @param {String|Date} bDate B日期
   *
   * @return {Number} days
   */
  diffDays(aDate, bDate) {
    const aDateClone = this.auto(aDate);
    aDateClone.setHours(0, 0, 0, 0);
    const aTime = aDateClone.getTime();
    const bDateClone = this.auto(bDate);
    bDateClone.setHours(0, 0, 0, 0);
    const bTime = bDateClone.getTime();
    const day = 24 * 60 * 60 * 1000;
    return Math.ceil(Math.abs(aTime - bTime) / day);
  }

  /**
   * 增加或者减少天数
   * @param {Number} num 变更的天数
   * @param {String|Number|Date} date 变更日期
   *
   * @return {Date}
   */
  changeDate(num, date = null) {
    const d = this.auto(date);
    d.setDate(d.getDate() + num);
    return d;
  }

  /**
   * 增加或者减少合同版本月份数日期
   * @param {Number} num 变更的月数
   * @param {String|Number|Date} date 变更日期
   *
   * @return {Date}
   */
  changeContractMonth(num, date = null) {
    const d = this.auto(this.format('yyyy-mm-dd hh:ii:ss', date));
    if (num === 0) {
      return d;
    }
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth();
    const currentDate = d.getDate();
    const currentEndOfMonth = this.constructor.endOfMonth(currentYear, currentMonth + 1,
      currentDate);
    const countMonth = currentMonth + parseInt(num, 10);
    const yearNumber = currentYear + Math.ceil(countMonth / 12) - 1;
    let monthNumber = countMonth;
    let dateNumber = currentDate;

    if (num < 0) {
      if (currentEndOfMonth) {
        monthNumber += 1;
        dateNumber = 1;
      } else {
        dateNumber += 1;
      }
      return new Date(currentYear, monthNumber, dateNumber, 0, 0, 0, 0);
    }

    const reDate = () => new Date(currentYear, monthNumber, dateNumber, 23, 59, 59, 999);
    if (currentDate === 1) {
      dateNumber = 0;
      return reDate();
    }
    if (currentEndOfMonth) {
      if (monthNumber % 12 === 1) {
        dateNumber = this.leapYear(yearNumber, false) ? 29 : 28;
        return reDate();
      }
      if (currentMonth === 1) {
        dateNumber = 30;
        return reDate();
      }
    }
    dateNumber -= 1;
    return reDate();
  }

  /**
   * 克隆时间
   * @param {Date} date 时间
   */
  static Clone(date) {
    return new Date(date.toString());
  }

  /**
   * 时间字符串转为时间
   * @param {String} dateString 时间字符串
   *
   * @return {Date}
   */
  static Parse(dateString) {
    /**
     * date可能是一个符合时间表达式的字符串，尝试用new Date的方式创建
     */
    let d = new Date(dateString);
    if (Number.isInteger(d.getTime())) {
      return d;
    }
    const ds = dateString
      // 针对 2000-01-01T00:00 无zone定位格式
      .replace(/T/g, ' ')
      // safari的JS引擎对-不支持，转为斜杠
      .replace(/-/g, '/')
      // 针对 2000.01.01 00:00
      .replace(/\./g, '/')
      // 中文描述字符通常无法转为时间对象
      .replace(/(日|秒)/g, '')
      .replace(/(时|分)/g, ':')
      .replace(/(年|月)/g, '/');
    d = new Date(ds);
    if (!d.toJSON()) {
      throw Error(`无法处理字符串“${dateString}” ${d.toString()}`);
    }
    return d;
  }

  /**
   * 生产时间格式化的字符串模板
   * @param {String|Array|Object} symbol 分割符号
   * @param {Boolean} hasYear 是否包含年份
   *
   * @return {String}
   */
  static GetFormatTpl(symbol, hasYear = false) {
    if (Array.isArray(symbol)) {
      if (symbol.length === 1) {
        return QuickDate.GetFormatTpl(symbol[0], hasYear);
      }
      if (symbol.length === 2) {
        if (hasYear) {
          return `yyyy mm${symbol[0]}dd${symbol[1]}`;
        }
        return `mm${symbol[0]}dd${symbol[1]}`;
      }
      if (symbol.length === 3) {
        if (hasYear) {
          return `yyyy${symbol[0]}mm${symbol[1]}dd${symbol[2]}`;
        }
        return `mm${symbol[1]}dd${symbol[2]}`;
      }
    } else if (typeof symbol === 'object') {
      if (hasYear) {
        return `yyyy${symbol.y}mm${symbol.m}dd${symbol.d}`;
      }
      return `mm${symbol.m}dd${symbol.d}`;
    }
    if (hasYear) {
      return ['yyyy', 'mm', 'dd'].join(symbol);
    }
    return ['mm', 'dd'].join(symbol);
  }

  /**
   * 判断月底
   *
   * @param {Number} year 年
   * @param {Number} month 月
   * @param {Number} date 日
   *
   * @return {Boolean}
   */
  static endOfMonth(year, month, date) {
    const endOfMonth = new Date(year, month, 0);
    return endOfMonth.getDate() === date;
  }
}

if (typeof module === 'object' && module.exports) {
  module.exports = new QuickDate();
} else {
  this.quickDate = new QuickDate();
}
