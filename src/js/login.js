import '../css/login.css'
import '../css/login.less'

function login () {
  const _h2 = document.createElement('h2')
  _h2.innerHTML = 'learn webpack'
  _h2.className = 'title'
  return _h2
}

document.body.appendChild(login())
