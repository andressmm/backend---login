const { conn }=require('../db/conexion')

module.exports={
// LOGIN DE USUARIO 
loginUsr: async (req, res) => {
        const { username, password } = req.body;
    
        console.log('Datos recibidos:', username, password);
        const sql = 'SELECT * FROM users WHERE user = ? AND pass = ?';
    
        try {
          const [rows] = await conn.query(sql, [username, password]);
    
          if (rows.length > 0) {
            // Usuario encontrado, enviar respuesta exitosa
            console.log('Autenticación exitosa para el usuario:', username);
            res.status(200).json({ message: username });
        } else {
            // Usuario no encontrado o credenciales inválidas
            console.log('Credenciales inválidas para el usuario:', username);
            res.status(401).json({ message: 'error' });
          }
        } catch (error) {
          console.error('Error al conectar bbdd:', error);
          res.status(500).json({ message: 'error' });
        }
      },

// LISTADO DE EVENTOS
      getEvent: async (req, res) => {
        try {
            const [participantes] = await conn.query(`SELECT * FROM participantes`);
            const [eventos] = await conn.query(`SELECT * FROM eventos order by fecha_evento ASC`);
            res.render('events', { title: 'LISTADO DE EVENTOS', eventos,participantes });
            
        } catch (error) {
            console.error('Error al obtener eventos:', error);
            res.status(500).json({ error: 'Error al obtener eventos' });
        } finally {
            conn.releaseConnection();
        }
    },

// crear nuevo evento 
    crearRegistro: async (req,res)=>{
        const { nombre_evento, tipo_evento, fecha_evento } = req.body;

        const enMayus = {
            nombre_evento: nombre_evento.toUpperCase(),
            tipo_evento: tipo_evento.toUpperCase(),
        };

        const sql=`INSERT INTO eventos (nombre_evento,tipo_evento,fecha_evento) VALUES (?,?,?);`
        const creado=await conn.query(sql, [enMayus.nombre_evento,enMayus.tipo_evento,req.body.fecha_evento] )
        console.log(creado)
        res.redirect('/events');

    
    },

 // modificar evento (Se obtienen los datos del evento a modificar y se los muestra en el form)  
    getModificar: async (req,res)=>{
        console.log("modificar!!")

      const [modificar]=await conn.query(`select * from eventos WHERE id_evento=?`,req.body.idModificar)
        console.log(modificar)

        res.render('modificar',{
            title:'MODIFICACION DE EVENTO',
            registro: modificar[0]
                    
        }) 
    },



    // ver un evento individual
    getEv: async (req, res) => {
        try {

            const [eventos] = await conn.query(`SELECT * FROM eventos WHERE id_evento=?`,
                req.body.idVer);
            const [participantes] = await conn.query(`SELECT * FROM participantes`);
            res.render('single', { title: 'LISTADO DE PARTICIPANTES', eventos,participantes });

        } catch (error) {
            console.error('Error al obtener eventos / participantes', error);
            res.status(500).json({ error: 'Error al obtener eventos / participantes' });
        } finally {
            conn.releaseConnection();
        }
    },



 //   modificar evento (captura datos del form de modif y los actualiza)
    actualizar: async (req,res)=>{
        const sql=`UPDATE eventos set nombre_evento=?, tipo_evento=?, fecha_evento=? where id_evento=?`;
        const {idActualizar,nombre_evento,tipo_evento,fecha_evento} =req.body
    
        const enMayus = {
            nombre_evento: nombre_evento.toUpperCase(),
            tipo_evento: tipo_evento.toUpperCase(),
            fecha_evento: fecha_evento.toUpperCase()
        };
        
        const modificado=await conn.query(sql,[enMayus.nombre_evento,enMayus.tipo_evento,enMayus.fecha_evento,idActualizar])
        console.log(modificado)
        res.redirect('/events')
    },

// eliminar evento

    eliminar: async (req,res)=>{
        const eliminado=await conn.query(`DELETE FROM eventos WHERE id_evento=?`,req.body.idEliminar)
        res.redirect('/events');

    },

// participantes (primero obtengo los eventos, luego los participantes para combinarlos)
getList: async (req, res) => {
    try {
        const [eventos] = await conn.query(`SELECT * FROM eventos order by fecha_evento ASC`);
        const [participantes] = await conn.query(`SELECT * FROM participantes`);
        res.render('list', { title: 'LISTADO DE PARTICIPANTES', eventos,participantes });
        
    } catch (error) {
        console.error('Error al obtener eventos / participantes', error);
        res.status(500).json({ error: 'Error al obtener eventos / participantes' });
    } finally {
        conn.releaseConnection();
    }
},

 // modificar participante (Se obtienen los datos y se los muestra en el form)  
 getEdit: async (req,res)=>{
    console.log("modificar participnte!!")

  const [modificar]=await conn.query(`select * from participantes WHERE id=?`,req.body.idModificar)
    console.log(modificar)

    res.render('edit',{
        title:'MODIFICACION DE PARTICIPANTE',
        registro: modificar[0]
                
    }) 
},

/* actualizar dato de participante */
actualizarpart: async (req,res)=>{
    const sql=`UPDATE participantes set nombre=?, apellido=?, ciudad=? where id=?`;
    const {idActualizar,nombre,apellido,ciudad} =req.body

    const enMayus = {
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        ciudad: ciudad.toUpperCase()
    };
    
    const modificado=await conn.query(sql,[enMayus.nombre,enMayus.apellido,enMayus.ciudad,idActualizar])
    res.redirect('/list')
},


// eliminar participante

delete: async (req,res)=>{
    const eliminado=await conn.query(`DELETE FROM participantes WHERE id=?`,req.body.idEliminar)
    res.redirect('/list');

},


// crear nuevo participante 
crearParticipante: async (req,res)=>{
    const { nombre,apellido,ciudad,idEvento } = req.body;

    const enMayus = {
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        ciudad: ciudad.toUpperCase()
    };

    const sql=`INSERT INTO participantes (nombre,apellido,ciudad,id_evento) VALUES (?,?,?,?);`
    const creado=await conn.query(sql, [enMayus.nombre,enMayus.apellido,enMayus.ciudad,idEvento])
    console.log(creado)
    res.redirect('/list');


},



}
