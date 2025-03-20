import React from 'react';

export interface BlockProps {
  /** @description id: gs1rn5jmxfvpxptx | type: string | visible: true */
  title?: string;
  /** @description id: 9ajrz12ik7esfk1z | type: string | visible: true */
  description?: string;
  /** @description id: 3ckcfvf6b7zyskk8 | type: url | visible: true */
  logo?: {
    url: string;
    mediaKitUrl?: string;
    width?: number;
    height?: number;
  };
  /** @description id: x3lqht8ikble1itx | type: string | visible: false */
  copyright?: string;
}

// default export
export default function HelloWorld({ title = 'Hello World', logo, description, copyright }: BlockProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
      }}>
      {title && <h1>{title}</h1>}
      {logo && (
        <img
          src={typeof logo === 'object' ? logo.url : logo}
          alt="logo"
          style={{
            margin: '16px 0',
            maxWidth: '200px',
          }}
        />
      )}
      {description && (
        <div
          style={{
            color: '#666',
            marginTop: '8px',
          }}>
          {description}
        </div>
      )}
      {copyright && (
        <div
          style={{
            color: '#999',
            fontSize: '12px',
            marginTop: '16px',
          }}>
          {copyright}
        </div>
      )}
    </div>
  );
}

// export edit component
export const EditComponent: React.FC<BlockProps & { onChange?: (value: BlockProps) => void }> = ({
  onChange,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#333',
          padding: '8px 0',
          borderBottom: '1px solid #eee',
        }}>
        Footer Parameters
      </div>
      <input
        id="copyright-input"
        type="text"
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          transition: 'border-color 0.3s',
          outline: 'none',
        }}
        value={props.copyright || ''}
        onChange={(e) => onChange?.({ copyright: e.target.value })}
        placeholder="Please Input Copyright"
      />
    </div>
  );
};
