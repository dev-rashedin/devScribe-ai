import  {axiosSecureApi } from "../api";

async function fetchAction(endpoint: string, body: object) {
  try {
    const res = await axiosSecureApi.post(endpoint, body);

    if (res.status < 200 || res.status >= 300) {
      return { success: false, error: 'Failed to fetch results' };
    }

    return { success: true, data: res.data };
  } catch (err: unknown) {
    return {
      success: false,
      error: `An error occurred: ${
        err instanceof Error ? err.message : 'Unknown error'
      }`,
    };
  }
}


async function handleServiceAction(
  _prevState: unknown,
  formData: FormData,
  uid: string,
  config: ServiceConfig
) {
  const payload = config.getPayload(formData);

  const result = await fetchAction(config.endpoint, payload);
  if (!result.success) return result;

  const userInput = Object.values(payload)[0]?.toString() ?? 'Untitled request';

  const messages = [
    { role: 'user', content: userInput },
    { role: 'assistant', content: config.getAssistantContent(result) },
  ];

  await fetchAction('/history', {
    uid,
    service: config.service,
    title: userInput,
    messages,
  });

  return result;
}

// --- Specific services ---

export function explain(_prevState: unknown, formData: FormData, uid: string) {
  return handleServiceAction(_prevState, formData, uid, {
    endpoint: '/explain-code',
    service: 'code-explainer',
    getPayload: (formData) => ({
      code: formData.get('code'),
      language: formData.get('language'),
    }),
    getAssistantContent: (result) => result.data.explanation,
  });
}

export function refactor(_prevState: unknown, formData: FormData, uid: string) {
  return handleServiceAction(_prevState, formData, uid, {
    endpoint: '/refactor-code',
    service: 'code-refactor',
    getPayload: (formData) => ({
      code: formData.get('code'),
      language: formData.get('language'),
    }),
    getAssistantContent: (result) => result.data.refactoredCode,
  });
}

export function writeArticle(
  _prevState: unknown,
  formData: FormData,
  uid: string
) {
  return handleServiceAction(_prevState, formData, uid, {
    endpoint: '/generate-article',
    service: 'article-generator',
    getPayload: (formData) => ({ topic: formData.get('topic') }),
    getAssistantContent: (result) => result.data.article,
  });
}

export function emailHelper(_prevState: unknown, formData: FormData, uid: string) {
  return handleServiceAction(_prevState, formData, uid, {
    endpoint: '/email-helper',
    service: 'email-helper',
    getPayload: (formData) => ({
      tone: formData.get('tone'),
      prompt: formData.get('prompt'),
    }),
    getAssistantContent: (result) => result.data.email,
  });
}
export function docSummarizer(_prevState: unknown, formData: FormData, uid: string) {
  return handleServiceAction(_prevState, formData, uid, {
    endpoint: '/doc-summarizer',
    service: 'doc-summarizer',
    getPayload: (formData) => {
      const file = formData.get('file') as File | null;
      const text = formData.get('text') as string;

        const wordCount = text.split(/\s+/).filter(Boolean).length;
        if (!file && wordCount < 200) {
          throw new Error('Text is too short to summarize.');
        }

      if (file && file.size > 0) {
        const payload = new FormData();
        payload.append('file', file);
        if (text) payload.append('text', text);
        return payload;
      }

    
      return { text };
    },
    getAssistantContent: (result) => result.data.summary,
  });
}

