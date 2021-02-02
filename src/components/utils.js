import moment from 'moment'

export const TSToDateTimeStr = (ts) => {
  return moment.unix(ts).format('YYYY-MM-DD hh:mm:ss')
}

//board-list: 特殊記號+已讀+看板+類別+種類+中文敘述+人氣+板主
export const CHAR_WIDTH = 11

export const COLUMN_CHARS = 120

export const BASE_COLUMN_WIDTH = CHAR_WIDTH * COLUMN_CHARS

export const BASE_LINE_HEIGHT = 30

const MAX_SCALE = 1.3

const FONT_SIZE_SCALE = 0.70

const LIMIT_SIZE = 25

export const CalcScreenScale = (width) => {
  let scale = width / BASE_COLUMN_WIDTH
  scale = scale < MAX_SCALE ? scale : MAX_SCALE

  let lineHeight = parseInt(BASE_LINE_HEIGHT * scale)

  let fontSize = parseInt(lineHeight * FONT_SIZE_SCALE)
  let expectedWidth = parseInt(CHAR_WIDTH * 4 * scale)
  if(fontSize * 2 > expectedWidth) {
    fontSize = fontSize - 1
  }

  console.log('CalcScreenScale: width:', width, 'base_column_width:', BASE_COLUMN_WIDTH, 'scale:', scale, 'lineHeight:', lineHeight, 'fontSize:', fontSize, 'expectedWidth:', expectedWidth)

  return [scale, lineHeight, fontSize]
}
export const getLimitByHeight = (height) => {
  return parseInt(height / BASE_LINE_HEIGHT) * LIMIT_SIZE
}