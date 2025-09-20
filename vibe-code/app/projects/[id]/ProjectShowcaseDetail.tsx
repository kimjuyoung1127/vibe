// ProjectShowcaseDetail.tsx
// This component displays the detailed view of a project showcase
"use client";

import React from 'react';
import FeatureList from './FeatureList';
import TechnologyStack from './TechnologyStack';
import RelatedProjects from './RelatedProjects';
import CommentsSection from './CommentsSection';
import VibeCheckButton from '@/app/mainpage/VibeCheckButton';

const ProjectShowcaseDetail = () => {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      {/* Page header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">Project Showcase Detail</p>
          <p className="text-[#7c608a] text-sm font-normal leading-normal">
            Dive into the details of this project, exploring its features, technologies, and the story behind its creation.
          </p>
        </div>
      </div>
      
      {/* Author information */}
      <div className="flex p-4 @container">
        <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCo5dNNwFjDMmEaYNb7-PDlp04IHGCJMRcz4Rwo9Pyic5p90ruulC9zF1g18xpoYIhOGYISILuXYAu1oAJZGVLKpxVjbJDHAvOmRfr-I73SXReDiLzutf-T0qacfoztxNpMVXvhws4tW-uAHpoGlerAZ8tpkYHNk7rWGl02fVSSld6yUHn1C7_7kXsTVu1Buhk5WPf37vHYuVYejj5BnhwBjps3nfW7pdddvO6G0GOkjajsZDBa5ANgmbp8k1v0EB2EyiBp1rSpVbPM")' }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em]">Alex Ryder</p>
              <p className="text-[#7c608a] text-base font-normal leading-normal">Posted on July 15, 2024 · Last updated July 20, 2024</p>
              <div className="flex items-center gap-4 mt-2">
                <VibeCheckButton initialVibes={9} />
                <button className="text-[#7c608a] text-base font-normal leading-normal hover:text-[#161118]">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project image */}
      <div className="@container">
        <div className="@[480px]:px-4 @[480px]:py-3">
          <div
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-lg min-h-80"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWDmIQOhYUQTTR1YTHFTnisyjApD96trEoMF7oenlE4gi46DXUnz5QDD3uQK7HHoOobgIdQ4gu_8ryy639q8m32p0el26Budv6Z7iYCd9NSx2Kj5_WpmjAKwQQU53j_0q9EO3yY5w-wMHCoZ9KarGKzcYkwBMEISfsSDNv4u7xzjpIj-uDDC0gCA-nUYIsRhyceiRIAnX31EOVBdG0CqyCu9mNh_Wg3duLeijtUxsGojbNtwqDCbqkfbwY02T5_eyu8Ix5HvQu6bKs")' }}
          ></div>
        </div>
      </div>
      
      {/* Project description */}
      <p className="text-[#161118] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Project Alpha is a web application designed to streamline task management for individuals and teams. It offers a user-friendly interface with features like task
        prioritization, deadline tracking, and collaborative workspaces. The project leverages modern web technologies to ensure a responsive and efficient user experience.
      </p>
      
      {/* Key features section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Key Features</h2>
      <FeatureList />
      
      {/* Project content section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Project Content</h2>
      <p className="text-[#161118] text-base font-normal leading-normal pb-3 pt-1 px-4">
        This project was inspired by the need for a more intuitive and visually appealing task management tool. The development process involved several iterations, focusing
        on user feedback and incorporating best practices in UI/UX design. We utilized a Modern Retro Pop Art style to create a vibrant and engaging interface, with
        multi-layered drop shadows and subtle glassmorphism effects to enhance visual depth.
      </p>
      <p className="text-[#161118] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Key highlights of the development include implementing a drag-and-drop interface for task reordering, integrating real-time updates for collaborative tasks, and
        optimizing performance for large-scale projects. We also incorporated a 'Vibe Check' feature, allowing users to rate their experience with the project, fostering a
        sense of community and continuous improvement.
      </p>
      
      {/* Project images grid */}
      <div className="flex w-full grow bg-white @container py-3">
        <div className="w-full gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] grid grid-cols-[2fr_1fr_1fr]">
          <div
            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none row-span-2"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMs4agmgsT_TySTlJ0Po4vO3Rw3U5qql7BaRSjQJR6J1zPy5M_KVRqY3CoXpPB5FNyt_vUl11Zp1xuIuKIO9IP2zs5nE6BOetqONJdPWeNNfo4mn7UosGiCioIyuA6COyv4-hvDPv_MCcsenfgqFlRvwMYPC3TGVMqY4rYKB-cZknd4YBFOhI4dd_K8d_DnGFfMW3D2Ui-fMLi-uOJ7IejzVK3JimGyaazHG1SI2h6r6cu-TpwwLIsKRLwS3UFQQOTx63xJhkYIPMm")' }}
          ></div>
          <div
            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none col-span-2 row-span-2"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYhQ3HpLGyjGPkldMxBvSyTCn8CHLczONedvWGd6Rmcl29bqR6UcBPJKGbwxh08cS0fnmwFWoA7E9NMPqr8t3TdcR8yWASBssFjirD3H69GrciKA7VR2t31ssSCRiJtSOBpc3Eazc-_WOn12ePb5eO16Gr6Bh_MS_jp9fBkiDUHCzQlUX4JR_znmb7B3R4wHMwVVSx-6JXuK6GexEdS-qB6wgoL9majNQwakSEFf5kHJADLDh5z3xsQfKxrX1YJZZoAfLMXbUDSVn_")' }}
          ></div>
        </div>
      </div>
      
      {/* Technology stack section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Technology Stack &amp; Tools</h2>
      <TechnologyStack />
      
      {/* Project links section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Project Links &amp; Information</h2>
      <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e2dbe6] py-5">
          <p className="text-[#7c608a] text-sm font-normal leading-normal">GitHub Repository</p>
          <p className="text-[#161118] text-sm font-normal leading-normal">github.com/alexryder/project-alpha</p>
        </div>
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e2dbe6] py-5">
          <p className="text-[#7c608a] text-sm font-normal leading-normal">Live Demo</p>
          <p className="text-[#161118] text-sm font-normal leading-normal">project-alpha.example.com</p>
        </div>
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e2dbe6] py-5">
          <p className="text-[#7c608a] text-sm font-normal leading-normal">Deployment Info</p>
          <p className="text-[#161118] text-sm font-normal leading-normal">Deployed on Netlify</p>
        </div>
      </div>
      
      {/* Author information section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Author Information</h2>
      <div className="flex p-4 @container">
        <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4dIQLrhAVLS2XdDyCIWMRVKX_5UcJY80owHvmAHrGXP5d2wBmpmTf_YBeaFiyMFcOWPyCTADneHID8YQWVwfu0-NXiN0a5lK-wWfBrvVQLdXBM4rTcgLDMZVpOkqbUZIwxQXazRCuqAXY_sWqoPawAhJET1oimF_MXj2wFxnK1l4GkjLJq5mw0VhcAeiwbFjsXzYsQhvIl9YkultmpaQVMk0R8_DJazrsFIG9boFN8-s_O4TL77Ll_jZ3gesFglAqK-X34LBbMzNF")' }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em]">Alex Ryder</p>
              <p className="text-[#7c608a] text-base font-normal leading-normal">Full-stack Developer</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related projects section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Related Projects</h2>
      <RelatedProjects />
      
      {/* Comments section */}
      <h2 className="text-[#161118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Comments</h2>
      <CommentsSection />
    </div>
  );
};

export default ProjectShowcaseDetail;