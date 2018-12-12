const Hello = function () {
    return React.createElement('div', null, `Hello World`);
};
const helloWorld = React.createElement(Hello, null, null);
ReactDOM.render(helloWorld, document.getElementById('root'));