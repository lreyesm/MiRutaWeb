export interface Tarea {
     id : string,
     idOrdenCABB: string,//siempre es 3 para su empresa
     /* FechImportacion */ FechImportacion: string,
     /* numero_interno */ NUMIN: string, //identificador unico de tarea
     /* GESTOR */ GESTOR: string, //campo para saber la empresa empladora del trabajo a realizar
     /* ANOMALIA */ ANOMALIA: string, //codigo de anomalia enviada en la orden
     /* AREALIZAR */ AREALIZAR: string,// orden precisa de lo que hay que hacer enviada significado de anomalia
     /* INTERVENCION */ INTERVENCI: string,//orden mas general de lo que hay que hacer enviada
     /* reparacion */ REPARACION: string,//?
     /* propiedad */ PROPIEDAD: string,//esto es un datos del abonado(cliente)
     /* CONTADOR_Prefijo_anno */ CONTADOR: string, //prefijo de contador a levantar (retirado)
     /* numero_serie_contador */ SERIE: string,//numero serie  de contador a levantar (retirado)
     /* marca_contador */ MARCA: string,//MARCA de contador a levantar (retirado)
     /* calibre_toma */ CALIBRE: string,//calibre  de contador a levantar (retirado)
     /* ruedas */ RUEDAS: string,
     /* fecha_instalacion */ FECINST: string, ///fecha de instalado de contador viejo
     /* actividad */ ACTIVI: string,
     /* emplazamiento */ EMPLAZA: string,
     /* acceso */ ACCESO: string,
     /* calle */ CALLE: string,
     /* numero */ NUME: string,//numero de portal
     /* BIS */ BIS: string,
     /* piso */ PISO: string,
     /* mano */ MANO: string,
     /* poblacion */ MUNICIPIO: string,
     /* nombre_cliente */ NOMBRE_ABONADO: string,
     /* numero_abonado */ Numero_de_ABONADO: string,
     /* nombre_firmante */ NOMBRE_FIRMANTE: string,
     /* numero_carnet_firmante */ NUMERO_CARNET_FIRMANTE: string,
     /* FECEMISIO */ FECEMISIO: string, ///fecha en que solicitan la intervencion
     /* FECULTREP */ FECULTREP: string,
     /* OBSERVA */ OBSERVA: string,//----------------------------------------------------------
     /* RS */ RS: string,
     /* F_INST */ F_INST: string, //fecha de instalacion de contador nuevo
     /* INDICE */ INDICE: string,
     /* emplazamiento_devuelto */ EMPLAZADV: string,
     /* RESTO_EM */ RESTO_EM: string,
     /* lectura_ultima */ CODLEC: string,//---------------
     /* lectura_actual */ LECT_LEV: string,//----------------
     /* lectura_contador_nuevo */ LECTURA_CONTADOR_NUEVO: string,
     /* observaciones_devueltas */ OBSERVADV: string,
     /* TIPO */ TIPO: string,
     /* TIPO_devuelto */ TIPO_DEVUELTO: string,
     /* Estado */ Estado: string,
     /* marca_devuelta */ MARCADV: string,
     /* calibre_real */ CALIBREDV: string,
     /* RUEDASDV */ RUEDASDV: string,
     /* LARGO */ LARGO: string,
     /* largo_devuelto */ LONGDV: string,
     /* numero_serie_contador_devuelto */ seriedv: string,
     /* CONTADOR_Prefijo_anno_devuelto */ contadordv: string,//----------------------------------------------------------
     /* AREALIZAR_devuelta */ AREALIZARDV: string,//-------------------------------------------------------------------------------
     /* intervencion_devuelta */ intervencidv: string,
     /* RESTEMPLAZA */ RESTEMPLAZA: string,
     /* FECH_CIERRE */ FECH_CIERRE: string,//fecha en que cierra el conjunto de tarea y genera e excel y dat de salida
     /* TIPORDEN */ TIPORDEN: string,
     /* operario */ OPERARIO: string,
     /* observaciones */ observaciones: string,
     /* TIPOFLUIDO */ TIPOFLUIDO: string,//-------------------------------------------------------------------------------
     /* TIPOFLUIDO_devuelto */ TIPOFLUIDO_DEVUELTO: string,
     /* idexport */ idexport: string,
     /* fech_facturacion */ fech_facturacion: string,
     /* fech_cierrenew */ fech_cierrenew: string,//
     /* fech_informacionnew */ fech_informacionnew: string,
     /* f_instnew */ f_instnew: string, //fecha en la que se instala el contador nuevo
     /* tipoRadio */ tipoRadio: string,
     /* tipoRadio_devuelto */ TIPORADIO_DEVUELTO: string,
     /* marcaR */ marcaR: string,
     /* codigo_de_localizacion */ codigo_de_localizacion: string,
     /* codigo_de_geolocalizacion */ codigo_de_geolocalizacion: string,
     /* geolocalizacion */ geolocalizacion: string,
     /* url_geolocalizacion */ url_geolocalizacion: string,
     /* foto_antes_instalacion */ foto_antes_instalacion: string,
     /* foto_numero_serie */ foto_numero_serie: string,
     /* foto_lectura */ foto_lectura: string,
     /* foto_despues_instalacion */ foto_despues_instalacion: string,
     /* foto_incidencia_1 */ foto_incidencia_1: string,
     /* foto_incidencia_2 */ foto_incidencia_2: string,
     /* foto_incidencia_3 */ foto_incidencia_3: string,
     /* firma_cliente */ firma_cliente: string,
     /* tipo_tarea */ tipo_tarea: string,
     /* telefonos_cliente */ telefonos_cliente: string,
     /* telefono1 */ telefono1: string,
     /* telefono2 */ telefono2: string,
     /* fechas_tocado_puerta */ fechas_tocado_puerta: string,
     /* fechas_nota_aviso */ fechas_nota_aviso: string,
     /* resultado */ resultado: string,
     /* nuevo_citas */ nuevo_citas: string,
     /* fecha_hora_cita */ fecha_hora_cita: string,
     /* fecha_de_cambio */ fecha_de_cambio: string,
     /* zona */ zona: string,
     /* ruta */ ruta: string,
     /* numero_serie_modulo */ numero_serie_modulo: string,
     /* ubicacion_en_bateria */ ubicacion_en_bateria: string,
     /* incidencia */ incidencia: string,
     /* ID_FINCA */ ID_FINCA: string,
     /* COMENTARIOS */ COMENTARIOS: string,
     /* DNI_CIF_COMUNIDAD */ DNI_CIF_COMUNIDAD: string,
     /* TARIFA */ TARIFA: string,
     /* TOTAL_CONTADORES */ TOTAL_CONTADORES: string,
     /* C_CANAL */ C_CANAL: string,
     /* C_LYC */ C_LYC: string,
     /* C_AGRUPA */ C_AGRUPA: string,
     /* DNI_CIF_ABONADO */ DNI_CIF_ABONADO: string,
     /* C_COMUNERO */ C_COMUNERO: string,
     /* MENSAJE_LIBRE */ MENSAJE_LIBRE: string,

     /* ID_SAT */ ID_SAT: string,                 //checked   //new//-----------//campos nuevos
     /* fecha_realizacion */ fecha_realizacion: string,                           //checked   //new//-----------//campos nuevos
     /* suministros */ suministros: string,                     //checked   //new//-----------//campos nuevos
     /* servicios */ servicios: string,
     /* equipo */ equipo: string,
     /* fecha_informe_servicios */ fecha_informe_servicios: string,

     /* piezas */ piezas: string,

     /* prioridad */ prioridad: string,

     /* causa_origen */ causa_origen: string,
     /* accion_ordenada */ accion_ordenada: string,
     /* hibernacion */ hibernacion: string,

     /* audio_detalle */ audio_detalle: string,

     /* date_time_modified */ date_time_modified: string,
     /* status_tarea */ status_tarea: string
}
