'use server';

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

export async function explain(_prevState: unknown, formData: FormData, uid: string) {
  const code = formData.get('code');
  const language = formData.get('language');

  console.log('base url', import.meta.env.VITE_API_BASE_URL);

  const result = await fetchAction('/explain-code', { code, language });

  if (!result.success) return result;

  const messages = [
    { role: 'user', content: `${code}` },
    { role: 'assistant', content: result.data.explanation },
  ];

  const title = messages[0].content;

  await fetchAction('/history', {
    uid,
    service: 'code-explainer',
    title,
    messages,
  });

  return result;
}

export async function refactor(_prevState: unknown, formData: FormData, uid: string) {
  const code = formData.get('code');
  const language = formData.get('language');

  const result = await fetchAction('/refactor-code', { code, language });

    if (!result.success) return result;

  const messages = [
    { role: 'user', content: `${code}` },
    { role: 'assistant', content: result.data.refactoredCode },
  ];

  const title = messages[0].content;

  await fetchAction('/history', {
    uid,
    service: 'code-refactor',
    title,
    messages,
  });

  return result;
}

export async function writeArticle(_prevState: unknown, formData: FormData, uid: string) {
  const topic = formData.get('topic');

  const result = await fetchAction('/generate-article', { topic });

  if (!result.success) return result;


  const messages = [
    { role: 'user', content: `${topic}` },
    { role: 'assistant', content: result.data.article },
  ];

  const title = messages[0].content;

  await fetchAction('/history', {
    uid,
    service: 'article-generator',
    title,
    messages,
  });

  return result;
}
