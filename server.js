const express = require('express');
const app = express();
const data = require("./data.json");
app.use(express.json());


//VERBOS HTTP  / boas praticas
//GET: RECEBER DADOS DE UM RESOURCE.
//POST:ENVIAR DADOS OU INFORMAÇÕS PARA SEREM PROCESSADOS POR UM RESOURCE.
//PUT: ATUALIZAR DADOS DE UM RESOURCE.
//DELETE:DELETER UM RESOURCE

app.get("/clients", function(req,res){
    res.json(data);
});

//METODO GET
app.get("/clients/:id", function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id); // LOGICA PRA ENCONTRAR O ID DIGITADO
      if (!client) return res.status(204).json();  //NÃO ACHEI O CLIENTE VOLTA ERROR 204
      res.json(client);
  });


//METODO POST = MANDAR INFORMAÇÕES
app.post("/clients", function(req,res){
    const { name , email } = req.body;
    //salvar
    res.json({ name , email });
});


//PUT = ATUALIZAR MEU CLIENTE
app.put("/clients/:id", function(req,res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);
    if (!client) return res.status(204).json();
    const { name } = req.body;
    client.name = name;
    res.json(client);
});



//DELETE = deletar um client
app.delete("/clients/:id", function(req,res){
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id)
    res.json(clientsFiltered);

});



//Iniciar o servidor no local host 8081
app.listen(8081, function(){
    console.log('Server funcionando!')
})