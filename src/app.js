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
      React.createElement('div', null, `The Famous Dan Abramov's Counter`),
      React.createElement('div', null, `${this.state.value}`),
      React.createElement('button', {onClick: this.onPlusClick.bind(this)}, '+'),
      React.createElement('button', {onClick: this.onMinusClick.bind(this)}, '-')
    );
  }
}
class Root extends React.Component {
  render() {
    return React.createElement('div', null,
      React.createElement(Counter, null, null),
      React.createElement(Counter, null, null)
    );
  }
}

class MyButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement('button', {onclick: this.props.onClick}, `Click me`);
  }
}

const myBtn = React.createElement(MyButton, {onClick: () => alert('yay it worked')}, null);
ReactDOM.render(myBtn, document.getElementById('button'));


ReactDOM.render(React.createElement(Root, null, null), document.getElementById('count'));

const helloWorld = React.createElement(Hello, {name: 'lolerki'}, null);
ReactDOM.render(helloWorld, document.getElementById('name'));