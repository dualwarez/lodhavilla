
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

  const loadSubmissions = async () => {
    console.log('Loading submissions from Supabase...');
    
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error loading data",
          description: "Failed to load submissions from database. Check console for details.",
          variant: "destructive",
        });
        
        // Fallback to localStorage
        const savedSubmissions = localStorage.getItem('formSubmissions');
        if (savedSubmissions) {
          const parsedSubmissions = JSON.parse(savedSubmissions);
          setSubmissions(parsedSubmissions);
        } else {
          setSubmissions([]);
        }
      } else {
        console.log('Loaded submissions from Supabase:', data);
        setSubmissions(data || []);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({
        title: "Error",
        description: "Failed to connect to database. Using local data if available.",
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
        console.error('Error loading from localStorage:', localError);
        setSubmissions([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();

    // Set up real-time subscription for new submissions
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
          console.log('New submission received:', payload.new);
          setSubmissions(prev => [payload.new as FormSubmission, ...prev]);
          setLastRefresh(new Date());
          toast({
            title: "New submission received",
            description: `Form submitted by ${(payload.new as FormSubmission).name}`,
          });
        }
      )
      .subscribe();

    // Set up an interval to refresh data every 30 seconds as backup
    const interval = setInterval(loadSubmissions, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [toast]);

  return {
    submissions,
    isLoading,
    lastRefresh,
    loadSubmissions
  };
};
