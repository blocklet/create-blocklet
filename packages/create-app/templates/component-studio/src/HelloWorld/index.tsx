import React, { useEffect, useState } from 'react';

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
  /** @description id: q0ezdj81v0m14y5m | type: number | visible: true */
  number?: number;
  /** @description id: bl0rimfebwbencoj | type: decimal | visible: true */
  decimal?: number;
  /** @description id: gioetxz8d13jabz6 | type: boolean | visible: true */
  showCopyright?: boolean;
  /** @description id: yi1oj4rq1eziup1d | type: color | visible: true */
  titleColor?: string;
  /** @description id: 4f49q5uidkcp5ak4 | type: json | visible: true */
  json?: {
    /** @description id: gpy89bsxc6ovvlsp | type: string | visible: true */
    foo?: string;
    /** @description id: 1j34jdhdptp2xm5e | type: string | visible: true */
    bar?: string;
  };
  /** @description id: lbclpm6mxrp10w2k | type: array | visible: true */
  array?: {
    /** @description id: 1c5vl2p9cn9ryvgh | type: string | visible: true */
    name?: string;
    /** @description id: c5whnccwzqqzaa0w | type: multiline | visible: true */
    bio?: string;
  }[];
  /** @description id: s0tund4p07bzizgv | type: yaml | visible: true */
  yaml?: {
    /** @description id: 1q8tsreh4k2mhbgs | type: string | visible: true */
    ya?: string;
    /** @description id: 09w8sncxwrj6tldi | type: string | visible: true */
    ml?: string;
  };
  /** @description id: 8e7g6c61pxcy0q4w | type: component | visible: true */
  children?: any;
}

