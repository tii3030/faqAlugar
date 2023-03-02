export type Link = {
  number: number;
  title: string;
  id: string;
};

export type LinkContent = {
  id: string;
  title: string;
  subTitle: string;
  links: Content[];
};

export type Content = {
  titleLink: string;
  route?: string;
  subLinks?: [{
    titleLink?: string;
    route?: string;
  }];
};

export type DataContent = {
  id: string;
  title: string;
  content: string;
};