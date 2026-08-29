export const profile = {
  name: 'Shenxiang Zeng',
  nameZh: '曾申翔',
  handle: 'zengsx23',
  email: 'zengsx23@mails.tsinghua.edu.cn',
  phone: '18459795279',
  githubUrl: 'https://github.com/zengsx23',
  repositoryUrl: 'https://github.com/zengsx23/zengsx23.github.io',
  physMindUrl: 'https://physmind.github.io/',
  roles: ['Senior undergraduate, Department of Civil Engineering', 'Incoming direct-entry PhD student, Class of 2027'],
  about: [
    'I am a senior undergraduate student in the Department of Civil Engineering at Tsinghua University. I will begin my direct-entry PhD studies as a member of the Class of 2027.',
    'This website brings together my academic experience, recent updates, and public projects. I will continue to add my research interests, academic work, and other experiences.',
  ],
  news: [
    { date: 'Aug 2026', content: 'Launched this personal website to document my academic experience and public projects.' },
    { date: 'Recent', content: 'Continuing to develop PhysMind and explore clearer ways to organize and communicate knowledge.' },
  ],
  projects: [
    {
      name: 'PhysMind',
      description: 'An evolving public project exploring clearer ways to organize, understand, and communicate knowledge.',
      url: 'https://physmind.github.io/',
      tags: ['Personal project', 'Public website'],
    },
  ],
  education: [
    { institution: 'Tsinghua University', program: 'B.Eng. candidate, Department of Civil Engineering', period: 'Present' },
    { institution: 'Tsinghua University', program: 'Direct-entry PhD student, Class of 2027', period: 'From 2027' },
  ],
} as const;
