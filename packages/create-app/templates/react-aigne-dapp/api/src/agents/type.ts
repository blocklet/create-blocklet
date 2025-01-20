export interface ChatbotResponse {
  $text: string;
  status?: { loading?: boolean; message?: string };
}
