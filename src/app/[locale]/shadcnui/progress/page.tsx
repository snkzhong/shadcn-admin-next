'use client';

import { useState, useEffect } from 'react'
import { Progress } from '~/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'

export default function ProgressDemo() {
  const [progress, setProgress] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(progress + 10)
      }, 500)
      return () => clearTimeout(timer)
    } else if (progress >= 100) {
      setIsLoading(false)
    }
  }, [progress, isLoading])

  const startLoading = () => {
    setProgress(0)
    setIsLoading(true)
  }

  const resetProgress = () => {
    setProgress(0)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Progress Components Demo</h1>
        <p className="text-muted-foreground">
          Bootstrap-style progress bars built with shadcn/ui
        </p>
      </div>

      {/* Basic Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Progress Bar</CardTitle>
          <CardDescription>Simple progress indicator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {progress}% Complete
            </span>
            <div className="flex gap-2">
              <Button 
                onClick={startLoading} 
                disabled={isLoading}
                size="sm"
              >
                Start Loading
              </Button>
              <Button 
                onClick={resetProgress} 
                variant="outline"
                size="sm"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colored Progress Bars */}
      <Card>
        <CardHeader>
          <CardTitle>Colored Progress Bars</CardTitle>
          <CardDescription>Different states and colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Primary (Default)</span>
              <Badge variant="outline">{progress}%</Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">Success</span>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {progress}%
              </Badge>
            </div>
            <Progress 
              value={progress} 
              className="w-full [&>div]:bg-green-500" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600">Info</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {progress}%
              </Badge>
            </div>
            <Progress 
              value={progress} 
              className="w-full [&>div]:bg-blue-500" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-yellow-600">Warning</span>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                {progress}%
              </Badge>
            </div>
            <Progress 
              value={progress} 
              className="w-full [&>div]:bg-yellow-500" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-600">Danger</span>
              <Badge variant="outline" className="bg-red-100 text-red-800">
                {progress}%
              </Badge>
            </div>
            <Progress 
              value={progress} 
              className="w-full [&>div]:bg-red-500" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Striped Progress Bars */}
      <Card>
        <CardHeader>
          <CardTitle>Striped Progress Bars</CardTitle>
          <CardDescription>Animated striped effects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Striped Primary</span>
              <Badge variant="outline">{progress}%</Badge>
            </div>
            <Progress 
              value={progress} 
              className="w-full [&>div]:bg-stripes [&>div]:bg-stripes-blue-500" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">Striped Success</span>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {progress}%
              </Badge>
            </div>
            <Progress 
              value={progress} 
              className="w-full [&>div]:bg-stripes [&>div]:bg-stripes-green-500" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Animated Striped</span>
              <Badge variant="outline">{progress}%</Badge>
            </div>
            <Progress 
              value={progress} 
              className="w-full [&>div]:animate-pulse [&>div]:bg-stripes [&>div]:bg-stripes-blue-500" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Different Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Bar Sizes</CardTitle>
          <CardDescription>Various height options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm">Small (h-1)</span>
            <Progress value={progress} className="w-full h-1" />
          </div>

          <div className="space-y-2">
            <span className="text-sm">Medium (h-2) - Default</span>
            <Progress value={progress} className="w-full h-2" />
          </div>

          <div className="space-y-2">
            <span className="text-sm">Large (h-4)</span>
            <Progress value={progress} className="w-full h-4" />
          </div>

          <div className="space-y-2">
            <span className="text-sm">Extra Large (h-6)</span>
            <Progress value={progress} className="w-full h-6 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Multiple Progress Bars */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple Progress Bars</CardTitle>
          <CardDescription>Stacked progress indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Project Completion</span>
              <Badge variant="outline">
                Overall: {Math.round((progress * 3) / 3)}%
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Design Phase</span>
                <span className="text-sm text-muted-foreground">
                  {Math.min(progress, 100)}%
                </span>
              </div>
              <Progress 
                value={Math.min(progress, 100)} 
                className="w-full [&>div]:bg-blue-500 h-2" 
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">Development</span>
                <span className="text-sm text-muted-foreground">
                  {Math.max(0, Math.min(progress - 33, 34))}%
                </span>
              </div>
              <Progress 
                value={Math.max(0, Math.min(progress - 33, 34))} 
                className="w-full [&>div]:bg-green-500 h-2" 
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">Testing</span>
                <span className="text-sm text-muted-foreground">
                  {Math.max(0, progress - 67)}%
                </span>
              </div>
              <Progress 
                value={Math.max(0, progress - 67)} 
                className="w-full [&>div]:bg-purple-500 h-2" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Label Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Label Progress</CardTitle>
          <CardDescription>Progress bars with custom labels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Progress value={progress} className="w-full h-6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-md">
                Loading... {progress}%
              </span>
            </div>
          </div>

          <div className="relative">
            <Progress value={progress} className="w-full h-8 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <span className="text-xs font-medium text-white">Start</span>
              <span className="text-xs font-bold text-white">
                {progress}% Complete
              </span>
              <span className="text-xs font-medium text-white">Finish</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
