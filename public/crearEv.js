document.querySelector('body').onload = async () => {
    //const urlid = new URLSearchParams(window.location.search);
    //const id = urlid.get('id');
    //console.log("el id es", id);
    const token = localStorage.getItem('jwt-token');

    const res = await fetch(`/main/crearEvento`, {
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

};
