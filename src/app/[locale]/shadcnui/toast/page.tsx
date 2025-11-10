'use client';

import { useState } from 'react';
import { useToast } from '~/components/uiplus/toast-context';
import { ToastType, ToastPosition } from '~/components/types/toast';

export default function ToastExamplePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(3000);
  const [type, setType] = useState<ToastType>('default');
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [isClosable, setIsClosable] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [showAction, setShowAction] = useState(false);
  
  const { show, success, error, info, warning, dismissAll } = useToast();
  
  const showCustomToast = () => {
    show({
      type,
      title: title || undefined,
      description: description || undefined,
      duration,
      position,
      isClosable,
      showProgress,
      action: showAction ? {
        label: 'Undo',
        onClick: () => {
          success({
            title: 'Action clicked',
            description: 'You clicked the undo button',
          });
        },
      } : undefined,
    });
  };
  
  const showPredefinedToasts = () => {
    success({
      title: 'Success',
      description: 'This is a success toast',
      position,
    });
    
    setTimeout(() => {
      error({
        title: 'Error',
        description: 'This is an error toast',
        position,
      });
    }, 500);
    
    setTimeout(() => {
      warning({
        title: 'Warning',
        description: 'This is a warning toast',
        position,
      });
    }, 1000);
    
    setTimeout(() => {
      info({
        title: 'Info',
        description: 'This is an info toast',
        position,
      });
    }, 1500);
    
    setTimeout(() => {
      show({
        title: 'Default',
        description: 'This is a default toast',
        position,
      });
    }, 2000);
  };
  
  const showToastWithCustomDuration = () => {
    show({
      type,
      title: 'Custom Duration',
      description: `This toast will disappear after ${duration / 1000} seconds`,
      duration,
      position,
      isClosable,
      showProgress,
    });
  };
  
  const showToastWithAction = () => {
    show({
      type,
      title: 'Toast with Action',
      description: 'This toast has an action button',
      duration: 5000,
      position,
      isClosable,
      showProgress,
      action: {
        label: 'Click Me',
        onClick: () => {
          success({
            title: 'Action Performed',
            description: 'You clicked the action button',
          });
        },
      },
    });
  };
  
  const showToastWithoutTitle = () => {
    show({
      type,
      description: 'This toast has no title, only a description',
      duration,
      position,
      isClosable,
      showProgress,
    });
  };
  
  const showToastWithoutProgress = () => {
    show({
      type,
      title: 'Toast without Progress',
      description: 'This toast does not show progress bar',
      duration,
      position,
      isClosable,
      showProgress: false,
    });
  };
  
  const showToastNotClosable = () => {
    show({
      type,
      title: 'Not Closable',
      description: 'This toast cannot be closed manually',
      duration,
      position,
      isClosable: false,
      showProgress,
    });
  };
  
  const showMultipleToasts = () => {
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        show({
          type: ['success', 'error', 'info', 'warning', 'default'][i % 5] as ToastType,
          title: `Toast ${i}`,
          description: `This is toast number ${i}`,
          duration: 5000,
          position,
          isClosable,
          showProgress,
        });
      }, i * 300);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">Toast Notification Examples</h1>
          <p className="text-center text-gray-600 mt-2">
            Using Sonner with a Bootstrap-inspired design
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Custom Toast Generator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Toast title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Toast description"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ToastType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">Default</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as ToastPosition)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (ms): {duration}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isClosable"
                    checked={isClosable}
                    onChange={(e) => setIsClosable(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isClosable" className="ml-2 block text-sm text-gray-700">
                    Closable
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showProgress"
                    checked={showProgress}
                    onChange={(e) => setShowProgress(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="showProgress" className="ml-2 block text-sm text-gray-700">
                    Show Progress
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showAction"
                    checked={showAction}
                    onChange={(e) => setShowAction(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="showAction" className="ml-2 block text-sm text-gray-700">
                    Show Action
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={showCustomToast}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Show Custom Toast
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Toast Examples</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => success({
                    title: 'Success',
                    description: 'Operation completed successfully',
                    position,
                  })}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Success Toast
                </button>
                
                <button
                  onClick={() => error({
                    title: 'Error',
                    description: 'Something went wrong',
                    position,
                  })}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Error Toast
                </button>
                
                <button
                  onClick={() => warning({
                    title: 'Warning',
                    description: 'This action is irreversible',
                    position,
                  })}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Warning Toast
                </button>
                
                <button
                  onClick={() => info({
                    title: 'Information',
                    description: 'You have a new message',
                    position,
                  })}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Info Toast
                </button>
                
                <button
                  onClick={() => show({
                    title: 'Default',
                    description: 'This is a default toast',
                    position,
                  })}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Default Toast
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Advanced Examples</h2>
              
              <div className="space-y-3">
                <button
                  onClick={showPredefinedToasts}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Show All Types
                </button>
                
                <button
                  onClick={showToastWithCustomDuration}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Custom Duration
                </button>
                
                <button
                  onClick={showToastWithAction}
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Toast with Action
                </button>
                
                <button
                  onClick={showToastWithoutTitle}
                  className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Without Title
                </button>
                
                <button
                  onClick={showToastWithoutProgress}
                  className="w-full px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Without Progress
                </button>
                
                <button
                  onClick={showToastNotClosable}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Not Closable
                </button>
                
                <button
                  onClick={showMultipleToasts}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Multiple Toasts
                </button>
                
                <button
                  onClick={dismissAll}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  Dismiss All
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            Toast Notification Examples with Sonner and Next.js
          </p>
        </div>
      </footer>
      

    </div>
  );
}