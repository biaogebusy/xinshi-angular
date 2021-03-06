export interface ICard {
  title?: string;
  subTitle?: string;
  avatar?: any;
  body?: any;
  classes?: any;
  img?: {
    src: string;
    alt?: string;
    hostClasses?: any;
    classes?: any;
  };
  carousel?: any;
  feature?: any;
  overlay?: any[];
  link?: {
    href: string;
    label: string;
  };
  actions?: any;
}
