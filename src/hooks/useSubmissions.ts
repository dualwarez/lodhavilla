
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FormSubmission {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  city: string | null;
  budget: string | null;
  visit_date: string | null;
  property_type: string | null;
  message: string | null;
  project: string;
  source: string;
  created_at: string;
}

export const useSubmissions = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const loadSubmissions = async () => {
    console.log('🔄 Loading submissions from Supabase...');
    console.log('📊 Supabase URL:', supabase.supabaseUrl);
    console.log('🔑 Using anon key:', supabase.supabaseKey.substring(0, 20) + '...');
    
    setIsLoading(true);
    
    try {
      // Test connection first
      const { data: testData, error: testError } = await supabase
        .from('form_submissions')
        .select('count')
        .single();

      console.log('🧪 Connection test result:', { testData, testError });

      // Get actual data
      const { data, error, count } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      console.log('📋 Query executed:', 'SELECT * FROM form_submissions ORDER BY created_at DESC');
      console.log('📊 Raw response:', { data, error, count });
      console.log('📈 Total rows returned:', data?.length || 0);

      setDebugInfo({
        query: 'SELECT * FROM form_submissions ORDER BY created_at DESC',
        response: { data, error, count },
        timestamp: new Date().toISOString(),
        supabaseUrl: supabase.supabaseUrl,
        tableExists: !error || error.code !== 'PGRST116'
      });

      if (error) {
        console.error('❌ Supabase error:', error);
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        toast({
          title: "Database Error",
          description: `${error.message} (Code: ${error.code})`,
          variant: "destructive",
        });
        
        // Try fallback to localStorage
        const savedSubmissions = localStorage.getItem('formSubmissions');
        if (savedSubmissions) {
          const parsedSubmissions = JSON.parse(savedSubmissions);
          setSubmissions(parsedSubmissions);
          console.log('🔄 Loaded from localStorage fallback:', parsedSubmissions.length, 'submissions');
        } else {
          setSubmissions([]);
        }
      } else {
        console.log('✅ Successfully loaded from Supabase:', data?.length || 0, 'submissions');
        setSubmissions(data || []);
        setLastRefresh(new Date());
        
        if (data && data.length > 0) {
          toast({
            title: "Data loaded successfully",
            description: `Found ${data.length} submissions in database`,
          });
        }
      }
    } catch (error) {
      console.error('💥 Unexpected error:', error);
      setDebugInfo({
        query: 'SELECT * FROM form_submissions ORDER BY created_at DESC',
        response: { error: error.message },
        timestamp: new Date().toISOString(),
        supabaseUrl: supabase.supabaseUrl,
        unexpectedError: true
      });
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to database. Check console for details.",
        variant: "destructive",
      });
      
      // Fallback to localStorage
      try {
        const savedSubmissions = localStorage.getItem('formSubmissions');
        if (savedSubmissions) {
          const parsedSubmissions = JSON.parse(savedSubmissions);
          setSubmissions(parsedSubmissions);
        } else {
          setSubmissions([]);
        }
      } catch (localError) {
        console.error('❌ Error loading from localStorage:', localError);
        setSubmissions([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();

    // Set up real-time subscription for new submissions
    console.log('🔔 Setting up real-time subscription...');
    const channel = supabase
      .channel('form_submissions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'form_submissions'
        },
        (payload) => {
          console.log('🆕 New submission received via real-time:', payload.new);
          setSubmissions(prev => [payload.new as FormSubmission, ...prev]);
          setLastRefresh(new Date());
          toast({
            title: "New submission received",
            description: `Form submitted by ${(payload.new as FormSubmission).name}`,
          });
        }
      )
      .subscribe((status) => {
        console.log('📡 Real-time subscription status:', status);
      });

    // Set up an interval to refresh data every 30 seconds as backup
    const interval = setInterval(() => {
      console.log('⏰ Auto-refresh triggered');
      loadSubmissions();
    }, 30000);

    return () => {
      console.log('🧹 Cleaning up subscriptions...');
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [toast]);

  return {
    submissions,
    isLoading,
    lastRefresh,
    loadSubmissions,
    debugInfo
  };
};
