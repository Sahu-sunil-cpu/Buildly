import { File, Folder } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";


export function FileExplorer({ nodeRef, setFileName }: { nodeRef: any, setFileName: Dispatch<SetStateAction<string>> }) {
    const fileArr = [];
    let depth = 0;
    

    const renderFileTree = (node: any, depth = 0) => {
    

        try {
           
            fileArr.push({
                name: node.name,
                type: node.type
            })

            if (node.children) {
                node.children.forEach(child => { renderFileTree(child, depth + 1) })
            }

            return fileArr;
        } catch (error) {
            // console.error(error);
            return;
        
       

    }
    }

    const renderFileRef = useRef( renderFileTree(nodeRef))



    return <div>

        <div className="p-2">
            {
               renderFileRef.current? renderFileRef.current.map((node) => <div key={depth++} className="text-sm">
                    <div>
                        <div
                            className={`flex items-center space-x-2 py-1 px-2 hover:bg-slate-700 rounded cursor-pointer`}
                        //style={{ paddingLeft: `${node.type=='folder'? depth++ * 16 + 8: 16+8}px` }}
                        >
                            {node.type === "folder" ? (
                                <Folder className="w-4 h-4 text-blue-400" />
                            ) : (
                                <File className="w-4 h-4 text-gray-400 ml-3" />
                            )}
                            <span className="text-gray-300" onClick={(e) => {
                                node.type == 'file' ? setFileName(e.currentTarget.innerText) : console.log("not a file")
                            }}>{node.name}</span>
                        </div>

                    </div>

                </div>)
                    :
                    <div>
                       
                    </div>
            }
        </div>
    </div>
}