// ProjectsShowcase.tsx
// This component displays the projects showcase page content
"use client";

import React from 'react';
import ProjectCard from './ProjectCard';
import SearchAndFilter from './SearchAndFilter';
import Pagination from './Pagination';

// Define the type for a project item
interface ProjectItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectsShowcase = () => {
  // Sample data for the projects
  const projectItems: ProjectItem[] = [
    {
      id: 1,
      title: "Project Alpha",
      description: "A cutting-edge web application for data visualization.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf9oCt1tNm7qKP3osrgFzAU4hwih7QWJvDMjLFb5l3mFKBXoZg8bIoCoIiSrfTAl-LyE9rnkm8ZCCefJki5QRF1hxygoLHc6z37Z5lu-hb3G_xSRGSKWdxSF3qZgRCditwx7UF3PSY7iY9QNhcVJoquS9yQqqRWLv5ScHGiKV2D3Stf8mAnp_gDKlugTDoZzRDrU2kDAo1CseE9KwxdjApILs3gQIYrJdwPj-K6Fi1qqn3JNz7KRTKOZiGMAO72puuUI97MxJtfA"
    },
    {
      id: 2,
      title: "Project Beta",
      description: "An innovative mobile app for social networking.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlrfAslpSVxDlZXaBMCwQTSwUnc2BQ9IaAiVec7gPDj1PZIc5UYUIvghMFklhbtpU5o0Enh3ShjI2C1biiFIazbAGbENISZyjLlSyGMaNufDb4rhWuuW1_Vb3idr-IAo2R4zZR7rC9LJoACSdSJdoTXj7FdYXh9SIxVkNGf5qaZDiI6bFeB0w21vBQPRIQBLeL0uIBaiiypVAT5VpTRjnktq0iivLK-DkGx0ZzNZBQm-cUVvFh2EvHI5GzWvUv7q_OngCqf-I6BA"
    },
    {
      id: 3,
      title: "Project Gamma",
      description: "A robust backend system for e-commerce platforms.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-XZA2muSlisflh9odAnVwloiHerRrYx6TvRLPT6-YP79F4BPvXcxRXd5e510b_EsR3lcX8hj6I4x4iGG8a-6mb6JO1KCgi2SFiLqKh0fdMx9BFCwWkt3Z9FLdK4ryX9D1W7O2agc9wZlnrF70bmHXr-dH4UgjB8Rh3XyUoq-yWp7SZ3yW4jifYZ3uFJhCRKdv9Yr4GFBM_fJQLGalZlupCNFR8C5iMUsV8cNiMKsU9SDHjjZenO0S05A-Y13Z_VdsEDFwNm_2vg"
    },
    {
      id: 4,
      title: "Project Delta",
      description: "A creative design tool for graphic artists.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH1V5tXCF55MHTdxHWdmzpF0ekEnW8LPzYx_cJAZ3X0BKMEHYkWUJmo9uZmuLRjgh8xF7tq7VSrf5K5_3_Gx2-N4_iUQDMlojfKry4McWTqxBazzUfHA6VSxJEGqzvDXId5VQoTCRWGCavL11fl_qRJNRKD1F9Q7PHpnaKL14gp_GNpmMCYpB4veX_JqU_O7zeeSl61C_XC6IwyqSBJs5xEXj5y5lhaucoZSqF_k9lclrlgxkXesuH6ZXgX88bxT30g5HmZEtTQw"
    },
    {
      id: 5,
      title: "Project Epsilon",
      description: "A comprehensive project management solution.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWCd2y_WTUsSTKPboXp8QT7aTIiCBsECOjyob_c8MA5Zj65GiR2ghomAhLC-2nuBkdoc9fv3MVsdZbdVaYTg4OyhKeKe6tArUCwS6eEGYeygwK6KPqhJW7XvQR0gf5ltmepqBzv-LRxTy45CIs9dHfEog_FbF6ep23zHDmPg4sNwmyOm3TpcdcF5_EGmjufDLRQOWvtSQvcS1o-yQOznqRZncnlDmGFnUPWexMNP_Pm3_ULqwXrH9_BW87I8pycJwNqzt4fFg26g"
    },
    {
      id: 6,
      title: "Project Zeta",
      description: "An interactive learning platform for coding enthusiasts.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUz3XhizE9O8b7GJTcIhy8Gv-U5XjQIaGpJqmFKIHsAw1wENQSPMz1CsYpxwRtgDGNfi28GzJIBUXNSyr_a21FpLo70vmp3Csd3KUY4VnsWP9UeJ2MipfKRHgcGm-fMGW1jZXPfrQ21ithyE263Bma8LEmnqNZPvHEq7Ig9yiwbb_D4WkPr-TFDM0E3dQrdTkRtc-a6fgGBam21006J3MTGg00W0ibrtMwz26WlOVSetOqIg1GeAkrIKwKhqqihkHtqR-noTklwA"
    }
  ];

  return (
    <main className="container mx-auto p-8">
      {/* Page header with title and description */}
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-bold tracking-tighter text-primary mb-2">Explore Projects</h2>
        <p className="text-xl text-[#101c22]/70 dark:text-[#f5f7f8]/70 max-w-3xl mx-auto">
          Discover a universe of creativity. Filter, sort, and find projects that spark your next big idea.
        </p>
      </div>
      
      {/* Search and filter section */}
      <SearchAndFilter />
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Map through project items to create cards */}
        {projectItems.map((project) => (
          <ProjectCard 
            key={project.id}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
      
      {/* Pagination controls */}
      <Pagination />
    </main>
  );
};

export default ProjectsShowcase;