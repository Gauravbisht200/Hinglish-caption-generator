/**
 * FILE: src/app/components-test/page.tsx
 * Showcase page for UI components
 */

'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Slider from '@/components/ui/Slider';
import ColorPicker from '@/components/ui/ColorPicker';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import { Plus, Trash2, Play, Settings } from 'lucide-react';

export default function ComponentsTestPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('inter');
  const [sliderValue, setSliderValue] = useState(32);
  const [colorValue, setColorValue] = useState('#2563EB');

  const fontOptions = [
    { value: 'inter', label: 'Inter' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'montserrat', label: 'Montserrat' },
  ];

  return (
    <main className="min-h-screen bg-[var(--app-background)] p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold font-display">Component Library</h1>
          <p className="text-[var(--secondary-text)]">Testing reusable UI components for Hinglish Caption Studio.</p>
        </header>

        {/* Buttons Section */}
        <section className="space-y-6 bg-white p-8 rounded-2xl border border-[var(--border)] shadow-sm">
          <h2 className="text-xl font-semibold flex items-center">
            <Settings className="w-5 h-5 mr-2 text-[var(--accent-blue)]" />
            Buttons
          </h2>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[var(--secondary-text)] uppercase tracking-wider">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[var(--secondary-text)] uppercase tracking-wider">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[var(--secondary-text)] uppercase tracking-wider">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" className="gap-2">
                  <Plus className="w-4 h-4" /> Add Segment
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Play className="w-4 h-4" /> Preview
                </Button>
                <Button variant="ghost" className="text-[var(--error)] hover:bg-red-50 hover:text-[var(--error)] gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Controls Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[var(--border)] shadow-sm space-y-6">
            <h2 className="text-xl font-semibold">Inputs & Selects</h2>
            <div className="space-y-4">
              <Input 
                label="Project Title" 
                placeholder="e.g. My Awesome Video" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="This will be used as the file name"
              />
              <Input 
                label="Video URL" 
                placeholder="https://..." 
                error={inputValue.length > 0 && !inputValue.startsWith('http') ? 'Please enter a valid URL' : ''}
              />
              <Select 
                label="Font Family" 
                options={fontOptions} 
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[var(--border)] shadow-sm space-y-6">
            <h2 className="text-xl font-semibold">Sliders & Colors</h2>
            <div className="space-y-6">
              <Slider 
                label="Font Size" 
                min={12} 
                max={72} 
                value={sliderValue} 
                onChange={setSliderValue}
                unit="px"
              />
              <Slider 
                label="Background Opacity" 
                min={0} 
                max={100} 
                value={45} 
                onChange={() => {}}
                unit="%"
              />
              <ColorPicker 
                label="Active Word Color" 
                value={colorValue}
                onChange={setColorValue}
              />
            </div>
          </div>
        </section>

        {/* Layout Section */}
        <section className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <CollapsibleSection title="Typography Settings" defaultOpen={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
              <Select label="Font" options={fontOptions} />
              <Slider label="Size" min={12} max={72} value={32} unit="px" onChange={() => {}} />
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Position & Layout" defaultOpen={false}>
            <div className="space-y-4 py-2">
              <p className="text-sm text-[var(--secondary-text)]">
                Advanced positioning controls will appear here.
              </p>
              <div className="flex gap-4">
                <Button variant="secondary" size="sm">Reset to Default</Button>
                <Button variant="secondary" size="sm">Snap to Grid</Button>
              </div>
            </div>
          </CollapsibleSection>
        </section>
      </div>
    </main>
  );
}
