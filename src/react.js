(() => {
  function anElement(element, children) {
    if (typeof(element) === 'function') {
      return element();
    } else {
      const anElement = document.createElement(element);
      children.forEach(child => {
        if (typeof(child) === 'object') {
          anElement.appendChild(child);
        } else {
          anElement.innerHTML += child;
        }
      });
      return anElement;
    }
  }

  function createElement(el, props, ...children) {
    return anElement(el, children);
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
    
    children.forEach(child => {
      if (typeof(child) === 'object') {
        anElement.appendChild(child);
      } else {
        anElement.innerHTML += child;
      }
    });
    Object.keys(props).forEach(propName => {
      if (/^on.*$/.test(propName)) {
        anElement.addEventListener(propName.substring(2).toLowerCase(), props[propName]);
      } else {
        anElement.setAttribute(propName, props[propName]);
      }
    });
    return anElement;
  }

  class Component {

    constructor(props) {
      this.props = props;
    }

    setState(state) {
      this.state = Object.assign({}, this.state, state);
      reRender();
    }
  }

  window.React = {
    createElement,
    Component
  };

  window.ReactDOM = {
    render: (el, domEl) => {
      domEl.appendChild(el);
    }
  };
})();