const Title = ({ todoCount }) => {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "To-do list(",
        todoCount,
        ")"
      )
    )
  );
};

const TodoForm = ({ addTodo }) => {
  // Input Tracker
  let input;
  // Return JSX
  return React.createElement(
    "form",
    { onSubmit: e => {
      e.preventDefault();
      addTodo(input.value);
      input.value = '';
    } },
    React.createElement("input", { className: "form-control col-md-12", ref: node => {
      input = node;
    } }),
    React.createElement("br")
  );
};

const Todo = ({ todo, remove }) => {
  // Each Todo
  return React.createElement(
    "a",
    { href: "#", className: "list-group-item", onClick: () => {
      remove(todo.id);
    } },
    todo.text
  );
};

const TodoList = ({ todos, remove }) => {
  // Map through the todos
  const todoNode = todos.map(todo => {
    return React.createElement(Todo, { todo: todo, key: todo.id, remove: remove });
  });
  return React.createElement(
    "div",
    { className: "list-group", style: { marginTop: '30px' } },
    todoNode
  );
};

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    };
    this.apiUrl = 'https://5c4a46c194e8a70014b333cb.mockapi.io/api/todo';
    axios.get(this.apiUrl).then(res => {
      // Set state with result
      this.setState({ data: res.data });
    });

  }
  // Add todo handler
  addTodo(val) {
    // Assemble data
    const todo = { text: val };
    // Update data
    axios.post(this.apiUrl, todo).then(res => {
      this.state.data.push(res.data);
      this.setState({ data: this.state.data });
    });
  }
  // Handle remove
  handleRemove(id) {
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter(todo => {
      if (todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl + '/' + id).then(res => {
      this.setState({ data: remainder });
    });
  }

  render() {
    // Render JSX
    return React.createElement(
      "div",
      null,
      React.createElement(Title, { todoCount: this.state.data.length }),
      React.createElement(TodoForm, { addTodo: this.addTodo.bind(this) }),
      React.createElement(TodoList, {
        todos: this.state.data,
        remove: this.handleRemove.bind(this)
      })
    );
  }
}


class MyButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return React.createElement(
      "div",
      null,
      React.createElement('button', { onclick: this.props.onClick }, 'Click me')
    );
  }
}

class Hello extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement('div', null, `Hello ${this.props.name}`);
  }
}

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  onPlusClick() {
    this.setState({value: this.state.value + 1});
  }

  onMinusClick() {
    this.setState({value: this.state.value - 1});
  }

  render() {
    return React.createElement('div', null,
      React.createElement('div', null, `Counter`),
      React.createElement('div', null, `${this.state.value}`),
      React.createElement('button', {onClick: this.onPlusClick.bind(this)}, '+'),
      React.createElement('button', {onClick: this.onMinusClick.bind(this)}, '-')
    );
  }
}

class Root extends React.Component {
  render() {
    return React.createElement('div', null,
      React.createElement(Counter, null, null)
    );
  }
}


//ReactDOM.render(React.createElement(Root, null, null), document.getElementById('count'));

ReactDOM.render(React.createElement(Hello, {name: 'lolerki'}, null), document.getElementById('hello'));

ReactDOM.render(React.createElement(MyButton, { onClick: () => alert('yay it worked') } ), document.getElementById('button'));

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));

