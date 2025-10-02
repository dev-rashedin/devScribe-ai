import { axiosSecureApi } from '../api';

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

  console.log('payload inside handleServiceAction', payload);
  

  const result = await fetchAction(config.endpoint, payload);
  if (!result.success) return result;

  let userInput = 'Untitled request';

  if (payload instanceof FormData) {
    const text = payload.get('text') as string | null;
    if (text) {
      userInput = text.slice(0, 100) + (text.length > 100 ? '...' : ''); 
    } else {
      const file = payload.get('file') as File | null;
      if (file) {
        userInput = file.name;
      }
    }
  } else if (payload && typeof payload === 'object') {
    if ('prompt' in payload && typeof payload.prompt === 'string') {
      userInput =
        payload.prompt.slice(0, 100) + (payload.prompt.length > 100 ? '...' : '');;
    } else {
      const firstValue = Object.values(payload)[0];
      if (typeof firstValue === 'string') {
        userInput = firstValue;
      }
    }
  }
 

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
    getAssistantContent: (result) => result?.data?.explanation,
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
    getAssistantContent: (result) => result?.data?.refactoredCode,
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
    getAssistantContent: (result) => result?.data?.article,
  });
}

export function emailHelper(
  _prevState: unknown,
  formData: FormData,
  uid: string
) {
  return handleServiceAction(_prevState, formData, uid, {
    endpoint: '/email-helper',
    service: 'email-helper',
    getPayload: (formData) => ({
      tone: formData.get('tone'),
      prompt: formData.get('prompt'),
    }),
    getAssistantContent: (result) => result?.data?.email,
  });
}
export function docSummarizer(
  _prevState: unknown,
  formData: FormData,
  uid: string,
) {
  return handleServiceAction(_prevState, formData, uid, {
    endpoint: '/doc-summarizer',
    service: 'doc-summarizer',
     getPayload: (formData) => {
      const file = formData.get('file') as File | null;
      const text = formData.get('text') as string;  

       const payload = new FormData();
       if (text) payload.append('text', text);
       if (file && file.size > 0) payload.append('file', file);

      return payload;
    },
    getAssistantContent: (result) => result?.data?.summary || '',
  });
}

export function resumeAssistant(
  _prevState: unknown,
  formData: FormData,
  uid: string
) {
  return handleServiceAction(_prevState, formData, uid, {
    endpoint: '/resume-assistant',
    service: 'resume-assistant',
    getPayload: (formData) => {
      const file = formData.get('file') as File | null;
      const text = (formData.get('text') as string) || '';
      const jobDescription = (formData.get('jobDescription') as string) || '';
      const tone = (formData.get('tone') as string) || 'professional';
      const role = (formData.get('role') as string) || '';

      const payload = new FormData();
      if (text) payload.append('text', text);
      if (file && file.size > 0) payload.append('file', file);
      if (jobDescription) payload.append('jobDescription', jobDescription);
      if (tone) payload.append('tone', tone);
      if (role) payload.append('role', role);

      return payload;
    },
    getAssistantContent: (result) => result?.data?.optimizedResume || '',
  });
}
