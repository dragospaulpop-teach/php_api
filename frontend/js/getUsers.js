async function getUsers () {
  const response = await fetch('/api_example/backend/get_users.php')
  const data = await response.json()

  const tbody = document.querySelector('tbody')
  const thead = document.querySelector('thead')

  thead.innerHTML = ''
  tbody.innerHTML = ''

  const headers = data.headers
  const users = data.data

  const headerRow = document.createElement('tr')
  headers.forEach((header) => {
    const th = document.createElement('th')
    th.textContent = header
    headerRow.appendChild(th)
    thead.appendChild(headerRow)
  })

  users.forEach((user) => {
    const tr = document.createElement('tr')
    Object.keys(user).forEach((key) => {
      const td = document.createElement('td')
      td.textContent = user[key]
      tr.appendChild(td)
    })
    tbody.appendChild(tr)
  })

  document.getElementById('loader').style.display = 'none'
  document.getElementById('users').style.display = 'table'
}
