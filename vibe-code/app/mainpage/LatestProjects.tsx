// LatestProjects.tsx
// This component displays the latest projects in a grid layout
"use client";

import React from 'react';

// Define the type for a project item
interface ProjectItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const LatestProjects = () => {
  // Sample data for the latest projects
  const projectItems: ProjectItem[] = [
    {
      id: 1,
      title: "Project: Glitch Effect Toolkit",
      description: "A toolkit for creating glitch art and visual effects.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqASFON8u1wKr8OchIiADq9LJala4Q5D5WUvnoApQ8uSk5FPCUs4PivrKg-T6H1G2GojC1a4lKDhkvRnOEzE0asbHZoHVnz7_AI_JKsm3NTrnHmTsBB-bBXt8CG4WTbeGK6yBldxB69faW9PRdAURJGtE1lXu5e-IHdyEpAdXaqbTW62OU52kRhiEhzWffFR9VAd4G4Xb1xE5z1W8MlYZL66gsCw4GGlGTyBxsVFbCXysem9mNfBL9NmgL342KKJPoBOpF1sqW2g"
    },
    {
      id: 2,
      title: "Project: Synthwave Soundboard",
      description: "A soundboard with a collection of synthwave sounds and loops.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhzRa3c-J_Uj3SOGY0cbwENB4UUZWtCl3keokrQtGub5_lajw9R2Acr69nNygRGLANbvxzb2IVvuaiAwB4fnxa66qEWNxX-UkLBgWc2o0JfXoUzSHW8rSWtWtP7-JEf0KYj-UsA88uMThmamAmfB1t9vwTY_H4VTp3l2fYHzF_st74bDDCCIwI_covoSJqqPmu-O-bkZMR0b-z632S19gx_5x0Nz9UrvRmo3Qzyak8riRGDMKfsp6QfVRnAySgScAk3UatRPo7Aw"
    },
    {
      id: 3,
      title: "Project: 8-Bit Game Engine",
      description: "A simple game engine for creating 8-bit style games.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLMSAVQ2AuAyhB0ub4Xw5tL31aN1NlC5itFusrZw7Vfv3oz6u2eZtEMFejfIeT2U3mcilz1kfwI0OHymlaMQNOaXlOzCrpCPVzQXP2Htk3bTplJYxPNkvpPCZyMnmFHglOKcUSxJWiUp5cprxTI3K_5tu7iuUtVmwg6el_HDrFLSSQtewyE6TMHDwkp6aBGrev2btS4Mpl7_EjvibHUGmLDPTQG2vrU-3pB760p2B_-gkcs2lP2mFeIU3UvuFnoyXjtCxikhW98A"
    }
  ];

  return (
    <div className="px-4 pb-6 pt-4 md:px-6 lg:px-8">
      {/* Section title */}
      <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Latest Projects</h2>
      
      {/* Grid layout for project cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Map through project items to create cards */}
        {projectItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-3">
            {/* Project image */}
            <div 
              className="aspect-video w-full rounded-lg bg-cover bg-center shadow-lg shadow-primary/10" 
              style={{ backgroundImage: `url("${item.imageUrl}")` }}
            ></div>
            
            {/* Project information */}
            <div>
              <p className="font-bold text-black dark:text-white">{item.title}</p>
              <p className="text-sm text-black/60 dark:text-white/60">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProjects;