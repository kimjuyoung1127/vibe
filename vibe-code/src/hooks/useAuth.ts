'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 세션을 확인합니다.
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };

    getSession();

    // 인증 상태 변경을 구독합니다.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // 컴포넌트가 언마운트될 때 구독을 해제합니다.
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
};