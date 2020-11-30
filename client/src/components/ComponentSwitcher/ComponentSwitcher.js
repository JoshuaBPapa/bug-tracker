import React, { useState } from 'react';

const ComponentSwitcher = ({ componentTitles, children }) => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0);

  const switches = componentTitles.map((componentSwitch, i) => {
    const hasForwardSlash = () => {
      return i < componentTitles.length - 1 ? (
        <span className="forward-slash">
          /
        </span>
      ) : null;
    };
    
    if (i === selectedComponentIndex) {
      return (
        <div key={componentSwitch}>
          <span 
            key={componentSwitch}
            className="switch-active">
            {componentSwitch}
          </span>
          {hasForwardSlash()}
        </div>
      );
    } else {
      return (
        <div key={componentSwitch}>
          <button onClick={() => setSelectedComponentIndex(i)}>
            {componentSwitch}
          </button>
          {hasForwardSlash()}
        </div>
      );
    }
  });

  return (
    <div className="Component-Switcher">
      <div className="switches">
        {switches}
      </div>
      <div>
        {children[selectedComponentIndex]}
      </div>
    </div>
  );
};

export default ComponentSwitcher;