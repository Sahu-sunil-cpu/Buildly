
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, FileCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FileSystemTree, WebContainer } from "@webcontainer/api";
import files from "@/lib/FileStructure";
import Editor from "@monaco-editor/react";
import { StructuredfileSchema } from "@/lib/message-parser";




interface File {
  contents: string;
}

interface FileExplorer {
  [F: string]: File
}

export const CodeEditor = ({ StructuredFileContent, filename }: { StructuredFileContent: StructuredfileSchema[], filename: string }) => {
  const [copied, setCopied] = useState(false);
  const [fileExp, setFileExp] = useState<FileSystemTree>();
  const [webcontainer, setWebContainer] = useState<WebContainer | null>(null)
  const textArearef = useRef<HTMLTextAreaElement>(null)
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(code);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("script.js");

  const file = StructuredFileContent.find((f) => f.name == filename);

  if(!file) {
    return <div>
      no content available!
    </div>
  }
  //const file = getFile[filename]
  console.log(filename)
    console.log(file)
  

  useEffect(() => {
    editorRef.current?.focus();
  }, [filename]);


  // useEffect(() => {
  //   ///** @type {import('@webcontainer/api').WebContainer}  */

  //   setFileExp(filesMonaco)



  //   const webcontainerInstance = WebContainer.boot()
  //     .then((instance) => {

  //       textArearef.current.value = filesMonaco["index.js"].file.contents;

  //       setWebContainer(instance)
  //       instance.mount(filesMonaco[0])

  //       const packageJSON = instance.fs.readFile(
  //         "package.json",
  //         "utf-8",
  //       ).then((e) => {
  //         console.log(e);

  //       })

     
  //     })


  //   return () => {
  //     webcontainer?.teardown();
  //   }

  // }, [webcontainer])


  return (
    <div>
      <Editor
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
        }}
        height="80vh"
        theme="vs-dark"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        onMount={(editor, monaco) => {
          editorRef.current = editor
          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
          })
        }}
        
      />
    </div>
  )
};
