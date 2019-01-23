//const MyButtonComponents = require('./components/MyButtonComponent.js').default;
//const Hello = require('./components/HelloComponent.js').default;

//const HelloComponent = require('./components/HelloComponent.js').default;

//import HelloComponent from "./components/HelloComponent.js";

class HelloComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement('div', null, `Hello ${this.props.name}`);
  }
}

let hello = new HelloComponent();

const helloWorld = React.createElement(hello, {name: 'lolerki'}, null);
ReactDOM.render(helloWorld, document.getElementById('root'));
