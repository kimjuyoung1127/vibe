// RelatedProjects.tsx
// This component displays related projects in a horizontal scrollable list
"use client";

import React from 'react';

interface RelatedProject {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const RelatedProjects = () => {
  const relatedProjects: RelatedProject[] = [
    {
      id: 1,
      title: "Project Beta",
      description: "A mobile app for fitness tracking",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW_IKizybILfc89u1-mAvcQaAQiw5XJxYiG7uId4t2VziVUasBmE5_iHzQQy1Utv3xsOy115GyJ1tZOs_a8SQzo_s-ts6ZC_lPFUR-uIlmZnv-lC_gSz9aknAWClG1qfsjKSEdkujG5nNVzh1xMJSGHxAa2hM30ezRqMT-hTS3tDQgz7l1CkxGIGt3lZggQptXh17QnFZJyKybau66oJ_hPU6c316gt4mKsYKau5YzQx4bpJM_-XQoEaxQHWyLXJUZTMGUH4Kt31Yr"
    },
    {
      id: 2,
      title: "Project Gamma",
      description: "A platform for online learning",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrtV1woGoAbtlGxxVHRm-Jnjvgk4ALKoAMy79rcNlIHcAb5RXxsNVA25LVVKocGVcC8fu92WEo4aNhzJ73z4KVU2FphlMTPPjlIVXOs0urZzdZO1jBzi-Cp5FuRllNKc0k5Sbq_N1aFThEqn6zU4yrudFEWPla4Rv9tyy47fqUl4kzcBoNca9WKF34QYgUfiS2htLQTzv8GUKopdnwiP29mk1H23RqFGVs36MQUOWRq7TQi9mtjBCxUp1l1MNCuBYyVXOeUAMZiV3u"
    },
    {
      id: 3,
      title: "Project Delta",
      description: "A tool for data visualization",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaBVXqdVs4ygAdcNUqRUJEqJNi6veUxueRby6m8Kuua-b-eNCK5sZQHG8zq_MVBZRb0ijy4vg24agEVMljKPUUkaya5VwP1I2ePIEnabPDzSJ4YeNDRgUXaXgj5AM4PAmLAVugRi01z-_77jWYaRGbXaB5tThaCYQMv8yzgPA1y3PYODPFAzf7o1Zkj3ay95t3kkWrybI7uDbUQloG1tFT3TZd_pzBo47ZYGoLUu3sY0YtFrlA86Kp2DOJhs4SGmsQI8pA5qRLaSJE"
    }
  ];

  return (
    <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-stretch p-4 gap-3">
        {relatedProjects.map((project) => (
          <div key={project.id} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
              style={{ backgroundImage: `url("${project.imageUrl}")` }}
            ></div>
            <div>
              <p className="text-[#161118] text-base font-medium leading-normal">{project.title}</p>
              <p className="text-[#7c608a] text-sm font-normal leading-normal">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;