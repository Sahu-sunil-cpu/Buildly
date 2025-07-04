import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, AlertCircle, ChevronDown, ChevronRight, Sparkles, Code, List, Copy } from "lucide-react";
import { Step } from "@/pages/Editor";



interface AIResponsePanelProps {
  steps: Step[];
  project: string;
  onCopy: () => void;
}

const getStatusIcon = (status: Step['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'in-progress':
      return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <div className="w-4 h-4 rounded-full border-2 border-slate-600" />;
  }
};

export const AIResponsePanel = ({ steps, project, onCopy }: AIResponsePanelProps) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("steps");
  
  // const [steps] = useState<Step[]>([
  //   {
  //     id: 1,
  //     title: "Analyzing Requirements",
  //     status: 'completed',
  //     description: "Understanding your website requirements and design preferences",
  //     details: "Parsed input for modern landing page with hero section and features"
  //   },
  //   {
  //     id: 2,
  //     title: "Generating HTML Structure",
  //     status: 'completed',
  //     description: "Creating semantic HTML markup",
  //     details: "Built responsive HTML structure with header, hero, features, and footer sections"
  //   },
  //   {
  //     id: 3,
  //     title: "Styling with CSS",
  //     status: 'in-progress',
  //     description: "Applying modern styles and responsive design",
  //     details: "Implementing gradient backgrounds, typography, and responsive grid layout"
  //   },
  //   {
  //     id: 4,
  //     title: "Adding Interactivity",
  //     status: 'pending',
  //     description: "Implementing JavaScript functionality",
  //   },
  //   {
  //     id: 5,
  //     title: "Final Optimization",
  //     status: 'pending',
  //     description: "Optimizing performance and accessibility",
  //   }
  // ]);



  const getStatusColor = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-blue-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const toggleExpanded = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
       
        <TabsContent value="steps" className="flex-1 p-4 space-y-2 overflow-y-auto m-0">
          {steps.map((step, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
              <div 
                className="p-3 cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium ${getStatusColor(step.status)}`}>
                        {step.step}
                      </h3>
                      {step.step && (
                        expandedStep === step.id ? 
                          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" /> : 
                          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                    {/* <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {step.description}
                    </p> */}
                    
                    {/* {expandedStep === step.id && step.step && (
                      <div className="mt-3 p-3 bg-slate-700 rounded-md">
                        <p className="text-xs text-slate-300">{step.details}</p>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
        
        </TabsContent>

        <TabsContent value="code" className="flex-1 flex flex-col m-0">
          {/* Code Editor Header
          <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-300">Generated Code</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={onCopy}
              className="text-slate-400 hover:text-white h-8 px-2"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div> */}
          
          {/* Code Editor */}
          {/* <div className="flex-1 p-4">
            <textarea
              value={generatedCode}
              onChange={(e) => onCodeChange(e.target.value)}
              className="w-full h-full bg-slate-800 text-slate-100 font-mono text-sm p-4 rounded-lg border border-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Generated code will appear here..."
            />
          </div> */}
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="bg-slate-800 border-t border-slate-700 p-4 space-y-2">
        <Button 
          size="sm" 
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          Stop Generation
        </Button>
      </div>
    </div>
  );
};
