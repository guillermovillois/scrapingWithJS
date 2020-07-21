
// nombre
Array.from(document.querySelectorAll(".descrip_full")).map((producto) => producto.innerText)
// sku
Array.from(document.querySelectorAll(".descrip_full")).map((producto) => producto.id)
// precio
Array.from(document.querySelectorAll(".info_discount .atg_store_newPrice")).map((imagen) => imagen.innerText.split(' ')[2])
// imagen
Array.from(document.querySelectorAll("div.leftList > div > a > span.atg_store_productImage > img")).map((imagen) => imagen.src)