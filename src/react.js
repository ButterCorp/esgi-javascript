(() => {
  let rootDOMElement, rootReactElement;
  const classMap = {};
  let classCounter = 0;
  const REACT_CLASS = 'REACT_CLASS';


  /**
   * Check le type d'élément injecté :
   * Si c'est une classe on appelle la méthode HandleClass
   * Si l'élément est Stateless on transmet directement ses props
   * S'il est Stateful : on appelle la méthode HandleHtmlElement
   * @param element 
   * @param props 
   * @param children 
   */
  function anElement(element, props, children) {
    if (isClass(element)) {
      return handleClass(element, props, children);
    } else if (isStateLessComponent(element)) {
      return element(props);
    } else {
      return handleHtmlElement(element, props, children);
    }
  }

  function createElement(el, props, ...children) {
    return anElement(el, props, children);
  }

  function handleClass(clazz, props, children) {
    classCounter++;
    if (classMap[classCounter]) {
      return classMap[classCounter];
    }
    const reactElement = new clazz(props);
    reactElement.children = children;
    reactElement.type = REACT_CLASS;
    classMap[classCounter] = reactElement;
    return reactElement;
  }

  /**
   * Tous 
   * @param element 
   * @param props 
   * @param children 
   */
  function handleHtmlElement(element, props, children) {
    const anElement = document.createElement(element);
    if (props && props.ref) {
      props.ref(anElement);
    }
    children.forEach(child => appendChild(anElement, child));
    _.forEach(props, (value, name) => appendProp(anElement, name, value));
    return anElement;
  }

  function appendChild(element, child) {
    if (child.type === REACT_CLASS) {
      appendChild(element, child.render());
    } else if (Array.isArray(child)) {
      child.forEach(ch => appendChild(element, ch));
    } else if (typeof(child) === 'object') {
      element.appendChild(child);
    } else {
      element.innerHTML += child;
    }
  }

  /**
   * Ce qui commence par on* au début : 
   * On ajoute des eventListener
   * Pour le reste on ajoute seulement l'attribut
   * @param element 
   * @param propName 
   * @param propVal 
   */
  function appendProp(element, propName, propVal) {
    if (shouldAddEventListener(propName)) {
      element.addEventListener(propName.substring(2).toLowerCase(), propVal);
    } else {
      if (propName === 'className') {
        propName = 'class';
      }
      element.setAttribute(propName, propVal);
    }
  }

  /**
   * La classe component de base
   * Une méthode setState() pour 
   * mettre à jour l'état du 
   * stateful component et re-render().
   */
  class Component {
    constructor(props) {
      this.props = props;
    }

    setState(state) {
      this.state = Object.assign({}, this.state, state);
      reRender();
    }
  }

  function reRender() {
    while (rootDOMElement.hasChildNodes()) {
      rootDOMElement.removeChild(rootDOMElement.lastChild);
    }
    //Skip the root. It is only rendered once.
    classCounter = 1;
    ReactDOM.render(rootReactElement, rootDOMElement);
  }

  window.React = {
    createElement,
    Component
  };
  window.ReactDOM = {
    render: (el, domEl) => {
      rootReactElement = el;
      rootDOMElement = domEl;
      const currentDOM = rootReactElement.type === REACT_CLASS ? rootReactElement.render() : rootReactElement;
      rootDOMElement.appendChild(currentDOM);
    }
  };
})();