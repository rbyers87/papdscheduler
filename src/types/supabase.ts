export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'user';
          group: string;
          benefits: {
            vacation: number;
            sick: number;
            comp: number;
          };
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      schedules: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          shift: string;
          sector?: string;
          is_recurring: boolean;
          recurring_pattern?: {
            type: 'daily' | 'weekly' | 'monthly';
            interval: number;
          };
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['schedules']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['schedules']['Insert']>;
      };
      time_off_requests: {
        Row: {
          id: string;
          user_id: string;
          start_date: string;
          end_date: string;
          type: 'vacation' | 'sick' | 'comp';
          status: 'pending' | 'approved' | 'rejected';
          hours: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['time_off_requests']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['time_off_requests']['Insert']>;
      };
    };
  };
}