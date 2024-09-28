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

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      toast({
        title: 'Application Submitted',
        description:
          'Thank you for your application. A confirmation email has been sent to your address.',
        className: 'bg-green-500 text-white',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Error',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <section className="relative h-[70svh]  text-white bg-black py-24 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/career.jpg')", opacity: 0.3 }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl font-bold mb-4 text-center">Careers With Access Data Systems</h1>
          <p className="text-xl mb-8 text-center max-w-3xl mx-auto">
            Be part of a dynamic team driving innovation in IT solutions. We're looking for talented
            individuals to help shape the future of technology.
          </p>
          <div className="text-center">
            <a
              href="#apply"
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300 inline-block"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Join Access Data Systems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Innovative Technology',
                description: 'Work with cutting-edge tech in converged networks, HPC, and more.',
              },
              {
                title: 'Dynamic Environment',
                description:
                  'Join a team of young, dynamic IT professionals in a fast-paced culture.',
              },
              {
                title: 'Diverse Projects',
                description:
                  'Engage in a wide range of projects from LAN/WAN to wireless networks.',
              },
              {
                title: 'Career Growth',
                description:
                  'Ample opportunities for career advancement and professional development.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-red-500 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Apply Now</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      required
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-gray-700">
                      Address *
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Gender *</Label>
                    <RadioGroup
                      name="gender"
                      required
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                      className="flex space-x-4 mt-1"
                    >
                      <div className="flex items-center">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="ml-2">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="ml-2">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Qualification</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="educationQualification" className="text-gray-700">
                      Education Qualification *
                    </Label>
                    <Select
                      name="educationQualification"
                      required
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, educationQualification: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
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
                    <Label htmlFor="technicalQualification" className="text-gray-700">
                      Technical Qualification *
                    </Label>
                    <Select
                      name="technicalQualification"
                      required
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, technicalQualification: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Network Engineering">Network Engineering</SelectItem>
                        <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                        <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="AI/Machine Learning">AI/Machine Learning</SelectItem>
                        <SelectItem value="DevOps">DevOps</SelectItem>
                        <SelectItem value="IoT">Internet of Things (IoT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Areas of Interest</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Network Engineering',
                  'Server Engineering',
                  'Cluster Management',
                  'High Performance Computing',
                  'Web Development',
                  'Application Development',
                  'Security & Surveillance',
                  'Video Conferencing',
                  'Audio Visual Solutions',
                ].map((area) => (
                  <div key={area} className="flex items-center">
                    <input
                      type="checkbox"
                      id={area}
                      name="areasOfInterest"
                      value={area}
                      checked={formData.areasOfInterest.includes(area)}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <Label htmlFor={area} className="text-sm text-gray-700">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Label htmlFor="whyJoinUs" className="text-gray-700">
                Why do you want to join Access Data Systems? *
              </Label>
              <Textarea
                id="whyJoinUs"
                name="whyJoinUs"
                required
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Tell us why you're interested in joining our team and how your skills align with our company's goals."
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Uploads</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="photo" className="text-gray-700">
                    Photo *
                  </Label>
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    required
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Files must be less than 100 KB. Allowed file types: jpg, jpeg, png.
                  </p>
                </div>
                <div>
                  <Label htmlFor="resume" className="text-gray-700">
                    Resume *
                  </Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Files must be less than 2 MB. Allowed file type: pdf.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mt-8"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
