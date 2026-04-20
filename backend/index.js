const express = require('express');
const cors = require('cors');
const generateSalesTarget = require('./utils/target');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Sales Target Backend is running'));

app.post('/api/generate-target', (req, res) => {
  const { sale_max, sale_min, sale_cur, sale_his, employeeId, employeeName } = req.body;

  if ([sale_max, sale_min, sale_cur, sale_his].some(v => typeof v !== 'number' || Number.isNaN(v))) {
    return res.status(400).json({ error: 'All sales inputs must be numbers.' });
  }

  // Require employee metadata
  if (typeof employeeId === 'undefined' || employeeId === null || String(employeeId).toString().trim() === '' || typeof employeeName === 'undefined' || employeeName === null || String(employeeName).toString().trim() === '') {
    return res.status(400).json({ error: 'employeeId and employeeName are required and cannot be empty.' });
  }

  const result = generateSalesTarget(sale_max, sale_min, sale_cur, sale_his);

  // Attach employee metadata (guaranteed present by validation)
  result.employeeId = String(employeeId);
  result.employeeName = String(employeeName);

  res.json(result);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Sales target API listening on port ${PORT}`));
