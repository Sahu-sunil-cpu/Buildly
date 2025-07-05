
import { Button } from "@/components/ui/button";
import { WebContainer } from "@webcontainer/api";
import { Monitor, Smartphone, Tablet, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PreviewPanelProps {
  files: any;
}

export const PreviewPanel = ({ files }: PreviewPanelProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [url, setUrl] = useState('')
  const checkRef = useRef(false)

  
  async function main() {
    const webcontainerInstance = await WebContainer.boot();
    console.log(files)
    webcontainerInstance?.mount(files);

    const installProcess = await webcontainerInstance.spawn('npm', ['install']);

    installProcess.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));

    await webcontainerInstance.spawn('npm', ['run', 'dev']);

    // Wait for `server-ready` event
    webcontainerInstance.on('server-ready', (port, url) => {
      // ...
      console.log(url)
      console.log(port)
      setUrl(url);
      console.log("yes")
    });
  }

  useEffect(() => {
    if(!checkRef.current) {
      main()
    }
    checkRef.current = true
    
  }, [])



  return (
    <div className="h-full flex items-center justify-center text-gray-400">
    {!url && <div className="text-center">
      <p className="mb-2">Loading...</p>
    </div>}
    {url && <iframe width={"100%"} height={"100%"} src={url} />}
  </div>

   
  );
};
