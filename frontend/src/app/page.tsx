import styles from './style.module.css'

import SidebarLeft from '../components/SidebarLeft'
import SidebarRight from '../components/SidebarRight'
import Input from '../components/Input'
import Dialog from '../components/Dialog'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Home() {
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
