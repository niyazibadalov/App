import { useState } from 'react';

export default function BuggyComponent() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Sınan komponent xətası!');
  }

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '6px', marginTop: '20px' }}>
      <h3>Test Komponenti</h3>
      <p>Aşağıdakı düyməyə basdıqda bu komponentdə render xətası baş verəcək.</p>
      <button 
        onClick={() => setHasError(true)} 
        style={{ padding: '8px 16px', background: '#e67e22', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Xəta yarat (Test et)
      </button>
    </div>
  );
}