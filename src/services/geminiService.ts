import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ScanResult {
  summary: string;
  detailedSummary: string;
  confidence: number;
  recommendation: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  category: 'Phishing' | 'Malware' | 'Spoofing' | 'Social' | 'Other';
  impactScore: number;
  mitreTechnique: string;
  mitreTactic: string;
  technicalDetails: { label: string; description: string }[];
}

export const analyzeContent = async (content: string, type: 'url' | 'email'): Promise<ScanResult> => {
  const prompt = `Analyze the following ${type} for security threats: "${content}". 
  Provide a detailed security assessment in JSON format. 
  The response should include:
  - summary: A brief one-sentence summary of the threat.
  - detailedSummary: A more in-depth explanation of the threat and its mechanisms.
  - confidence: A percentage (0-100) of how confident you are in this analysis.
  - recommendation: A clear action for the security analyst to take.
  - risk: One of 'Critical', 'High', 'Medium', 'Low'.
  - category: One of 'Phishing', 'Malware', 'Spoofing', 'Social', 'Other'.
  - impactScore: A float from 0.0 to 10.0 representing the potential damage.
  - mitreTechnique: The relevant MITRE ATT&CK technique (e.g., T1566.001).
  - mitreTactic: The relevant MITRE ATT&CK tactic (e.g., Initial Access).
  - technicalDetails: An array of objects with 'label' and 'description' for specific indicators found.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          detailedSummary: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          recommendation: { type: Type.STRING },
          risk: { type: Type.STRING, enum: ['Critical', 'High', 'Medium', 'Low'] },
          category: { type: Type.STRING, enum: ['Phishing', 'Malware', 'Spoofing', 'Social', 'Other'] },
          impactScore: { type: Type.NUMBER },
          mitreTechnique: { type: Type.STRING },
          mitreTactic: { type: Type.STRING },
          technicalDetails: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ['label', 'description']
            }
          }
        },
        required: ['summary', 'detailedSummary', 'confidence', 'recommendation', 'risk', 'category', 'impactScore', 'mitreTechnique', 'mitreTactic', 'technicalDetails']
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateResponse = async (threatSummary: string, recommendation: string): Promise<string> => {
  const prompt = `Based on the following threat analysis:
  Threat: ${threatSummary}
  Recommendation: ${recommendation}
  
  Generate a professional security alert email to be sent to the affected users or IT department. 
  The tone should be urgent but calm and professional. Include clear next steps.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: prompt
  });

  return response.text || "Failed to generate response.";
};
