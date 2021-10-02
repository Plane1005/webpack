import avatar from '../img/avatar.jpg'
import '../css/img.css'

function packImg () {
  const _div = document.createElement('div')
  const _img = document.createElement('img')
  // _img.src = require('../img/avatar.jpg').default  require，无需配置webpack
  // _img.src = require('../img/avatar.jpg') // require 需要配置webpack
  _img.src = avatar //esmodule导入
  _div.appendChild(_img)

  const bgBox = document.createElement('div')
  bgBox.className = 'bgBox'
  _div.appendChild(bgBox)
  return _div
}

document.body.appendChild(packImg())
console.log('热更新');
