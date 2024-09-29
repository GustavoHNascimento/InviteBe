const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'DESKTOP-D48VLVL\User',
    password: '',
    database: 'DateBe'
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Endpoint para salvar a data
app.post('/salvar-data', (req, res) => {
    const { local, data } = req.body;
    const query = 'INSERT INTO convites (local, data) VALUES (?, ?)';
    db.query(query, [local, data], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Data salva com sucesso!', id: result.insertId });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
