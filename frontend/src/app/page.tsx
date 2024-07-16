'use client'
import styles from './style.module.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import SidebarLeft from '../components/SidebarLeft'
import SidebarRight from '../components/SidebarRight'
import Input from '../components/Input'
import Dialog from '../components/Dialog'
import Client from '../client'
import { enableMapSet } from 'immer';

import { useEffect } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import JSScript from '../../scripts/testScript1'
import TSScript from '../../scripts/testScript2'

export default function Home() {
  return (
    <Provider store={store}>
      <HomeContent />
    </Provider>
  );
}

function HomeContent() {
  enableMapSet()
  const client = Client.getInstance()
  
  useEffect(() => {
    client.runScript(TSScript)
    
    const handleKeyPress = (event: KeyboardEvent) => {
      const pc = client.game.playerCharacter
      if (pc) {
        client.game.movement.handleKeyPress(event, pc)};
    }
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [client]);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SidebarLeft />
      </aside>

      <main className={styles.main}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}>
            <section className='h-full'>
              <Dialog />
            </section>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25}>
            <section className='h-full'>
              <Input />
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      <aside className={styles.sidebar}>
        <SidebarRight />
      </aside>
    </div>
  );
}
