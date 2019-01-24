class MyButtonComponents extends React.Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return React.createElement('button', {onclick: this.props.onClick}, `Click me`);
    }
 }

module.exports = MyButtonComponents;