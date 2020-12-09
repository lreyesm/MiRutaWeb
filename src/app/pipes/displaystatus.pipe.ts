import { Pipe, PipeTransform } from '@angular/core';
import { TareaFieldOptions } from '../classes/tarea-field-options';

@Pipe({
  name: 'displaystatus'
})
export class DisplaystatusPipe implements PipeTransform {

  transform(value: string): string {
    if(value){
      value = value.trim();
      let status = "Abierta";
      let statuses = new TareaFieldOptions().statuses;
      for (let st in statuses) {
        if (statuses.hasOwnProperty(st)) {
          if(st.toLowerCase().includes(value.toLowerCase())){
            status = statuses[st];
          }
        }
      }   
      return status[0];  
    }else{
      //console.log("Pipe invalido--------------------------------------------------");
    }
  }

}
