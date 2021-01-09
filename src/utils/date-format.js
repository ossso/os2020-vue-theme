/**
 * 时间格式化
 */
class DateFormat {
  constructor(dateString) {
    const d = new Date();
    this.nowYear = d.getFullYear();
    this.nowMonth = d.getMonth() + 1;
    this.nowDate = d.getDate();

    if (dateString) {
      this.data = this.auto(dateString);
    } else {
      this.date = d;
    }

    this.bigMonths = [1, 3, 5, 7, 8, 10, 12];
    this.smallMonths = [4, 6, 9, 11];
  }

  /**
   * 自动处理为时间对象
   * @param {Number|String|Date} date 时间字符串或时间戳或时间对象
   */
  auto(date = null) {
    if (!date) {
      return new Date();
    }
    if (date instanceof Date) {
      return date;
    }
    if (typeof date === 'string') {
      return this.parse(date);
    }
    if (typeof date === 'number' || !/^\d/.test(date)) {
      const d = new Date();
      d.setTime(date);
      return d;
    }
    throw Error('请传入正确的Date对象');
  }

  /**
   * 时间字符串转为时间
   * @param {String} dateString 时间字符串
   * @param {Boolean} sync 是否同步到对象本身
   */
  parse(dateString, sync = false) {
    const ds = dateString.replace(/-/g, '/')
      .replace(/\./g, '/')
      .replace(/T/g, ' ')
      .replace(/(日|秒)/g, '')
      .replace(/(时|分)/g, ':')
      .replace(/(年|月)/g, '/');
    const d = new Date(ds);
    if (Number.isNaN(d.getTime())) {
      throw Error(`传入参数[${dateString}]不是合法的时间字符串`);
    }
    if (sync) {
      this.date = d;
    }
    return d;
  }

  /**
   * 格式化输出时间
   * @param {String} tpl 模板
   * @param {String|Number|Date} date 时间字符串或时间对象
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
    }
    if (tpl && tpl.indexOf('w') > -1) {
      o.w = d.getDay();
      o.w = o.w > 0 ? o.w : o.w + 1;
      o.wz = (() => {
        switch (o.w) {
          case 1:
            return '一';
          case 2:
            return '二';
          case 3:
            return '三';
          case 4:
            return '四';
          case 5:
            return '五';
          case 6:
            return '六';
          case 7:
          default:
            return '日';
        }
      })();
    }

    const dateTemplate = tpl || 'yyyy/mm/dd';
    const regexp = /(yyyy|yy|mm|m|dd|d|hh|h|ii|i|ss|s|wz|w)/ig;
    return dateTemplate.replace(regexp, (key) => o[key.toLowerCase()]);
  }

  /**
   * 友好时间格式
   * @param {String|Number|Date} date 时间字符串或时间对象
   */
  ago(date, mode = 'before') {
    const d = this.auto(date);
    const now = new Date();
    const n = now.getTime();
    const s = Math.abs(n - d.getTime());
    if (s < 5 * 1000) {
      if (mode === 'before') {
        return '刚刚';
      }
      return '即将';
    }
    const symbol = mode === 'before' ? '前' : '后';
    if (s < 60 * 1000) {
      return `1分钟${symbol}`;
    }
    if (s < 60 * 60 * 1000) {
      return `${Math.floor(s / 60 / 1000)}分钟${symbol}`;
    }
    if (s < 24 * 60 * 60 * 1000) {
      return `${Math.floor(s / 60 / 60 / 1000)}小时${symbol}`;
    }
    if (s < 365 * 24 * 60 * 60 * 1000) {
      return `${Math.floor(s / 24 / 60 / 60 / 1000)}天${symbol}`;
    }
    return this.autoYearFormat('/', d);
  }

