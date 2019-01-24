function isStateLessComponent(element) {
  return !isClass(element) && typeof element === 'function'
}

function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}

/**
 * Check si le pattern qui commence par *on est au début de la propriété
 * @param property 
 */
function shouldAddEventListener(property) {
  return /^on.*$/.test(property);
}
