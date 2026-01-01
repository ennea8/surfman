import React, { useState } from 'react';
import { Button, Tabs, Tab, TabBody } from 'react95';
import { NetworkSelector } from '../NetworkSelector';

export const ApiTesterWindowContent: React.FC<{ windowId: string }> = () => {
  const [activeTab, setActiveTab] = useState(0);

  const apiCategories = [
    {
      name: 'Network',
      apis: ['Get Network Info', 'Get Block Height', 'Get Transaction'],
    },
    {
      name: 'Account',
      apis: ['Get Account', 'Get Balance', 'Get Token Accounts'],
    },
    {
      name: 'Transaction',
      apis: ['Send Transaction', 'Simulate Transaction', 'Get Transaction Status'],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NetworkSelector />
      
      <div style={{ padding: '8px', flex: 1, overflow: 'auto' }}>
        <Tabs value={activeTab} onChange={setActiveTab}>
          {apiCategories.map((category, idx) => (
            <Tab key={idx} value={idx}>
              {category.name}
            </Tab>
          ))}
        </Tabs>

        <TabBody style={{ marginTop: '8px' }}>
          {apiCategories[activeTab] && (
            <div>
              <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>
                {apiCategories[activeTab].name} APIs
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {apiCategories[activeTab].apis.map((api, idx) => (
                  <Button
                    key={idx}
                    style={{ justifyContent: 'flex-start' }}
                    onClick={() => console.log('Testing:', api)}
                  >
                    {api}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </TabBody>
      </div>
    </div>
  );
};
