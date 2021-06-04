const initState = () => {
  const state = {
    todos: []
  }

  const fromLS = JSON.parse(window.localStorage.getItem('myApp'))
  return fromLS ? fromLS : state;
}

export default initState;
