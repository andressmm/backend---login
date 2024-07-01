document.querySelector('body').onload = async () => {

	const token = localStorage.getItem('jwt-token')

	const res = await fetch(`/main/events`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
		})
	if(!res.ok){
		window.location.href="/login"
		throw Error("Problemas en login")
	}
	const datos = await res.json()
	const { eventos, participantes } = datos;
	
	let listaHTML = document.querySelector(`.event__container`)
	listaHTML.innerHTML = ''
	eventos.forEach(evento => {
		const participantesEvento = participantes.filter(participante => participante.id_evento === evento.id_evento);

		listaHTML.innerHTML += `
				<div class="event">
					<form method="POST" action="/main/modificar">
						<button class="buttons edit">
						<span class="material-symbols-outlined actions__edit">edit_note</span>
						<input type="hidden" name="idModificar" value="${evento.id_evento}">
					</button>
					</form>
				<form method="POST" action="/main/events?_method=DELETE">
					<button class="buttons delete">
						<span class="material-symbols-outlined actions__delete">delete</span>
					</button>
					<input type="hidden" name="idEliminar" value="${evento.id_evento}">
	
				</form>
	
				<!--<form method="GET" action="/main/evento/${evento.id_evento}">
					<button class="buttons search">
					-->	
					<a href="/main/evento/${evento.id_evento}">
					<span class="material-symbols-outlined actions__search">search</span></a>
					<!--</button>-->
					<!--<input type="hidden" name="idVer" value="${evento.id_evento}">-->
	
				</form>
	
					<h4 class="nombre">${evento.nombre_evento}</h4>
					<h4 class="fecha">Fecha:     <span>${evento.fecha_evento}</span>
					</h4>
	
					<h4 class="tipo">Tipo de evento: <span>${evento.tipo_evento}</span></h4>
					
					<h4 class="tipo">Cantidad de participantes: <span>${participantesEvento.length}</span></h4>
	
			</div> `
	})






}

