// This service has been disabled to remove API key usage.
// The application now runs entirely without the Google Gemini API.

export const initializeChat = async () => {
  return null;
};

export const sendMessageToBrandAI = async (message: string): Promise<string> => {
  return "AI services are currently disabled.";
};

export const generateCreativeCaption = async (itemTitle: string, itemDesc: string): Promise<string> => {
  return `${itemTitle} - ${itemDesc}`;
};
