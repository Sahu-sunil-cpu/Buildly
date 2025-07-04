class FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
  
    constructor(name: string, type: 'file' | 'folder') {
      this.name = name;
      this.type = type;
      if (type === 'folder') {
        this.children = [];
      }
    }
  
    addChild(child: FileNode) {
      if (this.type !== 'folder') {
        throw new Error('Only folders can have children');
      }
      this.children!.push(child);
    }
  }
  
  export function buildFileTree(paths: string[]): FileNode {
    const root = new FileNode('root', 'folder');
    const folderMap = new Map<string, FileNode>(); // Map<path, FolderNode>
    folderMap.set('', root); // root path
  
    for (const fullPath of paths) {
      const parts = fullPath.split('/');
      let currentPath = '';
      let currentNode = root;
  
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        currentPath = currentPath ? `${currentPath}/${part}` : part;
  
        const isFile = i === parts.length - 1 && !fullPath.endsWith('/');
        const nodeType: 'file' | 'folder' = isFile ? 'file' : 'folder';
  
        if (!folderMap.has(currentPath)) {
          const newNode = new FileNode(part, nodeType);
  
          if (currentNode.type === 'folder') {
            currentNode.addChild(newNode);
          }
  
          if (nodeType === 'folder') {
            folderMap.set(currentPath, newNode);
          }
  
          if (!isFile) currentNode = newNode; // step into folder
        } else {
          currentNode = folderMap.get(currentPath)!;
        }
      }
    }
  
    return root;
  }

  
  const paths = [
    'src/index.ts',
    'src/components/Button.tsx',
    'src/components/Card.tsx',
    'public/index.html',
    'README.md',
  ];
  
//   const tree = buildFileTree(paths);


  function printTree(node: FileNode, indent = '') {
    console.log(`${indent}- ${node.name} (${node.type})`);
    if (node.children) {
      node.children.forEach(child => printTree(child, indent + '  '));
    }
  }

//   printTree(tree);
