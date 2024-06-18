
const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio.</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'sueldo') {
            if (input.value < 500000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No pagamos menos de $500.000</span>'
            }
        }
        if (id == 'fecha') {
            const dia = validarFecha(input.value)
            if (dia < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No puede realizar contrataciones a futuro</span>'
            }
        }
        //validar run
        if (id == 'run') {
            //!indica que debe ser false, length mide la cantidad de letras stringo el tamaño del arreglo
            if (!validarRun(input.value)) { //|| input.value.length < 9 para que tenga el tamañado deseado
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run ingresado no es válido</span>'
            }
        
        }
        //validar email
        if (id == 'email') {
            if (!validarEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
    }
}

const limpiar = () => {
    //document.getElementById('run').value = ''
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    //run y botón a sus estados originales
    document.getElementById('btnSave').value = 'Guardar'
}

const soloNumeros = (e) => {
    //e.keyCode es el número de la tecla (48 al 57 son valores númericos 0 al 9)
    if (e.keyCode >= 48 && e.keyCode <= 57)
        //return true mostrará la tecla en el input
        return true
    //return false no mostrará la tecla en el input
    return false
}

const validarEmail = (email) => {
    //expresión regular con el formato del correo 
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    //verifica el email no tiene el formato correcto
    if (!formato.test(email))
        return false
    return true
}
const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)

    return dia.toFixed(0)
}
const validarRun = (run) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X" 17216061-1
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-')//split es separar en 2 el string
            const digv = tmp[1] //dígito verificador
            const rut = tmp[0] //parte númerica
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }

    return Fn.validaRut(run)
}