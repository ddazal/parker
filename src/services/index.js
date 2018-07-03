import Tabletop from 'tabletop'

function fetchSpreadsheet (key) {
  return new Promise((resolve, reject) => {
    Tabletop.init({
      key,
      callback: (data, tabletop) => resolve(tabletop)
    })
  })
}

export default fetchSpreadsheet
