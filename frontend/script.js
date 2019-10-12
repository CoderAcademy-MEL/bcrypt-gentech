const form = document.querySelector('form');

const addToLocalStorage = (token) => {
  console.log(token)
  localStorage.setItem('token', token)
}

const register = async (event) => {
  try {
    event.preventDefault();
    const formInputs = form.children
    const username = formInputs[1].value
    const password = formInputs[3].value
    const response = await axios.post("http://localhost:5000/registration", {username, password})
    const token = response.data
    addToLocalStorage(token)
    window.location.href = "./random-quote.html"
  } catch(err) {
    console.log(err)
  }
}