import React, { useState } from 'react';
import { Button, TextField } from 'react95';
import { NetworkSelector } from '../NetworkSelector';

interface PdaField {
  id: string;
  name: string;
  value: string;
}

export const PdaCalculatorWindowContent: React.FC<{ windowId: string }> = () => {
  const [programId, setProgramId] = useState('');
  const [fields, setFields] = useState<PdaField[]>([
    { id: '1', name: 'seed1', value: '' },
  ]);
  const [result, setResult] = useState('');

  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now().toString(), name: `seed${fields.length + 1}`, value: '' },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, key: 'name' | 'value', newValue: string) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, [key]: newValue } : f))
    );
  };

  const calculate = () => {
    console.log('Calculating PDA:', { programId, fields });
    // TODO: Implement actual PDA calculation
    setResult('PDA: ExamplePDA123456789abcdefghijk...');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NetworkSelector />
      
      <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
        <h3 style={{ fontSize: '12px', marginBottom: '12px' }}>PDA Calculator</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '11px',
              marginBottom: '4px',
              fontWeight: 'bold',
            }}
          >
            Program ID:
          </label>
          <TextField
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            placeholder="Enter program ID..."
            fullWidth
            style={{ marginBottom: '12px' }}
          />

          <label
            style={{
              display: 'block',
              fontSize: '11px',
              marginBottom: '8px',
              fontWeight: 'bold',
            }}
          >
            Seeds:
          </label>
          
          {fields.map((field) => (
            <div
              key={field.id}
              style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '8px',
                alignItems: 'center',
              }}
            >
              <TextField
                value={field.name}
                onChange={(e) => updateField(field.id, 'name', e.target.value)}
                placeholder="Field name"
                style={{ width: '120px' }}
              />
              <TextField
                value={field.value}
                onChange={(e) => updateField(field.id, 'value', e.target.value)}
                placeholder="Value"
                style={{ flex: 1 }}
              />
              {fields.length > 1 && (
                <Button onClick={() => removeField(field.id)} size="sm">
                  ✕
                </Button>
              )}
            </div>
          ))}
          
          <Button onClick={addField} size="sm" style={{ marginTop: '4px' }}>
            + Add Field
          </Button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Button onClick={calculate} style={{ marginRight: '8px' }}>
            Calculate PDA
          </Button>
          <Button onClick={() => setResult('')}>Clear</Button>
        </div>

        {result && (
          <div
            style={{
              border: '2px inset',
              padding: '12px',
              background: '#fff',
              fontSize: '11px',
              wordBreak: 'break-all',
            }}
          >
            <strong>Result:</strong>
            <div style={{ marginTop: '4px' }}>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
};
