listar();

function inserir() {

    const nome =  document.querySelector('#input-nome').value;
    const email =  document.querySelector('#input-email').value;
    const senha =  document.querySelector('#input-senha').value;

    const novoUsuario = {

        nome: nome,
        email: email,
        senha: senha
    }

    db.collection('usuarios').add(novoUsuario)
        .then((docRef) => {
            console.log(`Adicionado no id: ${docRef.id}`);
            listar();
        })
        .catch((error) => console.log(`Erro: ${error}`));


    
    
}


function listar() {

    const tBody = document.querySelector('#tBody');

    tBody.innerHTML = '';

    db.collection('usuarios').get()
        .then((documentos) => {


            documentos.forEach(documento => {

                const usuario = documento.data();

                console.log(usuario);

                let linha = '<tr><td>'+ documento.id +'</td>';

                linha += '<td>'+ usuario.nome +'</td>';
                linha += '<td>'+ usuario.email +'</td>';
                linha += '<td>'+ usuario.senha +'</td>'

                linha += '<td><button onclick="deletar(\''+documento.id+'\')" class="btn btn-danger">Deletar</button></td></tr>'
                tBody.innerHTML = tBody.innerHTML + linha;
            });

        });
}


function deletar(id) {

    db.collection('usuarios').doc(id).delete()
        .then(() => {
            console.log('Deletado com sucesso!');
            listar();
        })
        .catch((error) => console.log(`Erro: ${error}`));

}