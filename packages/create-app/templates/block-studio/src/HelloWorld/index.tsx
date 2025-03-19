import React from 'react';







export interface BlockProps {
    /** @description id: atgdfn24wotfn2w4 | type: json | visible: true */
    contentSummarize?: {
        /** @description id: oqkp1f9f21hj2scw | type: json | visible: true */
        summarizeData?: {
            /** @description id: 4jhar1u3dol4aepx | type: string | visible: true */
            summarizeCOntent?: string;
            /** @description id: 16qiu1c3h1utas08 | type: string | visible: true */
            summarizeImage?: string;
        };
        /** @description id: g9ptbmadvloyldyh | type: array | visible: true */
        array?: {
            /** @description id: mwukv6j7vzhxp6b0 | type: string | visible: true */
            name?: string;
            /** @description id: vv1rdmmy0rxsi9le | type: json | visible: true */
            arrayJSON?: {
                /** @description id: eu5cz9akdiu6tcyd | type: string | visible: true */
                key?: string;
                /** @description id: 8bvy5jbxi75ehnge | type: string | visible: true */
                value?: string;
            };
        }[];
    };
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
