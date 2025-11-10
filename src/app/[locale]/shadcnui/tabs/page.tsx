'use client';

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Checkbox } from '~/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { Switch } from '~/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Progress } from '~/components/ui/progress'

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    newsletter: false,
    theme: 'light',
    country: '',
    message: ''
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Tabs Components Demo</h1>
        <p className="text-muted-foreground">
          built with shadcn/ui
        </p>
      </div>

      {/* Basic Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Tabs</CardTitle>
          <CardDescription>Simple tab navigation with content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="home" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Home Content</h3>
              <p className="text-muted-foreground">
                Welcome to the home tab! This is where you can find an overview of everything.
              </p>
            </TabsContent>
            
            <TabsContent value="profile" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Profile Content</h3>
              <p className="text-muted-foreground">
                Manage your profile settings and personal information here.
              </p>
            </TabsContent>
            
            <TabsContent value="messages" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Messages</h3>
              <p className="text-muted-foreground">
                View and manage your messages and notifications.
              </p>
            </TabsContent>
            
            <TabsContent value="settings" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <p className="text-muted-foreground">
                Configure application settings and preferences.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Pills Style Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Pills Style Tabs</CardTitle>
          <CardDescription>Rounded pill-style tabs like Bootstrap</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="flex space-x-2 p-1 bg-muted rounded-full">
              <TabsTrigger 
                value="dashboard" 
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Reports
              </TabsTrigger>
              <TabsTrigger 
                value="support" 
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="p-4 mt-4 border rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Dashboard</Badge>
                <span className="text-sm text-muted-foreground">Overview of your data</span>
              </div>
              <p>Welcome to your dashboard! Here you can see all your important metrics.</p>
            </TabsContent>
            
            <TabsContent value="analytics" className="p-4 mt-4 border rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Analytics</Badge>
                <span className="text-sm text-muted-foreground">Detailed analysis</span>
              </div>
              <p>Deep dive into your analytics data with detailed charts and graphs.</p>
            </TabsContent>
            
            <TabsContent value="reports" className="p-4 mt-4 border rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Reports</Badge>
                <span className="text-sm text-muted-foreground">Generate reports</span>
              </div>
              <p>Create and manage comprehensive reports for your business.</p>
            </TabsContent>
            
            <TabsContent value="support" className="p-4 mt-4 border rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Support</Badge>
                <span className="text-sm text-muted-foreground">Get help</span>
              </div>
              <p>Need assistance? Our support team is here to help you.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Vertical Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Tabs</CardTitle>
          <CardDescription>Sidebar style vertical navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex border rounded-lg overflow-hidden">
            <Tabs defaultValue="account" orientation="vertical" className="flex md:flex-row w-full">
              <div className="w-full md:w-48 bg-muted">
                <TabsList className="flex flex-col h-auto p-2 bg-transparent">
                  <TabsTrigger 
                    value="account" 
                    className="justify-start px-3 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="justify-start px-3 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Security
                  </TabsTrigger>
                  <TabsTrigger 
                    value="privacy" 
                    className="justify-start px-3 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="justify-start px-3 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing" 
                    className="justify-start px-3 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Billing
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1 p-6 bg-background">
                <TabsContent value="account" className="m-0">
                  <h3 className="text-2xl font-semibold mb-6">Account Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">Full Name</Label>
                      <Input id="name" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="username" className="mb-2 block">Username</Label>
                      <Input id="username" placeholder="Choose a username" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="mt-8 flex gap-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="m-0">
                  <h3 className="text-2xl font-semibold mb-6">Security Settings</h3>
                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Backup Codes</h4>
                        <p className="text-sm text-muted-foreground">Generate backup codes for emergency access</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Password</h4>
                      <p className="text-sm text-muted-foreground mb-4">Last changed: 2 days ago</p>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-3">Active Sessions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Chrome on Windows</span>
                          <Badge variant="outline">Current</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Safari on iPhone</span>
                          <Button variant="ghost" size="sm">Revoke</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="m-0">
                  <h3 className="text-2xl font-semibold mb-6">Privacy Settings</h3>
                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Data Collection</h4>
                        <p className="text-sm text-muted-foreground">Allow us to collect anonymous usage data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Personalized Ads</h4>
                        <p className="text-sm text-muted-foreground">Show personalized advertisements</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive email updates and newsletters</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Data Export</h4>
                      <p className="text-sm text-muted-foreground mb-4">Download a copy of your personal data</p>
                      <Button variant="outline">Request Data Export</Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-3">Privacy Policy</h4>
                      <p className="text-sm text-muted-foreground">
                        Read our comprehensive privacy policy to understand how we handle your data.
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-2">
                        View Privacy Policy →
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="m-0">
                  <h3 className="text-2xl font-semibold mb-6">Notification Settings</h3>
                  <div className="space-y-6 max-w-2xl">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-4">Email Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="newsletter" className="cursor-pointer">Newsletter</Label>
                          <Switch id="newsletter" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="product-updates" className="cursor-pointer">Product Updates</Label>
                          <Switch id="product-updates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="security-alerts" className="cursor-pointer">Security Alerts</Label>
                          <Switch id="security-alerts" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-4">Push Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-messages" className="cursor-pointer">New Messages</Label>
                          <Switch id="push-messages" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-mentions" className="cursor-pointer">Mentions</Label>
                          <Switch id="push-mentions" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-follows" className="cursor-pointer">New Followers</Label>
                          <Switch id="push-follows" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-3">Notification Schedule</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {`Set quiet hours when you don't want to be disturbed`}
                      </p>
                      <Button variant="outline">Configure Schedule</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="billing" className="m-0">
                  <h3 className="text-2xl font-semibold mb-6">Billing Information</h3>
                  <div className="space-y-6 max-w-2xl">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-4">Current Plan</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pro Plan</p>
                          <p className="text-sm text-muted-foreground">$29/month</p>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline">Change Plan</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-4">Payment Method</h4>
                      <div className="flex items-center justify-between p-3 bg-muted rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">V</span>
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/24</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <div className="mt-3">
                        <Button variant="outline">Add Payment Method</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-3">Billing History</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        View and download your past invoices and receipts
                      </p>
                      <Button variant="outline">View Billing History</Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Tabs with Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs with Badges</CardTitle>
          <CardDescription>Tabs containing notification badges</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inbox" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inbox" className="flex items-center gap-2">
                Inbox
                <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
                  5
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="sent" className="flex items-center gap-2">
                Sent
                <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">
                  12
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="drafts" className="flex items-center gap-2">
                Drafts
                <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center">
                  3
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inbox" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Inbox Messages</h3>
              <p>You have 5 unread messages in your inbox.</p>
            </TabsContent>
            
            <TabsContent value="sent" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Sent Messages</h3>
              <p>View your 12 sent messages.</p>
            </TabsContent>
            
            <TabsContent value="drafts" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Draft Messages</h3>
              <p>You have 3 unsent draft messages.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Form Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Form Tabs</CardTitle>
          <CardDescription>Multi-step form using tabs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="account">Account Details</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="p-4 border rounded-b-md space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="form-name">Name</Label>
                  <Input 
                    id="form-name" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="form-email">Email</Label>
                  <Input 
                    id="form-email" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setActiveTab('account')}>
                  Next: Account Details
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="p-4 border rounded-b-md space-y-4">
              <h3 className="text-lg font-semibold">Account Details</h3>
              <div>
                <Label htmlFor="form-phone">Phone Number</Label>
                <Input 
                  id="form-phone" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('personal')}>
                  Previous
                </Button>
                <Button onClick={() => setActiveTab('preferences')}>
                  Next: Preferences
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="p-4 border rounded-b-md space-y-4">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newsletter" 
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange('newsletter', checked === true)}
                  />
                  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                </div>
                
                <div>
                  <Label htmlFor="theme">Theme Preference</Label>
                  <RadioGroup 
                    value={formData.theme}
                    onValueChange={(value) => handleInputChange('theme', value)}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auto" id="auto" />
                      <Label htmlFor="auto">Auto</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={formData.country}
                    onValueChange={(value) => handleInputChange('country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea 
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Any additional information..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('account')}>
                  Previous
                </Button>
                <Button>Submit</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Disabled Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Disabled Tabs</CardTitle>
          <CardDescription>Tabs with disabled states</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
              <TabsTrigger value="locked" disabled>
                <span className="opacity-50">Locked</span>
                <Badge variant="outline" className="ml-2">Premium</Badge>
              </TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Active Tab</h3>
              <p>This tab is active and fully functional.</p>
            </TabsContent>
            
            <TabsContent value="disabled" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Disabled Tab</h3>
              <p>This tab is currently disabled.</p>
            </TabsContent>
            
            <TabsContent value="locked" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Locked Tab</h3>
              <p>This feature requires a premium subscription.</p>
            </TabsContent>
            
            <TabsContent value="available" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Available Tab</h3>
              <p>This tab is available and ready to use.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Icon Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Tabs</CardTitle>
          <CardDescription>Tabs with icons for better visual recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                Users
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
              <p>Overview of your application with key metrics and charts.</p>
            </TabsContent>
            
            <TabsContent value="users" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">User Management</h3>
              <p>Manage user accounts, permissions, and roles.</p>
            </TabsContent>
            
            <TabsContent value="settings" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Application Settings</h3>
              <p>Configure application preferences and global settings.</p>
            </TabsContent>
            
            <TabsContent value="help" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Help & Support</h3>
              <p>Get assistance and documentation for using the application.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Justified Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Justified Tabs</CardTitle>
          <CardDescription>Tabs that span the full width equally</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex w-full">
              <TabsTrigger value="all" className="flex-1 text-center">All Items</TabsTrigger>
              <TabsTrigger value="active" className="flex-1 text-center">Active</TabsTrigger>
              <TabsTrigger value="completed" className="flex-1 text-center">Completed</TabsTrigger>
              <TabsTrigger value="archived" className="flex-1 text-center">Archived</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">All Items</h3>
              <p>Showing all items regardless of their status.</p>
            </TabsContent>
            
            <TabsContent value="active" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Active Items</h3>
              <p>Items that are currently active and in progress.</p>
            </TabsContent>
            
            <TabsContent value="completed" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Completed Items</h3>
              <p>Items that have been successfully completed.</p>
            </TabsContent>
            
            <TabsContent value="archived" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Archived Items</h3>
              <p>Items that have been archived for historical reference.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs with Complex Content */}
      <Card>
        <CardHeader>
          <CardTitle>Complex Content Tabs</CardTitle>
          <CardDescription>Tabs containing rich content and components</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-4 border rounded-b-md space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">\$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Subscriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                  </CardContent>
                </Card>
              </div>
              
              <Progress value={75} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>Storage Usage</span>
                <span>75% of 100GB</span>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Traffic Sources</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Direct</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Referral</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">User Demographics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>18-24</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>25-34</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>35-44</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>45+</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Team Members</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Developer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">Designer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Mike Johnson</p>
                    <p className="text-sm text-muted-foreground">Project Manager</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Sarah Brown</p>
                    <p className="text-sm text-muted-foreground">QA Engineer</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Responsive Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Tabs</CardTitle>
          <CardDescription>Tabs that adapt to different screen sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mobile" className="w-full">
            <TabsList className="flex flex-wrap gap-2">
              <TabsTrigger value="mobile" className="flex-1 min-w-[100px]">Mobile</TabsTrigger>
              <TabsTrigger value="tablet" className="flex-1 min-w-[100px]">Tablet</TabsTrigger>
              <TabsTrigger value="desktop" className="flex-1 min-w-[100px]">Desktop</TabsTrigger>
              <TabsTrigger value="all" className="flex-1 min-w-[100px]">All Devices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mobile" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Mobile View</h3>
              <p>Optimized for smartphones and small screen devices.</p>
            </TabsContent>
            
            <TabsContent value="tablet" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Tablet View</h3>
              <p>Designed for tablet devices and medium screens.</p>
            </TabsContent>
            
            <TabsContent value="desktop" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">Desktop View</h3>
              <p>Full-featured experience for desktop computers.</p>
            </TabsContent>
            
            <TabsContent value="all" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-2">All Devices</h3>
              <p>Responsive design that works across all device types.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs with Dynamic Content */}
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Content Tabs</CardTitle>
          <CardDescription>Tabs with content that changes based on state</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="live">Live Data</TabsTrigger>
              
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Live Data Feed</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>User Registration</span>
                  <Badge>+5</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>New Orders</span>
                  <Badge>+12</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>Support Tickets</span>
                  <Badge variant="destructive">+3</Badge>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Historical Data</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Last 7 Days</span>
                  <span className="font-medium">1,234 users</span>
                </div>
                <div className="flex justify-between">
                  <span>Last 30 Days</span>
                  <span className="font-medium">4,567 users</span>
                </div>
                <div className="flex justify-between">
                  <span>All Time</span>
                  <span className="font-medium">23,456 users</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Performance Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-green-600">98.7%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-blue-600">2.3s</div>
                  <div className="text-sm text-muted-foreground">Avg. Response</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-orange-600">1.2M</div>
                  <div className="text-sm text-muted-foreground">Requests</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-purple-600">0.05%</div>
                  <div className="text-sm text-muted-foreground">Error Rate</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs with Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading State Tabs</CardTitle>
          <CardDescription>Tabs with loading indicators and skeleton screens</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="loading" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="loading">Loading</TabsTrigger>
              <TabsTrigger value="skeleton">Skeleton</TabsTrigger>
              <TabsTrigger value="empty">Empty State</TabsTrigger>
            </TabsList>
            
            <TabsContent value="loading" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Loading Content</h3>
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3">Loading content...</span>
              </div>
            </TabsContent>
            
            <TabsContent value="skeleton" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Skeleton Screen</h3>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                <div className="h-20 bg-muted rounded animate-pulse mt-4"></div>
              </div>
            </TabsContent>
            
            <TabsContent value="empty" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Empty State</h3>
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-foreground">No content yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get started by creating your first item.</p>
                <Button className="mt-4">Create Item</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs with Custom Styles */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Styled Tabs</CardTitle>
          <CardDescription>Tabs with custom colors and styles</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="flex space-x-2 p-1 bg-muted rounded-lg">
              <TabsTrigger 
                value="primary" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Primary
              </TabsTrigger>
              <TabsTrigger 
                value="secondary" 
                className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                Secondary
              </TabsTrigger>
              <TabsTrigger 
                value="destructive" 
                className="rounded-lg data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
              >
                Destructive
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="primary" className="p-4 mt-4 border-2 border-primary rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-primary">Primary Style</h3>
              <p>This tab uses the primary color scheme for its active state.</p>
            </TabsContent>
            
            <TabsContent value="secondary" className="p-4 mt-4 border-2 border-secondary rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-secondary">Secondary Style</h3>
              <p>This tab uses the secondary color scheme for its active state.</p>
            </TabsContent>
            
            <TabsContent value="destructive" className="p-4 mt-4 border-2 border-destructive rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-destructive">Destructive Style</h3>
              <p>This tab uses the destructive color scheme for its active state.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabs with Keyboard Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Navigation</CardTitle>
          <CardDescription>Tabs with full keyboard accessibility support</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="accessibility" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="accessibility" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Accessibility Features</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Full keyboard navigation support</li>
                <li>ARIA attributes for screen readers</li>
                <li>Focus indicators for keyboard users</li>
                <li>Proper tab indexing</li>
                <li>High contrast support</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="keyboard" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Tab / Shift+Tab</span>
                  <Badge>Navigate tabs</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Arrow keys</span>
                  <Badge>Move between tabs</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Enter / Space</span>
                  <Badge>Activate tab</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Home / End</span>
                  <Badge>First/Last tab</Badge>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="navigation" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Navigation Patterns</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-3 border rounded">
                  <h4 className="font-semibold mb-2">Sequential Navigation</h4>
                  <p className="text-sm">Use Tab/Shift+Tab to move through tabs in order.</p>
                </div>
                <div className="p-3 border rounded">
                  <h4 className="font-semibold mb-2">Direct Navigation</h4>
                  <p className="text-sm">Use arrow keys for quick navigation between tabs.</p>
                </div>
                <div className="p-3 border rounded">
                  <h4 className="font-semibold mb-2">Quick Access</h4>
                  <p className="text-sm">Use Home/End keys to jump to first/last tab.</p>
                </div>
                <div className="p-3 border rounded">
                  <h4 className="font-semibold mb-2">Activation</h4>
                  <p className="text-sm">Press Enter or Space to activate the focused tab.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
          <CardDescription>How to use these tabs in your project</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="installation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="customization">Customization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="installation" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Installation Steps</h3>
              <div className="space-y-3 font-mono text-sm bg-muted p-4 rounded">
                <div># Install shadcn/ui tabs component</div>
                <div className="text-blue-600">npx shadcn-ui@latest add tabs</div>
                <div className="mt-4"># Install additional components if needed</div>
                <div className="text-blue-600">npx shadcn-ui@latest add card</div>
                <div className="text-blue-600">npx shadcn-ui@latest add button</div>
                <div className="text-blue-600">npx shadcn-ui@latest add badge</div>
              </div>
            </TabsContent>
            
            <TabsContent value="usage" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
              <div className="space-y-3 font-mono text-sm bg-muted p-4 rounded">
                <div>{`import "{" Tabs, TabsContent, TabsList, TabsTrigger "}" from "~/components/ui/tabs"`}</div>
                <div className="mt-2">{`&lt;Tabs defaultValue="account"&gt;`}</div>
                <div className="ml-4">&lt;TabsList&gt;</div>
                <div className="ml-8">{`&lt;TabsTrigger value="account"&gt;Account&lt;/TabsTrigger&gt;`}</div>
                <div className="ml-8">{`&lt;TabsTrigger value="password"&gt;Password&lt;/TabsTrigger&gt;`}</div>
                <div className="ml-4">&lt;/TabsList&gt;</div>
                <div className="ml-4">{`&lt;TabsContent value="account"&gt;Account content&lt;/TabsContent&gt;`}</div>
                <div className="ml-4">{`&lt;TabsContent value="password"&gt;Password content&lt;/TabsContent&gt;`}</div>
                <div>&lt;/Tabs&gt;</div>
              </div>
            </TabsContent>
            
            <TabsContent value="customization" className="p-4 border rounded-b-md">
              <h3 className="text-lg font-semibold mb-4">Customization Options</h3>
              <div className="grid gap-3">
                <div className="p-3 border rounded">
                  <h4 className="font-semibold mb-2">Styling</h4>
                  <p className="text-sm">Use Tailwind CSS classes to customize the appearance of tabs and content.</p>
                </div>
                <div className="p-3 border rounded">
                  <h4 className="font-semibold mb-2">Responsive Design</h4>
                  <p className="text-sm">Use responsive utility classes for different screen sizes.</p>
                </div>
                <div className="p-3 border rounded">
                  <h4 className="font-semibold mb-2">State Management</h4>
                  <p className="text-sm">Control tab state with useState hook for dynamic behavior.</p>
                </div>
                <div className="p-3 border rounded">
                  <h4 className="font-semibold mb-2">Accessibility</h4>
                  <p className="text-sm">Ensure proper ARIA attributes and keyboard navigation.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
