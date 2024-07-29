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
import HotkeyProvider from "@/components/common/HotkeyProvider";

import React, { useEffect } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import JSScript from '../../scripts/testScript1'
import TSScript from '../../scripts/testScript2'
import PopupProvider, { handleKeyPress } from '@/components/common/PopupProvider'
// import { PopupTest } from '@/components/common/Popup'

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

  // should be disabled when user inputs not moves
  const movePlayerCharacter = (e: KeyboardEvent) => {
    if (client.game.playerCharacter) {
      client.game.movement.handleKeyPress(e, client.game.playerCharacter)
    };
  }
  const triggerPopup = (e: KeyboardEvent) => {
    handleKeyPress(e.key, client)
  }

  useEffect(() => {
    client.runScript(TSScript)
  }, [client]);

  return (
    <HotkeyProvider keydownHandlers={[movePlayerCharacter, triggerPopup]}>
      <PopupProvider>
        {/* <PopupTest /> */}
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
      </PopupProvider>
    </HotkeyProvider>
  );
}
