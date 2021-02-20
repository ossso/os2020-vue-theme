/**
 * 分页器
 *
 * @param {Number} page 页码
 * @param {Number} size 分页数量
 * @param {Number} total 总数
 * @param {Number} barCount 页码条数
 */
export default (page, size, total, barCount) => {
  const pagination = {
    page: page || 1,
    size: size || 10,
    total: total || 0,
    barCount: barCount || 5,
  };
  pagination.allPage = Math.ceil(pagination.total / pagination.size);
  const middleKey = Math.ceil(pagination.barCount / 2);
  const pagebar = [];
  // fisrt
  pagebar.push({
    name: 1,
    value: 1,
    type: 'page',
  });
  let start = 1;
  // 如果当前页大于key start为当前页减去key
  if (pagination.page > middleKey) {
    start = pagination.page - middleKey;
  }
  // 如果总页数减去start小于中间的页码bar数量 start变更为总数减去页码bar数量
  if (
    pagination.allPage > pagination.barCount
    && (pagination.allPage - start) < pagination.barCount
  ) {
    start = pagination.allPage - pagination.barCount;
  }
  // 结束点为start+页码bar数量
  let end = start + pagination.barCount;
  if (end > pagination.allPage) {
    end = pagination.allPage;
  }
  // 如果start大于1，处理向前批量翻页
  if (start > 1) {
    const val = end - pagination.barCount;
    pagebar.push({
      name: '...',
      value: val < 1 ? 1 : val,
      type: 'before',
    });
  }
  // 开始循环，注入页码
  let i = start;
  while (i < end) {
    if (i === pagination.allPage - 1) {
      break;
    }
    pagebar.push({
      name: i + 1,
      value: i + 1,
    });
    i += 1;
  }
  // 如果start+页码bar数量小于总页数 挂入向后批量翻页
  if (start + pagination.barCount < pagination.allPage) {
    const val = pagination.page + pagination.barCount;
    pagebar.push({
      name: '...',
      value: val >= pagination.allPage ? pagination.allPage : val,
      type: 'after',
    });
  }
  // last
  if (pagination.allPage > 2) {
    pagebar.push({
      name: pagination.allPage,
      value: pagination.allPage,
      type: 'page',
    });
  }
  pagination.pagebar = pagebar;
  return pagination;
};
