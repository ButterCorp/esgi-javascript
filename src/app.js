const myButtonComponents = require('/components/myButtonComponents.js').default;

const myBtn = React.createElement(myButtonComponents, {onClick: () => alert('yay it worked')}, null);
ReactDOM.render(myBtn, document.getElementById('root'));