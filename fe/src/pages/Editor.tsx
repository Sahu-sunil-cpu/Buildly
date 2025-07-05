// need to structure this component 

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Send, Link, Code, MessageSquare, ChevronDown, Download, Zap, Folder, File, Play, Indent } from "lucide-react";
import { AIResponsePanel } from "@/components/AIResponsePanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "@/config";
import { parseBoltArtifact, StructuredfileSchema } from "@/lib/message-parser";
import { randomUUID } from "crypto";
import { v4 } from "uuid";
import { StreamReader } from "@/lib/utils";
import { CodeEditor } from "@/components/CodeEditor";
import { buildFileTree } from "@/lib/fileStructureTree";
import LoadingPage from "@/components/Loading";
import { FileExplorer } from "@/components/FileExplorer";
import { useWebContainer } from "@/hooks/useWebContainer";
import { WebContainer } from "@webcontainer/api";



export interface Step {
  id: number;
  step: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
}




const Editor = () => {
  const [prompt, setPrompt] = useState("");
  const [activeRightTab, setActiveRightTab] = useState<'preview' | 'code'>('preview');
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [steps, setSteps] = useState<Step[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<string[]>([])
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [EditorFiles, setEditorFiles] = useState<StructuredfileSchema[]>([])
  const [filename, setFileName] = useState<string>('App.tsx');
  const nodeRef = useRef(null)
  const hasPost = useRef<boolean>(false);
  const location = useLocation();
  const { state } = location;
//  const webcontainer = useWebContainer()
const [containerFiles, setContainerFiles] = useState<any>(null);

  let count = 0;
 

  const getCode = async () => {
    if (state && loading) {

      const data = state.data;
      console.log(data)

      try {
        const response = await fetch(`${BACKEND_URL}/chat`, {
          method: 'POST', headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        const decodedStr = await StreamReader(response, setLoading);
        const filesParsed = parseBoltArtifact(decodedStr)

        for (const file of filesParsed) {
          file.FilePath.map((step) => {
            setSteps((prev) => [...prev, { id: count++, step: step, status: 'pending' }]);
            files.push(step)
          })
          //console.log(files)
         // console.log(file.Structuredfile)
          setEditorFiles(file.Structuredfile);
        }

        nodeRef.current = buildFileTree(files);
      } catch (error: any) {
        console.log(error)
        //  setHasError(true);
        setLoading(false)

      } finally {
        setLoading(false)
      }
    }
  }




  useEffect(() => {
    if (!hasPost.current) {
      hasPost.current = true;
      getCode();

    }
  }, [])



  useEffect(() => {
    function convertTreeToStructure(node: any): any {
      if (node.type === 'file') {
        return {
          [node.name]: {
            file: {
              contents: EditorFiles.find((file) => file.name == node.name).value || '',
            },
          },
        };
      }
    
      // Folder
      const childrenObj = {};
    
      for (const child of node.children || []) {
        const childStructure = convertTreeToStructure(child);
        Object.assign(childrenObj, childStructure);
      }
    
      return {
        [node.name]: {
          directory: childrenObj,
        },
      };
    }
    ;


    function convertFromRoot(root: any){
      const result = {};
    
      for (const child of root.children || []) {
        const childStructure = convertTreeToStructure(child);
        Object.assign(result, childStructure);
      }
    
      return result;
    }


    
    if(nodeRef.current) {
      const structured = convertFromRoot(nodeRef.current);
      console.dir(structured, { depth: null });

    
      // Mount the structure if WebContainer is available
      console.log(structured);
  
      setContainerFiles(structured);

      
    }


    
  }, [nodeRef.current]);



  if (loading) {
    return <div>
      <LoadingPage />
    </div>
  }

  
  const handleSend = () => {
    console.log("Sending message:", prompt);
    setPrompt("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav className="border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">buildly</div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800">
              <ChevronDown className="w-4 h-4 mr-2" />
              Integrations
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Zap className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Chat Interface */}
          <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
            <div className="h-full flex flex-col bg-gray-950 border-r border-gray-800">
              {/* Progress Bar */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300">Building Progress</span>
                  <span className="text-sm text-slate-400">2/5 completed</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
                </div>
              </div>

              {/* AI Response Panel */}
              <div className="flex-1 overflow-hidden">
                <AIResponsePanel
                  steps={steps}
                  project={projectName}
                  onCopy={handleCopy}
                />
              </div>

              {/* Enhanced Chat Input */}
              <div className="p-1 border-t border-gray-800">
                <div className="relative">
                  <div className="bg-gray-900 rounded-2xl border border-gray-700 p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="How can buildly help you today?"
                      className="w-full bg-transparent text-white placeholder:text-gray-500 resize-none focus:outline-none min-h-[60px] max-h-[120px]"
                      rows={2}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />

                    {/* Input Actions */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                          <Link className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                          <Code className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        onClick={handleSend}
                        disabled={!prompt.trim()}
                        className="h-9 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Code/Preview */}
          <ResizablePanel defaultSize={65}>
            <div className="h-full flex flex-col bg-gray-950">
              {/* Tab Controls */}
              <div className="border-b border-gray-800 px-6 py-3">
                <div className="flex space-x-1">
                  <Button
                    variant={activeRightTab === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveRightTab('preview')}
                    className={`rounded-lg ${activeRightTab === 'preview'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant={activeRightTab === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveRightTab('code')}
                    className={`rounded-lg ${activeRightTab === 'code'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-hidden">
                {activeRightTab === 'preview' ? (<div>
                  { containerFiles && <PreviewPanel files={containerFiles}/>}
                </div>
                ) : (
                  <div className="h-full flex">
                    {/* File Explorer */}
                    <div className="w-64 bg-slate-900 border-r border-slate-700 overflow-y-auto">
                      <div className="p-4 border-b border-slate-700">
                        <h3 className="text-sm font-semibold text-slate-300">Explorer</h3>
                      </div>
                          <FileExplorer nodeRef={nodeRef.current} setFileName={setFileName}/>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 flex flex-col">
                      <div className="border-b border-slate-700 px-4 py-2 bg-slate-800">
                        <div className="flex items-center space-x-2">
                          <File className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-slate-300">{filename}</span>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <CodeEditor StructuredFileContent={EditorFiles} filename={filename}/>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Editor;






