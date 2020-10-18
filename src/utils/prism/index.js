import Prism from './prism';
import './prism.css';

const preReg = /<pre.*?>[\w|\W]*?<\/pre>/gm;
const codeReg = /<pre.*class="prism-highlight prism-language-(.*?)">([\w|\W]*)?<\/pre>/m;
const codeReg2 = /<pre.*class="(brush:([^;|.]*);?.*)">([\w|\W]*)?<\/pre>/m;
const codeReg3 = /<pre.*?>([\w|\W]*)?<\/pre>/m;

/**
 * const codeReplace
 * 代码替换
 * @param  {String} preHTML  pre层
 * @param  {String} codeHTML code层内容
 * @param  {String} langType 语言类型
 */
const codeReplace = (preHTML, codeHTML, langType = 'markup') => {
  const codeHTMLString = codeHTML.replace(/\$/g, '&#36;');
  const node = [];
  node.push(`<code class="language-${langType}">${codeHTMLString}</code>`);
  const langArr = (langType === 'markup' ? 'html' : langType).split('');
  let lang = `${langArr[0].toUpperCase()}${langArr.slice(1).join('')}`;
  lang = lang.replace('java', 'Java');
  lang = lang.replace('script', 'Script');
  node.push(`<span class="pre-side"><span class="lang-name">${lang}</span><span class="copy-btn">复制代码</span></span>`);
  return preHTML.replace(codeHTML, node.join(''));
};

/**
 * prismMatch
 * PrismJS代码高亮效果替换处理
 */
export default (content) => {
  const preList = content.match(preReg);
  if (!preList) {
    return content;
  }
  let newContent = content;
  for (let i = 0, n = preList.length; i < n; i += 1) {
    // 匹配第一种代码预览预设
    let codeMatch = preList[i].match(codeReg);
    if (codeMatch) {
      const item = codeReplace(preList[i], codeMatch[2], codeMatch[1]);
      newContent = newContent.replace(preList[i], item);
    } else {
      // 匹配第二种代码预览预设
      codeMatch = preList[i].match(codeReg2);
      if (codeMatch) {
        const className = `prism-highlight prism-language-${codeMatch[2] || 'markup'}`;
        let item = codeReplace(preList[i], codeMatch[3], codeMatch[2]);
        item = item.replace(codeMatch[1], className);
        newContent = newContent.replace(preList[i], item);
      } else {
        // 匹配纯pre代码预览预设
        codeMatch = preList[i].match(codeReg3);
        if (codeMatch) {
          const item = codeReplace(preList[i], codeMatch[1], 'markup');
          newContent = newContent.replace(preList[i], item);
        }
      }
    }
  }

  // 实在不想解析Prism的替换原理，我把文章内容做成真实节点，然后高亮处理，再取出来放到vue的html渲染中
  const transform = window.document.createElement('div');
  transform.style.display = 'none';
  transform.innerHTML = newContent;
  window.document.body.appendChild(transform);
  Prism.highlightAll();
  newContent = transform.innerHTML;
  window.document.body.removeChild(transform);

  return newContent;
};
