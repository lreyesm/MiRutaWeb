export class TareaFieldOptions{
    public statuses = {
        "IDLE": "Abierta",
        "IDLE CITA": "Abierta (Cita)",
        "IDLE BAT": "Abierta (En Batería)",
        "DONE": "Ejecutada",
        "CLOSED": "Cerrada",
        "INFORMADA": "Informada",
        "REQUERIDA": "Requerida"
      };

public id = "id";                                   //checked
public idOrdenCABB = "idOrdenCABB";                 //checked   //new//
public FechImportacion = "FechImportacion";         //checked   //new//
public numero_interno = "NUMIN";                    //checked
public GESTOR = "GESTOR"; //campo para saber la empresa empladora del trabajo a realizar
public ANOMALIA = "ANOMALIA";                       //checked   //new//
public AREALIZAR = "AREALIZAR";                     //checked   //new//
public INTERVENCION = "INTERVENCI";                 //checked   //new//
public reparacion = "REPARACION";                   //checked
public propiedad = "PROPIEDAD";                     //checked
public CONTADOR_Prefijo_anno = "CONTADOR";          //checked
public numero_serie_contador = "SERIE";             //checked
public marca_contador = "MARCA";                    //checked
public calibre_toma = "CALIBRE";                    //checked
public ruedas = "RUEDAS";                           //checked
public fecha_instalacion = "FECINST"; //fecha inst de contador viejo               //checked   //new//
public actividad = "ACTIVI";                        //checked
public emplazamiento = "EMPLAZA";                   //checked
public acceso = "ACCESO";                           //checked
public calle = "CALLE";                             //checked
public numero = "NUME";//numero de portal           //checked
public BIS = "BIS";                                 //checked   //new//
public piso = "PISO";                               //checked
public mano = "MANO";                               //checked
public poblacion = "MUNICIPIO";                     //checked
public nombre_cliente = "NOMBRE_ABONADO";           //checked
public numero_abonado = "Numero_de_ABONADO";        //checked
public nombre_firmante = "NOMBRE_FIRMANTE";
public numero_carnet_firmante = "NUMERO_CARNET_FIRMANTE";
//      static    QString CODLEC = "CODLEC";
public FECEMISIO = "FECEMISIO";  //fecha emision, misma que de importacion                   //checked   //new//
public FECULTREP = "FECULTREP";   //-------------------------------------------------------------------------------------                 //checked   //new//
public OBSERVA = "OBSERVA";///observaciones de informe//-----------------------//checked   //new//
public RS = "RS";     //-------------------------------------------------------------------------------------------------                              //checked   //new//
public F_INST = "F_INST";  //fecha de instalacion del nuevo contador                           //checked   //new//
public INDICE = "INDICE";                           //checked   //new//
public emplazamiento_devuelto = "EMPLAZADV";        //checked   //new//
public RESTO_EM = "RESTO_EM";  //resto emplazamiento devuelto                      //checked   //new//
//      static    QString LECT_LEV = "LECT_LEV";
public lectura_ultima = "CODLEC";//(voy a cambiar CODLEC del CABB para la lectura, ellos lo utilizan para la ruta)
public lectura_actual = "LECT_LEV";//-------------  //checked
public lectura_contador_nuevo = "LECTURA_CONTADOR_NUEVO";
public observaciones_devueltas = "OBSERVADV";//obs de app android       //checked   //new//
public TIPO = "TIPO";   //CLASE DE CONTADOR                             //checked
public TIPO_devuelto = "TIPO_DEVUELTO"; //CLASE DE CONTADOR DEVUELTO            //checked   //new// ----------
public Estado = "Estado";                           //checked   //new//
public marca_devuelta = "MARCADV";                  //checked   //new//
public calibre_real = "CALIBREDV";                  //checked
public RUEDASDV = "RUEDASDV";                       //checked   //new//
public LARGO = "LARGO";                             //checked   //new//
public largo_devuelto = "LONGDV";                   //checked   //new//
public numero_serie_contador_devuelto = "seriedv";  //checked   //new//
public CONTADOR_Prefijo_anno_devuelto = "contadordv";//--------------//checked   //new//
public AREALIZAR_devuelta = "AREALIZARDV";//-------------------------//checked   //new//
public intervencion_devuelta = "intervencidv";      //checked   //new//
public RESTEMPLAZA = "RESTEMPLAZA";  //resto emplazamiento del gestor                //checked   //new//
public FECH_CIERRE = "FECH_CIERRE"; //fecha de cerrada tarea                 //checked   //new//
public TIPORDEN = "TIPORDEN";                       //checked   //new//
public operario = "OPERARIO";                       //checked
public observaciones = "observaciones";//obs del gestor (iniciales)            //checked
public TIPOFLUIDO = "TIPOFLUIDO";//-----------------------------------//checked   //new//
public TIPOFLUIDO_devuelto = "TIPOFLUIDO_DEVUELTO"; //checked   //new//------------------
public idexport = "idexport";                       //checked   //new//
public fech_facturacion = "fech_facturacion";       //checked   //new//
public fech_cierrenew = "fech_cierrenew";           //checked   //new//
public fech_informacionnew = "fech_informacionnew"; //checked   //new//
public f_instnew = "f_instnew";   //--Variable usada para ver quiene realizao ultima modificacion y si en adrodi o escritorio-----------------------------------------------------------------                 //checked   //new//
public tipoRadio = "tipoRadio";                     //checked   //new//
public tipoRadio_devuelto = "TIPORADIO_DEVUELTO";
public marcaR = "marcaR";                           //checked   //new//
public codigo_de_localizacion = "codigo_de_localizacion";//checked //mano en mapa
public codigo_de_geolocalizacion = "codigo_de_geolocalizacion";  //1.26.... codigo de emplazamiento
public geolocalizacion = "geolocalizacion";              //checked //casa en mapa
public url_geolocalizacion = "url_geolocalizacion";
public foto_antes_instalacion = "foto_antes_instalacion";
public foto_numero_serie = "foto_numero_serie";
public foto_lectura = "foto_lectura";
public foto_despues_instalacion = "foto_despues_instalacion";
public foto_incidencia_1 = "foto_incidencia_1";
public foto_incidencia_2 = "foto_incidencia_2";
public foto_incidencia_3 = "foto_incidencia_3";
public firma_cliente = "firma_cliente";
public tipo_tarea = "tipo_tarea";                           //checked   //new//
public telefonos_cliente = "telefonos_cliente";             //checked
public telefono1 = "telefono1";                             //checked
public telefono2 = "telefono2";                             //checked
public fechas_tocado_puerta = "fechas_tocado_puerta";       //checked
public fechas_nota_aviso = "fechas_nota_aviso";             //checked
public resultado = "resultado";                             //checked
public nuevo_citas = "nuevo_citas";                         //checked
public fecha_hora_cita = "fecha_hora_cita";                 //checked
public fecha_de_cambio = "fecha_de_cambio";                 //checked
public zona = "zona";                                       //checked
public ruta = "ruta";                                       //checked
public numero_serie_modulo = "numero_serie_modulo";         //checked
public ubicacion_en_bateria = "ubicacion_en_bateria";       //checked
public incidencia = "incidencia";                           //checked
public ID_FINCA = "ID_FINCA";                               //checked   //new//-----------
public COMENTARIOS = "COMENTARIOS";                         //checked   //new//-----------
public DNI_CIF_COMUNIDAD = "DNI_CIF_COMUNIDAD";             //checked   //new//-----------
public TARIFA = "TARIFA";                                   //checked   //new//-----------
public TOTAL_CONTADORES = "TOTAL_CONTADORES";               //checked   //new//-----------
public C_CANAL = "C_CANAL";                                 //checked   //new//-----------
public C_LYC = "C_LYC";                                     //checked   //new//-----------
public C_AGRUPA = "C_AGRUPA";                               //checked   //new//-----------
public DNI_CIF_ABONADO = "DNI_CIF_ABONADO";                 //checked   //new//-----------
public C_COMUNERO = "C_COMUNERO";                           //checked   //new//-----------
public MENSAJE_LIBRE = "MENSAJE_LIBRE";                     //checked   //new//-----------

public ID_SAT = "ID_SAT";                 //checked   //new//-----------//campos nuevos
public fecha_realizacion = "fecha_realizacion";                           //checked   //new//-----------//campos nuevos
public suministros = "suministros";                     //checked   //new//-----------//campos nuevos
public servicios = "servicios";
public equipo = "equipo";
public fecha_informe_servicios = "fecha_informe_servicios";
public piezas = "piezas";
public prioridad = "prioridad";

public causa_origen = "causa_origen"; //anomalia mas intervencion
public accion_ordenada = "accion_ordenada";
public hibernacion = "hibernacion";

public audio_detalle = "audio_detalle";

public date_time_modified = "date_time_modified";           //checked
public status_tarea = "status_tarea";

public searchOptionsValues = {
  "Población": this.poblacion,
  "Calle": this.calle,
  "Portal": this.numero,
  "Abonado": this.numero_abonado,
  "Serie Levantado": this.numero_serie_contador,
  "Serie Instalado": this.numero_serie_contador_devuelto,
  "Módulo": this.numero_serie_modulo,
  "Estado": this.status_tarea
};
}
