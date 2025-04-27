export interface NewBook {
  title: string;
  description: string;
  author: string;
  publicationDate: Date;
  publishedBy: string;
  rating: number;
  pageCount: number;
  categories: string[];
  imgUrl: string;
}

export interface Book extends NewBook {
  id: number;
}

export const sampleBooks: Book[] = [
  {
    id: 1,
    title: 'JavaScript The Definitive Guide',
    description:
      'This book is for programmers who want to learn JavaScript and for web developers who want to take their understanding and mastery to the next level. It begins by explaining the JavaScript language itself, in detail, from the bottom up. It then builds on that foundation to cover the web platform and Node.js.',
    author: 'David Flanagan',
    publishedBy: "O'Reilly Media, Inc.",
    publicationDate: new Date('2020-05-01'),
    categories: ['JavaScript'],
    rating: 5,
    pageCount: 706,
    imgUrl:
      'https://learning.oreilly.com/covers/urn:orm:book:9781491952016/400w/',
  },
  {
    id: 2,
    title: 'Modern Angular',
    description:
      'Discover new ways of working with components, dependency injection, RxJS, Signals, and more—all through building a complete enterprise-grade HR management system! You’ll soon be improving your daily development with Angular’s quality-of-life features, upgrading your app’s performance with server-side rendering, and getting ready for what’s coming Angular’s future.',
    author: 'Armen Vardanyan',
    publishedBy: 'Manning Publications',
    publicationDate: new Date('2025-01-01'),
    categories: ['Angular'],
    rating: 4,
    pageCount: 304,
    imgUrl:
      'https://learning.oreilly.com/covers/urn:orm:book:9781633436923/400w/',
  },
  {
    id: 3,
    title: 'Database Internals',
    description:
      'When it comes to choosing, using, and maintaining a database, understanding its internals is essential. But with so many distributed databases and tools available today, it’s often difficult to understand what each one offers and how they differ. With this practical guide, Alex Petrov guides developers through the concepts behind modern database and storage engine internals.',
    author: 'Alex Petrov',
    publishedBy: "O'Reilly Media, Inc.",
    publicationDate: new Date('2019-10-01'),
    categories: ['Relational Databases'],
    rating: 5,
    pageCount: 370,
    imgUrl:
      'https://learning.oreilly.com/covers/urn:orm:book:9781492040330/400w/',
  },
  {
    id: 4,
    title: 'Building Microservices',
    description:
      'As organizations shift from monolithic applications to smaller, self-contained microservices, distributed systems have become more fine-grained. But developing these new systems brings its own host of problems. This expanded second edition takes a holistic view of topics that you need to consider when building, managing, and scaling microservices architectures.',
    author: 'Sam Newman',
    publishedBy: "O'Reilly Media, Inc.",
    publicationDate: new Date('2021-08-01'),
    categories: ['Microservices'],
    rating: 5,
    pageCount: 612,
    imgUrl:
      'https://learning.oreilly.com/covers/urn:orm:book:9781492034018/400w/',
  },
  {
    id: 5,
    title: 'Fundamentals of Software Architecture',
    description:
      "Salary surveys worldwide regularly place software architect in the top 10 best jobs, yet no real guide exists to help developers become architects. Until now. This updated edition provides a comprehensive overview of software architecture's many aspects, with five new chapters covering the latest insights from the field. Aspiring and existing architects alike will examine architectural characteristics, architectural patterns, component determination, diagramming architecture, governance, data, generative AI, team topologies, and many other topics.",
    author: 'Mark Richards, Neal Ford',
    publishedBy: "O'Reilly Media, Inc.",
    publicationDate: new Date('2025-03-01'),
    categories: ['Software Architecture'],
    rating: 5,
    pageCount: 546,
    imgUrl:
      'https://learning.oreilly.com/covers/urn:orm:book:9781098175504/400w/',
  },
  {
    id: 6,
    title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
    description:
      'Through a recent series of breakthroughs, deep learning has boosted the entire field of machine learning. Now, even programmers who know close to nothing about this technology can use simple, efficient tools to implement programs capable of learning from data. This bestselling book uses concrete examples, minimal theory, and production-ready Python frameworks (Scikit-Learn, Keras, and TensorFlow) to help you gain an intuitive understanding of the concepts and tools for building intelligent systems.',
    author: 'Aurélien Géron',
    publishedBy: "O'Reilly Media, Inc.",
    publicationDate: new Date('2022-10-01'),
    categories: ['Machine Learning'],
    rating: 5,
    pageCount: 864,
    imgUrl:
      'https://learning.oreilly.com/covers/urn:orm:book:9781098125967/400w/',
  },
];
