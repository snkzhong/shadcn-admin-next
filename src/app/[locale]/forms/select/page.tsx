"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  Globe,
  Palette,
  Code,
  Database,
  Smartphone,
  Cpu,
  Zap,
  Users,
  Building,
  MapPin,
  Mail,
  Star,
  Heart,
  Sparkles,
} from "lucide-react";

import MultiSelect from "~/components/uiplus/select/multi-select";
import SearchableSelect from "~/components/uiplus/select/searchable-select";
import TagSelect from "~/components/uiplus/select/tag-select";
import { StepId } from "framer-motion";

export default function SelectDemo() {
  // Basic Select
  const [basicValue, setBasicValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  // Multi Select
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Searchable Select
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  // Tag Select
  const [tags, setTags] = useState<string[]>([]);
  const [interests, setInterests] = useState(["Design", "Development"]);

  // // Form state
  // const [formData, setFormData] = useState({
  //   department: "",
  //   position: "",
  //   skills: [],
  //   location: "",
  // });

  interface SelectFormState {
    skills: string[];
    languages?: string[];
    country?: string;
    department: string;
    location: string;
    position: string;
    tags?: string[];
    // 可添加其他字段
  }

  // 初始化状态
  const [formData, setFormData] = useState<SelectFormState>({
    skills: [],
    languages: [],
    country: "",
    department: "",
    location: "",
    position: "",
    tags: [],
  });

  const skillOptions = [
    { label: "React", value: "react", icon: <Code className="w-4 h-4" /> },
    { label: "TypeScript", value: "typescript", icon: <Code className="w-4 h-4" /> },
    { label: "Node.js", value: "nodejs", icon: <Database className="w-4 h-4" /> },
    { label: "Python", value: "python", icon: <Code className="w-4 h-4" /> },
    { label: "GraphQL", value: "graphql", icon: <Database className="w-4 h-4" /> },
    { label: "Docker", value: "docker", icon: <Cpu className="w-4 h-4" /> },
    { label: "AWS", value: "aws", icon: <Globe className="w-4 h-4" /> },
    { label: "MongoDB", value: "mongodb", icon: <Database className="w-4 h-4" /> },
  ];

  const languageOptions = [
    { label: "English", value: "en", icon: <Globe className="w-4 h-4" /> },
    { label: "Spanish", value: "es", icon: <Globe className="w-4 h-4" /> },
    { label: "French", value: "fr", icon: <Globe className="w-4 h-4" /> },
    { label: "German", value: "de", icon: <Globe className="w-4 h-4" /> },
    { label: "Chinese", value: "zh", icon: <Globe className="w-4 h-4" /> },
    { label: "Japanese", value: "ja", icon: <Globe className="w-4 h-4" /> },
  ];

  const countryOptions = [
    {
      label: "United States",
      value: "us",
      description: "North America",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "United Kingdom",
      value: "uk",
      description: "Europe",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "Canada",
      value: "ca",
      description: "North America",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "Australia",
      value: "au",
      description: "Oceania",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "Germany",
      value: "de",
      description: "Europe",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "Japan",
      value: "jp",
      description: "Asia",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "Singapore",
      value: "sg",
      description: "Asia",
      icon: <MapPin className="w-4 h-4" />,
    },
  ];

  const companyOptions = [
    {
      label: "Google",
      value: "google",
      description: "Technology",
      icon: <Building className="w-4 h-4 text-blue-500" />,
    },
    {
      label: "Microsoft",
      value: "microsoft",
      description: "Technology",
      icon: <Building className="w-4 h-4 text-green-500" />,
    },
    {
      label: "Apple",
      value: "apple",
      description: "Technology",
      icon: <Building className="w-4 h-4 text-gray-500" />,
    },
    {
      label: "Amazon",
      value: "amazon",
      description: "E-commerce",
      icon: <Building className="w-4 h-4 text-orange-500" />,
    },
  ];

  const tagSuggestions = [
    "JavaScript",
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "GraphQL",
    "Docker",
    "Kubernetes",
  ];

  const interestSuggestions = [
    "Design",
    "Development",
    "Photography",
    "Music",
    "Travel",
    "Gaming",
    "Reading",
    "Fitness",
    "Cooking",
    "Art",
  ];

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for details.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-5xl font-bold">Select Components</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Complete collection of elegant, feature-rich select components with search, multi-select, tags, and more.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Basic Select Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic Select</h2>
            <p className="text-gray-600">Simple single-selection dropdown with grouped options</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  Simple Select
                </CardTitle>
                <CardDescription>Choose one option from the list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="basic-select">Select Framework</Label>
                  <Select value={basicValue} onValueChange={setBasicValue}>
                    <SelectTrigger id="basic-select">
                      <SelectValue placeholder="Choose a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue.js</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                      <SelectItem value="solid">Solid.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {basicValue && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Selected:</p>
                    <Badge variant="secondary" className="mt-1">
                      {basicValue}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-indigo-600" />
                  Grouped Select
                </CardTitle>
                <CardDescription>Options organized in categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="grouped-select">Select Category</Label>
                  <Select value={categoryValue} onValueChange={setCategoryValue}>
                    <SelectTrigger id="grouped-select">
                      <SelectValue placeholder="Choose a technology" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Frontend</SelectLabel>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue.js</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Backend</SelectLabel>
                        <SelectItem value="nodejs">Node.js</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Database</SelectLabel>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {categoryValue && (
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-gray-600">Selected:</p>
                    <Badge variant="secondary" className="mt-1">
                      {categoryValue}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Multi Select Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Multi Select</h2>
            <p className="text-gray-600">Select multiple options with search and badge display</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Skills Selection
                </CardTitle>
                <CardDescription>Choose multiple skills from the list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Your Skills</Label>
                  <MultiSelect
                    options={skillOptions}
                    selected={selectedSkills}
                    onChange={setSelectedSkills}
                    placeholder="Select skills..."
                    maxDisplay={2}
                  />
                </div>
                {selectedSkills.length > 0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      Selected {selectedSkills.length} skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillOptions
                        .filter((opt) => selectedSkills.includes(opt.value))
                        .map((opt) => (
                          <Badge key={opt.value} variant="outline">
                            {opt.label}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Language Selection
                </CardTitle>
                <CardDescription>Select languages you speak</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Languages</Label>
                  <MultiSelect
                    options={languageOptions}
                    selected={selectedLanguages}
                    onChange={setSelectedLanguages}
                    placeholder="Select languages..."
                    maxDisplay={3}
                  />
                </div>
                {selectedLanguages.length > 0 && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      {selectedLanguages.length} language(s) selected
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {languageOptions
                        .filter((opt) => selectedLanguages.includes(opt.value))
                        .map((opt) => (
                          <Badge key={opt.value} variant="outline">
                            {opt.label}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Searchable Select Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Searchable Select</h2>
            <p className="text-gray-600">Fast search through large option lists with descriptions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Country Selector
                </CardTitle>
                <CardDescription>Search and select from countries worldwide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Country</Label>
                  <SearchableSelect
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Search countries..."
                  />
                </div>
                {selectedCountry && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Selected Country:</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <Badge variant="secondary">
                        {countryOptions.find((c) => c.value === selectedCountry)?.label}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  Company Selector
                </CardTitle>
                <CardDescription>Select from top tech companies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Company</Label>
                  <SearchableSelect
                    options={companyOptions}
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                    placeholder="Search companies..."
                  />
                </div>
                {selectedCompany && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Selected Company:</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Building className="w-4 h-4 text-purple-600" />
                      <Badge variant="secondary">
                        {companyOptions.find((c) => c.value === selectedCompany)?.label}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Tag Select Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tag Select / Autocomplete</h2>
            <p className="text-gray-600">Create custom tags or select from suggestions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-600" />
                  Technology Tags
                </CardTitle>
                <CardDescription>Type or select from suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Add Technologies</Label>
                  <TagSelect
                    tags={tags}
                    onChange={setTags}
                    placeholder="Type and press Enter..."
                    suggestions={tagSuggestions}
                  />
                  <p className="text-xs text-gray-500">
                    Tip: Start typing to see suggestions or press Enter to create custom tags
                  </p>
                </div>
                {tags.length > 0 && (
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">{tags.length} tag(s) added</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Interests
                </CardTitle>
                <CardDescription>Select or create interest tags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Your Interests</Label>
                  <TagSelect
                    tags={interests}
                    onChange={setInterests}
                    placeholder="Add interests..."
                    suggestions={interestSuggestions}
                    maxTags={5}
                  />
                  <p className="text-xs text-gray-500">Maximum 5 interests allowed</p>
                </div>
                {interests.length > 0 && (
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      {interests.length}/5 interests
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Form Integration Example */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Form Integration</h2>
            <p className="text-gray-600">Complete form example with validation</p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Job Application Form
              </CardTitle>
              <CardDescription>Fill in the form to see all selects in action</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        setFormData({ ...formData, department: value })
                      }
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Engineering</SelectLabel>
                          <SelectItem value="frontend">Frontend</SelectItem>
                          <SelectItem value="backend">Backend</SelectItem>
                          <SelectItem value="fullstack">Full Stack</SelectItem>
                          <SelectItem value="devops">DevOps</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Business</SelectLabel>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position Level *</Label>
                    <Select
                      value={formData.position}
                      onValueChange={(value) =>
                        setFormData({ ...formData, position: value })
                      }
                    >
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="mid">Mid-Level</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="principal">Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Required Skills *</Label>
                  <MultiSelect
                    options={skillOptions}
                    selected={formData.skills}
                    onChange={(skills) => setFormData({ ...formData, skills })}
                    placeholder="Select required skills..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Location *</Label>
                  <SearchableSelect
                    options={countryOptions}
                    value={formData.location}
                    onChange={(location) => setFormData({ ...formData, location })}
                    placeholder="Search location..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        department: "",
                        position: "",
                        skills: [],
                        location: "",
                      })
                    }
                  >
                    Reset
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Feature Highlights */}
        <section className="mt-12">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">✨ Features Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">🔍 Smart Search</h3>
                  <p className="text-blue-100 text-sm">
                    Real-time filtering as you type with fuzzy matching
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🎯 Multi-Selection</h3>
                  <p className="text-blue-100 text-sm">
                    Select multiple items with elegant badge display
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🏷️ Tag Support</h3>
                  <p className="text-blue-100 text-sm">
                    Create custom tags with autocomplete suggestions
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">📱 Responsive</h3>
                  <p className="text-blue-100 text-sm">
                    Perfect on mobile, tablet, and desktop devices
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">♿ Accessible</h3>
                  <p className="text-blue-100 text-sm">
                    Full keyboard navigation and screen reader support
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🎨 Customizable</h3>
                  <p className="text-blue-100 text-sm">
                    Easily themed with Tailwind CSS utilities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}