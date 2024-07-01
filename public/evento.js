document.querySelector('body').onload = async () => {
    const urlid = new URLSearchParams(window.location.search);
    const id = urlid.get('id');
    console.log("el id es", id);
    const token = localStorage.getItem('jwt-token');

    const res = await fetch(`/main/single/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        window.location.href = "/login";
        throw Error("Problemas en login");
    }

    const datos = await res.json();
    const { eventos, participantes } = datos;

    let listaHTML = document.querySelector('.event__container');
    listaHTML.innerHTML = '';

    let ev = '';
    let grid = '';
    let agregar = '';

    eventos.forEach(evento => {
        ev += `
            <div class="event">
                <h4 class="nombre">${evento.nombre_evento}</h4>
                <h4 class="fecha">Fecha: <span>${evento.fecha_evento}</span></h4>
                <h4 class="tipo">Tipo de evento: <span>${evento.tipo_evento}</span></h4>
                <hr>
                <div class="table-grid">
                    <div class="header-grid">Apellido</div>
                    <div class="header-grid">Nombre</div>
                    <div class="header-grid">Ciudad</div>
                    <div class="header-grid">Acción</div>
        `;

        participantes.filter(participante => participante.id_evento === evento.id_evento).forEach(participante => {
            grid += `
                <div class="row-grid">${participante.apellido}</div>
                <div class="row-grid">${participante.nombre}</div>
                <div class="row-grid">${participante.ciudad}</div>
                <div class="action-buttons-grid">
                    <form method="POST" action="/main/edit">
                        <button class="buttons-participants edit">
                            <span class="material-symbols-outlined actions__edit">edit_note</span>
                            <input type="hidden" name="idModificar" value="${participante.id}">
                        </button>
                    </form>
                    <form method="POST" action="/main/list?_method=DELETE">
                        <button class="buttons-participants delete">
                            <span class="material-symbols-outlined actions__delete">delete</span>
                        </button>
                        <input type="hidden" name="idEliminar" value="${participante.id}">
                    </form>
                </div>
            `;
        });

        agregar = `
            <div class="add-participant-grid">
                <a href="/main/addPart/${evento.id_evento}">
                    <span class="material-symbols-outlined actions__add">person_add</span>
                </a>
            </div>
            </div> <!-- Cierre de table-grid -->
        </div> <!-- Cierre de event -->
        `;

        listaHTML.innerHTML += ev + grid + agregar;

        // Reinicia las variables para la siguiente iteración
        ev = '';
        grid = '';
        agregar = '';
    });
};