  /**
   * 生产时间格式化的字符串模板
   * @param {String|Array|Object} symbol 分割符号
   * @param {Boolean} hasYear 是否包含年份
   */
  static GetFormatTpl(symbol, hasYear = false) {
    if (Array.isArray(symbol)) {
      if (symbol.length === 1) {
        return DateFormat.GetFormatTpl(symbol[0], hasYear);
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
   * 自动处理跨年份时间格式化
   * @param {String|Array|Object} symbol 分割符号
   * @param {String|Number|Date} date 时间字符串或时间对象
   */
  autoYearFormat(symbol = '/', date = null) {
    const d = this.auto(date);
    const dYear = d.getFullYear();
    const nowYear = (new Date()).getFullYear();
    if (nowYear !== dYear) {
      const tpl = DateFormat.GetFormatTpl(symbol, true);
      return this.format(tpl, d);
    }
    const tpl = DateFormat.GetFormatTpl(symbol);
    return this.format(tpl, d);
  }

  /**
   * 判断月底
   */
  endOfMonth(year, month, date) {
    const beginDate1 = this.bigMonths.includes(month) && date === 31;
    const beginDate2 = this.smallMonths.includes(month) && date === 30;
    const beginDate3 = month === 2 && (this.leapYear(year, false) ? date === 29 : date === 28);
    return Boolean(beginDate1 || beginDate2 || beginDate3);
  }

  /**
   * 增加或者减少天数
   * @param {Number} num 变更的天数
   * @param {String|Number|Date} date 变更日期
   */
  changeDate(num, date = null) {
    const d = this.auto(date);
    d.setTime(d.getTime() + (num * 24 * 60 * 60 * 1000));
    return d;
  }

  /**
   * 增加或者减少月数
   * @param {Number} num 变更的月数
   * @param {Number} unnatural 不按自然月计算月份
   * @param {String|Number|Date} date 变更日期
   */
  changeMonth(num, unnatural = 0, date = null) {
    const d = this.auto(date);
    if (num === 0) {
      return d;
    }
    if (unnatural) {
      const dateNumber = num * unnatural;
      return this.changeDate(dateNumber, d);
    }
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth() + 1;
    const currentDate = d.getDate();
    const currentEndOfMonth = this.endOfMonth(currentYear, currentMonth, currentDate);
    const countMonth = currentMonth + parseInt(num, 10);
    let yearNumber = currentYear + Math.ceil(countMonth / 12) - 1;
    let monthNumber = countMonth % 12;
    monthNumber = monthNumber === 0 ? 12 : monthNumber;
    let dateNumber = currentDate;
    if (num < 0) {
      if (monthNumber < 1) {
        monthNumber += 12;
      }
      if (currentEndOfMonth) {
        monthNumber += 1;
        dateNumber = 1;
      } else {
        dateNumber += 1;
      }
      if (this.endOfMonth(yearNumber, monthNumber, dateNumber)) {
        monthNumber += 1;
        dateNumber = 1;
      }
    } else if (currentDate === 1) {
      monthNumber -= 1;
      if (this.bigMonths.includes(monthNumber)) {
        dateNumber = 30;
      } else if (this.smallMonths.includes(monthNumber)) {
        dateNumber = 31;
      } else if (monthNumber === 2) {
        dateNumber = this.leapYear(yearNumber, false) ? 29 : 28;
      }
    } else if (currentEndOfMonth) {
      if (monthNumber === 2) {
        dateNumber = this.leapYear(yearNumber, false) ? 29 : 28;
      } else if (currentMonth === 2) {
        dateNumber = 30;
      } else {
        dateNumber -= 1;
      }
    } else {
      dateNumber -= 1;
    }
    // 修正变更后的年月
    if (monthNumber < 1) {
      yearNumber -= 1;
      monthNumber = 12;
    } else if (monthNumber > 12) {
      yearNumber += 1;
      monthNumber = 1;
    }
    const computeDate = [[yearNumber, Math.abs(monthNumber), dateNumber].join('/')];
    computeDate.push(this.format('hh:ii:ss', num > 0 ? d.getTime() - 1000 : d.getTime() + 1000));
    return this.auto(computeDate.join(' '));
  }

  /**
   * 闰年判断
   */
  leapYear(date = null, isDate = true) {
    const d = this.auto(date);
    const year = isDate ? d.getFullYear() : date;
    return year % 400 !== 0 && year % 4 === 0;
  }
}

const dateFormat = new DateFormat();

/* eslint-disable */
(function () {
  const params = ['ago', 'leapYear', {
    name: 'format',
    params: [0],
  }, {
    name: 'changeDate',
    params: [0],
  }, {
    name: 'changeMonth',
    params: [0, 1],
  }];
  params.forEach((i) => {
    const key = typeof i === 'object' && i !== null ? i.name : i;
    if (!Date.prototype[key]) {
      Date.prototype[key] = function (...args) {
        const callArgs = i.params ? i.params.map((k) => args[k]) : [];
        return dateFormat[key](...callArgs, this);
      };
    }
  });
  if (!Date.prototype.endOfMonth) {
    Object.defineProperty(Date.prototype, 'endOfMonth', {
      get: function () {
        return dateFormat.endOfMonth(this.getFullYear(), this.getMonth() + 1, this
        .getDate());
      },
      enumerable: true,
    });
  }
}());

module.exports = dateFormat;
