const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1F0-U9VAAgz2t1e1yDyW7bEUL0OVa_-RbvdeGFQPiLqM1VrwK-jxTsd6UllP9ByAsUW1WzfmkJ3RF/pub?output=csv";

Papa.parse(sheetUrl, {
  download: true,
  header: true,
  complete: function(results) {
    const productos = results.data.filter(p => p.Estado?.toLowerCase() === "activo");
    const container = document.getElementById("productos-container");

    productos.forEach(p => {
      const slug = p.Nombre.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
      const card = document.createElement("div");
      card.className = "col-md-3";

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${p.Imagen}" class="card-img-top" alt="${p.Nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.Nombre}</h5>
            <p class="card-text text-muted">${p.Marca || ""} ${p.Modelo || ""}</p>
            <p class="fw-bold text-success">$${p.Precio}</p>
            <a href="producto.html?id=${slug}" class="btn btn-primary mt-auto">Ver más</a>
          </div>
        </div>`;
      container.appendChild(card);
    });
  }
});
