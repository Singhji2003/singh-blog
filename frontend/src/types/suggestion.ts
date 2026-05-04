export interface SuggestionFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: SuggestionFormData & { id: string; submittedAt: string };
  error?: string;
}
