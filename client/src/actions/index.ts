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

