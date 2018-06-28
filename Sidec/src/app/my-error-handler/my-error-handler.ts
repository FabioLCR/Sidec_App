import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class MyErrorHandler extends ErrorHandler {

  constructor() {
    super();
  }

  handleError(error) {
    switch (error.ngDebugContext.renderNode.className) {
      case "datatable-body-cell sort-active active":
        //Do nothing: Esse erro ocorre devido ao componente terceiro do Grid 
        //que desativa a linha fora de contexto após abrir o container.
        break;
    
      default:
        super.handleError(error);
        break;
    }

  }

}
