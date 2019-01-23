/**
 * Stateful vs Stateless :
 * Un component est une micro entité indépendante de notre UI
 * ex : Searchbar, Newsfeed, Header etc.
 * 
 *  - Contrairement au props qui est un read-only
 * et se transmet de parent => child
 * 
 *  - Le stateful component a un initial state et 
 * on peut aussi changer son etat avec la méthode 
 * this.setState()
 * 
 * More info on this thread :
 * https://stackoverflow.com/questions/34512696/reactjs-difference-between-stateful-and-stateless
 * 
 * 
 * @param element 
 */
function isStateLessComponent(element) {
    return !isClass(element) && typeof element === 'function'
  }
  
  /**
   * Tester si la fonction en paramètre est une classe.
   * Le pattern /^class\/, lu comme une regex est testé
   *  par rapport à la fonction en paramètre et renvoie
   * un Booléen.
   * @param func 
   */
  function isClass(func) {
    return typeof func === 'function'
      && /^class\s/.test(Function.prototype.toString.call(func));
  }