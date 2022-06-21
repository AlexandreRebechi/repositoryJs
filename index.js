const express = require('express')
const cors = require('cors')
const { pool } = require('./config')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const getCompra = (request, response) => {
    pool.query('select * from compras', (error, results) => {
        if (error) {
            return response.status(400).json({
                status: 'error',
                message: 'Erro ao recuperar os compras: ' + error
            })
        }
        response.status(200).json(results.rows);
    })
}

const addCompra = (request, response) => {
    const { nome, endereco, ceporigem, cepdestino, escolhaservico, valorcompra, valorfrete } = request.body;
    pool.query(`INSERT INTO compras (nome, endereco, ceporigem, cepdestino, escolhaservico, valorcompra, valorfrete) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING codigo, nome, endereco, ceporigem, cepdestino, escolhaservico, valorcompra, valorfrete`,
        [nome, endereco, ceporigem, cepdestino, escolhaservico, valorcompra, valorfrete],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao inserir produto! : ' + error
                })
            }
            response.status(200).json({
                status: 'success', message: 'Produto criado!',
                objeto: results.rows[0]
            });
        })
}

const updateCompra = (request, response) => {
    const { nome, endereco, ceporigem, cepdestino, escolhaservico, valorcompra, valorfrete } = request.body;
    pool.query(`UPDATE compras set  nome = $1, endereco = $2, ceporigem = $2, cepdestino = $3, escolhaservico = $4, valorcompra = $5, valorfrete = $6
                WHERE codigo = $7
                RETURNING codigo, nome, endereco, ceporigem, cepdestino, escolhaservico, valorcompra, valorfrete`,
        [nome, endereco, ceporigem, cepdestino, escolhaservico, valorcompra, valorfrete],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao atualizar produto! : ' + error
                })
            }
            response.status(200).json({
                status: 'success', message: 'Produto atualizado!',
                objeto: results.rows[0]
            });
        })
}

const deleteCompras = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    console.log('codigo: '+ codigo);
    pool.query(`DELETE FROM Compras
                WHERE codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao remover produto! : ' + (error ? error :'')
                })
            }
            response.status(200).json({
                status: 'success', message: 'Produto removido!'
            });
        })
}

const getComprasPorCodigo = (request, response) => {
    const  codigo  = parseInt(request.params.codigo);
    console.log('codigo: '+ codigo);
    pool.query(`SELECT * FROM compras
                WHERE codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao recuperar produto! : ' + (error ? error :'')
                })
            }
            response.status(200).json(results.rows[0]);
        })
}

app.route('/compra')
   .get(getCompra)
   .post(addCompra)
   .put(updateCompra)
app.route('/compra/:codigo')
   .get(getComprasPorCodigo)
   .delete(deleteCompras)

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando....');
})
