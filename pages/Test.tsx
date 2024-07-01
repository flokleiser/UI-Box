import React, {useState} from 'react'

export default function Test() {


    const [isActive, setIsActive] = useState([false, false, false])

    const handleActive= (index:number) => {
        const updateActive= isActive.map((state, i) =>
            i === index ? !state : state
          );
          setIsActive(updateActive)
      }

    return (
      <div className="bodyCenter">
        <div>
            <h1>Test</h1>

            {/* <div className="tabs">
                <div className={`${isActive[0] ? 'tab active' : 'tab'}`} onMouseDown={() => handleActive(0)}>
                    <div className="tab-box"></div>
                </div>

                <div className={`${isActive[1] ? 'tab active' : 'tab'}`} onMouseDown={() => handleActive(1)}>
                    <div className="tab-box"></div>
                </div>

                <div className={`${isActive[2] ? 'tab active' : 'tab'}`} onMouseDown={() => handleActive(2)}>
                    <div className="tab-box"></div>
                </div>
            </div> */}

            {/* <div className="content">
             </div> */}

        </div>
        </div>
    );
}




            {/* <div className="surface">
      <div className="mock-browser">
        <div className="chrome-tabs" 
        style={{margin: '9px'}}
        >
          <div className="chrome-tabs-content">
            <div className="chrome-tab">
              <div className="chrome-tab-dividers"></div>
              <div className="chrome-tab-background">
              </div>
              <div className="chrome-tab-content">
                <div className="chrome-tab-favicon" ></div>
                <div className="chrome-tab-title">Google</div>
                <div className="chrome-tab-drag-handle"></div>
                <div className="chrome-tab-close"></div>
              </div>
            </div>
            <div className="chrome-tab" 
            // active
            >
              <div className="chrome-tab-dividers"></div>
              <div className="chrome-tab-background">
              </div>
              <div className="chrome-tab-content">
                <div className="chrome-tab-favicon" ></div>
                <div className="chrome-tab-title">Facebook</div>
                <div className="chrome-tab-drag-handle"></div>
                <div className="chrome-tab-close"></div>
              </div>
            </div>
          </div>
          <div className="chrome-tabs-bottom-bar"></div>

</div>
</div>
</div> */}