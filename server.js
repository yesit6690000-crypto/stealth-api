const express = require('express');
const camoufox = require('@camoufox/playwright');
const { exec } = require('child_process');
const app = express();
app.use(express.json());

app.post('/api/snapshot', async (req, res) => {
    const browser = await camoufox.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    try {
        await page.goto(req.body.url, { waitUntil: 'domcontentloaded' });
        const snapshot = await page.accessibility.snapshot();
        await browser.close();
        res.json({ success: true, snapshot });
    } catch (e) {
        await browser.close(); res.status(500).json({ error: e.message });
    }
});

app.listen(process.env.PORT || 3000);
