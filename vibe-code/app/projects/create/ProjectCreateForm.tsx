// ProjectCreateForm.tsx
// This component contains the project creation/edit form
"use client";

import React, { useState, useEffect } from 'react';
import CoreInfoSection from './CoreInfoSection';
import DescriptionSection from './DescriptionSection';
import CategorizationSection from './CategorizationSection';
import LinksSection from './LinksSection';
import StatusSection from './StatusSection';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

const ProjectCreateForm = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState(''); // Add tagline state
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [description, setDescription] = useState(''); // Maps to 'content' field in database
  const [features, setFeatures] = useState(''); // Features list state (multi-line text)
  const [techStack, setTechStack] = useState(''); // Tech stack state (comma-separated)
  const [devTools, setDevTools] = useState(''); // Development tools state (comma-separated)
  const [categoryTags, setCategoryTags] = useState(''); // Category tags state (comma-separated)
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [deploymentPlatform, setDeploymentPlatform] = useState('');
  const [isVisible, setIsVisible] = useState(true); // Maps to 'is_public' field in database
  const [fontPreference, setFontPreference] = useState('Modern Sans-serif'); // Default font setting

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveDraftStatus, setSaveDraftStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if we're editing a draft
  useEffect(() => {
    const draftIdParam = searchParams.get('draftId');
    if (draftIdParam) {
      setDraftId(draftIdParam);
      setIsEditingDraft(true);
      fetchDraftData(draftIdParam);
    }
  }, [searchParams]);

  // Fetch draft data if editing
  const fetchDraftData = async (id: string) => {
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setErrors({ general: 'You need to be logged in to edit a project.' });
        return;
      }

      // Fetch project data
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .single();

      if (projectError) {
        console.error('Error fetching project data:', projectError);
        setErrors({ general: 'Project not found or you do not have permission to edit it.' });
        return;
      }
      
      if (!projectData) {
        setErrors({ general: 'Project not found.' });
        return;
      }

      // Set form state with project data
      setTitle(projectData.title || '');
      setTagline(projectData.tagline || '');
      setHeroImageUrl(projectData.hero_image_url || '');
      setDescription(projectData.content || '');
      setGithubUrl(projectData.github_url || '');
      setLiveDemoUrl(projectData.live_demo_url || '');
      setDeploymentPlatform(projectData.deployment_platform || '');
      setFontPreference(projectData.font_preference || 'Modern Sans-serif');
      setIsVisible(projectData.is_public || false);

      // Fetch related data (this will handle missing related data gracefully)
      await fetchRelatedData(id);
    } catch (error: any) {
      console.error('Unexpected error fetching project data:', error);
      setErrors({ general: 'Failed to load project data. Please try again.' });
    }
  };

  // Fetch related data for the draft
  const fetchRelatedData = async (projectId: string) => {
    try {
      // Fetch features
      const { data: featuresData, error: featuresError } = await supabase
        .from('project_features')
        .select('feature_text')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true });

      if (featuresError) {
        console.error('Error fetching features:', featuresError);
        // Don't throw error, just continue with empty data
      } else {
        setFeatures(featuresData.map(f => f.feature_text).join('\n'));
      }

      // Fetch tech stack
      const { data: techData, error: techError } = await supabase
        .from('project_technologies')
        .select('tech_name')
        .eq('project_id', projectId);

      if (techError) {
        console.error('Error fetching tech stack:', techError);
        // Don't throw error, just continue with empty data
      } else {
        setTechStack(techData.map(t => t.tech_name).join(', '));
      }

      // Fetch development tools
      const { data: toolsData, error: toolsError } = await supabase
        .from('project_tools')
        .select('tool_name')
        .eq('project_id', projectId);

      if (toolsError) {
        console.error('Error fetching development tools:', toolsError);
        // Don't throw error, just continue with empty data
      } else {
        setDevTools(toolsData.map(t => t.tool_name).join(', '));
      }

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('project_categories')
        .select('category_name')
        .eq('project_id', projectId);

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        // Don't throw error, just continue with empty data
      } else {
        setCategoryTags(categoriesData.map(c => c.category_name).join(', '));
      }
    } catch (error: any) {
      console.error('Unexpected error fetching related data:', error);
      // We don't set error here as we still want to show the main form even if related data fails
    }
  };

  // Save draft handler
  const handleSaveDraft = async () => {
    setSaveDraftStatus('saving');
    setErrors({});

    try {
      // Basic validation (only require title for draft)
      if (!title.trim()) {
        setErrors({ title: 'Title is required to save a draft.' });
        setSaveDraftStatus('error');
        return;
      }

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setErrors({ general: 'You need to be logged in to save a draft.' });
        setSaveDraftStatus('error');
        return;
      }

      // Prepare draft data
      const draftData = {
        user_id: session.user.id,
        title: title.trim(),
        tagline: tagline.trim(),
        hero_image_url: heroImageUrl.trim() || null,
        content: description.trim() || null,
        github_url: githubUrl.trim() || null,
        live_demo_url: liveDemoUrl.trim() || null,
        deployment_platform: deploymentPlatform.trim() || null,
        font_preference: fontPreference,
        is_public: false, // Drafts are always private
        updated_at: new Date().toISOString()
      };

      let newProjectId = draftId;

      if (isEditingDraft && draftId) {
        // Update existing draft
        const { error: updateError } = await supabase
          .from('projects')
          .update(draftData)
          .eq('id', draftId);

        if (updateError) throw updateError;
      } else {
        // Insert new draft
        const { data: projectInsertData, error: projectInsertError } = await supabase
          .from('projects')
          .insert(draftData)
          .select();

        if (projectInsertError) throw projectInsertError;

        // Get the ID of the newly created draft
        newProjectId = projectInsertData?.[0]?.id;
        if (!newProjectId) {
          throw new Error('Failed to get the ID of the newly created draft.');
        }
      }

      // Handle related data (delete existing and insert new)
      if (newProjectId) {
        await handleRelatedData(newProjectId);
      }

      // Show success message
      setSaveDraftStatus('saved');
      
      // If we just created a new draft, update state
      if (!isEditingDraft && newProjectId) {
        setDraftId(newProjectId);
        setIsEditingDraft(true);
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveDraftStatus('idle');
      }, 3000);
    } catch (error: any) {
      console.error('Error saving draft:', error);
      setErrors({ general: error.message || 'Failed to save draft. Please try again.' });
      setSaveDraftStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSaveDraftStatus('idle');
      }, 5000);
    }
  };

  // Handle related data (features, tech stack, etc.)
  const handleRelatedData = async (projectId: string) => {
    try {
      // Delete existing related data
      await supabase.from('project_features').delete().eq('project_id', projectId);
      await supabase.from('project_technologies').delete().eq('project_id', projectId);
      await supabase.from('project_tools').delete().eq('project_id', projectId);
      await supabase.from('project_categories').delete().eq('project_id', projectId);

      // Insert features
      const featureLines = features.split('\n').map(f => f.trim()).filter(f => f.length > 0);
      if (featureLines.length > 0) {
        const featureData = featureLines.map((featureText, index) => ({
          project_id: projectId,
          feature_text: featureText,
          order_index: index
        }));

        const { error: featuresInsertError } = await supabase
          .from('project_features')
          .insert(featureData);

        if (featuresInsertError) {
          console.error('Error inserting features:', featuresInsertError);
        } else {
          console.log('Features inserted successfully.');
        }
      }

      // Insert tech stack
      const techList = techStack.split(',').map(t => t.trim()).filter(t => t.length > 0);
      if (techList.length > 0) {
        const techData = techList.map(techName => ({
          project_id: projectId,
          tech_name: techName
        }));

        const { error: techInsertError } = await supabase
          .from('project_technologies')
          .insert(techData);

        if (techInsertError) {
          console.error('Error inserting tech stack:', techInsertError);
        } else {
          console.log('Tech stack inserted successfully.');
        }
      }

      // Insert development tools
      const toolList = devTools.split(',').map(t => t.trim()).filter(t => t.length > 0);
      if (toolList.length > 0) {
        const toolData = toolList.map(toolName => ({
          project_id: projectId,
          tool_name: toolName
        }));

        const { error: toolInsertError } = await supabase
          .from('project_tools')
          .insert(toolData);

        if (toolInsertError) {
          console.error('Error inserting development tools:', toolInsertError);
        } else {
          console.log('Development tools inserted successfully.');
        }
      }

      // Insert categories
      const categoryList = categoryTags.split(',').map(c => c.trim()).filter(c => c.length > 0);
      if (categoryList.length > 0) {
        const categoryData = categoryList.map(categoryName => ({
          project_id: projectId,
          category_name: categoryName
        }));

        const { error: categoryInsertError } = await supabase
          .from('project_categories')
          .insert(categoryData);

        if (categoryInsertError) {
          console.error('Error inserting categories:', categoryInsertError);
        } else {
          console.log('Categories inserted successfully.');
        }
      }
    } catch (error: any) {
      console.error('Error handling related data:', error);
      throw error;
    }
  };

  // Form submission handler (publish)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Basic validation
      if (!title.trim()) {
        setErrors({ title: 'Title is required.' });
        setIsSubmitting(false);
        return;
      }

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setErrors({ general: 'You need to be logged in to create a project.' });
        setIsSubmitting(false);
        return;
      }

      // Prepare project data
      const projectData = {
        user_id: session.user.id,
        title: title.trim(),
        tagline: tagline.trim(),
        hero_image_url: heroImageUrl.trim(),
        content: description.trim(),
        github_url: githubUrl.trim() || null,
        live_demo_url: liveDemoUrl.trim() || null,
        deployment_platform: deploymentPlatform.trim() || null,
        font_preference: fontPreference,
        is_public: isVisible,
        updated_at: new Date().toISOString()
      };

      let newProjectId = draftId;

      if (isEditingDraft && draftId) {
        // Update existing draft to make it public
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', draftId);

        if (updateError) throw updateError;
        newProjectId = draftId;
      } else {
        // Insert new project
        const { data: projectInsertData, error: projectInsertError } = await supabase
          .from('projects')
          .insert(projectData)
          .select();

        if (projectInsertError) throw projectInsertError;

        // Get the ID of the newly created project
        newProjectId = projectInsertData?.[0]?.id;
        if (!newProjectId) {
          throw new Error('Failed to get the ID of the newly created project.');
        }
      }

      // Handle related data
      if (newProjectId) {
        await handleRelatedData(newProjectId);
      }

      // Redirect to project page
      router.push(`/projects/${newProjectId}`);
    } catch (error: any) {
      console.error('Error creating project:', error);
      setErrors({ general: error.message || 'Failed to create project. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Error messages */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{errors.general}</span>
          </div>
        )}

        {/* Page header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#161118] tracking-light text-[32px] font-bold leading-tight">
              {isEditingDraft ? 'Edit Project' : 'Create Project'}
            </p>
            <p className="text-[#7c608a] text-sm font-normal leading-normal">
              {isEditingDraft 
                ? 'Continue working on your draft' 
                : 'Share your project on Vibe Hub. Fill in the details below to get started'}
            </p>
          </div>
        </div>
        
        {/* Core Information Section */}
        <CoreInfoSection 
          title={title}
          setTitle={setTitle}
          tagline={tagline}
          setTagline={setTagline}
          heroImageUrl={heroImageUrl}
          setHeroImageUrl={setHeroImageUrl}
          errors={errors}
        />
        
        {/* Description Section */}
        <DescriptionSection 
          description={description}
          setDescription={setDescription}
          errors={errors}
        />
        
        {/* Categorization and Specifications Section */}
        <CategorizationSection 
          features={features}
          setFeatures={setFeatures}
          techStack={techStack}
          setTechStack={setTechStack}
          devTools={devTools}
          setDevTools={setDevTools}
          categoryTags={categoryTags}
          setCategoryTags={setCategoryTags}
        />
        
        {/* Project Links Section */}
        <LinksSection 
          githubUrl={githubUrl}
          setGithubUrl={setGithubUrl}
          liveDemoUrl={liveDemoUrl}
          setLiveDemoUrl={setLiveDemoUrl}
          deploymentPlatform={deploymentPlatform}
          setDeploymentPlatform={setDeploymentPlatform}
        />
        
        {/* Status and Actions Section */}
        <StatusSection 
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          isSubmitting={isSubmitting}
          onSaveDraft={handleSaveDraft}
          saveDraftStatus={saveDraftStatus}
        />
      </div>
    </form>
  );
};

export default ProjectCreateForm;