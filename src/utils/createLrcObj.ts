interface ToLRC {
  [key: string]: any;
}

const oLRC: ToLRC = {
  ti: "", //歌曲名
  ar: "", //演唱者
  al: "", //专辑名
  by: "", //歌词制作人
  offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
  ms: [], //歌词数组{t:时间,c:歌词}
};

const createLrcObj = (lrc: string) => {
  if (lrc.length == 0) return;
  const lrcArr = lrc.split("\n");

  lrcArr.forEach((item, index) => {
    const newItem = item.replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
    const t = newItem.substring(newItem.indexOf("[") + 1, newItem.indexOf("]")); //取[]间的内容
    const s = t.split(":"); //分离:前后文字

    if (isNaN(parseInt(s[0]))) {
      //不是数值
      Object.keys(oLRC).forEach((key) => {
        if (key != "ms" && key == s[0].toLowerCase()) {
          oLRC[key] = s[1];
        }
      });
    } else {
      const arr: any = lrcArr[index].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个

      let start = 0;

      for (const k in arr) {
        start += arr[k].length; //计算歌词位置
      }
      const content = lrcArr[index].substring(start); //获取歌词内容

      for (const k in arr) {
        const t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
        const s = t.split(":"); //分离:前后文字
        oLRC.ms.push({
          //对象{t:时间,c:歌词}加入ms数组
          t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
          c: content,
        });
      }
    }
  });

  oLRC.ms.sort(function (a: { t: number }, b: { t: number }) {
    //按时间顺序排序
    return a.t - b.t;
  });

  return oLRC.ms;
};

export default createLrcObj;
