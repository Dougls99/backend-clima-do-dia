const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).send('Digite o nome de uma cidade.');    
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = response.data;
        res.json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
        });
    } catch (error) {
        res.status(500).send('Erro ao buscar os dados do clima.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});