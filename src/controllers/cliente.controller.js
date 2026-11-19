
const { pool } = require('../config/database')
const CAMPOS = 'id, apellidos, nombres, telefono, direccion, email'

//Validar los campos
const validarCampos = ({apellidos, nombres, telefono, direccion, email} = {}) => {
  const errores = []

  if (!apellidos || apellidos.trim() === '') errores.push('Los apellidos son obligatorios')
  if (!nombres || nombres.trim() === '') errores.push('Los nombres son obligatorios')
  if (!direccion || direccion.trim() === '') errores.push('La dirección es necesaria')
  if (!email || email.trim() === '') errores.push('El correo es obligatorio')

  return errores
}

//API REST http://miaplicacion.com/api/clientes
const listarClientes = async(req, res) => {
  try{
    const [clientes] = await pool.query('SELECT * FROM clientes ORDER BY id')

    res.status(200).json({
      ok: true,
      total: clientes.length,
      data: clientes
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

//API REST => http://miaplicacion.com/api/clientes/10
const obtenerCliente = async(req, res) => {
  try{
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'El ID debe ser un entero positivo'
      })
    }

    const [registro] = await pool.execute('SELECT * FROM clientes WHERE id = ?', [id])

    if (registro.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'No existe el cliente'
      })
    }

    res.status(200).json({
      ok: true,
      data: registro[0]
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const crearCliente = async(req, res) => {
  try{
    const errores = validarCampos(req.body)

    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const { apellidos, nombres, telefono, direccion, email } = req.body

    const consulta = 'INSERT INTO clientes (apellidos, nombres, telefono, direccion, email) VALUES (?,?,?,?,?)'
    const [registro] = await pool.execute(consulta, [apellidos, nombres, telefono || null, direccion, email])

    res.status(201).json({
      ok: true,
      id: registro.insertId
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const actualizarCliente = async(req, res) => {
  try{
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'El ID debe ser un entero positivo'
      })
    }

    const errores = validarCampos(req.body)

    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const [existe] = await pool.execute('SELECT id FROM clientes WHERE id = ?', [id])

    if (existe.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }

    const consulta = 'UPDATE clientes SET apellidos=?, nombres=?, telefono=?, direccion=?, email=?, updated_at=NOW() WHERE id=?'
    const { apellidos, nombres, telefono, direccion, email } = req.body

    const [resultado] = await pool.execute(consulta, [apellidos, nombres, telefono || null, direccion, email, id])

    res.status(200).json({
      ok: true,
      filasAfectadas: resultado.affectedRows
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const eliminarCliente = async(req, res) => {
  try{
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'El ID debe ser un entero positivo'
      })
    }

    const [resultado] = await pool.execute('DELETE FROM clientes WHERE id = ?', [id])

    if (resultado.affectedRows === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Cliente eliminado'
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

module.exports = {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
}
