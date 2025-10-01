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
  const [tagline, setTagline] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [techStack, setTechStack] = useState('');
  const [devTools, setDevTools] = useState('');
  const [categoryTags, setCategoryTags] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [deploymentPlatform, setDeploymentPlatform] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [fontPreference, setFontPreference] = useState('Modern Sans-serif');

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveDraftStatus, setSaveDraftStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const draftIdParam = searchParams.get('draftId');
    if (draftIdParam) {
      setDraftId(draftIdParam);
      setIsEditingDraft(true);
      fetchDraftData(draftIdParam);
    }
  }, [searchParams]);

  const fetchDraftData = async (id: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setErrors({ general: 'You need to be logged in to edit a project.' });
        return;
      }

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

      setTitle(projectData.title || '');
      setTagline(projectData.tagline || '');
      setHeroImageUrl(projectData.hero_image_url || '');
      setDescription(projectData.content || '');
      setGithubUrl(projectData.github_url || '');
      setLiveDemoUrl(projectData.live_demo_url || '');
      setDeploymentPlatform(projectData.deployment_platform || '');
      setFontPreference(projectData.font_preference || 'Modern Sans-serif');
      setIsVisible(projectData.is_public || false);

      await fetchRelatedData(id);
    } catch (error: any) {
      console.error('Unexpected error fetching project data:', error);
      setErrors({ general: 'Failed to load project data. Please try again.' });
    }
  };

  const fetchRelatedData = async (projectId: string) => {
    try {
      const { data: featuresData, error: featuresError } = await supabase
        .from('project_features')
        .select('feature_text')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true });

      if (featuresError) {
        console.error('Error fetching features:', featuresError);
      } else {
        setFeatures(featuresData.map(f => f.feature_text).join('\n'));
      }

      const { data: techData, error: techError } = await supabase
        .from('project_technologies')
        .select('tech_name')
        .eq('project_id', projectId);

      if (techError) {
        console.error('Error fetching tech stack:', techError);
      } else {
        setTechStack(techData.map(t => t.tech_name).join(', '));
      }

      const { data: toolsData, error: toolsError } = await supabase
        .from('project_tools')
        .select('tool_name')
        .eq('project_id', projectId);

      if (toolsError) {
        console.error('Error fetching development tools:', toolsError);
      } else {
        setDevTools(toolsData.map(t => t.tool_name).join(', '));
      }

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('project_categories')
        .select('category_name')
        .eq('project_id', projectId);

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
      } else {
        setCategoryTags(categoriesData.map(c => c.category_name).join(', '));
      }
    } catch (error: any) {
      console.error('Unexpected error fetching related data:', error);
    }
  };

  const handleSaveDraft = async () => {
    setSaveDraftStatus('saving');
    setErrors({});

    try {
      if (!title.trim()) {
        setErrors({ title: 'Title is required to save a draft.' });
        setSaveDraftStatus('error');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setErrors({ general: 'You need to be logged in to save a draft.' });
        setSaveDraftStatus('error');
        return;
      }

      const draftData = {
        user_id: session.user.id,
        title: title.trim(),
        tagline: tagline.trim(),
        hero_image_url: heroImageUrl?.trim() || null,
        content: description.trim() || null,
        github_url: githubUrl.trim() || null,
        live_demo_url: liveDemoUrl.trim() || null,
        deployment_platform: deploymentPlatform.trim() || null,
        font_preference: fontPreference,
        is_public: false,
        updated_at: new Date().toISOString()
      };

      let newProjectId = draftId;

      if (isEditingDraft && draftId) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(draftData)
          .eq('id', draftId);

        if (updateError) throw updateError;
      } else {
        const { data: projectInsertData, error: projectInsertError } = await supabase
          .from('projects')
          .insert(draftData)
          .select();

        if (projectInsertError) throw projectInsertError;

        newProjectId = projectInsertData?.[0]?.id;
        if (!newProjectId) {
          throw new Error('Failed to get the ID of the newly created draft.');
        }
      }

      if (newProjectId) {
        await handleRelatedData(newProjectId);
      }

      setSaveDraftStatus('saved');
      
      if (!isEditingDraft && newProjectId) {
        setDraftId(newProjectId);
        setIsEditingDraft(true);
      }
      
      setTimeout(() => {
        setSaveDraftStatus('idle');
      }, 3000);
    } catch (error: any) {
      console.error('Error saving draft:', error);
      setErrors({ general: error.message || 'Failed to save draft. Please try again.' });
      setSaveDraftStatus('error');
      
      setTimeout(() => {
        setSaveDraftStatus('idle');
      }, 5000);
    }
  };

  const handleRelatedData = async (projectId: string) => {
    try {
      await supabase.from('project_features').delete().eq('project_id', projectId);
      await supabase.from('project_technologies').delete().eq('project_id', projectId);
      await supabase.from('project_tools').delete().eq('project_id', projectId);
      await supabase.from('project_categories').delete().eq('project_id', projectId);

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
        }
      } else {
        console.log('Tech stack inserted successfully.');
      }

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
        }
      } else {
        console.log('Development tools inserted successfully.');
      }

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
        }
      } else {
        console.log('Categories inserted successfully.');
      }
    } catch (error: any) {
      console.error('Error handling related data:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      if (!title.trim()) {
        setErrors({ title: 'Title is required.' });
        setIsSubmitting(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setErrors({ general: 'You need to be logged in to create a project.' });
        setIsSubmitting(false);
        return;
      }

      const projectData = {
        user_id: session.user.id,
        title: title.trim(),
        tagline: tagline.trim(),
        hero_image_url: heroImageUrl?.trim() || null,
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
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', draftId);

        if (updateError) throw updateError;
        newProjectId = draftId;
      } else {
        const { data: projectInsertData, error: projectInsertError } = await supabase
          .from('projects')
          .insert(projectData)
          .select();

        if (projectInsertError) throw projectInsertError;

        newProjectId = projectInsertData?.[0]?.id;
        if (!newProjectId) {
          throw new Error('Failed to get the ID of the newly created project.');
        }
      }

      if (newProjectId) {
        await handleRelatedData(newProjectId);
      }

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
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{errors.general}</span>
          </div>
        )}

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
        
        <CoreInfoSection 
          title={title}
          setTitle={setTitle}
          tagline={tagline}
          setTagline={setTagline}
          heroImageUrl={heroImageUrl}
          setHeroImageUrl={setHeroImageUrl}
          errors={errors}
        />

        <div className="p-4 border-b border-primary/10">
          <h2 className="text-xl font-bold mb-3">Live Demo URL</h2>
          <p className="text-sm text-black/60 dark:text-white/60 mb-4">
            프로젝트를 직접 체험해볼 수 있는 라이브 데모 링크를 입력하세요. 가장 눈에 띄는 곳에 표시됩니다.
          </p>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">link</span>
            <input
              type="url"
              placeholder="https://my-project-demo.com"
              value={liveDemoUrl}
              onChange={(e) => setLiveDemoUrl(e.target.value)}
              className="w-full bg-background-light dark:bg-background-dark border-2 border-primary/40 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            />
          </div>
        </div>
        
        <DescriptionSection 
          description={description}
          setDescription={setDescription}
          errors={errors}
          fontPreference={fontPreference}
          setFontPreference={setFontPreference}
        />
        
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
        
        <LinksSection 
          githubUrl={githubUrl}
          setGithubUrl={setGithubUrl}
          deploymentPlatform={deploymentPlatform}
          setDeploymentPlatform={setDeploymentPlatform} liveDemoUrl={''} setLiveDemoUrl={function (url: string): void {
            throw new Error('Function not implemented.');
          } }        />
        
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