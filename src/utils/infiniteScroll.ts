/**
 *
 * @param dom 节点
 * @param interval 循环时间间隔
 * @returns 计时器便于清除
 */

const infiniteScroll = (dom: HTMLElement | null, interval: number = 3000) => {
  let timer: any = null;

  if (timer) clearInterval(timer);

  if (dom) {
    let currentIndex = 0;
    const scrollHeight = dom.children[0].clientHeight;
    const liClone = dom.children[0].cloneNode(true);
    dom.appendChild(liClone);
    timer = setInterval(() => {
      currentIndex++;
      dom.style.transition = "all 0.5s ease-in-out";
      if (currentIndex === dom.children.length - 1) {
        setTimeout(() => {
          currentIndex = 0;
          dom.style.transition = "none";
          dom.style.transform = `translateY(0)`;
        }, 500);
      }
      dom.style.transform =
        "translateY(-" + scrollHeight * currentIndex + "px)";
    }, interval);
  }

  return timer;
};

export default infiniteScroll;
