
export class ComponentError2 extends Error {

  constructor(err) {
    super(err)
  }

  method () {
    return 'Метод ComponentError2'
  }

}



export default class ComponentError extends ComponentError2 {

  constructor(err) {
    super(err)
  }

  method2 () {
    return 'Метод ComponentError'
  }

}
