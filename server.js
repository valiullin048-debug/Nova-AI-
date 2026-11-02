const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://nova-ai.app',
                'X-Title': 'Nova AI'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера-моста' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Мост запущен на порту ${PORT}`));
