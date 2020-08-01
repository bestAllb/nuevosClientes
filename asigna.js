let clientes = [
    { id: 1, genero: 'H', puntos: 7 },
    { id: 2, genero: 'M', puntos: 5 },
    { id: 3, genero: 'H', puntos: 6 },
    { id: 4, genero: 'M', puntos: 1 },
    { id: 5, genero: 'M', puntos: 4 },
    { id: 6, genero: 'H', puntos: 3 },
    { id: 7, genero: 'M', puntos: 2 },
    { id: 8, genero: 'H', puntos: 10 },
    { id: 9, genero: 'H', puntos: 9 },
    { id: 10, genero: 'H', puntos: 8 },
    { id: 11, genero: 'H', puntos: 5 },
    { id: 12, genero: 'H', puntos: 4 },
    { id: 13, genero: 'M', puntos: 2 },
    { id: 14, genero: 'M', puntos: 1 },
    { id: 15, genero: 'H', puntos: 4 }
]

let esc = [
    { id: 1, nombre: 'hugo', genero: 'H', puntos: 0, clientes: [] },
    { id: 2, nombre: 'daisy', genero: 'M', puntos: 0, clientes: [] },
    { id: 3, nombre: 'paco', genero: 'H', puntos: 0, clientes: [] },
    { id: 4, nombre: 'luis', genero: 'H', puntos: 0, clientes: [] },
    { id: 5, nombre: 'mini', genero: 'M', puntos: 0, clientes: [] }
]

let byPoints = (cliente, esc) => {
    esc.sort(function(a, b) {
        //Se ordena a los ESC por el número de puntos
        var puntosA = a.puntos;
        var puntosB = b.puntos;
        return (puntosA < puntosB) ? -1 : (puntosA > puntosB) ? 1 : 0;
    });
    // busca si hay puntuaciones iguales
    let menorPuntos = esc[0].puntos
    let mismosPuntos = [];
    esc.forEach(element => {
        if (element.puntos === menorPuntos)
            mismosPuntos.push({ id: element.id, clientes: element.clientes.length })
    });
    if (mismosPuntos.length > 1) {
        mismosPuntos.sort(function(a, b) {
            //Se ordena a los ESC por el número de clientes
            var puntosA = a.clientes;
            var puntosB = b.clientes;
            return (puntosA < puntosB) ? -1 : (puntosA > puntosB) ? 1 : 0;
        });
        // numero de clientes con el mismo número de clientes
        let noClientes = mismosPuntos[0].clientes
        let mismosClientes = []
        let indice
        mismosPuntos.forEach(element => {
            if (element.clientes === noClientes)
                mismosClientes.push({ id: element.id })
        });
        if (mismosClientes.length > 1) {
            indice = Math.floor(Math.random() * (mismosClientes.length - 1))
            indice = esc.findIndex(x => x.id == mismosClientes[indice].id)
        } else {
            indice = esc.findIndex(x => x.id === mismosPuntos[0].id)
        }
        // Asigna al esc con menos puntos y menos clientes
        esc[indice].puntos += cliente.puntos
        esc[indice].clientes.push(cliente)
        return esc[indice]
    } else {
        // asigna al ESC con menos puntos
        esc[0].puntos += cliente.puntos
        esc[0].clientes.push(cliente)
        return esc[0]
    }
}

let byGender = (cliente, esc) => {
    let puntosMin;
    let puntosMax;
    const umbral = 10;
    let maxUmbral = []
    let escStatus = [];
    //obtiene los elementos que son
    //mayores al umbral en puntos
    esc.sort(function(a, b) {
        //Se ordena a los ESC por el número de puntos
        var puntosA = a.puntos;
        var puntosB = b.puntos;
        return (puntosA < puntosB) ? -1 : (puntosA > puntosB) ? 1 : 0;
    });
    puntosMin = esc[0].puntos
    puntosMax = esc[esc.length - 1]
    for (let i = 0; i < esc.length; i++) {
        escStatus[i] = esc[i]
        escStatus[i].umbral = false;
        if (esc[i].puntos > (puntosMin + umbral)) {
            escStatus[i].umbral = true
        }
    }
    console.log(escStatus);
}

// filtra por genero
let escM = esc.filter(x => x.genero === 'M')
let escH = esc.filter(x => x.genero === 'H')

if ((escH.length === 0) && (escM.length === 0))
// no se tienen ESC
    return console.log("Sin ESC");

if (escH.length === 0 || escM.length === 0) {
    //Asignación por puntos
    //Solo hombres o mujeres ESC
    let escAsignado;
    console.log("Por puntos");
    clientes.forEach(element => {
        escAsignado = byPoints(element, esc)
    })
} else {
    //Se asigna por genero si existen hombres
    //y mujeres incluso si son el mismo número
    let escAsignado
    console.log("Por genero")
    byGender(clientes[0], esc)
        /*
        clientes.forEach(element => {
            escAsignado = byGender(element, esc)
        })
        */
}