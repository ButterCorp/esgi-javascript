(() => {
  let rootDOMElement, rootReactElement;
  const classMap = {};
  let classCounter = 0;
  const REACT_CLASS = 'REACT_CLASS';

  function anElement(element, props, children) {
    if (isClass(element)) {
      return handleClass(element, props, children);
    } else if (isStateLessComponent(element)) {
      return element(props);
    } else {
      return handleHtmlElement(element, props, children);
    }
  }

  function type_check_v1(object, type) {
    return typeof object === type;
  }

  function type_check_v2(object, type_object) {
      var ok = true;
      if (!type_check_v1(type_object.value, "undefined")) {
          if (object != type_object.value) {
              ok = false
          }
      }
      if (!type_check_v1(type_object.type, "undefined")) {
          if (!type_check_v1(object, type_object.type)) {
              ok = false
          }
      }
      if (!type_check_v1(type_object.enum, "undefined")) {
          if (type_object.enum.indexOf(object) == -1) {
              ok = false
          }
      }
      return ok;
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

  function handleHtmlElement(element, props, children) {
    const anElement = document.createElement(element);
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

  function appendProp(element, propName, propVal) {
    if (shouldAddEventListener(propName)) {
      element.addEventListener(propName.substring(2).toLowerCase(), propVal);
    } else {
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
      const currentDOM = rootReactElement.render();
      rootDOMElement.appendChild(currentDOM);
    }
  };
})();