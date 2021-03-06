import vue from 'vue'

vue.filter('dayForm', (val) => {
  switch (val) {
    case '1':
      return val = '星期一'
      break;
    case '2':
      return val = '星期二'
      break;
    case '3':
      return val = '星期三'
      break;
    case '4':
      return val = '星期四'
      break;
    case '5':
      return val = '星期五'
      break;
    case '6':
      return val = '星期六'
      break;
    case '7':
      return val = '星期七'
      break;
  }
})

vue.filter('lessonForm', (val) => {
  switch (val) {
    case '102':
      return val = '第 1 ~ 2 节课'
      break;
    case '304':
      return val = '第 3 ~ 4 节课'
      break;
    case '506':
      return val = '第 5 ~ 6 节课'
      break;
    case '708':
      return val = '第 7 ~ 8 节课'
      break;
    case '911':
      return val = '第 9 ~ 11 节课'
      break;

  }
})

// Vue.filter('roomForma', (val) => {
//   switch (val) {
//     case value:
      
//       break;
  
//     default:
//       break;
//   }
// })