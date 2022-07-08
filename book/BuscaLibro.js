getBooks();
function getBooks(){
    try {
        $.ajax({
            headers:{"Access-Control-Allow-Headers": "X-Requested-With"},
            dataType: "JSON",
            type: "GET",
            crossDomain: true,
            url: "http://localhost:9000/libros",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                table = $('#dgvLibros').DataTable({
                    "aaData": data,
                    "aoColumns": [
                      { "data": "NombreProveedor" }, 
                      { "data": "Autor" }, 
                      { "data": "TituloLibro" }, 
                      { "data": "Anio" }, 
                      { "data": "Editorial" }
                    ]
                });
            },
            error: function (err) {
                alert(err);
            }  
        })
    } catch (error) {
        
    }
}