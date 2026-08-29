export const profile = {
  name: 'Shenxiang Zeng',
  nameZh: '曾申翔',
  handle: 'zengsx23',
  email: 'zengsx23@mails.tsinghua.edu.cn',
  phone: '18459795279',
  githubUrl: 'https://github.com/zengsx23',
  repositoryUrl: 'https://github.com/zengsx23/zengsx23.github.io',
  physMindUrl: 'https://physmind.github.io/',
  roles: ['清华大学土木工程系本科生（大四）', '2027 级直博生'],
  about: [
    '我是曾申翔，现为清华大学土木工程系大四本科生，并将于 2027 年开始直博阶段的学习。',
    '这个主页用于整理我的学习经历、近期动态与公开项目。我会持续补充研究方向、学术成果和更完整的个人经历。',
  ],
  news: [
    { date: '2026.08', content: '个人主页上线，并开始持续整理个人经历与公开项目。' },
    { date: '近期', content: '持续维护 PhysMind，探索更清晰的知识组织与表达方式。' },
  ],
  projects: [
    {
      name: 'PhysMind',
      description: '一个持续更新的公开作品。项目内容与最新进展可在独立站点查看。',
      url: 'https://physmind.github.io/',
      tags: ['个人项目', '公开站点'],
    },
  ],
  education: [
    { institution: '清华大学', program: '土木工程系，本科（大四）', period: '现在' },
    { institution: '清华大学', program: '2027 级直博生', period: '2027 起' },
  ],
} as const;
