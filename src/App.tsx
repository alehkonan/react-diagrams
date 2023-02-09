import { useState } from 'react';
import { ProjectStormTab } from './components/ProjectStormTab';
import { ReactFlowTab } from './components/ReactFlowTab';

enum Tab {
  ProjectStorm = 'ProjectStorm',
  ReactFlow = 'ReactFlow',
}

export const App = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.ReactFlow);

  return (
    <>
      <header>
        <nav>
          <ul style={{ display: 'flex', gap: '20px', listStyleType: 'none' }}>
            <li>
              <button onClick={() => setCurrentTab(Tab.ProjectStorm)}>
                Project Storm
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab(Tab.ReactFlow)}>
                React Flow
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
      <main>
        {currentTab === Tab.ProjectStorm && <ProjectStormTab />}
        {currentTab === Tab.ReactFlow && <ReactFlowTab />}
      </main>
    </>
  );
};
