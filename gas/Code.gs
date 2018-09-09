/*
  V0.1: Versión funcional
  -- Modelo
  /* 
  
  ******* Main ******* 
  Página principal en donde se registrar las tareas
  
  A3 = Proyecto
  A6 = Módulo
  A9 = Fase
  A12 = Tarea
  A15 = SubTarea
  A18 = Estimado
  
  B15 = Indicador de tiempo transcurrido.
  
  C1 = Estado: Indica forma de registro de la tarea
  
  D1 = Hora en la cual inicia la tarea.
  
  Botones:
  
  Registrar: asociado con funcionalidad registrarTarea()
  Update: asociado con funcionalidad updateEstimado(), además actualiza todos los campos asociados a un registro
  en donde la marca de tiempo es la llave primaria.
  
  ******* Bitácora ******* 
  Almacen díario en donde se almacena todas las tareas del día
  Nota: Actualmente no tiene límietes, puede ser más de un día
  
  Campos básicos:
  
  A1 = Sysdate (Llave primaria)
  B1 = Estado 
  C1 = Proyecto
  D1 = Módulo
  E1 = Fase
  F1 = Tarea
  G1 = Estimado
  
  Campos adicionales:
  -- H1 Intermedios: Tiempo entre tareas no registradas.
     -- Registros que el estado actual es Iniciado y el estado Anterior es Parado
     -- Registros que el estado actual es Continuo y el estado Anterior es Parado
  -- I1 Tiempo Tarea: Tiempo entre tareas registradas con estados Iniciado - Parado
     -- Registros que el estado actual es Parado y el estado Anterior es Iniciado
  -- J1 Continuo: Tiempo entre tareas continuas.
     -- Registros que el estado actual es Continuo y el estado Anterior es Continuo
     -- El valor de la casilla actual es el resultado de la terea anterior.
     
  -- K1 Comentario: campo en evaluación.
  
  ******* Parámetros ******
  Proyectos, Fases y Estados
  
  Estados:
  Iniciado: Tiempo inicial de una tarea.
  Terminado: Fin de la tarea Iniciada
  Continuo: Tareas continuas que no especifican un estado Iniciado o Terminado, la terminación de la una implica el comienzo de la otra.
  
  ****** Funciones *****
  -- registrarTarea()
  
  -- updateEstimado()
  Su única función es generar actualizar la celda B15
  Actualmente genera un movimiento para que se actualice, es necesario mejorarla.
  
  -- pausarTarea()
  
  ----------------------------------------------------------------------------------
  -- Mejoras Pendientes por Implementar:
    		
	-- Restricciones útiles para obtener consultas:
     -- Si el estado anterior es Iniciado no se debera registrar otro estado Iniciado en el estado actual
     -- Si el estado anterior es Parado no se debera registrar otro estado Parado en el estado actual
     -- Si el estado anterior es Iniciado no se debera registrar en el estado actual Continuo
    
    -- Memoria de Registros 
       -- llenado automático de campos en hoja main.
         Descripción: al elegir un proyecto, recuperar la última información guardada.
       -- Borrado automático de campos en hoja main. ?
    
    -- Mejorar updateEstimado()
      -- Al registrar movimientos, Ejecutar updateEstimado
*/

/**
*  Captura los datos pincipales de la tarea (nombre proyecto, módulo, fase del proyecto, 
*  tarea, subtarea y tiempo estimado para ser cumplida), estado de la tarea y la 
*  almacena en la hoja bitácora.
*  
* @param {id} sysdate de la tarea
* @return la tarea registrada en la hoja bitácora
* @customfunction
*/

function registrarTarea(id) {   
  
  //*** Capturar datos ***//
  // Fila A
  var libroMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Main');
  var proyecto = libroMain.getRange('A3').getValue();
  var modulo = libroMain.getRange('A6').getValue();
  var fase = libroMain.getRange('A9').getValue();
  var tarea = libroMain.getRange('A12').getValue();   
  var subTarea = libroMain.getRange('A15').getValue(); 
  var estimado = libroMain.getRange('A18').getValue();   
  
  // Fila C
  var estado = libroMain.getRange('C1').getValue(); 
  
  // id = typeof id !== 'undefined' ? id : new Date(); // funciona
 
   var valId = typeof id;
  
  // Si no ingresa id cómo parametro crear ID "sysdate"
  if (valId === 'undefined'){    
    id = new Date();
    
    //Logger.log('Alerta de tiempo en Main');   
    // Alerta de tiempo en Main
    if (estado==='Iniciado' || estado ==='Continuo')  {
      libroMain.getRange('D1').setValue(id);
      // Logger.log('Iniciado');
      } else if (estado ==='Parado') {
        libroMain.getRange('D1').setValue('');
        //Logger.log('Parado');
      }  
  };
  
  //Almacenar
  var libroBitacora = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bitácora');
  //libroBitacora.appendRow([sysdate,estado,proyecto,modulo,fase,tarea,estimado]);
  libroBitacora.appendRow([id,estado,proyecto,modulo,fase,tarea,subTarea,estimado]);
  
}

/**
*  Captura la subtarea y lo agrega en nuevo registro, por defecto en estado continuo
*  
* @param {id} sysdate de la tarea
* @return la subTarea registrada en la hoja bitácora
* @customfunction
*/
function pausarTarea(id) {   
  
  //*** Capturar datos ***//
  // Fila A
  var libroMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Main');
  var proyecto = 'Interrupción';
  var modulo = '';
  var fase = '';
  var tarea = '';   
  
  var subTarea = libroMain.getRange('A15').getValue(); 
  var estimado = '';   
  
  // Fila C
  var estado = 'Continuo'; 

  // Si no ingresa id cómo parametro crear ID "sysdate"
  var valId = typeof id;
  if (valId === 'undefined'){    
    id = new Date();
    
    libroMain.getRange('D1').setValue(id);  
    
  };
  
  //Almacenar
  var libroBitacora = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bitácora');
  //libroBitacora.appendRow([sysdate,estado,proyecto,modulo,fase,tarea,estimado]);
  libroBitacora.appendRow([id,estado,proyecto,modulo,fase,tarea,subTarea,estimado]);
  
}

function debugFunction(){
  
  var sysdate = new Date();
  Logger.log('Fecha: %s: ',23);
  Logger.log('Que sucede');  
  
  // Log the number of Google Groups you belong to.
  var groups = GroupsApp.getGroups();
  Logger.log('Fuck You are a member of %s Google Groups.', groups.length);
  Logger.log('2 You are a member of %s Google Groups.', groups.length); 
  
}

function updateEstimado(){
  var libroMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Main');
  var proyecto = libroMain.getRange('E1').setValue('');
  //Logger.log('Actualizado');
  
}

function updateCampos(){
  // Alternativa 1: buscar y acualizar por sysdate ej: 27/05/2018 6:38:58 - No encontrada
  // Alternativa 2: Buscar último registro y actualizar todos los campos - Más largo que Alternativa 3
  // Alternativa 3: Solo borrar último y volver a registrar toda la info manteniendo el mismo ID.
  
  var libroBitacora = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bitácora');
  var libroMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Main');
  
  var lastRow = libroBitacora.getLastRow();
  libroBitacora.deleteRow(lastRow);
    
  registrarTarea(libroMain.getRange('D1').getValue()); 
  
}