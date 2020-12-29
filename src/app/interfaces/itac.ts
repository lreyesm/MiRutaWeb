export interface Itac {
      id : string,                                   //checked
      codigo_itac : string, //cod emplazamiento               //checked   //new//
      itac : string, //identificador

      geolocalizacion : string,
      acceso : string,
      descripcion : string,

      nombre_empresa_administracion : string,
      nombre_responsable_administracion : string,
      telefono_fijo_administracion : string,
      telefono_movil_administracion : string,
      direccion_oficina : string,
      correo_administracion : string,

      nombre_presidente : string,
      vivienda_presidente : string,
      telefono_fijo_presidente : string,
      telefono_movil_presidente : string,
      correo_presidente : string,

      nombre_encargado : string,
      vivienda_encargado : string,
      telefono_fijo_encargado : string,
      telefono_movil_encargado : string,
      correo_encargado : string,

      acceso_ubicacion_ubicacion : string,
      acceso_ubicacion_acceso : string,
      extra_acceso_ubicacion : string,
      acceso_ubicacion_nota : string,

      siempre_abierto : string,
      tipo_llave : string,
      extras_llaves : string,
      llaves_nota : string,

      espacio_para_trabajar : string,
      desague : string,
      extras_desague : string,
      iluminacion : string,
      extras_iluminacion : string,
      estado_de_conservacion_nota : string,

      tubo_de_alimentacion : string,
      colector : string,
      tuberias_de_entrada_contador : string,
      tuberias_de_salida_contador : string,
      estado_de_tuberias_nota : string,

      valvula_general : string,
      extras_valvula_general : string,
      valvula_entrada : string,
      extras_valvula_entrada : string,
      valvula_salida : string,
      extras_valvula_salida : string,
      valvula_antiretorno : string,
      extras_valvula_antiretorno : string,
      estado_de_valvulas_nota : string,

      descripcion_foto_1 : string,
      descripcion_foto_2 : string,
      descripcion_foto_3 : string,
      descripcion_foto_4 : string,
      descripcion_foto_5 : string,
      descripcion_foto_6 : string,
      descripcion_foto_7 : string,
      descripcion_foto_8 : string,
      descripcion_foto_9 : string,
      foto_1 : string,
      foto_2 : string,
      foto_3 : string,
      foto_4 : string,
      foto_5 : string,
      foto_6 : string,
      foto_7 : string,
      foto_8 : string,
      foto_9 : string,

      nombre_firmante : string,
      carnet_firmante : string,

      equipo : string,
      operario : string,

      fecha_hora_cita : string,
      nuevo_citas : string,
      telefonos_status : string,

      gestor : string,
      zona : string,

      prioridad : string,
      fecha_importacion : string,
      fecha_ejecucion : string,
      fecha_cierre : string,
      fecha_informe : string,

      puntuacion_seccion1 : string,
      puntuacion_seccion2 : string,
      puntuacion_seccion3 : string,
      puntuacion_seccion4 : string,
      puntuacion_seccion5 : string,

      puntuacion : string,
      puntos_agua_total : string,
      puntos_agua_con_contador : string,
      puntos_agua_con_contador_mas_tarea : string,

      tipo : string,
      status_itac : string,

      audio_detalle : string,

      ultima_modificacion : string,
      date_time_modified: string
}
