import { clsx, type ClassValue } from "clsx"
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge"
import { parseBoltArtifact } from "./message-parser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface BoltArtifactData {
  id: string,
  title: string;
}


export type BoltActionData = BoltAction |   BaseAction;

export type BoltAction = FileAction | ShellAction;

export interface BaseAction {
  content: string;
}

export interface FileAction extends BaseAction {
  type: 'file';
  filePath: string;
}

export interface ShellAction extends BaseAction {
  type: 'shell';
}

export type ActionType = 'file' | 'shell';




export async function StreamReader(response: Response, setLoading: Dispatch<SetStateAction<boolean>>) {

  if (!response.ok || !response.body) {
    throw response.statusText;
  }

  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  let decodedStr = ''

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      setLoading(false);
      break;
    }


// function* generator(chunk: string) {
//   yield chunk
// }
const decodedChunk = decoder.decode(value);
console.log(decodedChunk)
  
decodedStr += decodedChunk;



  

  }
  
  return decodedStr;
  // console.log(decodedStr)

  // for(const file of parseBoltArtifact(decodedStr)) {
  //   console.log(file.FilePath)
  // }    



}


