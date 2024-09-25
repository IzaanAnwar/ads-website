'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    educationQualification: '',
    technicalQualification: '',
    areasOfInterest: [],
    photo: null,
    resume: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: any) => {
    const { name, value, type, files } = e.target;
    console.log({ name, value, type, files });
    if (type === 'checkbox') {
      // @ts-ignore
      const updatedAreas = formData.areasOfInterest.includes(value)
        ? formData.areasOfInterest.filter((area) => area !== value)
        : [...formData.areasOfInterest, value];
      // @ts-ignore
      setFormData((prev) => ({ ...prev, areasOfInterest: updatedAreas }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume || !formData.photo) {
      toast({
        title: 'Error',
        description: 'Please upload a resume and a photo.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Convert files to buffer for sending in the request
      // @ts-ignore
      const resumeBuffer = await formData.resume?.arrayBuffer();
      // @ts-ignore
      const photoBuffer = await formData.photo?.arrayBuffer();

      const payload = {
        ...formData,
        areasOfInterest: ['Web Development', 'Data Science'], // Example interests
        resume: {
          // @ts-ignore
          filename: formData.resume.name,
          content: new Uint8Array(resumeBuffer),
          // @ts-ignore
          contentType: formData.resume.type,
        },
        photo: {
          // @ts-ignore
          filename: formData.photo.name,
          content: new Uint8Array(photoBuffer),
          // @ts-ignore
          contentType: formData.photo.type,
        },
      };

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Application submitted successfully!');
        toast({
          title: 'Application Submitted',
          description:
            'Thank you for your application. A confirmation email has been sent to your address.',
          className: 'bg-green-500 text-white',
        });
      } else {
        setError(result.message || 'Failed to submit the application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-7xl h-full py-20 w-full mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow"
      >
        <div>
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" name="fullName" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" name="phone" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" name="address" required onChange={handleInputChange} />
            </div>
            <div>
              <Label>Gender *</Label>
              <RadioGroup
                name="gender"
                required
                onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Qualification</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="educationQualification">Education Qualification *</Label>
              <Select
                name="educationQualification"
                required
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, educationQualification: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highschool">High School</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">Ph.D.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="technicalQualification">Technical Qualification *</Label>
              <Select
                name="technicalQualification"
                required
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, technicalQualification: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="data_analysis">Data Analysis</SelectItem>
                  <SelectItem value="web_development">Web Development</SelectItem>
                  <SelectItem value="computer_programming">
                    Computer Programming Languages
                  </SelectItem>
                  <SelectItem value="financial_management">Financial Management</SelectItem>
                  <SelectItem value="bookkeeping">Bookkeeping</SelectItem>
                  <SelectItem value="ux_design">UX Design</SelectItem>
                  <SelectItem value="graphic_design">Graphic Design</SelectItem>
                  <SelectItem value="operating_systems">Operating Systems</SelectItem>
                  <SelectItem value="data_security">Data Security</SelectItem>
                  <SelectItem value="endpoint_protection">Endpoint Protection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Areas of Interest</h2>
          <div className="space-y-2">
            {[
              'Network Engineer',
              'Server Engineer',
              'Cluster Management',
              'High Performance Computing Installation',
              'Design (Web, Application, HPC etc.)',
              'Security Surveillance/Video Conferencing/Audio Visual',
              'LAN Networking/Passive Components/Project Management',
              'Research',
            ].map((area) => (
              <div key={area} className="flex items-center">
                <input
                  type="checkbox"
                  id={area}
                  name="areasOfInterest"
                  value={area}
                  // @ts-ignore
                  checked={formData.areasOfInterest.includes(area)}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <Label htmlFor={area}>{area}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Uploads</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="photo">Photo *</Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept=".jpg,.jpeg,.png"
                required
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Files must be less than 5 MB. Allowed file types: jpg, jpeg, png.
              </p>
            </div>
            <div>
              <Label htmlFor="resume">Resume *</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Files must be less than 10 MB. Allowed file types: pdf, doc, docx.
              </p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          {isLoading ? 'Loading...' : 'Submit Application'}
        </Button>
      </form>
    </section>
  );
}