// default export
export default function BlockComponent({
  title = 'Hello World',
  logo,
  description,
  copyright = 'Powered by Component Studio',
  number,
  decimal,
  showCopyright = true,
  titleColor = '#6366F1',
  json,
  array,
  yaml,
  children,
}: BlockProps) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    setAnimateIn(true);

    // Add animation keyframes to the document
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fadeSlideDown {
        from { 
          opacity: 0;
          transform: translateY(-20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeSlideUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styleEl);

    // Cleanup
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Modern card style for data blocks
  const cardStyle = {
    padding: '1.5rem',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(99, 102, 241, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    margin: '1rem',
    flex: '1 1 300px',
    minWidth: '250px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
    opacity: animateIn ? 1 : 0,
  };

  // Hover effect for cards
  const cardHoverEffect = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'translateY(-5px)';
    target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1), 0 8px 15px rgba(99, 102, 241, 0.2)';
  };

  const cardLeaveEffect = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'translateY(0)';
    target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(99, 102, 241, 0.1)';
  };

  return (
    <div
      className="hello-world-component"
      style={{
        fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '2.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}>
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 70%)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(249, 115, 22, 0) 70%)',
          zIndex: 0,
        }}
      />

      {/* Logo区域 */}
      {logo && (
        <div
          style={{
            textAlign: 'center',
            margin: '1rem 0',
            animation: animateIn ? 'fadeIn 0.9s ease forwards' : 'none',
            opacity: animateIn ? 1 : 0,
          }}>
          <img
            src={typeof logo === 'object' ? logo.url : logo}
            alt="logo"
            style={{
              borderRadius: '4px',
              maxWidth: '240px',
              maxHeight: '120px',
              filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))',
              width: typeof logo === 'object' && logo.width ? `${logo.width}px` : 'auto',
              height: typeof logo === 'object' && logo.height ? `${logo.height}px` : 'auto',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>
      )}

      {/* Content wrapper with relative position to show above background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* 标题区域 */}
        {title && (
          <h1
            key={title}
            style={{
              borderRadius: '12px',
              textAlign: 'center',
              fontSize: '3.5rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem',
              background: `linear-gradient(135deg, ${titleColor} 0%, #3773F2 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              // @ts-ignore
              textFillColor: 'transparent',
              animation: animateIn ? 'fadeSlideDown 0.7s ease forwards' : 'none',
            }}>
            {title}
          </h1>
        )}

        {/* 描述区域 */}
        {description && (
          <div
            style={{
              color: '#4B5563',
              padding: '1.5rem 2rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              marginTop: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.7,
              fontSize: '1.1rem',
              animation: animateIn ? 'fadeSlideUp 0.8s ease forwards' : 'none',
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
            }}>
            {description}
          </div>
        )}

        {/* 数字展示区域 和 JSON数据展示 */}
        <div
          className="data-section"
          style={{
            display: 'flex',
            gap: '1.5rem',
            margin: '2rem 0',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {(number !== undefined || decimal !== undefined) && (
            <div
              style={{
                ...cardStyle,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.9) 100%)',
                transitionDelay: '0.1s',
              }}
              onMouseOver={cardHoverEffect}
              onMouseOut={cardLeaveEffect}>
              <h3
                style={{
                  margin: '0 0 1rem 0',
                  color: '#4F46E5',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                }}>
                Number Values
              </h3>
              {number !== undefined && (
                <div style={{ margin: '0.8rem 0', fontSize: '1.1rem', color: '#1F2937' }}>
                  <span style={{ fontWeight: 500, marginRight: '0.5rem', color: '#6366F1' }}>Integer:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{number}</span>
                </div>
              )}
              {decimal !== undefined && (
                <div style={{ margin: '0.8rem 0', fontSize: '1.1rem', color: '#1F2937' }}>
                  <span style={{ fontWeight: 500, marginRight: '0.5rem', color: '#6366F1' }}>Decimal:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{decimal.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {/* JSON数据展示 */}
          {json && (
            <div
              style={{
                ...cardStyle,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 248, 240, 0.9) 100%)',
                transitionDelay: '0.2s',
              }}
              onMouseOver={cardHoverEffect}
              onMouseOut={cardLeaveEffect}>
              <h3
                style={{
                  margin: '0 0 1rem 0',
                  color: '#F59E0B',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                }}>
                JSON Data
              </h3>
              {Object.entries(json).map(([key, value]) => (
                <div style={{ margin: '0.8rem 0', fontSize: '1.1rem', color: '#1F2937' }}>
                  <span style={{ fontWeight: 500, marginRight: '0.5rem', color: '#F59E0B' }}>{key}:</span>
                  <span style={{ fontSize: '1.15rem' }}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 数组数据表格 */}
        {array && array.length > 0 && (
          <div
            style={{
              margin: '2.5rem 0',
              animation: animateIn ? 'fadeSlideUp 0.9s ease forwards' : 'none',
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.4s ease, opacity 0.4s ease',
              transitionDelay: '0.3s',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
            }}>
            <h3
              style={{
                textAlign: 'center',
                margin: '0 0 1.5rem 0',
                color: '#4F46E5',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}>
              Array Data
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'left',
                        borderBottom: '2px solid rgba(99, 102, 241, 0.2)',
                        color: '#4F46E5',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                      }}>
                      Name
                    </th>
                    <th
                      style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'left',
                        borderBottom: '2px solid rgba(99, 102, 241, 0.2)',
                        color: '#4F46E5',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                      }}>
                      Bio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(249, 250, 251, 0.5)',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(238, 242, 255, 0.7)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(249, 250, 251, 0.5)';
                      }}>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          borderBottom: '1px solid rgba(229, 231, 235, 0.7)',
                          fontSize: '1.05rem',
                        }}>
                        {item.name || '-'}
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          borderBottom: '1px solid rgba(229, 231, 235, 0.7)',
                          fontSize: '1.05rem',
                        }}>
                        {item.bio || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* YAML显示区域 */}
        {yaml && (
          <div
            style={{
              margin: '2.5rem 0',
              animation: animateIn ? 'fadeSlideUp 1s ease forwards' : 'none',
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.4s ease, opacity 0.4s ease',
              transitionDelay: '0.4s',
            }}>
            <h3
              style={{
                textAlign: 'center',
                margin: '0 0 1.5rem 0',
                color: '#4F46E5',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}>
              YAML to JSON Data
            </h3>
            <pre
              style={{
                background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                overflow: 'auto',
                fontSize: '0.95rem',
                color: '#E5E7EB',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.05)',
                fontFamily: '"Fira Code", "Menlo", monospace',
                lineHeight: 1.6,
                border: '1px solid rgba(55, 65, 81, 0.5)',
              }}>
              {JSON.stringify(yaml, null, 2)}
            </pre>
          </div>
        )}

        {/* 子组件 */}
        {children && (
          <div
            style={{
              margin: '2.5rem 0',
              padding: '2rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
              animation: animateIn ? 'fadeSlideUp 1.1s ease forwards' : 'none',
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.4s ease, opacity 0.4s ease',
              transitionDelay: '0.5s',
            }}>
            <h3
              style={{
                textAlign: 'center',
                marginTop: '0',
                marginBottom: '1.5rem',
                color: '#4F46E5',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}>
              Children Components
            </h3>
            {children}
          </div>
        )}

        {/* 版权信息 */}
        {showCopyright && copyright && (
          <div
            style={{
              textAlign: 'center',
              color: '#6B7280',
              fontSize: '0.9rem',
              marginTop: '3rem',
              padding: '1rem 0',
              borderTop: '1px solid rgba(229, 231, 235, 0.7)',
              animation: animateIn ? 'fadeIn 1.2s ease forwards' : 'none',
              opacity: animateIn ? 0.8 : 0,
              marginBottom: '-2.5rem',
            }}>
            {copyright}
          </div>
        )}
      </div>
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
        Extra Edit Component
      </div>

      {/* 版权信息输入 */}
      <div>
        <label htmlFor="copyright-input" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          Copyright Text
        </label>
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
          onChange={(e) => onChange?.({ ...props, copyright: e.target.value })}
          placeholder="Please Input Copyright"
        />
      </div>
    </div>
  );
};
