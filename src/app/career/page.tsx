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

const RESUME_MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const PHOTO_MAX_SIZE = 1024 * 100; // 100 KB

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

  const handleInputChange = (e: any) => {
    const { name, value, type, files } = e.target;
    console.log({ name, value, type, files });
    if (type === 'checkbox') {
      // @ts-expect-error "resume" is not defined
      const updatedAreas = formData.areasOfInterest.includes(value)
        ? formData.areasOfInterest.filter((area) => area !== value)
        : [...formData.areasOfInterest, value];
      // @ts-expect-error "resume" is not defined
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

    // check if files are under the size limit
    // @ts-expect-error Property size does not exist on type never
    if (formData.resume && formData.resume.size > RESUME_MAX_SIZE) {
      toast({
        title: 'Error',
        description: 'Resume file size exceeds the 2 MB limit.',
        variant: 'destructive',
      });
      return;
    }

    // @ts-expect-error Property size does not exist on type never
    if (formData.photo && formData.photo.size > PHOTO_MAX_SIZE) {
      toast({
        title: 'Error',
        description: 'Photo file size exceeds the 100 KB limit.',
        variant: 'destructive',
      });
      return;
    }

    // check file mimetypes
    // @ts-expect-error Property type does not exist on type never
    if (formData.resume && !formData.resume.type.includes('pdf')) {
      toast({
        title: 'Error',
        description: 'Resume file must be a PDF.',
        variant: 'destructive',
      });
      return;
    }

    // photo can be jpg, jpeg, or png
    if (
      formData.photo &&
      // @ts-expect-error Property type does not exist on type never
      !formData.photo.type.includes('jpg') &&
      // @ts-expect-error Property type does not exist on type never
      !formData.photo.type.includes('jpeg') &&
      // @ts-expect-error Property type does not exist on type never
      !formData.photo.type.includes('png')
    ) {
      toast({
        title: 'Error',
        description: 'Photo file must be a JPG.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Convert files to buffer for sending in the request
      // @ts-expect-error "resume" is not defined
      const resumeBuffer = await formData.resume?.arrayBuffer();
      // @ts-expect-error "photo" is not defined
      const photoBuffer = await formData.photo?.arrayBuffer();

      const payload = {
        ...formData,
        areasOfInterest: ['Web Development', 'Data Science'], // Example interests
        resume: {
          // @ts-expect-error "resume" is not defined
          filename: formData.resume.name,
          content: new Uint8Array(resumeBuffer),
          // @ts-expect-error "resume" is not defined
          contentType: formData.resume.type,
        },
        photo: {
          // @ts-expect-error "resume" is not defined
          filename: formData.photo.name,
          content: new Uint8Array(photoBuffer),

          // @ts-expect-error "resume" is not defined
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

      if (response.ok) {
        toast({
          title: 'Application Submitted',
          description:
            'Thank you for your application. A confirmation email has been sent to your address.',
          className: 'bg-green-500 text-white',
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
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
                  <SelectItem value="bachelor">Bachelor&apos;s Degree</SelectItem>
                  <SelectItem value="master">Master&apos;s Degree</SelectItem>
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
                  <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Computer Programming">
                    Computer Programming Languages
                  </SelectItem>
                  <SelectItem value="Financial Management">Financial Management</SelectItem>
                  <SelectItem value="Bookkeeping">Bookkeeping</SelectItem>
                  <SelectItem value="UX Design">UX Design</SelectItem>
                  <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                  <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                  <SelectItem value="Data Security">Data Security</SelectItem>
                  <SelectItem value="Endpoint Protection">Endpoint Protection</SelectItem>
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
                  // @ts-expect-error "resume" is not defined
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
                Files must be less than 100 KB. Allowed file types: jpg, jpeg, png.
              </p>
            </div>
            <div>
              <Label htmlFor="resume">Resume *</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf"
                required
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Files must be less than 2 MB. Allowed file type: pdf.
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
