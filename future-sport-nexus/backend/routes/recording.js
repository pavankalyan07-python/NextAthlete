import express from 'express';
import { spawn } from 'child_process';

const router = express.Router();

router.post('/start-recording', (req, res) => {
  const pythonScriptPath = '../vertical_jump.py'; // adjust if needed
  const pyProcess = spawn('python3', [pythonScriptPath]);
  let output = '';

  pyProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pyProcess.on('close', () => {
    const repCount = parseInt(output.trim(), 10);
    res.json({ repCount });
  });

  pyProcess.on('error', (err) => {
    res.status(500).json({ error: 'Failed to run Python script' });
  });
});

export default router; // <-- THIS LINE IS CRITICAL
