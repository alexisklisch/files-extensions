import Pie from 'cli-pie'
import { extensions } from './utils/filesExtensions.js'
import { getColorByIndex } from './utils/getColorByIndex.js'

const sortedData = extensions.sort((a, b) => b.quantity - a.quantity)
const topFiveExtensions = sortedData.slice(0, 5)

const totalQuantity = extensions.reduce((sum, data) => sum + data.quantity, 0)

const result = topFiveExtensions.map((data, index) => ({
  label: data.extension || 'Others',
  value: Math.round((data.quantity / totalQuantity) * 100),
  color: index < 4 ? getColorByIndex(index) : [255, 255, 255]
}))

const p = new Pie(
  5,
  result,
  {
    legend: true
  }
)

console.log(p.toString())

sortedData.forEach(item => {
  if (item.extension === '') {
    console.log(`Others --> ${item.quantity} files`)
    return
  }
  console.log(`${item.extension} --> ${item.quantity} files`)
})
