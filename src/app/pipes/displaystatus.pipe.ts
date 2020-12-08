import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displaystatus'
})
export class DisplaystatusPipe implements PipeTransform {

  transform(value: string): string {

    if(value){
      let status = "Abierta";

      let statuses = {  
        "IDLE": "",
        "IDLE CITA": "Abierta (Cita)",
        "IDLE BAT": "Abierta (En Batería)",
        "DONE": "Ejecutada",
        "CLOSED": "Cerrada",
        "INFORMADA": "Informada",
        "REQUERIDA": "Requerida" 
      };

      for (let st in statuses) {
        if (statuses.hasOwnProperty(st)) {
          if(st.toLowerCase().includes(value.toLowerCase())){
            status = statuses[st];
          }
        }
      }   

      return status[0];
    }else{
      console.log("Pipe invalido")
    }
  }

}
