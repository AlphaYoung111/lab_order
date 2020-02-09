import vue from 'vue'

vue.filter('dayForm', (val) => {
  switch (val) {
    case '01':
      return val = '星期一'
      break;
    case '02':
      return val = '星期二'
      break;
    case '03':
      return val = '星期三'
      break;
    case '04':
      return val = '星期四'
      break;
    case '05':
      return val = '星期五'
      break;
    case '06':
      return val = '星期六'
      break;
    case '07':
      return val = '星期七'
      break;
  }
})

vue.filter('lessonForm', (val) => {
  switch (val) {
    case '0102':
      return val = '第 1 ~ 2 节课'
      break;
    case '0304':
      return val = '第 3 ~ 4 节课'
      break;
    case '0506':
      return val = '第 5 ~ 6 节课'
      break;
    case '0708':
      return val = '第 7 ~ 8 节课'
      break;
    case '0911':
      return val = '第 9 ~ 11 节课'
      break;

  }
})